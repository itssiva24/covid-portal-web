import React from "react";
import { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import {
    CircularProgress,
    Container,
    makeStyles,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import { UserRole } from "../../utils";
import useAddVolunteer from "../../hooks/useAddVolunteer";

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
    const {
        loading,
        handleSubmit,
        email,
        message,
        setEmail,
    } = useAddVolunteer();

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
