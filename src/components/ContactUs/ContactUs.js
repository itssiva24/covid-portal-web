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
        padding: 20,
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
        padding: 10,
        margin: 5,
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
            <GridList className={classes.gridList} cols={2}>
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
            </GridList>
        </Paper>
    );
};

export default ContactUs;
