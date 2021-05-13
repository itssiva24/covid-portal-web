import React from "react";
import * as ROUTES from "../../constants/routes";
import { createUser, signInWithGoogle } from "../../contexts/firebase";
import { withAuthorization } from "../../contexts";
import { useHistory } from "react-router";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Deer from "../../assets/images/deer.jpg";
import Logo from "../../assets/images/logo.png";
import "./SignIn.css";

const condition = (authUser) => !authUser;

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        display: "flex",
        backgroundImage: `url(${Deer})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: 150,
        height: 150,
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
        <div component="main" className={classes.root}>
            {/* <CssBaseline /> */}
            <div className="paper">
                <Avatar className={classes.avatar} src={Logo} />
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={{
                        fontWeight: "bold",
                        color: "white",
                        marginTop: 10,
                        marginBottom: 10,
                    }}
                >
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
            </div>
        </div>
    );
});
