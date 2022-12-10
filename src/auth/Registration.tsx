import React, {useCallback, useEffect, useState} from "react";
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid, IconButton, Input, InputAdornment, InputLabel,
    Paper,
    TextField
} from "@mui/material";
import {FormikErrors, useFormik} from "formik";
import {Navigate, NavLink, useNavigate} from "react-router-dom";

import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../hooks";
import authpicture from '../pictures/auth.png'
import Box from "@mui/material/Box";



export type ValuesType = {
    email: string;
    password: string;
    confirmPassword: string;
}
type FormikErrorType   = {
    email?: string;
    password?: string;
    confirmPassword?: string;
}



const Registration = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: (values: ValuesType) => {
            let errors: FormikErrors<FormikErrorType> = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password || values.password.length === 0) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = "Зassword cannot be less than 8 characters...";
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match...';
            }

            return errors;
        },

        onSubmit: values => {
            formik.resetForm();
            // dispatch(registrationTC(values));
        },
    });

    let [password, showPassword] = useState(false);
    let [confirmPassword, showConfirmPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => {
        showPassword(true);
    }, [showPassword])
    const handleMouseDownPassword = useCallback(() => {
        showPassword(false);
    }, [showPassword])
    const handleClickShowConfirmPassword = useCallback(() => {
        showConfirmPassword(true);
    }, [showConfirmPassword])
    const handleMouseDownConfirmPassword = useCallback(() => {
        showConfirmPassword(false);
    }, [showConfirmPassword])

    const signUp = useAppSelector(state => state.auth.signUp);

    useEffect(() => {
        if (signUp) {
            // navigate(LOGIN)
        }
    }, [signUp])


    return (
        <Box style={{display:"flex",  justifyContent:'space-around', marginTop:"75px"}} >
            <Grid  textAlign={"center"} width={"378px"}>
                <Paper elevation={14} style={{padding: "30px", height:"392px"}}>
                    <form onSubmit={formik.handleSubmit} >
                        <FormControl text-align={'center'} fullWidth>
                            <FormLabel>
                                <h2>Sign Up</h2>
                            </FormLabel>
                            <FormGroup >
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    error={formik.touched.email && !!formik.errors.email ? true : false}
                                    helperText={formik.touched.email && !!formik.errors.email ? formik.errors.email : " "}
                                    {...formik.getFieldProps("email")}
                                />
                                <TextField
                                    label="Password"
                                    type={password ? 'text' : 'password'}
                                    variant="standard"
                                    error={formik.touched.password && !!formik.errors.password ? true : false}
                                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : " "}
                                    InputProps={{endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {password ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                    {...formik.getFieldProps("password")}
                                />
                                <TextField
                                    label="Confirm password"
                                    variant="standard"
                                    type={confirmPassword ? 'text' : 'password'}
                                    error={formik.touched.confirmPassword && !!formik.errors.confirmPassword ? true : false}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : " "}
                                    InputProps={{endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                            >
                                                {confirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                    {...formik.getFieldProps("confirmPassword")}

                                />

                                {JSON.stringify(formik.errors).length === 2
                                    ? <Button type={'submit'} variant={'contained'} style={{color:'white', background:'#F8346B'}}>
                                        Sign Up
                                    </Button>
                                    : <Button disabled type={'submit'} variant={'contained'} style={{color:'white', background:'#F8346B'}}>
                                        Sign Up
                                    </Button>}

                            </FormGroup>
                            <FormLabel>
                                <h6 style={{color: "gray"}}>Already a member?</h6>
                                <h4><NavLink to={'login'} style={{color: 'blue'}}>Sign In</NavLink></h4>
                            </FormLabel>
                        </FormControl>
                    </form>
                </Paper>
            </Grid>
            <Box>
                <img src={authpicture} alt="" style={{width:'632px', height:'433.64px'}}/>
            </Box>
        </Box>
    )
}

export default Registration;
