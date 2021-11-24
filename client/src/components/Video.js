import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';


export default function Video(props){
    return (
        <Box m={4}>
            <Card>
                <Box m={3}> 
                    <Box m={2}>
                        <Typography variant="h4" color="common.black">{props.title}</Typography>
                    </Box>
                    <CardMedia component='iframe'
                        src={props.src}
                        sx={{
                            margin:'auto',
                            width:'640px',
                            height:'480px'
                        }}
                    />
                </Box>
            </Card>
        </Box>
    )
}