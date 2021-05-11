import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(5),
    },
    root: {
        padding: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginTop: 12,
        width: "100%",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "20px 32px",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        borderRadius: 8,
        marginTop: 8,
    },
    sectionHeader: {
        marginTop: 16,
        color: theme.palette.grey[300],
    },
    address: {
        display: "flex",
        marginTop: 20,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    addressItem: {
        display: "flex",
        alignItems: "center",
        width: "40%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginTop: 12,
        },
    },
    chooseFile: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: 12,
        marginTop: 12,
    },
    progress: {
        width: "100%",
        marginTop: 20,
    },
}));

export default useStyles;
