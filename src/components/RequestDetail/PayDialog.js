import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function PayDialog({ request, open, handleClose }) {
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Payment Details</DialogTitle>
                <DialogContent>
                    <Typography component="h5">
                        UPI ID : {request.recipientUPIID}
                    </Typography>
                    <Typography component="h5">
                        Name : {request.recipientUPIName}
                    </Typography>
                    <img
                        src={request.QRCodeURL}
                        style={{
                            width: "300px",
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary" variant="contained">
                        <a
<<<<<<< HEAD
                            style={{ color: "#fff", textDecoration: "none", width:"100%", height:"100%" }}
=======
                            style={{ color: "#fff", textDecoration: "none" }}
>>>>>>> upstream/master
                            href={`upi://pay?pa=${request.recipientUPIID}&pn=${request.recipientUPIName}&cu=INR`}
                        >
                            Open in App
                        </a>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
