import React, {useEffect, useState} from "react";
import {useFormik} from 'formik';
import authpicture from '../pictures/auth.png'

import {Navigate, NavLink} from 'react-router-dom';
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../hooks";
import Box from "@mui/material/Box";
import {loginTC} from "./auth-reducer";


type FormikErrorType = {
    loginOrEmail?: string
    password?: string
}
type FormikValuesType = {
    loginOrEmail?: string
    password?: string
}

const Login = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        // dispatch(changePasswordRecoveryStatusAC(false,""))
    }, [])
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const errorFromServer = useAppSelector(state => state.app.error)

    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const validate = (values: FormikValuesType) => {
        const errors: FormikErrorType = {};
        if (!values.loginOrEmail) {
            errors.loginOrEmail = 'Required';
        } else if (values.loginOrEmail.length < 3) {
            errors.loginOrEmail = 'Must be more then 3 symbols';
        }
        // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.loginOrEmail)) {
        //     errors.loginOrEmail = 'Invalid email address';
        // }


        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length < 3) {
            errors.password = 'Must be more then 3 symbols';
        } else if (values.password.length > 20) {
            errors.password = 'Must be less then 20 symbols';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            loginOrEmail: '',
            password: '',

        },
        validate,
        onSubmit: values => {
            dispatch(loginTC(values))
            // console.log(values)
            console.log(errorFromServer)
        },
    });
    if (isLoggedIn) {
        return <Navigate to={'blogs'}/>
    }
    return (
        <Box style={{display: "flex", justifyContent: 'space-around', marginTop: "72px", gap: "70px"}}>
            <Grid width={"378px"}>
                <Paper elevation={14} style={{padding: "29px 24px", maxHeight: "392px", maxWidth: '378px'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl fullWidth>
                            <FormLabel style={{textAlign: "center", marginBottom: '31px'}}>
                                <h2 style={{fontWeight: 500, fontSize: '20px', lineHeight: '24px', margin: '0'}}>
                                    Sign in
                                </h2>
                            </FormLabel>
                            <FormGroup style={{maxHeight: '300px'}}>
                                <TextField
                                    label="Email or Username"
                                    helperText={formik.touched.loginOrEmail && !!formik.errors.loginOrEmail ? formik.errors.loginOrEmail : " "}
                                    variant="standard"
                                    type="text"
                                    error={formik.touched.loginOrEmail && !!formik.errors.loginOrEmail}
                                    {...formik.getFieldProps('loginOrEmail')}
                                />
                                <TextField
                                    label="Password"
                                    helperText={formik.touched.password && !!formik.errors.password ? formik.errors.password : " "}
                                    variant="standard"
                                    type={showPassword ? 'text' : 'password'}
                                    error={formik.touched.password && !!formik.errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...formik.getFieldProps('password')}
                                />
                                {errorFromServer &&
                                    <span style={{color: 'red', fontSize: '12px'}}>The password or email or Username is incorrect. Please try again</span>}

                                <h6 style={{textAlign: 'right', margin: '20px'}}><NavLink to={'PASSWORD_RECOVERY'}
                                                                                          style={{
                                                                                              color: 'gray',
                                                                                              textDecoration: 'none'
                                                                                          }}>Forgot password?</NavLink>
                                </h6>
                                <Button type={'submit'} variant={'contained'}
                                        style={{color: 'white', background: '#F8346B', minWidth: '330px'}} fullWidth>
                                    Sign In
                                </Button>
                            </FormGroup>
                            <FormLabel style={{textAlign: "center"}}>
                                <h6 style={{
                                    margin: '20px',
                                    marginBottom: '10px',
                                    fontWeight: '400',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    textAlign: 'center',
                                    color: ' #797476',
                                }}>Don’t have an account?</h6>
                                <h5><NavLink to={'REGISTRATION'} style={{color: '#F8346B', margin: '7px'}}>Sign
                                    Up</NavLink></h5>
                            </FormLabel>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
            <Box>
                <img src={authpicture} alt="" style={{width: '632px', height: '460x'}}/>
            </Box>
        </Box>
    )
}

export default Login;