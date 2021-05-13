import { GridList, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const details = [
    {
        name: "Unman Nibandhe",
        pos: `Students' General Secretary`,
        email: "gen_sec@smail.iitm.ac.in",
    },
    {
        name: "Chinmayi Gajula",
        pos: `Hostel Affairs Secretary`,
        email: "ec_hosaf@smail.iitm.ac.in",
    },
    {
        name: "Institute WebOps",
        email: "institutewebops@gmail.com",
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0,
        paddingTop: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    gridList: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        margin: 5,
        height: 150,
        padding: 10,
        [theme.breakpoints.down("sm")]: {
            width: "90%",
        },
        width: "40%",
    },
}));

const ContactUs = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography
                variant="h5"
                style={{
                    textAlign: "center",
                    margin: 20,
                    fontWeight: "bold",
                }}
            >
                Contact Us
            </Typography>
            <div className={classes.gridList}>
                {details.map((det) => {
                    return (
                        <div className={classes.card}>
                            <Typography
                                variant="h6"
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                {det.name}
                            </Typography>
                            {det.pos && (
                                <Typography variant="p">
                                    {det.pos} | IIT Madras
                                </Typography>
                            )}
                            <Typography variant="p">
                                Email: {det.email}
                            </Typography>
                        </div>
                    );
                })}
            </div>
        </Paper>
    );
};

export default ContactUs;
