import * as React from 'react';
import {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import s from './blogs.module.css'
import {SelectComp} from "../searchPanel/SelectComp";
import Search from '../searchPanel/Search';
import {Blog} from "./blog/Blog";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {addBlogTC, fetchBlogsTC} from "./blogs-reducer";
import {useAppDispatch, useAppSelector} from "../hooks";

export default function BlogsPage() {
    const pageNumber = useAppSelector(state => state.blogs.pageNumber)
    const pageSize = useAppSelector(state => state.blogs.pageSize)
    const searchNameTerm = useAppSelector(state => state.blogs.searchNameTerm)
    const sortDirection = useAppSelector(state => state.blogs.sortDirection)
    const blogs = useAppSelector(state => state.blogs.blogsData)
    const [currentPage, setCurrentPage] = useState(pageNumber)


    const dispatch = useAppDispatch()

    const blogsComponents = blogs.items?.map((b) => <Blog key={b.id}
                                                          id={b.id}
                                                          blogName={b.name}
                                                          websiteUrl={b.websiteUrl}
                                                          description={b.description}/>)
    const onClickShowMoreHandler = () => {
        // dispatch(increasePageNumber(pageNumber))
        setCurrentPage(currentPage+1)
    }
    const onClickAddBlogHandler = () => {
      dispatch(addBlogTC('New Blog5', 'Очень-очень интересный блог с каким-то контентом', 'www.rutube.ru'))
        dispatch(fetchBlogsTC({}))
    }

    useEffect(() => {
        dispatch(fetchBlogsTC({
                pageNumber:currentPage,
                //pageSize:currentPage,
            // pageSize:20,
                //searchNameTerm,
            sortDirection,
            }
        ))
    }, [dispatch, searchNameTerm, pageSize,pageNumber,currentPage,sortDirection])
    console.log('sortDirection', sortDirection)

    return (
        <Container style={{maxWidth: '100%', height: '100%',}} className={s.wrapper}>
            <h1>Blogs</h1>
            <div style={{display: 'flex', margin: '20px 0'}}>
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
                <Button variant="outlined" style={{width: '153px', color: "black", border: '1px solid black',}}
                        onClick={onClickShowMoreHandler} disabled={blogs.pagesCount===currentPage&&true}>
                        {/*onClick={onClickShowMoreHandler} disabled={true}>*/}
                    Show more
                    <KeyboardArrowDownIcon/>
                </Button>
            </div>
        </Container>
    );
}
