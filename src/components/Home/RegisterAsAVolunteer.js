import React from "react";
import { withAuthorization } from "../../contexts";
import * as ROUTES from "../../constants/routes";
import {
    CircularProgress,
    Container,
    makeStyles,
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    TextField,
    Radio,
} from "@material-ui/core";
import { UserRole } from "../../utils";
import useAddVolunteer from "../../hooks/useAddVolunteer";
import useRegisterAsAVolunteer from "../../hooks/useRegisterAsAVolunteer";

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

const condition = (authUser) => authUser && authUser.role === UserRole.Student;

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
        hasAttended,
        setHasAttended,
    } = useRegisterAsAVolunteer();

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
                Register as a volunteer
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="standard-basic"
                    name="email"
                    className={classes.textField}
                    label="Enter your smail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    fullWidth={true}
                />
                <br />
                <FormLabel component="legend">
                    Have you attended any of the onboarding sessions for
                    volunteers?
                </FormLabel>
                <RadioGroup
                    aria-label="hasattended"
                    name="hasAttended"
                    onChange={(e) => {
                        e.target.value === "Yes"
                            ? setHasAttended(true)
                            : setHasAttended(false);
                    }}
                    value={hasAttended ? "Yes" : "No"}
                >
                    <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                    />
                    <FormControlLabel
                        value="No"
                        control={<Radio />}
                        label="No"
                    />
                </RadioGroup>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    className={classes.button}
                >
                    {!loading ? (
                        "Register"
                    ) : (
                        <CircularProgress color="secondary" size={24} />
                    )}
                </Button>
                <br />
                {message && (
                    <Typography align="center" color="secondary">
                        {message}
                    </Typography>
                )}
            </form>
        </Container>
    );
});
