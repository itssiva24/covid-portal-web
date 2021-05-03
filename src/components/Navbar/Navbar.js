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
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const navLinks = [
  {
    icon:AssignmentIcon,
    label:"Requests",
    link:"/"
  },
  {
    icon:PostAddIcon,
    label:"New Request",
    link:"/newRequest"
  },
  {
    icon:MonetizationOnIcon,
    label:"Donations",
    link:"/donations"
  },
  {
    icon:AccountCircleIcon,
    label:"Account",
    link:"/me"
  }
]

const drawer = (classes)=>(
  <> 
  <header>
  <div className={classes.toolbar} />
  </header>
  <Divider />
  <List>
    {navLinks.map((navLink) => (
      <ListItem button key={navLink.label}>
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
/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar> */
function Navbar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const {mobileOpen, handleDrawerToggle} = props;
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
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
          {drawer(classes)}
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
          {drawer(classes)}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Navbar
