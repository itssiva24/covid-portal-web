import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: 16,
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      background: `${theme.palette.grey[800]} !important`,
    },
  },
  title: {
    fontWeight: 600,
  },
  smallBox: {
    maxWidth: 144,
  },
  mediumBox: {
    minWidth: 178,
    maxWidth: 196,
  },
  largeBox: {
    minWidth: 240,
  },
  veryLargeBox: {
    minWidth: 264,
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
}));
export default useStyles;
