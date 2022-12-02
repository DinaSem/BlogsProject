import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useAppDispatch} from "../../hooks";
import {changeBlogTC, removeBlogTC} from "../../blogs/blogs-reducer";
import {DeletePackModal} from "../blogs modal/delete blog modal/DeleteBlogModal";

type PropsType = {
    blogId: string
    blogName:string
}

export const Actions = (props: PropsType) => {
    const dispatch = useAppDispatch()

    const onClickEditBlogHandler = () => {
        dispatch(changeBlogTC(
            props.blogId,
            'New Blog name',
            'www.newUrl', 'Новое описание при редакировани описания блога. Как-то так'
        ))
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
            <DeletePackModal blogId={props.blogId} blogName={props.blogName}/>
            <div onClick={onClickEditBlogHandler} style={{cursor: 'pointer'}}>
                <EditOutlinedIcon style={{margin: '-4px 4px'}}/>
                Edit
            </div>
        </div>
    );
};
