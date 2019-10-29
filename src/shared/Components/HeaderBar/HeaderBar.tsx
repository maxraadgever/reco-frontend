import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { menus } from "../../resources/text";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    content: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar
  })
);

export default function ClippedDrawer() {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(["JwtCookieKey"]);
  let [redirect, setRedirect] = React.useState();
  const handleLogout = () => {
    removeCookie("JwtCookieKey");
    setRedirect(<Redirect to="/" />);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        {redirect}
        <Toolbar>
          <Typography className={classes.content} variant="h6" noWrap>
            {menus.Name}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
