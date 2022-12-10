import React, {useEffect, useState} from 'react';
import s from './blogDetails.module.css'
import image from '../../../pictures/noimage.jpg'
import CustomSeparator from "../../../BreadcrumbsCustom";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Post} from "../../../posts/post/Post";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {fetchBlogDetailsAndPostsTC, fetchBlogDetailsTC, fetchBlogsTC} from "../../blogs-reducer";
import {useParams} from 'react-router-dom';
import {fetchPostsTC} from "../../../posts/post-reducer";


export const BlogDetails = () => {
    const [fullText, setFulText] = useState(false)
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const blog = useAppSelector(state => state.blogs.blog)
    const postsOfBlogs = useAppSelector(state => state.blogs.blogsPostsData)
    const blogs = useAppSelector(state => state.blogs.blogsData.items)


    const postsComponents = postsOfBlogs.items?.map((p) => <Post key={p.id}
                                                                 id={p.id}
                                                                 postTitle={p.title}
                                                                 blogName={p.blogName}
                                                                 created={p.createdAt} content={p.content}
                                                                 shortDescription={p.shortDescription} blogs={blogs}/>)


    useEffect(() => {
        if (id) {
            dispatch(fetchBlogDetailsTC(id))
            dispatch(fetchBlogDetailsAndPostsTC(id))

        }
    }, [dispatch, id,])

    useEffect(() => {
        dispatch(fetchBlogsTC({}))
        dispatch(fetchPostsTC())
    }, [])


    return (
        <div className={s.blogsDetailsWrapper}>

            <CustomSeparator/>

            <img src={image} className={s.blogsDetailsImg}/>
            <div className={s.wrapper}>

                <img src={image} className={s.blogsImg}/>
                <div>
                    <h2>{blog.name}</h2>

                    <p>Blog creation date: {blog.createdAt}</p>
                    {blog.websiteUrl}
                    {/*{fullText*/}
                    {/*    ? <p>{someText}</p>*/}
                    {/*    : <p>{someText.split(' ').slice(0, 50).join(' ')} ...</p>*/}
                    {/*}*/}
                </div>
            </div>
            {!fullText &&
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: '30px',
                    backgroundColor: '#f6f2f2',
                    width: '100%'
                }}>
                    <Button style={{width: '153px', color: "black"}} onClick={() => setFulText(true)}>
                        Show more
                        <KeyboardArrowDownIcon/>
                    </Button>
                </div>
            }
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
        </div>
    );
};
