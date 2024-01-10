import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from "@mui/material/transitions/transition";
import Slide from "@mui/material/Slide";

type _props = {
    handleClose: any,
    open: boolean,
    handleDelete: any,
    title: string,
    dialog: string,
    deleteButton?: string
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogComponent({ open, handleClose, handleDelete, title, dialog, deleteButton }: _props) {
    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    >
        {/* <DialogTitle
            style={{ backgroundColor: '#626E7E', color: '#F3F3F3' }}><div style={{ fontSize: 22 }}>{title}</div></DialogTitle> */}

        <DialogContent
            style={{ backgroundColor: '#626E7E' }}>
            <DialogContentText
                style={{ color: '#F3F3F3', display: 'flex', flexDirection: 'column' }}
                id="alert-dialog-slide-description">
                <span className='flex text-[22px] mb-[10px] text-whiteText sm:text-[16px] '>{title}</span>
                <span className='text-[16px] text-whiteText sm:text-[13px] '>{dialog}</span>
            </DialogContentText>
        </DialogContent>
        <DialogActions
            style={{ backgroundColor: '#626E7E' }}>
            <Button
                style={{ color: '#FFF' }}
                onClick={handleClose}>Cancle</Button>
            <Button
                style={{ color: '#FFF' }}
                onClick={handleDelete}>{deleteButton ? deleteButton : 'Delete'}</Button>
        </DialogActions>
    </Dialog>
};
