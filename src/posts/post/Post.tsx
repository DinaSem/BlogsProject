import React from 'react';
import s from './post.module.css'
import image from '../../pictures/noimage.jpg'
import {useNavigate} from 'react-router-dom';

const someText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores delectus eius fuga minus officia porro reiciendis, sapiente? Cumque, quae.'

type PropsType = {
    id:string,
    postTitle:string,
    blogName:string
    created:string
}

export const Post = (props:PropsType) =>{

const navigate = useNavigate()
const navigateByPost = () => {
    navigate(`post/${props.id}`)
}
    return (
        <div className={s.postWraper} onClick={navigateByPost}>
            <img src={image} alt="" className={s.postImg}/>
            <h5>{props.postTitle}</h5>
            <p>{props.blogName}</p>
            {/*<p>{someText.split('').slice(0, 50).join('')}...</p>*/}
            <p>{props.created}</p>
        </div>
    );
};
