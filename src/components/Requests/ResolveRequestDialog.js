import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress, Typography } from "@material-ui/core";
import useResolveRequest from "../../hooks/useResolveRequest";

export default function ResolveRequestDialog({ id, open, handleClose }) {
    const { handleSubmit, loading } = useResolveRequest(id, handleClose);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Resolve Request</DialogTitle>
                <DialogContent>
                    <Typography component="h5">Are you sure?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {!loading ? (
                            "Resolve"
                        ) : (
                            <CircularProgress size={24} color="secondary" />
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
