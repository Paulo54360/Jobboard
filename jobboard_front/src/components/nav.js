import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Box, Drawer, List, ListItem, IconButton } from "@mui/material";
import {
  Home,
  Login,
  Logout,
  PersonAdd,
  Person,
  AddBusiness,
  Business,
  GroupAdd,
} from "@mui/icons-material/";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";

const values = {
  xs: 900,
  sm: 901,
  md: 901,
  lg: 901,
  xl: 920,
};

const theme = createMuiTheme({
  breakpoints: {
    keys: ["xs", "lg", "sm", "md", "lg", "xl"],
    up: (key) => `@media (min-width:${values[key]}px)`,
  },
});

export default function Navbar() {
  const [state, setState] = useState({
    left: false,
  });
  const [user, setUser] = useState(null);
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown") {
      return;
    }
    setState({ ...state, left: open });
  };

  useEffect(() => {
    let userLocal = JSON.parse(window.localStorage.getItem("userInfo"));
    setUser(userLocal);
  }, []);

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
  }));

  const classes = useStyles();

  const list = (text) => (
    <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {!user || (user && user.role !== 1) ? (
        <>
          <List>
            {" "}
            {/* Home/Adervtisements */}
            <Link className={classes.linkmobile} to="/">
              <ListItem button key={text}>
                Home
              </ListItem>
            </Link>
          </List>
          <List>
            {" "}
            {/*Sign In */}
            <Link className={classes.linkmobile} to="/Login">
              <ListItem button key={text}>
                SignIn
              </ListItem>
            </Link>
          </List>
          <List>
            {" "}
            {/*Sign Up*/}
            <Link className={classes.linkmobile} to="/connect">
              <ListItem button key={text}>
                SignUp
              </ListItem>
            </Link>
          </List>
          <List>
            {" "}
            {/*Sign Up*/}
            <Link className={classes.linkmobile} to="/userUpdate">
              <ListItem button key={text}>
                MyAccount
              </ListItem>
            </Link>
            <Link
              className={classes.linkmobile}
              to="/connect"
              onClick={() => localStorage.clear()}
            >
              <ListItem button key={text}>
                LogOut
              </ListItem>
            </Link>
          </List>{" "}
        </>
      ) : (
        <>
          <List>
            {" "}
            {/* Home/Adervtisements */}
            <Link className={classes.linkmobile} to="/admin/users">
              <ListItem button key={text}>
                Users
              </ListItem>
            </Link>
          </List>
          <List>
            {" "}
            {/*Sign In */}
            <Link className={classes.linkmobile} to="/admin/advertisements">
              <ListItem button key={text}>
                Advertisements
              </ListItem>
            </Link>
          </List>
          <List>
            {" "}
            {/*Sign Up*/}
            <Link className={classes.linkmobile} to="/admin/compagnies">
              <ListItem button key={text}>
                Compagnies
              </ListItem>
            </Link>
          </List>
          <List>
            {" "}
            {/*Sign Up*/}
            <Link
              className={classes.linkmobile}
              to="/admin/applyAdvertisements"
            >
              <ListItem button key={text}>
                Apply
              </ListItem>
            </Link>
            <Link
              className={classes.linkmobile}
              to="/connect"
              onClick={() => localStorage.clear()}
            >
              <ListItem button key={text}>
                LogOut
              </ListItem>
            </Link>
          </List>{" "}
        </>
      )}
    </Box>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Box
            theme={theme}
            sx={{
              display: {
                xs: "block",
                sm: "none",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
          >
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={state["left"]}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
                md: "block",
                lg: "block",
                xl: "block",
              },
            }}
          >
            <div className={classes.navlinks}>
              <Stack direction="row" spacing={6}>
                {!user || (user && user.role !== 1) ? (
                  <>
                    <Link className={classes.link} to="/">
                      <Home sx={{ mr: 1, my: -0.5 }} />{" "}
                      {/* Home/Adervtisements */}
                      Home
                    </Link>
                    <Link className={classes.link} to="/connect">
                      <Login sx={{ mr: 1, my: -0.5 }} /> {/*Sign In */}
                      Sign In{" "}
                    </Link>
                    <Link className={classes.link} to="/userUpdate">
                      <PersonAdd sx={{ mr: 1, my: -0.5 }} />
                      MyAccount
                    </Link>
                    <Link
                      className={classes.link}
                      onClick={() => localStorage.clear()}
                      to="/connect"
                    >
                      <Logout sx={{ mr: 1, my: -0.5 }} />
                      LogOut
                    </Link>{" "}
                  </>
                ) : (
                  <>
                    <Link className={classes.link} to="/admin/users">
                      {" "}
                      <Person sx={{ mr: 1, my: -0.5 }} />
                      Users
                    </Link>
                    <Link className={classes.link} to="/admin/advertisements">
                      {" "}
                      <AddBusiness sx={{ mr: 1, my: -0.5 }} />
                      Advertisements{" "}
                    </Link>
                    <Link className={classes.link} to="/admin/compagnies">
                      <Business sx={{ mr: 1, my: -0.5 }} />
                      Compagnies
                    </Link>
                    <Link
                      className={classes.link}
                      to="/admin/applyAdvertisements"
                    >
                      <GroupAdd sx={{ mr: 1, my: -0.5 }} />
                      Apply
                    </Link>
                    <Link
                      className={classes.link}
                      onClick={() => localStorage.clear()}
                      to="/connect"
                    >
                      <Logout sx={{ mr: 1, my: -0.5 }} />
                      LogOut
                    </Link>
                  </>
                )}
              </Stack>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
}
