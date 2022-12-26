import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {BasicModal} from "../basic modal/BasicModal";
import {useNavigate} from "react-router-dom";


type PropsType={
    email:string
}


export const RegistrationModal = (props:PropsType) => {
   // const blogs = useAppSelector(state => state.blogs.blogsData.items)
    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
        navigate('/')
    }
    return (
        <Box style={{display: 'inline-block'}}>
            <Button type={'submit'} variant={'contained'} style={{color:'white', background:'#F8346B',width:'330px'}}onClick={handleOpen}>
                Sign Up
            </Button>

            <BasicModal title={'Email sent'}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}>
                <Box>
                    <Typography id="modal-modal-title" variant="h6" component="h6"
                                margin={'8px'}>
                        We have sent a link to confirm your email to {props.email}
                    </Typography>
                    <Stack direction="row" spacing={2} style={{width: '100%'}} justifyContent={'end'}>
                        <Button onClick={handleClose} style={{
                            width: '124px',
                            color: "white",
                            border: '1px solid black',
                            background: '#F8346B',
                            boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                            borderRadius: '2px'
                        }}>
                            ОК
                        </Button>
                    </Stack>
                </Box>
            </BasicModal>
        </Box>
    )
}