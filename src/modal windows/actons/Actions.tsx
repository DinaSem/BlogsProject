import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useAppDispatch} from "../../hooks";
import {changeBlogTC} from "../../blogs/blogs-reducer";
import {DeleteBlogModal} from "../blogs modal/delete blog modal/DeleteBlogModal";
import {Link, Navigate, useNavigate} from "react-router-dom";

type PropsType = {
    blogId: string
    blogName:string
    showActions:boolean
    setShowActions:(showActions:boolean)=>void
}

export const Actions = (props: PropsType) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onClickEditBlogHandler = () => {
        // dispatch(changeBlogTC(
        //     props.blogId,
        //     'New Blog name',
        //     'www.newUrl', 'Новое описание при редакировани описания блога. Как-то так'
        // ))
        navigate(`editblog`)
        // <Navigate to={`editblog`} />
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
            <DeleteBlogModal blogId={props.blogId} blogName={props.blogName} showActions={props.showActions} setShowActions={props.setShowActions}/>
            <Link to={`/editblog/${props.blogId}`}>
                <div style={{cursor: 'pointer'}}>
                    <EditOutlinedIcon style={{margin: '-4px 4px'}}/>
                    Edit
                </div>
            </Link>
        </div>
    );
};
