import React, { useState } from "react";
import { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import {
    CircularProgress,
    Container,
    makeStyles,
    TextField,
    Button,
    Typography,
    Alert,
} from "@material-ui/core";
import { addVolunteer } from "../../contexts/firebase";
import { UserRole } from "../../utils";

const useStyles = makeStyles((theme) => ({
    root: {
        paddding: 8,
    },
    textField: {
        width: "100%",
        margin: "16px 0",
    },
}));

const condition = (authUser) => authUser && authUser.role === UserRole.Admin;

export default withAuthorization(
    condition,
    ROUTES.HOME
)(() => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email) {
            return;
        }
        try {
            await addVolunteer(email.toLowerCase());
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        setMessage("Added Successfully!");
        setEmail("");
    };

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Typography component="h3" variant="h5" align="center">
                Add Volunteer
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Enter email"
                    id="outlined-basic"
                    required
                    name="title"
                    placeholder="Ex. ae18b014@smail.iitm.ac.in"
                    value={email}
                    className={classes.textField}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" color="primary" variant="contained">
                    {!loading ? (
                        "ADD"
                    ) : (
                        <CircularProgress color="secondary" size={24} />
                    )}
                </Button>
                {message && <Typography align="center">{message}</Typography>}
            </form>
        </Container>
    );
});
