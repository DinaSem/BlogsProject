import React, {useEffect} from 'react';
import s from './postsPage.module.css'
import {Post} from "./post/Post";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Search from "../searchPanel/Search";
import {SelectComp} from "../searchPanel/SelectComp";
import Container from "@mui/material/Container";
import {addPostTC, fetchPostsTC} from "./post-reducer";
import {useAppDispatch, useAppSelector} from "../hooks";

const someText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores delectus eius fuga minus officia porro reiciendis, sapiente? Cumque, quae.'

export const PostsPage = () => {
    const posts = useAppSelector(state => state.posts.postsData)

    const postsComponents = posts.items?.map((p) => <Post key={p.id}
                                                          id={p.id}
                                                          postTitle={p.title}
                                                          blogName={p.blogName}
                                                          created={p.createdAt}/>)

    const dispatch = useAppDispatch()
    const onClickAddPostHandler = () => {
        dispatch(addPostTC('63867a24a97761cd307304c9','new post3', 'new description for new post', 'new content for new post'))
        dispatch(fetchPostsTC({}))
    }

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
        <Container style={{maxWidth: '100%',minHeight: '100vh', }} className={s.wrapper}>

            <h2>Posts</h2>

            <div style={{display: 'flex', margin:'30px 0'}}>
                <Search/>
                <SelectComp/>
            </div>
            <div style={{display:"flex",justifyContent:"end", margin:"20px 0 "}}>
                <Button variant="outlined" style={{
                    width: '153px',
                    color: "white",
                    border: '1px solid black',
                    background: '#F8346B',
                    boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                    borderRadius: '2px'
                }}
                        onClick={onClickAddPostHandler}>
                    {/*onClick={onClickShowMoreHandler} disabled={true}>*/}
                    Add post
                </Button>
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
