import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container"
import { Box } from '@material-ui/core';
import useStyles from "./styles"
import tempdb from "../Home/_tempDB"
import {firestore} from "../../contexts/firebase";

const RequestDetail = () => {
  const {id} = useParams()
  const classes  = useStyles()  
  const [request, setRequest] = useState({});

  useEffect(() => {
    findRequest(id)
  }, [])

  async function findRequest(idToBeFound){
   await  firestore.collection('requests').doc(id).get()
        .then(snapshot => setRequest(snapshot.data()))
  }

  const KeyValue = (key, val)=>{
    return (
      <Box>
        <span>{key}</span> : <span>
          {val}
        </span>
      </Box>
    )
  }

  return (
    <div className={classes.root}>
      <Box className={classes.detailBox}>
        <Container maxWidth="sm" className={classes.detailConatiner}>
          {Object.keys(request).map((k)=>(
            KeyValue(k, request[k])
          ))}
        </Container>
      </Box>
      <Box className={classes.ctaBox}>

      </Box>
    </div>
  )
}

export default RequestDetail