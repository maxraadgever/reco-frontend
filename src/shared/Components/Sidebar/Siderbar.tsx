import React from "react";
import {
  Divider,
  ListItem,
  ListItemIcon,
  Drawer,
  List,
  ListItemText
} from "@material-ui/core";
import ShowChart from "@material-ui/icons/ShowChart";
import HomeWork from "@material-ui/icons/HomeWork";
import Settings from "@material-ui/icons/Settings";
import Dashboard from "@material-ui/icons/Dashboard";
import { Role } from "../../resources/types/types";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { menus } from "../../resources/text";

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
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar
  })
);

type Props = {
  type: Role;
};

export default function SideBar(props: Props) {
  let classes = useStyles();
  let items: ISideBarItem[] = [];

  if (props.type === Role.INVESTOR) {
    items = [
      {
        text: menus.Dashboard,
        icon: <Dashboard />
      },
      {
        text: menus.Portfolio,
        icon: <ShowChart />
      },
      {
        text: menus.Properties,
        icon: <HomeWork />
      },
      {
        text: menus.Settings,
        icon: <Settings />
      }
    ];
  } else if (props.type === Role.EMPLOYEE) {
    items = [
      {
        text: menus.Settings,
        icon: <Settings />
      }
    ];
  } else if (props.type === Role.ADMIN) {
    items = [
      {
        text: menus.Settings,
        icon: <Settings />
      }
    ];
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {items.map((item: ISideBarItem, index) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
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
}
