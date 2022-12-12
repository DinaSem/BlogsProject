import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useAppDispatch, useAppSelector} from "../hooks";
import logoutImg from '../pictures/logout.png'
import Box from "@mui/material/Box";
import {logoutTC} from "../auth/auth-reducer";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const LogOutHandler = () => {
        dispatch(logoutTC())
        navigate('/')
    }
    return (
        <AppBar position='absolute'
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1,}}
                style={{background: '#FCFBFB', color: 'black', maxHeight: '60px'}}>

            <Toolbar style={{display: "flex", justifyContent: 'space-between', padding:'0 64px'}}>
                <Typography variant="h6" noWrap component="div" >
                    <h2 style={{
                        // fontFamily:"Inter",
                        fontStyle:'normal',
                        fontWeight:'600',
                        fontSize:'26px',
                        lineHeight:'36px'}}
                    >
                        Blogger Platform
                    </h2>
                </Typography>
                {isLoggedIn &&
                    <Box onClick={LogOutHandler} style={{

                        display: "flex",
                        width: '80px',
                        justifyContent: "space-between",
                        cursor: "pointer"
                    }}>
                        <img src={logoutImg} style={{width: '18px'}}/>
                        <span style={{fontSize: "14px"}}>login out</span>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    );
}