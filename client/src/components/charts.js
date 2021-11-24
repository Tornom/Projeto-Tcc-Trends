var Chartist = require("chartist");

const basicCharts = {
  data: {
    labels: [0],
    series: [[0]]
  },
  options: {
    showArea: true,
    showPoint: false,
    lineSmooth: Chartist.Interpolation.none({
        tension: 1
    }),
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 60 === 0 ? value : null;
      },
      showGrid: false
    },
    axisY: {    
      labelInterpolationFnc: function labelInterpolationFnc(value, index) {
         if(value % 1 === 0) return value;
         return null;
      }
    },
    fullWidth: true,
    width: '850px',
    height: '300px',
    high: 100,
    low: 0
  },
  type: 'Line'
}

const twitterChart = {
  data: {
    labels: [0],
    series: [[0]]
  },
  options: {
    showArea: true,
    showPoint: false,
    lineSmooth: Chartist.Interpolation.none({
        tension: 1
    }),
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 35 === 0 ? value : null;
      },
      showGrid: false
    },
    axisY: {    
      labelInterpolationFnc: function labelInterpolationFnc(value, index) {
         if(value % 1 === 0) return value;
         return null;
      }
    },
    fullWidth: true,
    width: '850px',
    height: '300px',
    scaleMinSpace: 50,
  },
  type: 'Line'
}

var dataFormat = function(data){
    let res = {
      labels: [],
      series: [[]]
    }
    data.forEach(element => {
      if(element.Interesse >= 0){
        res.series[0].push(element.Interesse)
        res.labels.push(element.Data)
      }
    });
    
  return res
}

  module.exports = {
    basicCharts,
    twitterChart,
    dataFormat
  };
