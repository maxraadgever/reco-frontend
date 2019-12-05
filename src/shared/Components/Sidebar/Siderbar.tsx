import React from "react";
import {
  ListItem,
  ListItemIcon,
  Drawer,
  List,
  ListItemText
} from "@material-ui/core";
import ShowChart from "@material-ui/icons/ShowChart";
import HomeWork from "@material-ui/icons/HomeWork";
import Deck from "@material-ui/icons/Deck";
import Settings from "@material-ui/icons/Settings";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import { Role } from "../../resources/types/types";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { menus } from "../../resources/text";
import { Redirect } from "react-router";
import { colors } from "../../resources/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      background: colors.menuBlue,
      color: colors.white
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: {
      ...theme.mixins.toolbar
    },
    list: {
      padding: 0
    },
    icon: {
      color: colors.white
    }
  })
);

type Props = {
  type: Role;
};

export default function SideBar(props: Props) {
  let classes = useStyles();
  let items: ISideBarItem[] = [];
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [redirect, setRedirect] = React.useState();

  if (props.type === Role.INVESTOR) {
    items = [
      {
        text: menus.Portfolio,
        icon: <ShowChart />,
        link: "/portfolio"
      },
      {
        text: menus.Properties,
        icon: <HomeWork />,
        link: "/properties"
      },
      {
        text: menus.Settings,
        icon: <Settings />,
        link: "/settings"
      }
    ];
  } else if (props.type === Role.EMPLOYEE) {
    items = [
      {
        text: "Investeerders",
        icon: <Person />,
        link: "/reco/investors"
      },
      {
        text: menus.Properties,
        icon: <HomeWork />,
        link: "/reco/properties"
      },
      {
        text: menus.Parks,
        icon: <Deck />,
        link: "/reco/parks"
      },
      {
        text: menus.Settings,
        icon: <Settings />,
        link: "/reco/settings"
      }
    ];
  } else if (props.type === Role.ADMIN) {
    items = [
      {
        text: menus.Settings,
        icon: <Settings />,
        link: "/settings"
      }
    ];
  }

  const handleListClick = (event: any, item: ISideBarItem, index: any) => {
    setSelectedIndex(index);
    setRedirect(
      <Redirect key={new Date().getTime()} to={item.link} strict={true} />
    );
  };
  return (
    <div>
      <div className={classes.toolbar} />
      {redirect}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List className={classes.list}>
          {items.map((item: ISideBarItem, index) => (
            <ListItem
              button
              key={item.text}
              selected={
                selectedIndex === index ||
                (selectedIndex === undefined &&
                  window.location.pathname.includes(item.link))
              }
              onClick={event => handleListClick(event, item, index)}
            >
              <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

interface ISideBarItem {
  text: string;
  icon: any;
  link: string;
}
