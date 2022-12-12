import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Blogs from "../blogs/BlogsPage";
import blogIsActive from '../pictures/BlogersRed.svg'
import blogIsNotActive from '../pictures/Blogers.svg'
import posts from '../pictures/Posts.png'
import {Link, useLocation} from "react-router-dom";
import s from './navbar.module.css'


export default function Navbar() {
    const location = useLocation()

  const blogPageIsActive = location.pathname.includes('blog')
    const postPageIsActive = location.pathname.includes('post')

    return (
            <List
                style={{paddingLeft: '47px',paddingTop: '30px'}}

            >
                <Link to={'/blogs'} style={{textDecoration:"none", marginTop:'15px'}}>
                    <ListItem disablePadding>
                        <ListItemButton style={{borderRight:  blogPageIsActive ? '2px solid red':'', padding:'0'}}>
                            <ListItemIcon style={{justifyContent: 'center'}}>
                                {blogPageIsActive
                                    ? <img src={blogIsActive} style={{padding:'0'}}/>
                                    : <img src={blogIsNotActive} style={{padding:'0'}}/>
                                }

                            </ListItemIcon>
                            <ListItemText primary={"Blogs"} style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '24px',
                                color: blogPageIsActive?'red':"black",
                                textDecoration:"none",
                            }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>

                <Link to={'posts'}style={{textDecoration:"none"}}>
                    <ListItem disablePadding>
                        <ListItemButton style={{borderRight:  postPageIsActive ? '2px solid red':'', padding:'0'}}>
                            <ListItemIcon style={{justifyContent: 'center'}}>
                                {postPageIsActive
                                    ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z" fill="red"/>
                                    </svg>
                                    :<img src={posts} style={{padding:'0'}}/>

                                }
                            </ListItemIcon>
                            <ListItemText primary={'Posts'} style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '24px',
                                textDecoration:"none",
                                color: postPageIsActive?'red':"black",
                            }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
    );
}
