import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useAppDispatch} from "../../hooks";
import {changeBlogTC} from "../../blogs/blogs-reducer";
import {removePostTC} from "../../posts/post-reducer";
import {DeleteBlogModal} from "../blogs modal/delete blog modal/DeleteBlogModal";
import {DeletePostModal} from "../posts modal/delete post modal/DeletePostModal";

type PropsType = {
    postId: string
    postTitle:string
    showActions:boolean
    setShowActions:(showActions:boolean)=>void
}

export const ActionsForPosts = (props: PropsType) => {
    const dispatch = useAppDispatch()

    // const onClickDeletePostHandler = () => {
    //     dispatch(removePostTC(props.postId))
    // }
    const onClickEditPostHandler = () => {
        dispatch(changeBlogTC(props.postId, 'New Blog name', 'www.newUrl', 'Новое описание при редакировани описания блога. Как-то так'))
    }
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
            {/*<div onClick={onClickDeletePostHandler} style={{cursor: 'pointer'}}>*/}
            {/*    <DeleteOutlineIcon style={{margin: '-4px 4px'}}/>*/}
            {/*    Delete*/}
            {/*</div>*/}
            <DeletePostModal postId={props.postId} postTitle={props.postTitle} showActions={props.showActions} setShowActions={props.setShowActions}/>

            <div onClick={onClickEditPostHandler} style={{cursor: 'pointer'}}>
                <EditOutlinedIcon style={{margin: '-4px 4px'}}/>
                Edit
            </div>
        </div>
    );
};
