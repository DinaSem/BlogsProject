import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import s from './blogs.module.css'
import {SelectComp} from "../searchPanel/SelectComp";
import {Search} from '../searchPanel/Search';
import {Blog} from "./blog/Blog";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {fetchBlogsTC, setPageNumberOfBlogsAC} from "./blogs-reducer";
import {useAppDispatch, useAppSelector} from "../hooks";
import {Navigate, useNavigate} from "react-router-dom";

export default function BlogsPage() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const pageNumber = useAppSelector(state => state.blogs.params.pageNumber)
    const pageSize = useAppSelector(state => state.blogs.params.pageSize)
    const searchNameTerm = useAppSelector(state => state.blogs.params.searchNameTerm)
    const sortDirection = useAppSelector(state => state.blogs.params.sortDirection)
    const sortBy = useAppSelector(state => state.blogs.params.sortBy)
    const blogs = useAppSelector(state => state.blogs.blogsData)
    const [currentPage, setCurrentPage] = useState(pageNumber)


    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const blogsComponents = blogs.items?.map((b) => <Blog key={b.id}
                                                          id={b.id}
                                                          blogName={b.name}
                                                          websiteUrl={b.websiteUrl}
                                                          description={b.description}/>)

    const onClickShowMoreHandler = () => {
        dispatch(setPageNumberOfBlogsAC(pageNumber+1))
    }


    const onClickAddBlogHandler = () => {
        navigate(`/addblog`)

    }

    useEffect(() => {
        if (!blogs) return
        dispatch(setPageNumberOfBlogsAC(1))
    }, [])

    useEffect(() => {
        dispatch(fetchBlogsTC())
    }, [dispatch, searchNameTerm, pageSize, pageNumber, sortDirection, sortBy])



    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Container
            style={{maxWidth: '940px', minHeight: '100vh', paddingLeft: '0', paddingRight: '0', margin: '29px 20px'}}
            className={s.wrapper}>
            <h3>Blogs</h3>
            <div>
                <div style={{display: 'flex', margin: '26px 0'}}>
                    <Search/>
                    <SelectComp/>
                </div>

                <div style={{display: "flex", justifyContent: "end", margin: "20px 0 "}}>
                    <Button variant="outlined" style={{
                        width: '153px',
                        color: "white",
                        border: '1px solid black',
                        background: '#F8346B',
                        boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                        borderRadius: '2px'
                    }}
                            onClick={onClickAddBlogHandler}>
                        {/*onClick={onClickShowMoreHandler} disabled={true}>*/}
                        Add blog
                    </Button>

                </div>

                <div>{blogsComponents}</div>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: '30px',
                    backgroundColor: '#f6f2f2',
                    width: '100%'
                }}>
                    <Button variant="outlined" style={{width: '153px', color: "black", border: '1px solid black'}}
                            onClick={onClickShowMoreHandler}
                            disabled={blogs.pagesCount === pageNumber && true}
                    >
                        {/*onClick={onClickShowMoreHandler} disabled={true}>*/}
                        Show more
                        <KeyboardArrowDownIcon/>
                    </Button>
                </div>
            </div>
        </Container>
    );
}
