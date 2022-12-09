import React, {useState} from 'react';
import {Button, FormControl, Input, InputLabel, TextField} from "@mui/material";
import {useAppDispatch} from "../../../hooks";
import {BasicModal} from "../../basic modal/BasicModal";
import Box from "@mui/material/Box";
import {FormikErrors, useFormik} from "formik";
import image from '../../../pictures/noimage.jpg'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {changePostTC} from "../../../posts/post-reducer";
import {BlogType} from "../../../api/blogs-api";
import {setCurrentBlogIdAC} from "../../../blogs/blogs-reducer";


type PropsType = {
    postId: string
    postTitle: string
    showActions: boolean
    setShowActions: (showActions: boolean) => void
    content: string
    shortDescription: string
    blogs: BlogType[]
    blogName: string
}
type FormikErrorType   = {
    title?: string,
    description?: string,
}

export const EditPostModal = ({blogName,
                                  blogs,
                                  postId,
                                  postTitle,
                                  shortDescription,
                                  content,
                                  showActions,
                                  setShowActions,
                              }: PropsType) => {

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)
    console.log(blogs)
    const currentBlog = blogs.find(b=>b.name===blogName)
    const handleClose = () => {
        setOpen(false)
        closeActionWindow()
    }

    const dispatch = useAppDispatch()

    //Закрыте окошка с удаление-редактирование
    const closeActionWindow = () => {
        setShowActions(!showActions)
    }


    const formik = useFormik({


        initialValues: {
            title: postTitle,
            description: content,

        },
        validate: values => {
            let errors: FormikErrors<FormikErrorType> = {};
            if (!values.title) {
                errors.title = 'Required'
            }
            if (!values.description) {
                errors.description = 'Required'
            }
            return errors;
        },
        onSubmit: values => {
            if(currentBlog){
                dispatch(setCurrentBlogIdAC(currentBlog.id))
            }
            dispatch(changePostTC(postId, values.title, 'short description', values.description))
            handleClose()
            // navigate(`/`)
        },

    });

    return (
        <Box style={{display: 'inline-block'}}>

            <Box onClick={handleOpen} style={{cursor: 'pointer'}}>
                <EditOutlinedIcon style={{margin: '-4px 4px'}}/>
                Edit
            </Box>
            <BasicModal title={'Edit post'}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}>
                <img src={image} alt="" style={{width: '180px', height: '108px'}}/>
                <form onSubmit={formik.handleSubmit}>

                    <FormControl fullWidth sx={{m: 1}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Post Name</InputLabel>
                        <Input
                            fullWidth
                            id="website"
                            name="title"
                            type="text"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && !!formik.errors.title ? true : false}
                            // helperText={formik.touched.title && formik.errors.title}
                            // {...formik.getFieldProps("title")}
                        />

                    </FormControl>


                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        name="description"
                        type="text"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        // helperText={formik.touched.password && formik.errors.password}
                        style={{marginTop: '40px'}}/>

                    <div style={{display: "flex", justifyContent: "end", margin: "20px 0 "}}>
                        <Button variant="outlined" type={'submit'} style={{
                            width: '153px',
                            color: "white",
                            border: '1px solid black',
                            background: '#F8346B',
                            boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                            borderRadius: '2px'
                        }}>
                            Publish
                        </Button>
                    </div>
                </form>
            </BasicModal>
        </Box>
    )
}