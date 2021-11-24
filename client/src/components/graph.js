import React  from "react";
import ChartistGraph from "react-chartist";
import Charts from "../components/charts.js";
import useStore from "../store"
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Graph(props){
    const csv = useStore(state => state.csv)
    return (
        <Card>
            <Box p={3}>
                <Box m={2}>
                    <Typography variant="h4" color="common.black">{props.title}</Typography>
                </Box>
                <ChartistGraph
                    className= {props.className}
                    data= {csv}
                    type= {props.type}
                    options={Charts.basicCharts.options}
                />
            </Box>
        </Card>
        
    )
}