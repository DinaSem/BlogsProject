import * as React from 'react';
import s from './App1.module.css'
import {Route, Routes} from "react-router-dom";
import BlogsPage from "./blogs/BlogsPage";
import {PostsPage} from "./posts/PostsPage";
import Header from "./header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {BlogDetails} from "./blogs/blog/blogDetails/BlogDetails";
import Navbar from "./navbar/Navbar";
import {PostDetails} from "./posts/post/postDetails/PostDetails";
import {AddBlog} from "./blogs/blog/addBlog/AddBlog";
import {EditBlog} from "./blogs/blog/editBlog/EditBlog";


export default function App1() {

    return (

        <Container className={s.appWrapper} style={{
            padding: "0"
        }}>
            <Header/>
            <Box style={{
                display: "flex",
                justifyContent: "center",
                minHeight: '100%',
                boxSizing: "border-box",
                width: '100%',
                padding: '63px 0 0 0 ',
                backgroundColor: '#f6f2f2'
            }}>

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
                <Box style={{
                    flex: '5 0 auto',
                    boxSizing: "border-box",
                    maxWidth: '80%',
                    backgroundClip: 'content-box',
                }}>
                    <Box component="main"
                         style={{
                             backgroundColor: '#f6f2f2',
                             width: '100%'
                         }}>
                        <Routes>
                            <Route path='/' element={<BlogsPage/>}/>
                            <Route path='/posts/' element={<PostsPage/>}/>
                            <Route path='blog/:id' element={<BlogDetails/>}/>
                            <Route path='/addblog/' element={<AddBlog/>}/>
                            <Route path='/editblog/:id/' element={<EditBlog/>}/>
                            <Route path='posts/post/:id' element={<PostDetails/>}/>
                        </Routes>
                    </Box>
                </Box>
            </Box>
        </Container>

    );
}
