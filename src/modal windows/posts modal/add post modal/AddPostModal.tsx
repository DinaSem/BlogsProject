import React, {useState} from 'react';
import {Autocomplete, Button, FormControl, Input, InputLabel, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {BasicModal} from "../../basic modal/BasicModal";
import Box from "@mui/material/Box";
import {useFormik} from "formik";
import image from '../../../pictures/noimage.jpg'
import {addPostTC} from "../../../posts/post-reducer";


type PropsType = {
    // postId: string
    // postTitle:string
    showActions:boolean
    setShowActions:(showActions:boolean)=>void
}


export const AddPostModal = ({showActions,setShowActions}: PropsType) => {
    const blogs = useAppSelector(state => state.blogs.blogsData.items)
    const blogsNames = blogs.map(b => b.name)
    const [value, setValue] = React.useState<string>(blogsNames[0])
    const [inputValue, setInputValue] = React.useState('');
    const currentBlog = blogs.find(b=>b.name===value)

    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        setOpen(false)
    }

    const dispatch = useAppDispatch();


    const formik = useFormik({
        initialValues: {
            title: '',
            blogName: value,
            description: '',

        },
        validate: values => {
            if (!values.title) {
                return {
                    title:'blogName is required'}
            }
            if (!values.blogName) {
                return {
                    blogName:'website is required'}
            }
            if (!values.description) {
                return {
                    description:'description is required'}
            }
        },
        onSubmit: values => {
                // @ts-ignore
            dispatch(addPostTC(currentBlog.id,values.title, 'some description', values.description))
            handleClose()
            // navigate(`/`)
        },
    });

    // @ts-ignore
    return (
        <Box style={{display: 'inline-block'}}>

            <Button variant="outlined" style={{
                width: '153px',
                color: "white",
                border: '1px solid black',
                background: '#F8346B',
                boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                borderRadius: '2px'
            }}
                    onClick={handleOpen}>
                Add post
            </Button>
            <BasicModal title={'Add post'}
                        open={open}
                        handleOpen={handleOpen}
                        handleClose={handleClose}>
                <img src={image} alt="" style={{width:'180px', height:'108px'}}/>
                <form onSubmit={formik.handleSubmit}>

                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Website</InputLabel>
                        <Input
                            fullWidth
                            id="website"
                            name="title"
                            type="text"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            // helperText={formik.touched.password && formik.errors.password}
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Autocomplete
                            value={value}
                            // @ts-ignore
                            onChange={(event: any, newValue: string) => {
                               return setValue(newValue);
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            id="controllable-states-demo"
                            options={blogsNames}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Choose a blog" variant="standard"  />}
                        />
                    </FormControl>

                    <TextField
                        id="outlined-multiline-static"
                        label="Post Description"
                        multiline
                        rows={4}
                        fullWidth
                        name="description"
                        type="text"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        // helperText={formik.touched.password && formik.errors.password}
                        style={{marginTop:'40px'}}/>

                    <div style={{display: "flex", justifyContent: "end", margin: "20px 0 "}}>
                        <Button variant="outlined"  type={'submit'} style={{
                            width: '153px',
                            color: "white",
                            border: '1px solid black',
                            background: '#F8346B',
                            boxShadow: '0px 4px 18px rgba(248, 52, 107, 0.35',
                            borderRadius: '2px'
                        }}>
                            Add post
                        </Button>
                    </div>
                </form>
            </BasicModal>
        </Box>
    )
}