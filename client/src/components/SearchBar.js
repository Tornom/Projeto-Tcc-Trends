import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';
import Charts from "./charts.js";
import useStore from "../store"

export default function CustomSearchBar(props){
    const addCsv = useStore(state => state.addCsv)
    const showState = useStore(state => state.showState)
    const addSrc = useStore(state => state.addSrc)
    const addTwitterList = useStore(state => state.addTwitterList)
    const addtikTokCard = useStore(state => state.addtikTokCard)

    function fetchApi(query){
        Promise.all([
            fetch("http://localhost:3001/search/youtube",{
              method:"post",
              headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
              },
              body: JSON.stringify({message: query})
            }),
            fetch("http://localhost:3001/search/twitter",{
              method:"post",
              headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
              },
              body: JSON.stringify({message: query})
            }),
            fetch("http://localhost:3001/search/trends",{
              method:"post",
              headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
              },
              body: JSON.stringify({message: query})
            }),
            fetch("http://localhost:3001/search/tiktok",{
              method:"post",
              headers:{
                'Accept':'application/json, text/plain, */*',
                'Content-Type':'application/json'
              },
              body: JSON.stringify({message: query})
            })
          ]).then(([youtube, twitter, trends,tiktok]) => {
            youtube.json().then(res =>{
              addSrc(res)
              showState(true)
            })
            twitter.json().then(res =>{
              let chart = Charts.dataFormat(res.timeline);
              let response = {chart,value:res.value}
              addTwitterList(response)
              showState(true)
            })
            trends.json().then(res =>{
              addCsv(Charts.dataFormat(res))
              showState(true)
            })
            tiktok.json().then(res =>{
              addtikTokCard(res)
              showState(true)
            })
          })
          .catch((err) => {
              console.log(err);
          });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetchApi(data.get('query'))
    };

    const CssTextField = withStyles({
        root: {
          '& label.Mui-focused': {
            color: '#737373',
          },
          "& .MuiInputBase-root": {
            color: "000000",
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#000000',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FF0038',
            },
            '&:hover fieldset': {
              borderColor: '#FF0038',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF0038',
            },
          },
        },
      })(TextField);


    return (
    <Container component="main">
        <Box
            sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} width="100%">
            <CssTextField      
                margin="normal"
                required
                fullWidth
                id="query"
                label="Procurar Palavra"
                name="query"
                autoFocus
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#FF0038', ':hover':{
                    backgroundColor:"#ff3360"
                } }}
            >
                Pesquisar
            </Button>
            </Box>
        </Box>
    </Container>
    );
}