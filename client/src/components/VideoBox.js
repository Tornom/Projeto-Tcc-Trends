import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Video from './Video'
import Card from '@material-ui/core/Card'
import useStore from "../store"
import Typography from '@material-ui/core/Typography';

export default function VideoBox(props){
    const srcList = useStore(state => state.srcList)
    return (
        <Container component="main">
            <Box m={5}>
                <Card>
                    <Box m={5}>
                        <Typography variant="h4" color="common.black">Vídeos relevantes</Typography>
                    </Box>
                    <Box>
                        <Video src = {srcList[0][0]} title = {srcList[2][0]}/>
                        <Video src = {srcList[0][1]} title = {srcList[2][1]}/>
                        <Video src = {srcList[0][2]} title = {srcList[2][2]}/>
                    </Box>
                </Card>
            </Box>
        </Container> 
    )
}