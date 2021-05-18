import React, { useContext } from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SubjectIcon from "@material-ui/icons/Subject";
import AddIcon from "@material-ui/icons/Add";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "../../contexts";
import { UserRole } from "../../utils";
import { Typography } from "@material-ui/core";
import InfoOutlined from "@material-ui/icons/InfoOutlined";

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

const CustomListIcon = ({ NavIcon, color = "primary" }) => {
    return (
        <ListItemIcon>
            <NavIcon color={color}></NavIcon>
        </ListItemIcon>
    );
};

const drawer = (classes, history, authUser) => {
    return (
        <>
            <header>
                <div className={classes.toolbar}>
                    <Typography variant="h6" component="h6">
                        {authUser && authUser.displayName}
                    </Typography>
                    <Typography component="p" variant="caption">
                        {authUser
                            ? authUser.role === UserRole.Student
                                ? "MEMBER"
                                : authUser.role
                            : ""}
                    </Typography>
                </div>
            </header>
            <List style={{ padding: 0 }}>
                {navLinks.map((navLink) => (
                    <ListItem
                        button
                        key={navLink.label}
                        selected={history.location.pathname === navLink.link}
                        onClick={() => {
                            history.push(navLink.link);
                        }}
                    >
                        <CustomListIcon NavIcon={navLink.icon} />
                        <ListItemText primary={navLink.label} />
                    </ListItem>
                ))}

                {authUser && (
                    <ListItem
                        button
                        key="My Requests"
                        selected={
                            history.location.pathname === ROUTES.MY_REQUESTS
                        }
                        className={classes.listItem}
                        onClick={() => {
                            history.push(ROUTES.MY_REQUESTS);
                        }}
                    >
                        <CustomListIcon NavIcon={SubjectIcon} />
                        <ListItemText primary="My Requests" color="primary" />
                    </ListItem>
                )}
                {authUser && authUser.role === UserRole.Student && (
                    <ListItem
                        button
                        key="Register as a volunteer"
                        selected={
                            history.location.pathname ===
                            ROUTES.REGISTER_AS_A_VOLUNTEER
                        }
                        onClick={() => {
                            history.push(ROUTES.REGISTER_AS_A_VOLUNTEER);
                        }}
                    >
                        <CustomListIcon NavIcon={AccessibilityIcon} />
                        <ListItemText primary="Register as a volunteer" />
                    </ListItem>
                )}
                {authUser && authUser.role === UserRole.Volunteer && (
                    <ListItem
                        button
                        key="Requests assigned"
                        selected={
                            history.location.pathname ===
                            ROUTES.REQUESTS_ASSIGNED
                        }
                        onClick={() => {
                            history.push(ROUTES.REQUESTS_ASSIGNED);
                        }}
                    >
                        <CustomListIcon NavIcon={AssignmentIcon} />
                        <ListItemText primary="Requests Assigned" />
                    </ListItem>
                )}
                {authUser && authUser.role === UserRole.Admin && (
                    <ListItem
                        button
                        key="Add Volunteer"
                        selected={
                            history.location.pathname === ROUTES.ADD_VOLUNTEER
                        }
                        onClick={() => {
                            history.push(ROUTES.ADD_VOLUNTEER);
                        }}
                    >
                        <CustomListIcon NavIcon={AddIcon} />
                        <ListItemText primary="Add Volunteer" />
                    </ListItem>
                )}
                <ListItem
                    button
                    key="How to use"
                    selected={history.location.pathname === ROUTES.HOW_TO_USE}
                    onClick={() => {
                        history.push(ROUTES.HOW_TO_USE);
                    }}
                >
                    <CustomListIcon NavIcon={InfoOutlined} />
                    <ListItemText primary="How To Use" />
                </ListItem>
                <ListItem
                    button
                    key="Contact Us"
                    selected={history.location.pathname === ROUTES.CONTACT_US}
                    onClick={() => {
                        history.push(ROUTES.CONTACT_US);
                    }}
                >
                    <CustomListIcon NavIcon={ContactSupportIcon} />
                    <ListItemText primary="Contact Us" />
                </ListItem>
            </List>

            <footer
                style={{
                    marginTop: "auto",
                    padding: "20px 18px",
                    fontSize: 13,
                }}
            >
                <Typography variant="p">
                    Made with &#10084;&#65039; by Institute Webops
                </Typography>
            </footer>
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
