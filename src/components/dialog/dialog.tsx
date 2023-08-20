import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from "@mui/material/transitions/transition";
import Slide from "@mui/material/Slide";

interface _props {
    handleClose: any,
    open: boolean,
    handleDelete: any,
    title: string,
    dialog: string
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent: React.FC<_props> = ({ open, handleClose, handleDelete, title, dialog }) => {
    return <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle
            style={{ backgroundColor: '#626E7E', color: '#F3F3F3' }}>{title}</DialogTitle>
        <DialogContent
            style={{ backgroundColor: '#626E7E' }}>
            <DialogContentText
                style={{ color: '#F3F3F3' }}
                id="alert-dialog-slide-description">
                {dialog}
            </DialogContentText>
        </DialogContent>
        <DialogActions
            style={{ backgroundColor: '#626E7E' }}>
            <Button
                style={{ color: '#252525' }}
                onClick={handleClose}>Cancle</Button>
            <Button
                style={{ color: '#252525' }}
                onClick={handleDelete}>Delete</Button>
        </DialogActions>
    </Dialog>
};

export default DialogComponent;