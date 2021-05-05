import React, { useContext } from "react";
import Navbar from "../Navbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AuthUserContext from "../../contexts";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import { signOut } from "../../contexts/firebase";
import useStyles from "./styles";
import { useHistory } from "react-router";
import * as ROUTES from "../../constants/routes";

function Root(props) {
    const history = useHistory();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const { authUser } = useContext(AuthUserContext);

    const handleSignOut = async () => {
        try {
            await signOut();
            history.push(ROUTES.SIGNIN);
        } catch (err) {
            console.log(err);
        }
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        IITM COVID PORTAL
                    </Typography>
                    {authUser && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSignOut}
                            className={classes.signOutButton}
                        >
                            Sign out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Navbar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            ></Navbar>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

export default Root;
