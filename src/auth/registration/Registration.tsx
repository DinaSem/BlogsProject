import React, {useCallback, useEffect, useState} from "react";
import {FormControl, FormGroup, FormLabel, Grid, IconButton, InputAdornment, Paper, TextField} from "@mui/material";
import {FormikErrors, useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import authpicture from '../../pictures/auth.png'
import Box from "@mui/material/Box";
import {registrationTC} from "../auth-reducer";
import {RegistrationModal} from "../../modal windows/auth modal/RegistrationModal";
import s from './registration.module.css'

export type ValuesType = {
    login: string;
    email: string;
    password: string;
}
type FormikErrorType = {
    login?: string;
    email?: string;

    password?: string;
}

export const Registration = () => {
    const [emailAddress, setEmail] = useState('')
    const [note, showNote] = useState('')

    const dispatch = useAppDispatch();
    //const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            password: '',
        },

        validate: (values: ValuesType) => {
            let errors: FormikErrors<FormikErrorType> = {};

            if (!values.login) {
                errors.login = 'Required';
            } else if (values.login.length < 3) {
                errors.login = 'Login cannot be less than 3 characters';
            } else if (values.login.length > 10) {
                errors.login = 'Login cannot be more than 10 characters';
            }

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = "Password cannot be less than 6 characters...";
            } else if (values.password.length > 20) {
                errors.password = "Password cannot be more than 20 characters...";
            }

            return errors;
        },

        onSubmit: values => {
            formik.resetForm();
            dispatch(registrationTC(values));
            setEmail(values.email)
            showNote('The link has been sent by email If you don’t receive an email, send link again')
        },
    });

    let [password, showPassword] = useState(false);
    // let [confirmPassword, showConfirmPassword] = useState(false);

    const handleClickShowPassword = useCallback(() => {
        showPassword(true);
    }, [showPassword])
    const handleMouseDownPassword = useCallback(() => {
        showPassword(false);
    }, [showPassword])
    // const handleClickShowConfirmPassword = useCallback(() => {
    //     showConfirmPassword(true);
    // }, [showConfirmPassword])
    // const handleMouseDownConfirmPassword = useCallback(() => {
    //     showConfirmPassword(false);
    // }, [showConfirmPassword])

    const signUp = useAppSelector(state => state.auth.signUp);

    useEffect(() => {
        if (signUp) {
            // navigate(LOGIN)
        }
    }, [signUp])


    return (
        <Box className={s.registrationWrapper}>
            <Grid width={"378px"}>
                <Paper elevation={14} className={s.registration_registrationForm_wrapper}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl className={s.registration_registrationForm_label}>
                            <FormLabel style={{marginBottom: '30px'}}>
                                <h2>Sign Up</h2>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Username"
                                    variant="standard"
                                    error={!!(formik.touched.login && !!formik.errors.login)}
                                    helperText={formik.touched.login && !!formik.errors.login ? formik.errors.login : " "}
                                    {...formik.getFieldProps("login")}
                                />
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    type={'email'}
                                    error={!!(formik.touched.email && !!formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : " "}
                                    {...formik.getFieldProps("email")}

                                />
                                <TextField
                                    label="Password"
                                    type={password ? 'text' : 'password'}
                                    variant="standard"
                                    error={!!(formik.touched.password && !!formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password ? formik.errors.password : " "}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {password ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>,
                                    }}
                                    {...formik.getFieldProps("password")}
                                />
                                <Box style={{minHeight: '50px', color:'#797476',fontWeight: '400', fontSize: '14px',
                                    lineHeight: '24px', textAlign:"left", alignContent:"center"}}>
                                    {note}
                                </Box>
                                {JSON.stringify(formik.errors).length === 2
                                && JSON.stringify(formik.values.login).length === 0
                                && JSON.stringify(formik.values.email).length === 0
                                && JSON.stringify(formik.values.password).length === 0
                                    ? <RegistrationModal email={emailAddress} disabled={true}/>
                                    : <RegistrationModal email={emailAddress} disabled={false}/>
                                }
                            </FormGroup>
                            <FormLabel>
                                <p style={{color: "gray"}}>Already a member?</p>
                                <h4><NavLink to={'/'} style={{color: 'blue', marginBottom: '0px'}}>Sign In</NavLink>
                                </h4>
                            </FormLabel>
                        </FormControl>

                    </form>
                </Paper>
            </Grid>
            <Box>
                <img src={authpicture} alt="" style={{width: '632px', height: '470px'}}/>
            </Box>
        </Box>
    )
}


