import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, CssBaseline, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Stack, Box, Drawer, List, ListItem, IconButton } from "@mui/material";

export default function Navbar() {
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown") {
      return;
    }
    setState({ ...state, left: open });
  };

  const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
      alignItems: "center",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "white",
        borderBottom: "1px solid white",
      },
    },
    linkmobile: {
      textDecoration: "none",
      color: "blue",
      fontSize: "14px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "blue",
        borderBottom: "1px solid blue",
      },
    },
    MuiDrawer: {
      backgroundColor: "blue",
    },
  }));

  const classes = useStyles();

  const list = (text) => (
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {" "}
        {/* Users */}
        <Link className={classes.linkmobile} to="">
          <ListItem button key={text}>
            Users
          </ListItem>
        </Link>
      </List>

      <List>
        {" "}
        {/*Compagnies */}
        <Link className={classes.linkmobile} to="">
          <ListItem button key={text}>
            Compagnies
          </ListItem>
        </Link>
      </List>
      <List>
        {" "}
        {/*Advertisements*/}
        <Link className={classes.linkmobile} to="">
          <ListItem button key={text}>
            Adervtisements
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Box sx={{ display: { xs: "block", xl: "none" } }}>
          <IconButton onClick={toggleDrawer(true)} color="inherit">
            <MenuIcon />
          </IconButton>
          <Drawer
            classes={{ paper: classes.MuiDrawer }}
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </Box>
        <Box
          sx={{
            display: { xs: "none", xl: "block" },
          }}
        >
          <div className={classes.navlinks}>
            <Stack direction="row" spacing={6}>
              <Link className={classes.link} to="/">
                {" "}
                {/* Users */}
                Users
              </Link>

              <Link className={classes.link} to="/Login">
                {" "}
                {/*Compagnies */}
                Compagnies
              </Link>
              <Link className={classes.link} to="/connect">
                {" "}
                {/*Advertisements*/}
                Advertisements{" "}
              </Link>
            </Stack>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
