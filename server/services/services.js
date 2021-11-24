const PubSub = require('pubsub-js');
const googleTrends = require('google-trends-api');
const axios = require('axios');  
const TikTokScraper = require('tiktok-scraper');

async function getTikTokHashtag(keyword){
    return new Promise(resolve =>{
        const hashtag = TikTokScraper.getHashtagInfo(keyword);
        resolve(hashtag);
    })
}


function getTweetVolume(keyword) {
    return new Promise(resolve => {
        const token = "AAAAAAAAAAAAAAAAAAAAAPApVwEAAAAAZyQRmmKGo4kwU2Ekgy%2BEqF3HDCs%3DiTnGsJDjbim6ICLhNQmX4jJpeTlNEXiRh2ttfQKuRPwozj35zA";
        const params = {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }  
        const url = createUrlTwitter(keyword);
        axios.get(url,params)
        .then(response => {
            resolve(response.data);
        })
        .catch(error =>{
            console.log(JSON.stringify(error,null,4))
        })
    });
}

function getVideo(keyword) {
    return new Promise(resolve => {
        var url = createUrlSearch('video',keyword,'snippet,id','3','BR','true')
        axios.get(url)
        .then(response => {
            resolve(parseData(response.data));
        })
        .catch(error =>{
            console.log(error)
        })
    });
}

function parseData(data) {
    let ids = []                
    let channels = []
    let titles = []
    let array = data.items
    array.forEach(function (item) {
        ids.push('https://www.youtube.com/embed/' + item.id.videoId)
        channels.push(item.snippet.channelTitle)
        titles.push(item.snippet.title)
    });
    let response = []
    response.push(ids)
    response.push(channels)
    response.push(titles)
    return response         //response[ids[],channels[],titles[]] 
}

function createUrlTwitter(query){
    var url = "https://api.twitter.com/2/tweets/counts/recent"
    url += '?query=' + query
    return url
}

function createUrlSearch(type,q,part,maxResults,regionCode,videoEmbeddable){
    var url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBQKvcDvZvJtIf7JgcdOW-o_QTy-nmgGso'
    url += '&type=' + type
    url = url + '&q='+ q
    url = url + '&part=' + part
    url = url + '&maxResults=' + maxResults
    url = url + '&regionCode=' + regionCode
    url = url + '&videoEmbeddable=' + videoEmbeddable
    return url
}

async function interestTime(keyword){
    return new Promise(resolve => {
        googleTrends.interestOverTime({keyword: keyword}, function(err, results){
            if(err) console.error('there was an error on google trends!', err);
            else {
                resolve(results);
            }
        })
    });
}

function loadTweets(data){
    let obj = data
    let timeline = [];
    obj.data.forEach(element => {
        timeline.push({Data: new Date(Date.parse(element.end)).toISOString().substring(5,16).replace('T','-').replace('-','/'),Interesse:element.tweet_count})
    });
    timeline.pop()
    let response = {timeline,valor:data.meta.total_tweet_count}
    return response
}

function loadTrend(data){
    let obj = JSON.parse(data);
    let response = [];
    obj.default.timelineData.forEach(element => {
        response.push({Data: new Date(Date.parse(element.formattedTime)).toISOString().split('T')[0],Interesse:element.value[0]})
    });
    return response
}

module.exports = {loadTrend,interestTime,getVideo,getTweetVolume,loadTweets,getTikTokHashtag}