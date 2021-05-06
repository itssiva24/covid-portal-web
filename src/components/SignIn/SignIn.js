import React from "react";
import * as ROUTES from "../../constants/routes";
import { createUser, signInWithGoogle } from "../../contexts/firebase";
import { withAuthorization } from "../../contexts";
import { useHistory } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Deer from "../../assets/images/deer.jpg";
import Logo from "../../assets/images/logo.png";

const condition = (authUser) => authUser === undefined;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                IIT Madras
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

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

    const googleSignIn = async () => {
        try {
            const cred = await signInWithGoogle();
            await createUser(cred);
            history.push(ROUTES.HOME);
        } catch (err) {
            console.log(err);
        }
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={googleSignIn}
                        style={{ marginTop: 8 }}
                    >
                        Login with smail
                    </Button>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
});
