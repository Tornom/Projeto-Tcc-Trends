import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card'
import useStore from "../store"
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';


export default function TikTokCard(props){
    const tikTokCard = useStore(state => state.tikTokCard)
    return(
        <Container component="main">
            <Box m={5}>
                <Card>
                    <Box m={5}>
                        <Typography variant="h4" color="common.black">Engajamento no TikTok</Typography>
                    </Box>
                    <Box m={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <Card>
                                    <Typography variant="h6" color="common.black"> Número de Vídeos postados</Typography>
                                    <Typography>{tikTokCard.videoCount}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Card>
                                    <Typography variant="h6" color="common.black"> Número de vizualizações</Typography>
                                    <Typography>{tikTokCard.viewCount}</Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Box>
        </Container>
    )
}