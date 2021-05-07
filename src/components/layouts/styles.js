import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        backgroundColor: theme.palette.grey[800],
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    title: {
        [theme.breakpoints.down("xs")]: {
            fontSize: 16,
        },
    },
    signOutButton: {
        marginLeft: "auto",
        [theme.breakpoints.down("xs")]: {
            fontSize: 12,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            marginLeft: drawerWidth,
        },
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1),
        },
    },
}));

export default useStyles;
