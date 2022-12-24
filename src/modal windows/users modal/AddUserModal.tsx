import React, {useCallback, useEffect, useState} from 'react';
import {
    Autocomplete,
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import {FormikErrors, useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../hooks";
import { BasicModal } from '../basic modal/BasicModal';
import {UserType} from "../../api/users-api";
import {useNavigate} from "react-router-dom";
import {registrationTC} from "../../auth/auth-reducer";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {addUserTC, fetchUsersTC} from "../../users/users-reducer";

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

// type PropsType = {
//     users: UserType[]
//
// }


export const AddUserModal = () => {
    const [emailAddress, setEmail]=useState('')

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useAppSelector(state => state.users.usersData.items)
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            email: '',
            password: '',
        },

        validate: (values: ValuesType) => {
            let errors: FormikErrors<FormikErrorType> = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.login) {
                errors.login = 'Required';
            } else if (values.login.length < 3) {
                errors.login = 'Login cannot be less than 3 characters';
            } else if (values.login.length > 10) {
                errors.login = 'Login cannot be more than 10 characters';
            }

            if (!values.password || values.password.length === 0) {
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
            dispatch(addUserTC(values.login, values.password, values.email));
            handleClose()
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



    useEffect(() => {
        dispatch(fetchUsersTC())
    }, [dispatch])

    // @ts-ignore
    return (
        <Box style={{display: 'inline-block'}}>

            <Button variant="outlined" style={{
                width: '153px',
                color: "white",
                border: '1px solid black',
                background: '#F8346B',
                boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                borderRadius: '2px'
            }}
                    onClick={handleOpen}>
                Add user
            </Button>
            <BasicModal title={'Add user'}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>

                    <TextField
                        style={{width:'100%'}}
                        label="Specify: Email of the user"
                        variant="standard"
                        type={'email'}
                        error={formik.touched.email && !!formik.errors.email ? true : false}
                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : " "}
                        {...formik.getFieldProps("email")}
                    />

                    <TextField
                        style={{width:'100%'}}
                        label="Username"
                        variant="standard"
                        error={formik.touched.login && !!formik.errors.login ? true : false}
                        helperText={formik.touched.login && !!formik.errors.login ? formik.errors.login : " "}
                        {...formik.getFieldProps("login")}
                    />

                    <TextField
                        style={{width:'100%'}}
                        label="Password"
                        type={password ? 'text' : 'password'}
                        variant="standard"
                        error={formik.touched.password && !!formik.errors.password ? true : false}
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

                    <div style={{display: "flex", justifyContent: "end", margin: "20px 0 "}}>
                        <Button variant="outlined"  type={'submit'} style={{
                            width: '153px',
                            color: "white",
                            border: '1px solid black',
                            background: '#F8346B',
                            boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                            borderRadius: '2px'
                        }}>
                            Add user
                        </Button>
                    </div>
                </form>
            </BasicModal>
        </Box>
    )
}