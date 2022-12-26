import React, {useEffect} from 'react';
import s from "./profile.module.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchProfileDataTC} from "./profile-reducer";
import {Button} from "@mui/material";
import {isExpired, useJwt} from "react-jwt";
import { decodeToken } from "react-jwt";

export const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const profileData = useAppSelector(state => state.profile.profileData)
    const token = localStorage.getItem('jwt_token');



//массив девайсов (авторизаций), по девайс айди находишь 1н(в массиве-токене) это и есть активная ссесия
    // @ts-ignore
    const myDecodedToken = decodeToken(token);
// @ts-ignore
    const isMyTokenExpired = isExpired(token);

// @ts-ignore
    const activeIP = profileData.find(d=>d.deviceId === myDecodedToken.deviceId)

    console.log('profileData',profileData)
    console.log('myDecodedToken',myDecodedToken)
    console.log('activeIP',activeIP)

    useEffect(() => {
        dispatch(fetchProfileDataTC())
    }, [dispatch])

    return (
        <Container
            style={{maxWidth: '940px', minHeight: '100vh', paddingLeft: '0', paddingRight: '0', margin: '29px 20px'}}
            className={s.wrapper}>
            <h3>Profile settings</h3>
            <h5>Devices</h5>
            <Box>
                <p>This devices</p>
                <Box style={{background:'',width: "940px", height: "120px",boxShadow: '0px 5px 20px rgba(29, 33, 38, 0.03), 0px 1px 2px rgba(29, 33, 38, 0.1)', borderRadius: '2px', padding:'17 px'}}>

                    <p>IP: {activeIP?.ip}</p>
                    <h4 style={{color:'#3677F7'}}>Online</h4>
                </Box>
                <Box style={{display:"flex", justifyContent:'end'}}>
                    <Button style={{width: "231px",
                        height: "36px",
                        border: '1px solid #F8346B',
                        borderRadius: '2px',
                        color: '#F8346B',
                        fontSize: '14px',
                        fontWeight: '600',lineHeight:' 20px',
                        textTransform:'none',
                        margin:'20px 0',
                    }}>
                        Terminate all other session
                    </Button>
                </Box>


                <p>Active sessions</p>
                <Box style={{background:'',width: "940px", height: "120px",boxShadow: '0px 5px 20px rgba(29, 33, 38, 0.03), 0px 1px 2px rgba(29, 33, 38, 0.1)', borderRadius: '2px'}}>
                    {/*<p>{profileData.deviceId}</p>*/}
                    {/*<p>IP: {profileData.ip}</p>*/}
                    {/*<p>{profileData.lastActiveDate}</p>*/}
                    {/*<h4>{profileData.title}</h4>*/}
                </Box>
            </Box>

        </Container>
    );
};
