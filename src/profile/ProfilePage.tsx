import React, {useEffect} from 'react';
import s from "./profile.module.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchProfileDataTC, removeAllOtherDevicesTC, removeDeviceTC} from "./profile-reducer";
import {Button} from "@mui/material";
import {decodeToken} from "react-jwt";
import {Navigate} from "react-router-dom";
import {parseUserAgent} from 'react-device-detect';
import TabletIcon from '@mui/icons-material/Tablet';
import cellPhone from '../pictures/cell-phone.png'
import imac from '../pictures/imac.png'
import chrome from '../pictures/chrome.png'
import edge from '../pictures/microsoft.png'
import opera from '../pictures/opera.png'
import yandex from '../pictures/yandex.png'
import safari from '../pictures/safari.png'
import apple from '../pictures/apple.png'
import logoutImg from "../pictures/logout.png";


function getIcon(browser: string) {
    if (browser === "Chrome") {
        return chrome;
    } else if (browser === "Edge") {
        return edge;
    } else if (browser === "Opera") {
        return opera;
    } else if (browser === 'Yandex') {
        return yandex;
    } else if (browser === "Safari") {
        return safari;
    }
    return cellPhone;
}

export const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const profileData = useAppSelector(state => state.profile.profileData)
    const token = localStorage.getItem('jwt_token');

//массив девайсов (авторизаций), по девайс айди находишь 1н(в массиве-токене) это и есть активная ссесия

    //декодирую токен
    const myDecodedToken = decodeToken<{ deviceId: string }>(token ?? '');

    //нахожу девайс, на котором открыт браузер
    const infoOfThisDevice = profileData.find(d => d.deviceId === myDecodedToken?.deviceId)
    //другие девайсы, с которых был осуществлен вход
    const allOtherDevices = profileData.filter(d => d.deviceId !== myDecodedToken?.deviceId)


    const userDeviceInfo = parseUserAgent(infoOfThisDevice?.title)
    const allDev = allOtherDevices.map(d => parseUserAgent(d.title))

    // console.log('allOtherDevices', allOtherDevices)
    // console.log('allDev', allDev)
    // console.log('userDeviceInfo', userDeviceInfo)

    const TerminateAllOtherSessionHandler = () => {
        dispatch(removeAllOtherDevicesTC())
    }

    const LogOutFromDeviceHandler = (deviceId: string) => {
        dispatch(removeDeviceTC(deviceId))
    }

    useEffect(() => {
        if (!profileData) {
            dispatch(fetchProfileDataTC())
        }
    }, [dispatch, removeDeviceTC, removeAllOtherDevicesTC])

    useEffect(() => {
        dispatch(fetchProfileDataTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Container
            style={{
                maxWidth: '940px',
                minHeight: '100vh',
                paddingLeft: '0',
                paddingRight: '0',
                margin: '29px 20px'
            }}
            className={s.wrapper}>
            <h3>Profile settings</h3>
            <h5>Devices</h5>
            <Box>
                <p>This devices</p>
                <Box style={{
                    background: '',
                    width: "940px",
                    height: "120px",
                    boxShadow: '0px 5px 20px rgba(29, 33, 38, 0.03), 0px 1px 2px rgba(29, 33, 38, 0.1)',
                    borderRadius: '2px',
                    padding: '17px',
                    display: "flex",
                }}>
                    <Box style={{margin: '20px 10px'}}>
                        <img src={getIcon(userDeviceInfo?.browser.name)}

                             alt="" style={{width: '36px'}}/>
                    </Box>
                    <Box>{/*<h4>{userDeviceInfo?.title}</h4>*/}
                        <h4>{userDeviceInfo?.browser.name}</h4>
                        <p>IP: {infoOfThisDevice?.ip}</p>
                        <h4 style={{color: '#3677F7'}}>Online</h4></Box>
                </Box>
                <Box style={{display: "flex", justifyContent: 'end'}}>
                    <Button style={{
                        width: "231px",
                        height: "36px",
                        border: '1px solid #F8346B',
                        borderRadius: '2px',
                        color: '#F8346B',
                        fontSize: '14px',
                        fontWeight: '600', lineHeight: ' 20px',
                        textTransform: 'none',
                        margin: '20px 0',

                    }} onClick={TerminateAllOtherSessionHandler}>
                        Terminate all other session
                    </Button>
                </Box>


                <p>Active sessions</p>

                {allOtherDevices.map((d: any, i: number) => {
                    let day = d?.lastActiveDate.slice(8, 10)
                    let month = d?.lastActiveDate.slice(5, 7)
                    let year = d?.lastActiveDate.slice(0, 4)
                    return (
                        <Box style={{
                            background: '',
                            width: "940px",
                            height: "120px",
                            boxShadow: '0px 5px 20px rgba(29, 33, 38, 0.03), 0px 1px 2px rgba(29, 33, 38, 0.1)',
                            borderRadius: '2px',
                            padding: '17px',
                            display: "flex",
                        }} key={i}>
                            <Box style={{margin: '20px 10px'}}>
                                <img src={getIcon(parseUserAgent(d.title)?.browser.name)} alt=""
                                     style={{width: '36px'}}/>
                            </Box>
                            <Box style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                                <Box><h4>{parseUserAgent(d.title)?.browser.name}</h4>
                                    <p>IP: {d?.ip}</p>
                                    <p>Last visit:{day + '.' + month + '.' + year}</p>
                                </Box>
                                <Box onClick={() => LogOutFromDeviceHandler(d.deviceId)} style={{
                                    display: "flex",
                                    width: '80px',
                                    height: '20px',
                                    justifyContent: "space-between",
                                    cursor: "pointer"
                                }}>
                                    <img src={logoutImg} style={{width: '18px'}}/>
                                    <span style={{fontSize: "14px"}}>login out</span>
                                </Box></Box>
                        </Box>
                    )
                })}
            </Box>

        </Container>
    );
};
