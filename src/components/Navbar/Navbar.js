import React from 'react'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from "@material-ui/icons/Assignment"
import PostAddIcon from "@material-ui/icons/PostAdd"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {  useTheme } from '@material-ui/core/styles';

import {useHistory} from "react-router-dom"
import useStyles from "./styles"
import * as ROUTES from "../../constants/routes"

const navLinks = [
  {
    icon:AssignmentIcon,
    label:"Requests",
    link:ROUTES.HOME
  },
  {
    icon:PostAddIcon,
    label:"New Request",
    link:ROUTES.NEW_REQUEST
  },
  {
    icon:MonetizationOnIcon,
    label:"Donations",
    link:ROUTES.DONATIONS
  },
  {
    icon:AccountCircleIcon,
    label:"Account",
    link:ROUTES.ME
  }
]

const drawer = (classes, history)=>(
  <> 
  <header>
  <div className={classes.toolbar} />
  </header>
  <Divider />
  <List>
    {navLinks.map((navLink) => (
      <ListItem button key={navLink.label} onClick={()=>{
        console.log(navLink.link)
        history.push(navLink.link)
      }}>
        <ListItemIcon>
          <navLink.icon></navLink.icon>
        </ListItemIcon>
        <ListItemText primary={navLink.label} />
      </ListItem>
    ))}
  </List>
  <Divider />
  </>
);

function Navbar(props) {
  const history = useHistory()
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const {mobileOpen, handleDrawerToggle} = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer(classes, history)}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer(classes, history)}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Navbar
