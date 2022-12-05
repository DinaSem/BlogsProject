import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {DeleteBlogModal} from "../blogs modal/delete blog modal/DeleteBlogModal";
import {Link} from "react-router-dom";

type PropsType = {
    blogId: string
    blogName:string
    showActions:boolean
    setShowActions:(showActions:boolean)=>void
}

export const Actions = (props: PropsType) => {

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
