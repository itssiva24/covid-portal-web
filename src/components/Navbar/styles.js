import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 250;

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
    listItem: {
        "&$selected": {
            backgroundColor: "red",
            color: "white",
        },
    },
    // necessary for content to be below app bar
    toolbar: {
        ...theme.mixins.toolbar,
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "20px",
    },
    drawerPaper: {
        width: drawerWidth,
        background: theme.palette.grey[800],
        border: "none",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    image: {
        height: 70,
        width: 70,
        marginBottom: 10,
    },
    name: {
        marginBottom: 5,
        fontWeight: "bold",
    },
}));
export default useStyles;
