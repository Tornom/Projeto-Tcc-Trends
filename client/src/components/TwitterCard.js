import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card'
import useStore from "../store"
import Typography from '@material-ui/core/Typography';
import ChartistGraph from "react-chartist";
import Charts from "../components/charts.js";


export default function TwitterCard(props){
    const twitterList = useStore(state => state.twitterList)
    return(
        <Container component="main">
            <Box m={5}>
                <Card>
                    <Box m={5}>
                        <Typography variant="h4" color="common.black">Tweets na última semana</Typography>
                    </Box>
                    <Box m={10}>
                        <ChartistGraph
                        className= {props.className}
                        data= {twitterList.chart}
                        type= {props.type}
                        options={Charts.twitterChart.options}
                        />
                    </Box>
                </Card>
            </Box>
        </Container>
    )
}