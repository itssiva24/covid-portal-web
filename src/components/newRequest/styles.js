import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
      marginTop: theme.spacing(5),
  },
  root: {
      padding: theme.spacing(3, 2),
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
      marginTop: 20,
      width: "100%",
  },
  form: {
      display: "flex",
      flexDirection: "column",
      padding: 50,
      backgroundColor:
          theme.palette.type === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
      [theme.breakpoints.up("xs")]: {
          padding: 30,
          width: "100%",
      },
      [theme.breakpoints.up("lg") && theme.breakpoints.up("md")]: {
          padding: 50,
          width: "auto",
      },
      borderRadius: 30,
      marginTop: 20,
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