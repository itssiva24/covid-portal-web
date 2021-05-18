import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import { signInWithGoogle } from "../../contexts/firebase";
import { withAuthorization } from "../../contexts";
import { useHistory } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Deer from "../../assets/images/deer.jpg";
import Logo from "../../assets/images/logo.png";
import {
    CircularProgress,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import { DomainMap } from "../../utils";
const condition = (authUser) => !authUser;

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${Deer})`,
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: 54,
        height: 54,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default withAuthorization(
    condition,
    ROUTES.HOME
)(() => {
    const classes = useStyles();
    const history = useHistory();
    const [domain, setDomain] = useState();
    const [message, setMessage] = useState();
    const [processing, setProcessing] = useState(false);
    const googleSignIn = async () => {
        setProcessing(true);
        if (!domain) {
            setMessage(true);
            setProcessing(false);
            return;
        }
        try {
            const cred = await signInWithGoogle(domain);
            history.push(ROUTES.HOME);
        } catch (err) {
            console.log(err);
        }
        setProcessing(false);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                container
                xs={12}
                sm={8}
                md={5}
                elevation={6}
                square
                alignItems="center"
                justify="center"
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar} src={Logo} />
                    <Typography component="h1" variant="h5" align="center">
                        A portal for seeking covid related help
                    </Typography>
                    <div
                        style={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                            marginTop: 16,
                        }}
                    >
                        <InputLabel
                            id="demo-simple-select-label"
                            style={{
                                marginRight: 10,
                            }}
                            required
                        >
                            Login in as
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="role"
                            required
                            value={domain}
                            style={{
                                flex: "1",
                            }}
                            onChange={(e) => {
                                setDomain(e.target.value);
                                setMessage();
                            }}
                        >
                            {Object.entries(DomainMap).map(([k, v]) => (
                                <MenuItem value={v}>{k}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={googleSignIn}
                        style={{ marginTop: 8 }}
                        disabled={processing}
                    >
                        {processing ? (
                            <CircularProgress size="2em"></CircularProgress>
                        ) : (
                            "Login"
                        )}
                    </Button>
                    {message && (
                        <Typography variant="body2">
                            Please select an option!
                        </Typography>
                    )}
                </div>
            </Grid>
        </Grid>
    );
});
