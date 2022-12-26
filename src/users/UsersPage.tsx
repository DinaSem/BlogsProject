import React, {useEffect} from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {fetchUsersTC} from "./users-reducer";
import s from "../blogs/blogs.module.css";
import Container from "@mui/material/Container";
import {UsersPagination} from "./UsersPagination";
import {DeleteUserModal} from "../modal windows/users modal/DeleteUserModal";
import {AddUserModal} from "../modal windows/users modal/AddUserModal";

export const UsersPage = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const users = useAppSelector(state => state.users.usersData.items)
    const pageNumber = useAppSelector(state => state.users.params.pageNumber)
    const dispatch = useAppDispatch()
    console.log(users)
    const onClickAddUserHandler = () => {


    }
    useEffect(() => {
        if (!users?.length){
            dispatch(fetchUsersTC())
        }
    }, [])

    useEffect(() => {
        console.log('from UseEffect in UsersPage')
        dispatch(fetchUsersTC())
    }, [dispatch, pageNumber])


    if (!isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <Container
            style={{maxWidth: '940px', minHeight: '100vh', paddingLeft: '0', paddingRight: '0', margin: '29px 20px'}}
            className={s.wrapper}>
            <h3>Users</h3>
            <div style={{display: "flex", justifyContent: "end", margin: "20px 0 "}}>
                <AddUserModal/>
            </div>
            <TableContainer>
                <Table sx={{maxWidth: 940}} aria-label="simple table">
                    <TableHead style={{background: '#DEDBDC', height: "48px", borderRadius: '2px', boxShadow: "none"}}>
                        <TableRow>
                            <TableCell  style={{
                                fontWeight: '600',
                                fontSize: '14px', lineHeight: '24px'
                            }}>Username</TableCell>
                            <TableCell  style={{
                                fontWeight: '600',
                                fontSize: '14px', lineHeight: '24px'
                            }}>Email</TableCell>
                            <TableCell  style={{
                                fontWeight: '600',
                                fontSize: '14px', lineHeight: '24px'
                            }}>User ID</TableCell>
                            <TableCell  style={{
                                fontWeight: '600',
                                fontSize: '14px', lineHeight: '24px'
                            }}>Date added</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user, i) => {

                            let day = user.createdAt.slice(8, 10)
                            let month = user.createdAt.slice(5, 7)
                            let year = user.createdAt.slice(0, 4)

                            return (
                                <TableRow
                                    hover
                                    key={i}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    style={{backgroundColor: '#f6f2f2'}}>
                                    <TableCell >{user.login}</TableCell>
                                    <TableCell >{user.email}</TableCell>
                                    <TableCell >{user.id}</TableCell>
                                    <TableCell >{day + '.' + month + '.' + year}</TableCell>
                                    <TableCell align="right">
                                        <DeleteUserModal userId={user.id} userName={user.login} />

                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <UsersPagination/>
        </Container>
    );
};

