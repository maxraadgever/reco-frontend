import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { menus } from "../../resources/text";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";
import { Button } from "@material-ui/core";
import { colors } from "../../resources/styles";
import { api } from "../../Util/Api";
import { formatEuro } from "../../Util/Util";
import DepositModal from "../Modal/DepositModal";
import { Role } from "../../resources/types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: colors.menuBlue
    },
    content: {
      flexGrow: 1
    },
    headerItem: {
      paddingRight: 20
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar
  })
);

type Props = {
  type: Role;
};

function ClippedDrawer(props: Props) {
  const [cookies, setCookie, removeCookie] = useCookies(["JwtCookieKey"]);
  const [balance, setBalance] = useState(0);
  const [portfolio, setPortfolio] = useState(0);
  const [investor, setInvestor] = useState({ level: "NEW" });
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const classes = useStyles();
  let [redirect, setRedirect] = React.useState();

  useEffect(() => {
    api.get(`/api/investor/balance`).then(response => {
      setBalance(response.data.balance || 0);
      setPortfolio(response.data.portfolio || 0);
    });
    api.get(`/api/investor/`).then(response => {
      setInvestor(response.data.investor);
    });
  }, []);

  const handleLogout = () => {
    setCookie("JwtCookieKey", "");
    removeCookie("JwtCookieKey");
    setRedirect(<Redirect to="/login" />);
  };

  const extraHeaders = () => {
    console.log("INVESTOR: ", investor);
    if (investor && props.type === Role.INVESTOR) {
      return (
        <React.Fragment>
          <Typography className={classes.headerItem} noWrap>
            Vrije ruimte: €{formatEuro(balance)}
          </Typography>
          <Typography className={classes.headerItem} noWrap>
            Portfolio: €{formatEuro(portfolio)}
          </Typography>{" "}
        </React.Fragment>
      );
    }
  };

  return (
    <div className={classes.root}>
      {redirect}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.content} variant="h6" noWrap>
            {menus.Name}
          </Typography>
          {extraHeaders()}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ClippedDrawer;
