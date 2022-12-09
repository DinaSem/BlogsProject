import React, {useState} from 'react';
import s from './post.module.css'
import image from '../../pictures/noimage.jpg'
import {useNavigate} from 'react-router-dom';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Actions} from "../../modal windows/actons/Actions";
import {ActionsForPosts} from "../../modal windows/actons/ActionsForPosts";
import {BlogType} from "../../api/blogs-api";

type PropsType = {
    id: string,
    postTitle: string,
    blogName: string
    created: string
    content:string
    shortDescription:string
    blogs:BlogType[]
}

export const Post = (props: PropsType) => {
    const[showActions, setShowActions]=useState(false)
    const navigate = useNavigate()
    const onClickShowActions = () => {
        setShowActions(true)
    }

    const navigateByPost = () => {
        navigate(`/post/${props.id}/`)
    }
    return (
        <div className={s.postWrapper} >
            <img src={image} alt="" className={s.postImg}/>
            <div style={{display:'flex', position:"relative"}} >
                <img src={image} style={{width:'48px', height:'48px', borderRadius:'50%'}}/>

                <div onClick={navigateByPost}>
                    <h5>{props.postTitle}</h5>
                    <p>{props.blogName}</p>
                    {/*<p>{someText.split('').slice(0, 50).join('')}...</p>*/}
                    <p>{props.created}</p>
                </div>
                <MoreVertIcon onClick={onClickShowActions}/>
                {showActions && <ActionsForPosts postId={props.id}
                                                 postTitle={props.postTitle}
                                                 showActions={showActions}
                                                 setShowActions={setShowActions}
                                                 content={props.content}
                                                 shortDescription={props.shortDescription}
                                                 blogs={props.blogs}
                                                 blogName={props.blogName}/>}
            </div>
        </div>
    );
};
