import React, {useState} from 'react';
import {FormControl, MenuItem, SelectChangeEvent} from "@mui/material";
import {Select} from "@mui/material";
import {useAppDispatch} from "../hooks";
import {fetchBlogsTC, sortDirectionBlogsAC} from "../blogs/blogs-reducer";

export const SelectComp = () => {
    const valuesOfSelect = ['New blogs first', 'Old blogs first', 'From A to Z', 'From Z to A' ];
    const [sortValue, setSortValue] = useState('New blogs first')
    const dispatch = useAppDispatch()


    const handleChange = (event: SelectChangeEvent) => {
        setSortValue(event.target.value as string)
        if(sortValue==='Old blogs first'){
            dispatch(sortDirectionBlogsAC('desc'))
        }if(sortValue==='New blogs first'){
            dispatch(sortDirectionBlogsAC('asc'))
        }
        dispatch(fetchBlogsTC({}))
    }


    return (
        <FormControl
            sx={{m: 1, minWidth: '20%'}} style={{margin: '0px 10px',
            // border: '1px solid rgb(222, 219, 220)',
            }} size="small">
            <Select value={sortValue} onChange={handleChange}>
                {valuesOfSelect.map((v,i)=>{
                    return <MenuItem key={i} value={v}>{v}</MenuItem>
                })}
            </Select>
        </FormControl>

    );
};

export default Select;