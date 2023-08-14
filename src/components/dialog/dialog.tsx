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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {dialog}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancle</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
    </Dialog>
};

export default DialogComponent;