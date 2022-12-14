import * as React from 'react';
import s from './App1.module.css'
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import BlogsPage from "../blogs/BlogsPage";
import {PostsPage} from "../posts/PostsPage";
import Header from "../header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {BlogDetails} from "../blogs/blog/blogDetails/BlogDetails";
import Navbar from "../navbar/Navbar";
import {PostDetails} from "../posts/post/postDetails/PostDetails";
import {AddBlog} from "../blogs/blog/addBlog/AddBlog";
import {EditBlog} from "../blogs/blog/editBlog/EditBlog";
import {CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks";
import {ErrorSnackbar} from "../common/ErrorSnackbar";
import Login from "../auth/login/Login";
import {Registration} from "../auth/registration/Registration";
import {RegistrationConformation} from "../auth/RegistrationConformation";
import {UsersPage} from "../users/UsersPage";
import {initializeAppTC} from "../auth/auth-reducer";
import {useEffect} from "react";
import {ProfilePage} from "../profile/ProfilePage";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

}
export default function App1() {
    //нету запросов
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const isInitialized = useAppSelector(state => state.auth.isInitialized)

    const dispatch = useAppDispatch()
     // const isLoggedIn = true;
    // if (isLoggedIn) {
    //     return <Navigate to={'/blogs'}/>
    // }
     useEffect(() => {
        dispatch(initializeAppTC());
    }, [isInitialized]);

    // if (!isInitialized) {
    //     return <Navigate to={'/'}/>
    // }
    return (

        <Container className={s.appWrapper} style={{
            padding: "0"
        }}>
            <Header/>
            <Box style={{
                display: "flex",
                justifyContent: "center",
                // boxSizing: "border-box",
                width: '100%',
                padding: '63px 0 0 0 ',
                backgroundColor: '#f6f2f2',
                minHeight: '100vh',
            }}>
                {isLoggedIn &&
                    <Box style={{
                        flex: '1 0 auto',
                        minHeight: '100%',
                        boxSizing: "border-box",
                        color: "black",
                        maxWidth: '20%',
                        backgroundClip: 'content-box',
                        position: "relative",
                        backgroundColor: '#FAF7F8',
                    }}>
                        <Navbar/>

                    </Box>
                }

                <Box style={{
                    flex: '5 0 auto',
                    boxSizing: "border-box",
                    maxWidth: '80%',
                    backgroundClip: 'content-box',
                }}>

                    <Box component="main"
                         style={{
                             backgroundColor: '#f6f2f2',
                             width: '100%',
                         }}>
                        {status==='loading' && <CircularProgress color="secondary" sx={style}/>}
                        <ErrorSnackbar/>
                        <Routes>
                            <Route path='/' element={<Login/>}/>
                            <Route path='/blogs' element={<BlogsPage/>}/>
                            <Route path='/posts/' element={<PostsPage/>}/>
                            <Route path='blog/:id' element={<BlogDetails/>}/>
                            <Route path='/addblog/' element={<AddBlog/>}/>
                            <Route path='/editblog/:id/' element={<EditBlog/>}/>
                            <Route path='/post/:id' element={<PostDetails/>}/>
                            <Route path='/registration' element={<Registration/>}/>
                            <Route path='/registration-confirmation' element={<RegistrationConformation/>}/>
                            <Route path='/users/' element={<UsersPage/>}/>
                            <Route path='/profile/' element={<ProfilePage/>}/>
                            <Route path='/registration-confirmation/:code' element={<RegistrationConformation/>}/>
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </Container>

    );
}
