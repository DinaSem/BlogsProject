import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useAppDispatch} from "../../hooks";
import {changeBlogTC} from "../../blogs/blogs-reducer";
import {removePostTC} from "../../posts/post-reducer";

type PropsType = {
    postId: string
}

export const ActionsForPosts = (props: PropsType) => {
    const dispatch = useAppDispatch()

    const onClickDeletePostHandler = () => {
        dispatch(removePostTC(props.postId))
    }
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
            <div onClick={onClickDeletePostHandler} style={{cursor: 'pointer'}}>
                <DeleteOutlineIcon style={{margin: '-4px 4px'}}/>
                Delete
            </div>
            <div onClick={onClickEditPostHandler} style={{cursor: 'pointer'}}>
                <EditOutlinedIcon style={{margin: '-4px 4px'}}/>
                Edit
            </div>
        </div>
    );
};
