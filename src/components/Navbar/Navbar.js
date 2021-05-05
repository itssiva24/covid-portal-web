import React, { useContext } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SubjectIcon from "@material-ui/icons/Subject";
import AddIcon from "@material-ui/icons/Add";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "../../contexts";
import { UserRole } from "../../utils";
import { Typography } from "@material-ui/core";

const navLinks = [
    {
        icon: AssignmentIcon,
        label: "Requests",
        link: ROUTES.HOME,
    },
    {
        icon: PostAddIcon,
        label: "New Request",
        link: ROUTES.NEW_REQUEST,
    },
];

const drawer = (classes, history, authUser) => {
    return (
        <>
            <header>
                <div className={classes.toolbar}>
                    <Typography variant="h6" component="h6">
                        {authUser && authUser.displayName}
                    </Typography>
                    <Typography component="p" variant="caption">
                        {authUser && authUser.role}
                    </Typography>
                </div>
            </header>
            <Divider />
            <List>
                {navLinks.map((navLink) => (
                    <ListItem
                        button
                        key={navLink.label}
                        onClick={() => {
                            history.push(navLink.link);
                        }}
                    >
                        <ListItemIcon>
                            <navLink.icon></navLink.icon>
                        </ListItemIcon>
                        <ListItemText primary={navLink.label} />
                    </ListItem>
                ))}

                {authUser && (
                    <ListItem
                        button
                        key="Requests assigned"
                        onClick={() => {
                            history.push(ROUTES.MY_REQUESTS);
                        }}
                    >
                        <ListItemIcon>
                            <SubjectIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Requests" />
                    </ListItem>
                )}
                {authUser && authUser.role === UserRole.Volunteer && (
                    <ListItem
                        button
                        key="Requests assigned"
                        onClick={() => {
                            history.push(ROUTES.REQUESTS_ASSIGNED);
                        }}
                    >
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Requests Assigned" />
                    </ListItem>
                )}
                {authUser && authUser.role === UserRole.Admin && (
                    <ListItem
                        button
                        key="Add Volunteer"
                        onClick={() => {
                            history.push(ROUTES.ADD_VOLUNTEER);
                        }}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Volunteer" />
                    </ListItem>
                )}
            </List>
        </>
    );
};

function Navbar(props) {
    const history = useHistory();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const { mobileOpen, handleDrawerToggle } = props;
    const container =
        window !== undefined ? () => window().document.body : undefined;

    const { authUser } = useContext(AuthUserContext);

    return (
        <nav>
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer(classes, history, authUser)}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer(classes, history, authUser)}
                </Drawer>
            </Hidden>
        </nav>
    );
}

export default Navbar;
