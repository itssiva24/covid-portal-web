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
        padding: "8px 24px",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        borderRadius: 8,
        marginTop: 8,
    },
    address: {
        display: "flex",
        marginTop: 20,
        justifyContent: "space-between",
    },
    chooseFile: {
        margin: 20,
    },
    progress: {
        width: "100%",
        marginTop: 20,
    },
}));

export default useStyles;
