import React, {useState} from 'react';
import s from './post.module.css'
import image from '../../pictures/noimage.jpg'
import {useNavigate} from 'react-router-dom';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Actions} from "../../modal windows/actons/Actions";
import {ActionsForPosts} from "../../modal windows/actons/ActionsForPosts";

const someText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores delectus eius fuga minus officia porro reiciendis, sapiente? Cumque, quae.'

type PropsType = {
    id: string,
    postTitle: string,
    blogName: string
    created: string
}

export const Post = (props: PropsType) => {
    const[showActions, setShowActions]=useState(false)
    const navigate = useNavigate()
    const onClickShowActions = () => {
        setShowActions(true)
    }

    const navigateByPost = () => {
        navigate(`post/${props.id}`)
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
                {showActions && <ActionsForPosts postId={props.id}/>}
            </div>
        </div>
    );
};
