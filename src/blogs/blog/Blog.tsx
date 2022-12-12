import React, {useState} from 'react';
import s from './blog.module.css'
import image from '../../pictures/noimage.jpg'
import {useNavigate} from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Actions} from "../../modal windows/actons/Actions";
import {setCurrentBlogIdAC} from "../blogs-reducer";
import {useAppDispatch} from "../../hooks";
import Link from "@mui/material/Link";

type PropsType={
    blogName:string,
    id:string,
    websiteUrl:string
    description:string
}

export const Blog = (props:PropsType) => {
    const[showActions, setShowActions]=useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const navigateByBlog = () => {
        navigate(`/blog/${props.id}`)
        //записываю в стейт текущий id блога
        dispatch(setCurrentBlogIdAC(props.id))
    }
    const onClickShowActions = () => {
        setShowActions(!showActions)
    }


    return (
        <div className={s.wrapper}>
            <img src={image} className={s.blogsImg}/>
            <div style={{width:"100%",margin:'0 0 0 12px'}}>
                <div onClick={navigateByBlog} style={{cursor:"pointer"}}>
                    <h2 style={{margin:'0',
                        fontWeight: '600',
                        fontSize: '18px',
                        lineHeight: '24px',
                    }}>{props.blogName}</h2>
                </div>
                <p style={{marginTop:'5px'}}>Website:
                    <Link>{props.websiteUrl}</Link>
                </p>
                <p style={{marginTop:'25px'}}>{props.description}</p>
            </div>
            <MoreVertIcon onClick={onClickShowActions} style={{margin:'10px'}}/>
            {showActions && <Actions blogId={props.id} blogName={props.blogName} showActions={showActions} setShowActions={onClickShowActions}/>}
        </div>
    );
};
