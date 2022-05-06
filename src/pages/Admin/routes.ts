// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import PeopleIcon from "@material-ui/icons/People";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
import InfoIcon from "@material-ui/icons/Info";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import GrainIcon from "@material-ui/icons/Grain";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import GroupsIcon from "@material-ui/icons/PeopleOutline";
import { ClubsManagement } from "@cenera/views/Club";
import { TeamsManagement } from "@cenera/views/Team";
import { PlayersManagement } from "@cenera/views/Player";
import { GameInfo, GameResults, GameLineUp, AwayTeam } from "@cenera/views/Games";
import { Booking, Configuration } from "@cenera/views/Activity";
import { Dashboard } from "@cenera/views/Dashboard";
import { UsersManagement } from "@cenera/views/UserManagement";
import SettingsIcon from '@material-ui/icons/Settings';

const appState =  JSON.parse(localStorage.getItem('appState'))



const adminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: DashboardIcon,
    layout: "/admin",
  },
  {
    state: "userManagementCollapse",
    collapse: true,
    name: "Admin",
    icon: AssignmentIndIcon,
    views: [
      {
        path: "/admin/users",
        name: "Manage Users",
        component: UsersManagement,
        icon: PeopleOutlineIcon,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/clubs",
    name: "Clubs",
    component: ClubsManagement,
    icon: LibraryBooksIcon,
    layout: "/admin",
  },
  {
    path: "/teams",
    name: "Teams",
    component: TeamsManagement,
    icon: PeopleIcon,
    layout: "/admin",
  },
  {
    path: "/players",
    name: "Players",
    component: PlayersManagement,
    icon: DirectionsRunIcon,
    layout: "/admin",
  },

  {
    state: "gameCollapse",
    collapse: true,
    name: "Games",
    icon: SportsSoccerIcon,
    views: [
      {
        path: "/game/info",
        name: "Game Info",
        component: GameInfo,
        icon: InfoIcon,
        layout: "/admin",
      },
      {
        path: "/game/line-up",
        name: "Line-Up",
        component: GameLineUp,
        icon: GrainIcon,
        layout: "/admin",
      },
      {
        path: "/game/results",
        name: "Results",
        component: GameResults,
        icon: EqualizerIcon,
        layout: "/admin",
      },
      {
        path: "/game/away-team",
        name: "Away Team",
        component: AwayTeam,
        icon: GroupsIcon,
        layout: "/admin",
      },
    ],
  },

  {
    collapse: true,
    name: "Activity",
    icon: SportsKabaddiIcon,
    views: [
      {
        path: "/activity/booking",
        name: "Booking",
        component: Booking,
        icon: EventAvailableIcon,
        layout: "/admin",
      },
      {
        path: "/activity/configuration",
        name: "Configuration",
        component: Configuration,
        icon: SettingsIcon,
        layout: "/admin",
      },
    ],
  },
];


if(appState && appState.allowBooking===false){
  adminRoutes.splice(adminRoutes.findIndex(a => a.name === "Activity") , 1)
  localStorage.removeItem("appState");
}
if(appState && appState.allowGameinfo===false){
  adminRoutes.splice(adminRoutes.findIndex(a => a.name === "Games") , 1)
  localStorage.removeItem("appState");
}



console.log(appState,"appstate");

export {adminRoutes}