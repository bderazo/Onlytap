import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StyleIcon from "@mui/icons-material/Style";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import UpgradeIcon from "@mui/icons-material/Upgrade";

const MainListItems = ({ onShowReportes }) => (
  <React.Fragment>
    <ListItemButton onClick={onShowReportes}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText
        primary="PROXIMAMENTE"
        secondary="Reporte"
        sx={{ color: "red" }}
      />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <StyleIcon />
      </ListItemIcon>
      <ListItemText primary="Tarjeta" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ProductionQuantityLimitsIcon />
      </ListItemIcon>
      <ListItemText
        primary="PROXIMAMENTE"
        secondary="Accesorios"
        sx={{ color: "red" }}
      />
    </ListItemButton>
  </React.Fragment>
);

const SecondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Cuenta
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <UpgradeIcon />
      </ListItemIcon>
      <ListItemText primary="UPGRADE" />
    </ListItemButton>
  </React.Fragment>
);

export { MainListItems, SecondaryListItems };