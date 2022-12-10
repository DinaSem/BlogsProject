import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "../hooks";
import {setAppErrorAC, setAppSuccessAC} from "../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref}
                     // variant='filled'
                     {...props}  />
})


export function ErrorSnackbar() {
    const dispatch = useAppDispatch();
    const error = useAppSelector(state => state.app.error)
    const success = useAppSelector(state => state.app.success)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
        dispatch(setAppSuccessAC(null))

    }

    return (

        <Snackbar open={!!error || !!success}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                  }}>

            {error !== null
                ? <Alert onClose={handleClose} severity='error' sx={{width: '100%',}}>
                    {error}
                </Alert>
           :
                 <Alert onClose={handleClose}
                         // variant="outlined"
                         severity="success"
                         sx={{width: '100%'}}>
                    {success}
                </Alert>

            }
        </Snackbar>

    )
}
