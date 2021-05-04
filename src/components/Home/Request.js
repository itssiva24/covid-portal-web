import React from 'react';
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import Chip from "@material-ui/core/Chip"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import * as ROUTES from "../../constants/routes"

const useStyles = makeStyles({
  root:{
    backgroundColor: "white",
    borderBottom:"1px solid black",
    padding:"16px",

  },
  header:{
    display:"flex",
    alignItems:"center",
    gap:"1em"
  },
  avatar:{
    height:"32px",
    width:"32px",
  },
  name:{
    flex:"1"
  },
  messageBox:{
    padding:"16px"
  },
  footer:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",

  }
})

function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t.toLocaleString();
}

function Request({request}) {
  const history = useHistory()
  const classes = useStyles();
  console.log(`${ROUTES.HOME}${request.id}`)
  console.log(request);
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Box className={classes.header}>
        <Avatar className={classes.avatar} alt={`${request.createdBy}`} src={request.imageUrl}></Avatar>
        <Typography variant="h6" className={classes.name}>{request.createdBy}</Typography>
        <Typography variant="body1">{toDateTime(request.createdAt)}</Typography>
      </Box>
      <Box className={classes.messageBox}>
        <Typography variant="h5">{request.title}</Typography>
        <Typography variant="body1">{request.description}</Typography>
      </Box>
      <Box className={classes.footer}>
        {/* FIXME: change label */}
        <Chip label={request.type || "Type:Resource"} size="small"></Chip>
        <Chip label={request.resolved ? "Satus:Resolved":"Status:Live"} size="small"></Chip>
        <Button variant="contained" color="primary" size="small" onClick={()=>{ 
          history.push(`${ROUTES.REQUEST_FEED===ROUTES.HOME?"":ROUTES.REQUEST_FEED}/${request.id}`)
        }}>View Details</Button> 
      </Box>
    </Container>
  )
}

export default Request
