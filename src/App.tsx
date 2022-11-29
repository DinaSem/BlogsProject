import * as React from 'react';
import s from './App.module.css'
import {Route, Routes} from "react-router-dom";
import BlogsPage from "./blogs/BlogsPage";
import {PostsPage} from "./posts/PostsPage";
import Navbar from "./navbar/Navbar";
import Header from "./header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Blog} from "./blogs/blog/Blog";
import {BlogDetails} from "./blogs/blog/blogDetails/BlogDetails";
import {BreakfastDining} from "@mui/icons-material";
import Breadcrumbs from "@mui/material/Breadcrumbs";

export default function App() {
    return (

        <Box className={s.appWrapper}>
            <Header/>
            <Container style={{maxWidth: '100%', position: "relative"}}>
                <Breadcrumbs/>
                <Box sx={{display: 'flex'}} style={{backgroundColor: '#FCFBFB', position: "relative"}}>
                    <Navbar/>
                    <Box component="main" sx={{flexGrow: 1, p: 3,}}
                         style={{backgroundColor: '#f6f2f2', margin: '-24px', marginTop: '30px', width: '100%'}}>
                        <Routes>
                            <Route path='/' element={<BlogsPage/>}/>
                            <Route path='posts' element={<PostsPage/>}/>
                            <Route path='blog' element={<BlogDetails/>}/>
                        </Routes>
                    </Box>
                </Box>
            </Container>
        </Box>

    );
}
