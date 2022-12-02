import React, {useState} from 'react';
import s from './blog.module.css'
import image from '../../pictures/noimage.jpg'
import {useNavigate} from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Actions} from "../../modal windows/actons/Actions";

type PropsType={
    blogName:string,
    id:string,
    websiteUrl:string
    description:string
}

export const Blog = (props:PropsType) => {
    const[showActions, setShowActions]=useState(false)


    const navigate = useNavigate()
    const navigateByBlog = () => {
        navigate(`blog/${props.id}`)
    }
    const onClickShowActions = () => {
        setShowActions(!showActions)
    }

    return (
        <div className={s.wrapper}>
            <img src={image} className={s.blogsImg}/>
            <div style={{width:"100%"}}>
                <div onClick={navigateByBlog} style={{cursor:"pointer"}}>
                    <h2>{props.blogName}</h2>
                </div>
                <p>Website:{props.websiteUrl}</p>
                <p>{props.description}</p>
            </div>
            <MoreVertIcon onClick={onClickShowActions} style={{margin:'10px'}}/>
            {showActions && <Actions blogId={props.id} blogName={props.blogName}/>}
        </div>
    );
};
