import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function UploadResultDialog({ result, open, handleClose }) {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Upload Result</DialogTitle>
                <DialogContent>
                    <Typography component="h5"> {result}</Typography>
                    <Typography variant="body1">{
                      result === "Success"? "We have received your request."
                      :"Something went wrong! Try Submitting Again"
                    }</Typography>
                    {/* maybe add link to the newly created request (if successful) */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
