import React, {useEffect, useState} from 'react';
import s from './postsPage.module.css'
import {Post} from "./post/Post";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Search from "../searchPanel/Search";
import {SelectComp} from "../searchPanel/SelectComp";
import Container from "@mui/material/Container";
import {addPostTC, fetchPostsTC} from "./post-reducer";
import {useAppDispatch, useAppSelector} from "../hooks";
import {AddPostModal} from "../modal windows/posts modal/add post modal/AddPostModal";
import {fetchBlogsTC} from "../blogs/blogs-reducer";


export const PostsPage = () => {
    //посты рисуются от запроса на сервер
    //но прикол в том что посты зависят от блогов
    //т если мы перезагрузимся то блоги будут пустые данных не будет
    //нам надо надо позаботиться о данных
    //если их нету надо сделать запрос

    //если они есть то запрос игнорим

    const posts = useAppSelector(state => state.posts.postsData)
    const blogs = useAppSelector(state => state.blogs.blogsData.items)


    useEffect(() => {
        if (blogs && blogs.length > 0) return
        dispatch(fetchBlogsTC({}))
            }, [])
    const [showActions, setShowActions] = useState(false)

    const postsComponents = posts.items?.map((p) => <Post key={p.id}
                                                          id={p.id}
                                                          postTitle={p.title}
                                                          blogName={p.blogName}
                                                          created={p.createdAt} content={p.content}
                                                          shortDescription={p.shortDescription} blogs={blogs}/>)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchPostsTC({
                // pageNumber,
                // pageSize,
                // searchNameTerm:'fg'
            }
        ))
    }, [dispatch])
    // console.log(posts)

    return (
        <Container style={{maxWidth: '100%', minHeight: '100vh',}} className={s.wrapper}>

            <h2>Posts</h2>

            <div style={{display: 'flex', margin: '30px 0'}}>
                <Search/>
                <SelectComp/>
            </div>
            {blogs && blogs.length > 0 && <div style={{display: "flex", justifyContent: "end", margin: "20px 0 "}}>
                <AddPostModal blogs={blogs}/>
            </div>}
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
