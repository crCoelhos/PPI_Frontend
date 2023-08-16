import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import ListItemIcon from "@mui/material/ListItemIcon";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import useSessionStorageUserData from "../../hooks/useSessionStorageUserData";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function PermanentLeftDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userData = useSessionStorageUserData();
  const name = userData ? userData : null;


  const iconMapping: { [key: string]: JSX.Element } = {
    Home: <HomeIcon />,
    Schedule: <CalendarMonthIcon />,
    Tasks: <AssignmentIcon />,
    Team: <PeopleAltIcon />,
    Announcements: <AnnouncementIcon />,
    Logout: <ExitToAppIcon />,
  };

  const drawer = (
    <div>
      <Toolbar>
        <h2 className="toolbar-user-name">{}</h2>
      </Toolbar>
      <Divider />
      <List>
        {["Home", "Schedule", "Tasks", "Team"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemIcon>{iconMapping[text]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {["Announcements", "Logout"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemIcon>{iconMapping[text]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Pagina inicial
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Typography paragraph>
          Carícias e declarações de amor De testemunha o nosso cobertor Minha
          cama esta tão fria sem você, baby Meu corpo já não sabe o que é prazer
          Que vontade, de ver você Nossa foto sobre a mesa E eu não resistir Vou
          sair, te ver agora Vou voltar a viver Pois sem você Minha vida é
          vazia, sem graça Como o dia sem sol Vou sair te ver agora Vou voltar a
          viver Pois sem você...
        </Typography>
        <Typography paragraph>
          Amor eu não te esqueço um só segundo Em casa, no trabalho O meu mundo
          Gira em torno só de você Eu estou apaixonada Como te esquecer? Vou
          sair, te ver agora Vou voltar a viver Pois sem você Minha vida é
          vazia, sem graça Como o dia sem sol Vou sair te ver agora Vou voltar a
          viver Pois sem você Nada tem graça, baby, fico perdida
        </Typography>
      </Box>
    </Box>
  );
}
