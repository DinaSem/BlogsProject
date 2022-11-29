import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Blogs from "../blogs/BlogsPage";
import bloggers from '../pictures/Blogers.png'
import posts from '../pictures/Posts.png'
import {PostsPage} from "../posts/PostsPage";
import {Link} from "react-router-dom";
import s from './navbar.module.css'

const drawerWidth = 252;

export default function Navbar() {
    return (

        <div className={s.headerWrapper}>
            {/*    <Drawer variant="permanent" sx={{*/}
            {/*    width: drawerWidth, flexShrink: 0,*/}
            {/*    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},*/}
            {/*}}>*/}
            {/*<Toolbar/>*/}

            <List>
                <Link to={'/'} style={{textDecoration:"none"}}>
                    <ListItem disablePadding>
                        <ListItemButton >
                            <ListItemIcon style={{justifyContent: 'center'}}>
                                <img src={bloggers}/>
                            </ListItemIcon>
                            <ListItemText primary={"Blogs"} style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '24px',
                                color:"black",
                                textDecoration:"none",
                            }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to={'posts'}style={{textDecoration:"none"}}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon style={{justifyContent: 'center'}}>
                                <img src={posts}/>
                            </ListItemIcon>
                            <ListItemText primary={'Posts'} style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '24px',
                                textDecoration:"none",
                                color:"black"
                            }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>

            {/*</Drawer>*/}
        </div>
    );
}