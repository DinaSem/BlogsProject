import React, {ChangeEvent, useCallback} from 'react'
import {Grid, MenuItem, Pagination, Select, SelectChangeEvent, Stack} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks";
import {setPageOfUsersAC, setSizeOfUsersPageAC} from "./users-reducer";

export const UsersPagination = () => {

    const dispatch = useAppDispatch();
    const pageCount = useAppSelector(state => state.users.usersData.pagesCount)
    const usersTotalCount = useAppSelector(state => state.users.usersData.totalCount) || 0;
    const pageNumber = useAppSelector(state => state.users.params.pageNumber);
    const pageSize = useAppSelector(state => state.users.params.pageSize);

    const handlePaginationChange = useCallback((event: ChangeEvent<any>, value: number) => {
        dispatch(setPageOfUsersAC(value))
    }, [dispatch,setPageOfUsersAC])

    const handleChangePageCount = useCallback((event: SelectChangeEvent<any>) => {
        dispatch(setSizeOfUsersPageAC(event.target.value));
    }, [dispatch,setSizeOfUsersPageAC])

    return (
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
            <Stack direction="row" spacing={2} alignItems="center" textAlign={'center'}>
                <Pagination
                    count={Math.ceil(usersTotalCount / pageSize)}
                    page={pageNumber}
                    onChange={handlePaginationChange}
                    shape="rounded"/>
                <div>
                    Show
                    <Select
                        id="page-count-select"
                        value={pageSize}
                        onChange={handleChangePageCount}
                        size={"small"}
                        style={{marginLeft:"6px", marginRight: "6px", width:'65px',height:'24px',backgroundColor: '#f6f2f2', fontSize:'12px'}}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                </div>
            </Stack>
        </Grid>
    )
}