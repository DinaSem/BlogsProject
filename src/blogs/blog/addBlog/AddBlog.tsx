import React from 'react';
import s from './addBlog.module.css'
import image from '../../../pictures/noimage.jpg'
import CustomSeparator from "../../../BreadcrumbsCustom";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../hooks";
import {addBlogTC} from "../../blogs-reducer";
import {useNavigate} from 'react-router-dom';
import {useFormik} from "formik";
import {FormControl, Input, InputLabel, TextField} from "@mui/material";


export const AddBlog = () =>{

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            blogName: '',
            website: '',
            description: '',

        },
        validate: values => {
            if (!values.blogName) {
                 return {
                     blogName:'blogName is required'}
            }
            if (!values.website) {
                 return {
                     website:'website is required'}
            }
            if (!values.description) {
                 return {
                     description:'description is required'}
            }
        },
        onSubmit: values => {
            dispatch(addBlogTC(values.blogName, values.description, values.website));
            navigate(`/`)
        },
    });

    return (
        <div className={s.blogsDetailsWrapper}>

            <CustomSeparator/>

            <img src={image} className={s.blogsDetailsImg}/>
            <div className={s.wrapper}>

                <div style={{minWidth:'90%', margin:'0 20px'}}>
                    <form onSubmit={formik.handleSubmit}>

                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Blog Name</InputLabel>
                            <Input
                                fullWidth
                                id="blogName"
                                name="blogName"
                                type="text"
                                // label="Email"
                                value={formik.values.blogName}
                                onChange={formik.handleChange}
                                // error={formik.touched.blogName && Boolean(formik.errors.blogName)}
                                // helperText={formik.touched.email && formik.errors.email}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Website</InputLabel>
                            <Input
                                fullWidth
                                id="website"
                                name="website"
                                type="text"
                                value={formik.values.website}
                                onChange={formik.handleChange}
                                error={formik.touched.website && Boolean(formik.errors.website)}
                                // helperText={formik.touched.password && formik.errors.password}
                            />
                        </FormControl>
                        <TextField
                            id="outlined-multiline-static"
                            label="Blog Description"
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
                                Add blog
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};
