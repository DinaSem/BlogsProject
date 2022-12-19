import React from 'react';
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import confirmImg from '../pictures/registr-confirm.png'
import Button from "@mui/material/Button";

export const RegistrationConformation = () => {
    const {code} = useParams()
    return (
        <Box style={{textAlign: 'center', marginTop: '60px', display: "block"}}>

            <Typography style={{
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '24px',
                maxWidth:'295px',
                textAlign:'center'
            }}>
                Congratulations!
                Your email has been confirmed
            </Typography>

            <Button
                // onClick={handleClose}
                style={{
                    margin:'80px 0',
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
