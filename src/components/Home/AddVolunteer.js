import React from "react";
import { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import {
    CircularProgress,
    Container,
    makeStyles,
    InputLabel,
    Input,
    Button,
    Typography,
    Box,
    Chip,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import { UserRole } from "../../utils";
import useAddVolunteer from "../../hooks/useAddVolunteer";

const useStyles = makeStyles((theme) => ({
    root: {
        paddding: 8,
    },
    textField: {
        display: "block",
        width: "100%",
        margin: "16px 0",
    },
    chipsBox: {
        display: "flex",
        flexWrap: "wrap",
        margin: "20px",
        gap: "10px",
    },
    button: {
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
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
        emailList,
        addEmail,
        removeEmail,
    } = useAddVolunteer();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addEmail(email);
            setEmail("");
        }
    };

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Typography
                component="h3"
                variant="h5"
                align="center"
                style={{
                    marginBottom: 30,
                }}
            >
                Add Volunteer
            </Typography>
            <Typography variant="h6">Instructions</Typography>
            <List component="ul">
                <ListItem component="li">
                    <ListItemText>
                        1. To add an email to the volunteer list enter the
                        email(smail) below and press "Enter" key
                    </ListItemText>
                </ListItem>
                <ListItem component="li">
                    <ListItemText>
                        2. To remove an email from list, click on "x" on the
                        chip
                    </ListItemText>
                </ListItem>
                <ListItem component="li">
                    <ListItemText>
                        3. Click "ADD ALL" button to add all emails in the list
                        as volunteers
                    </ListItemText>
                </ListItem>
                <ListItem component="li">
                    <ListItemText>
                        Note: For a person to be added as a voluteer they must
                        already be <b>signed in</b>.
                    </ListItemText>
                </ListItem>
            </List>
            <Typography>Email List to be added:</Typography>
            {emailList.size !== 0 && (
                <Box className={classes.chipsBox}>
                    {Array.from(emailList).map((email) => (
                        <Chip
                            size="small"
                            key={email}
                            label={email}
                            onDelete={() => removeEmail(email)}
                        />
                    ))}
                </Box>
            )}
            <form onSubmit={handleSubmit}>
                {/* <InputLabel htmlFor="email">Enter Email</InputLabel> */}
                <Input
                    id="email"
                    className={classes.textField}
                    inputProps={{
                        placeholder: "Ex. ae18b014@smail.iitm.ac.in",
                        // className:classes.textField,
                        onChange: (e) => setEmail(e.target.value),
                        onKeyPress: handleKeyDown,
                        value: email,
                    }}
                ></Input>

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    className={classes.button}
                >
                    {!loading ? (
                        "ADD ALL"
                    ) : (
                        <CircularProgress color="secondary" size={24} />
                    )}
                </Button>
                {message && <Typography align="center">{message}</Typography>}
            </form>
        </Container>
    );
});
