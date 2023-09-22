import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HandshakeIcon from '@mui/icons-material/Handshake';
import HomeIcon from "@mui/icons-material/Home";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";

type Anchor = "left";

interface TemporaryLeftDrawerProps {
  open: boolean;
  onClose: () => void;
}

const iconMapping: { [key: string]: JSX.Element } = {
  Home: <HomeIcon />,
  Schedule: <CalendarMonthIcon />,
  Tasks: <AssignmentIcon />,
  Team: <PeopleAltIcon />,
  Customers: <HandshakeIcon />,
  Announcements: <AnnouncementIcon />,
  Logout: <ExitToAppIcon />,
};

const items = ["Home", "Schedule", "Tasks", "Team", "Customers"];

function getListItemText(text: string): string {
  switch (text) {
    case "Schedule":
      return "Cronograma";
    case "Tasks":
      return "Atividades";
    case "Team":
      return "Colaboradores";
    case "Customers":
      return "Clientes";
    default:
      return text;
  }
}

const TemporaryLeftDrawer: React.FC<TemporaryLeftDrawerProps> = ({
  open,
  onClose,
}) => {
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      onClose();
    };

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer("left", false)}>
      <Box
        role="presentation"
        onClick={toggleDrawer("left", false)}
        onKeyDown={toggleDrawer("left", false)}
      >
        <List>
          {items.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
                <ListItemIcon>{iconMapping[text]}</ListItemIcon>
                <ListItemText primary={getListItemText(text)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default TemporaryLeftDrawer;
