import React from "react";
import "./Footer.css";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  return (
    <Paper
      component="footer"
      className="MuiAppBar-colorPrimary"
      square
      variant="elevation"
      elevation={5}
    >
      <Typography variant="h6" component="h6">
        Fake store Pvt. Ltd. {new Date().getFullYear()}
      </Typography>
    </Paper>
  );
};

export default React.memo(Footer);
