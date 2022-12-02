import React, {useState} from 'react';
import {Button, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useAppDispatch} from "../../../hooks";
import {BasicModal} from "../../basic modal/BasicModal";
import Box from "@mui/material/Box";
import {removeBlogTC} from "../../../blogs/blogs-reducer";

type PropsType = {
    blogId: string
    blogName:string
    showActions:boolean
    setShowActions:(showActions:boolean)=>void
}
export const DeleteBlogModal = ({blogId,blogName,showActions,setShowActions}: PropsType) => {

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
        closeActionWindow()
    }

    const dispatch = useAppDispatch()

    //Закрыте окошка с удаление-редактирование
    const closeActionWindow = () => {
        setShowActions(!showActions)
    }
    const handleBlogDelete = () => {
        dispatch(removeBlogTC(blogId))
        handleClose()
        closeActionWindow()
    }

    return (
        <Box style={{display: 'inline-block'}}>

            <Box style={{cursor: 'pointer'}} onClick={handleOpen}>
                <DeleteOutlineIcon style={{margin: '-4px 4px'}}/>
                Delete
            </Box>
            <BasicModal title={'Delete a blog'}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}>
                <div>
                    <Typography id="modal-modal-title" variant="h6" component="h6"
                                margin={'8px'}>
                        Are you sure you want to delete this blog <b>{blogName}</b>?
                    </Typography>
                    <Stack direction="row" spacing={2} style={{width: '100%'}} justifyContent={'space-between'}>
                        <Button onClick={handleClose} style={{
                            width: '124px',
                            color: "white",
                            border: '1px solid black',
                            background: '#F8346B',
                            boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                            borderRadius: '2px'
                        }}>
                                No
                        </Button>
                        <Button onClick={handleBlogDelete} style={{
                            width: '124px',
                            color: "#F8346B",
                            background: '#FCFBFB',
                            borderRadius: '2px',
                            border: '1px solid #F8346B',
                        }}>
                            Yes
                        </Button>
                    </Stack>
                </div>
            </BasicModal>
        </Box>
    )
}