import React from 'react';
import {DeletePostModal} from "../posts modal/delete post modal/DeletePostModal";
import {EditPostModal} from "../posts modal/edit post modal/EditPostModal";
import {BlogType} from "../../api/blogs-api";

type PropsType = {
    postId: string
    postTitle:string
    showActions:boolean
    setShowActions:(showActions:boolean)=>void
    content:string
    shortDescription:string
    blogs:BlogType[]
    blogName: string

}

export const ActionsForPosts = (props: PropsType) => {


    return (
        <div style={{
            width: '149px',
            height: '84px',
            background: '#FCFBFB',
            position: 'absolute',
            alignItems: 'center',
            display: "grid",
            right: 0,
            top: '20%'
        }}>
            <DeletePostModal postId={props.postId}
                             postTitle={props.postTitle}
                             showActions={props.showActions}
                             setShowActions={props.setShowActions}/>
            <EditPostModal postId={props.postId}
                           postTitle={props.postTitle}
                           showActions={props.showActions}
                           setShowActions={props.setShowActions}
                           content={props.content}
                           shortDescription={props.shortDescription}
                           blogs={props.blogs}
                           blogName={props.blogName} />
        </div>
    );
};
