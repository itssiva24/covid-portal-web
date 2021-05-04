import React from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import useStyles from "./styles";
import tempdb from "../Home/_tempDB";

const RequestDetail = () => {
    const { id } = useParams();
    const classes = useStyles();

    // FIXME: fetch request from firestore
    const request = tempdb.find((req) => {
        return req.id == id;
    });

    const KeyValue = (key, val) => {
        return (
            <Box>
                <span>{key}</span> : <span>{val}</span>
            </Box>
        );
    };

    console.log(request);

    return (
        <div className={classes.root}>
            <Box className={classes.detailBox}>
                <Container maxWidth="sm" className={classes.detailConatiner}>
                    {/* {Object.keys(request).map((k)=>(
            KeyValue(k, request[k])
          ))} */}
                    Request detail
                </Container>
            </Box>
            <Box className={classes.ctaBox}></Box>
        </div>
    );
};

export default RequestDetail;
