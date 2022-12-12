import React, {useState} from 'react';
import {FormControl, MenuItem, SelectChangeEvent} from "@mui/material";
import {Select} from "@mui/material";
import {useAppDispatch} from "../hooks";
import {fetchBlogsTC, sortDirectionBlogsAC} from "../blogs/blogs-reducer";

export const SelectComp = () => {
    const valuesOfSelect = ['New blogs first', 'Old blogs first', 'From A to Z', 'From Z to A'];
    const [sortValue, setSortValue] = useState(valuesOfSelect[0])
    const dispatch = useAppDispatch()

//TODO убрать белые паддинги в селекте, стрелка на селекте

    const handleChange = (event: SelectChangeEvent) => {
        const option = event.target.value as string
        setSortValue(option)
        if(option==='Old blogs first'){
            dispatch(sortDirectionBlogsAC('asc','createdAt'))
        }if(option==='New blogs first'){
            dispatch(sortDirectionBlogsAC('desc','createdAt'))
        }if(option==='From A to Z'){
            dispatch(sortDirectionBlogsAC('asc','name'))
        }if(option==='From Z to A'){
            dispatch(sortDirectionBlogsAC('desc','name'))
        }
    }

    return (
        <FormControl sx={{m: 1, minWidth: '27%'}} style={{margin: '0px',backgroundColor: '#f6f2f2'
            }} size="small">
            <Select value={sortValue} onChange={handleChange}  style={{height:'38px',backgroundColor: '#f6f2f2'}}>
                {valuesOfSelect.map((v,i)=>{
                    return <MenuItem  style={{height:'35px',backgroundColor: '#f6f2f2' }} key={i} value={v}>{v}</MenuItem>
                })}
            </Select>
        </FormControl>

    );
};
