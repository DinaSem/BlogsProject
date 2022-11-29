import React, {useEffect} from 'react';
import s from './postsPage.module.css'
import {Post} from "./post/Post";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Search from "../searchPanel/Search";
import {SelectComp} from "../searchPanel/SelectComp";
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";
import {fetchPostsTC} from "./post-reducer";
import {useAppDispatch, useAppSelector} from "../hooks";
import {Blog} from "../blogs/blog/Blog";

const someText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores delectus eius fuga minus officia porro reiciendis, sapiente? Cumque, quae.'

export const PostsPage = () => {
    const posts = useAppSelector(state => state.posts.postsData)

    const postsComponents = posts.items?.map((p) => <Post key={p.id}
                                                          id={p.id}
                                                          postTitle={p.title}
                                                          blogName={p.blogName}
                                                          created={p.createdAt}/>)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPostsTC({
                // pageNumber,
                // pageSize,
                // searchNameTerm:'fg'
            }
        ))
    }, [dispatch])
    console.log(posts)

    return (
        <Container style={{maxWidth: '100%',height: '100%', }} className={s.wrapper}>

            <h2>Posts</h2>

            <div style={{display: 'flex', margin:'30px 0'}}>
                <Search/>
                <SelectComp/>
            </div>
            <div style={{
                display: "flex",
                gap: '20px',
                flexWrap: 'wrap',
                justifyContent: "center",
                alignItems: "center"
            }}>{postsComponents}</div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                margin: '30px 0',
                backgroundColor: '#f6f2f2',
                width: '100%'
            }}>
                <Button variant="outlined" style={{width: '153px', color: "black", border: '1px solid black',}}>
                    Show more
                    <KeyboardArrowDownIcon/>
                </Button>
            </div>
        </Container>
    );
};
