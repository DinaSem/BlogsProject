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
import users from '../pictures/users.svg'
import {Link, useLocation} from "react-router-dom";
import s from './navbar.module.css'


export default function Navbar() {
    const location = useLocation()

  const blogPageIsActive = location.pathname.includes('blog')
    const postPageIsActive = location.pathname.includes('post')
    const usersPageIsActive = location.pathname.includes('users')

    return (
            <List
                style={{paddingLeft: '47px',paddingTop: '40px'}}

            >
                <Link to={'/blogs'} style={{textDecoration:"none", marginTop:'15px',}}>
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

                <Link to={'posts'}style={{textDecoration:"none",marginTop:'15px'}}>
                    <ListItem disablePadding>
                        <ListItemButton style={{borderRight:  postPageIsActive ? '2px solid red':'', padding:'0',marginTop:'15px'}}>
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
                <Link to={'users'}style={{textDecoration:"none",marginTop:'15px'}}>
                    <ListItem disablePadding>
                        <ListItemButton style={{borderRight:  usersPageIsActive ? '2px solid red':'', padding:'0',marginTop:'15px'}}>
                            <ListItemIcon style={{justifyContent: 'center'}}>
                                {usersPageIsActive
                                    ?<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z" fill="#F8346B"/>
                                    </svg>
                                    :<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 2C9.1 2 10 2.9 10 4C10 5.1 9.1 6 8 6C6.9 6 6 5.1 6 4C6 2.9 6.9 2 8 2ZM8 11C10.7 11 13.8 12.29 14 13V14H2V13.01C2.2 12.29 5.3 11 8 11ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z" fill="black"/>
                                    </svg>

                                }
                            </ListItemIcon>
                            <ListItemText primary={'Users'} style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '24px',
                                textDecoration:"none",
                                color: usersPageIsActive?'red':"black",
                            }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
    );
}
