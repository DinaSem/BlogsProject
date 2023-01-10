import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import confirmImg from '../pictures/registr-confirm.png'
import Button from "@mui/material/Button";
import {logoutTC, registrationConformationTC} from "./auth-reducer";
import {fetchPostsTC} from "../posts/post-reducer";
import {useAppDispatch} from "../hooks";

export const RegistrationConformation = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {code} = useParams()

    const goToLoginPageOnClickHandler = () => {
        navigate('/')
    }
    useEffect(() => {
        if(code){
            dispatch(registrationConformationTC(code))
        }
    }, [dispatch, code])
    return (
        <Box style={{textAlign: 'center', marginTop: '60px', display: "block"}}>
            <Box style={{display:"flex",justifyContent:"center"}}>
                <Typography style={{
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '24px',
                    maxWidth: '295px',
                    textAlign: 'center'
                }}>
                    Congratulations!
                    Your email has been confirmed
                </Typography>
            </Box>


            <Button
                onClick={goToLoginPageOnClickHandler}
                style={{
                    margin: '80px 0',
                    width: '138px',
                    color: "white",
                    border: '1px solid black',
                    background: '#F8346B',
                    boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                    borderRadius: '2px'
                }}>
                Sing In
            </Button>
            <Box>
                <img src={confirmImg} alt="" style={{width: '432px', height: '300px'}}/>
            </Box>

        </Box>
    );
};
