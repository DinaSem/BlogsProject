import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function Header() {
    return (
                <AppBar   position='absolute'
                          sx={{zIndex: (theme) => theme.zIndex.drawer + 1,}}
                          style={{background: '#FCFBFB', color: 'black', maxHeight: '60px' }}>

                    <Toolbar>
                        <Typography variant="h6" noWrap component="div" style={{marginLeft: '64px'}}>
                            <h2>Blogger Platform</h2>
                        </Typography>
                    </Toolbar>
                </AppBar>
    );
}