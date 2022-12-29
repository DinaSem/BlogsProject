import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useAppDispatch, useAppSelector} from "../hooks";
import logoutImg from '../pictures/logout.png'
import Box from "@mui/material/Box";
import {initializeAppTC, logoutTC} from "../auth/auth-reducer";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Header() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const username = useAppSelector(state => state.auth.profileData?.login)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation()

    const LogOutHandler = () => {
        dispatch(logoutTC())
        navigate('/')
    }
    useEffect(()=>{
        if(isLoggedIn){
            dispatch(initializeAppTC())
        }
    },[location])

    // if (!isLoggedIn) {
    //     return <Navigate to={'/'}/>
    // }

    return (
        <AppBar position='absolute'
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1,}}
                style={{background: '#FCFBFB', color: 'black', maxHeight: '60px'}}>

            <Toolbar style={{display: "flex", justifyContent: 'space-between', padding: '0 64px'}}>
                <Typography variant="h6" noWrap component="div">
                    <Box style={{display: "flex", alignItems: 'baseline'}}>
                        <h2 style={{
                            // fontFamily:"Inter",
                            fontStyle: 'normal',
                            fontWeight: '600',
                            fontSize: '26px',
                            lineHeight: '36px',
                            margin: '0'
                        }}>
                            Blogger Platform
                        </h2>
                        <span style={{
                            margin: '0 0 0 10px',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '12px',
                            lineHeight: '16px',
                        }}>Superadmin</span>
                    </Box>

                </Typography>
                {isLoggedIn &&
                    <Box style={{display: "flex", justifyContent: "space-between",}}>
                        <Link to={'/profile'} style={{textDecoration: "none", color: 'black'}}><p style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            lineHeight: '24px',
                            borderBottom: '1px dashed #1A1718',
                            marginRight: '30px',
                            margin: '0 30px'
                        }}>{username}</p></Link>
                        <Box onClick={LogOutHandler} style={{
                            display: "flex",
                            width: '80px',
                            height: '20px',
                            justifyContent: "space-between",
                            cursor: "pointer"
                        }}>
                            <img src={logoutImg} style={{width: '18px'}}/>
                            <span style={{fontSize: "14px"}}>login out</span>
                        </Box>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    );
}