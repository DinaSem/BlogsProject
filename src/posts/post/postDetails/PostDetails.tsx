import React, {useEffect} from 'react';
import CustomSeparator from "../../../BreadcrumbsCustom";
import s from './postDetails.module.css'
import image from '../../../pictures/noimage.jpg'
import Box from '@mui/material/Box/Box';
import Container from "@mui/material/Container";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchPostDetailsTC} from "../../post-reducer";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useNavigate} from 'react-router-dom';

export const PostDetails = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const post = useAppSelector(state => state.posts.post)


    // console.log('POST DETAILS (ID): ',id)
    const navigateToAllPosts = ()=> {
        navigate(`/posts/`)
    }

    useEffect(() => {
        if(id){
            dispatch(fetchPostDetailsTC(id))
        }
    }, [dispatch, id])

    // console.log('post',post)


    return (
        <Container className={s.postDetailsWrapper}>
            <CustomSeparator />
            <div style={{display:"flex",margin:'20px 0'}} onClick={navigateToAllPosts}>
                <KeyboardBackspaceIcon fontSize='small'/>
                <span><b>Back to posts</b></span></div>
            <Box style={{display: 'flex'}}>
                <img src={image} alt="" style={{width: '48px', height: '48px', borderRadius: '50px', margin:'10px'}}/>
                <h4>{post.blogName}</h4>
            </Box>

            <h2>{post.title}</h2>
            <p>{post.createdAt}</p>
            <img src={image} className={s.postDetailsImg}/>
            <Box className={s.wrapper}>

                <p>{post.content}</p>
            </Box>
        </Container>
    );
};

