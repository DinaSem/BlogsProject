import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import {InputBase, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {setSearchNameTermAC} from "../blogs/blogs-reducer";
import {useAppDispatch} from "../hooks";

export const Search = () => {
    let [title, setTitle] = useState('')
    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        dispatch(setSearchNameTermAC(title))
        setTitle(e.currentTarget.value)
    }


    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '79%', background:'none', boxShadow:'none', border: '1px solid #DEDBDC'}}>
            <SearchIcon />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                value={title}
                onChange={onChangeHandler}
                // inputProps={{ 'aria-label': 'search google maps' }}
            />
        </Paper>
    );
};

export default Search;
