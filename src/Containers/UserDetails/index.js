import React from "react";
import "./UserDetails.css";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function UserDetails() {
  const { goBack } = useHistory();
  const { state } = useLocation();

  // Handle page back action
  const handleGoBack = React.useCallback(() => goBack(), [goBack]);

  // Redirecting to users page when the user data is not present in store, used this approch as the API didnt supported querrying for a specific user.
  if (!state) return <Redirect to="/users" />;

  return (
    <div className="User-details">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <IconButton color="secondary" onClick={handleGoBack}>
            <ArrowBackIcon color="secondary" />
          </IconButton>
          <Typography component="span" variant="h5">
            {state.user.name.first}
          </Typography>
        </Grid>
        <Grid item container>
          <Grid item>
            <Paper elevation={2} className="user-image-card">
              <img src={state.user.picture.large} alt={state.user.name.first} />
            </Paper>
          </Grid>
          <Grid item className="user-basic-section">
            <Grid item>
              <Typography color="textSecondary">Full Name: </Typography>
              <Typography variant="h6">
                {state.user.name.title}&nbsp;{state.user.name.first}&nbsp;
                {state.user.name.last}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">Gender: </Typography>
              <Typography variant="h6">{state.user.gender}</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">Email: </Typography>
              <Typography variant="h6">{state.user.email}</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">DOB: </Typography>
              <Typography variant="h6">
                {new Date(state.user.dob.date).toLocaleDateString()}&nbsp;(
                {state.user.dob.age} years)
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            className="user-additional-details-section"
            direction="column"
            item
            spacing={2}
          >
            <Grid item>
              <Typography color="textSecondary">Address: </Typography>
              <Typography variant="h6">
                {state.user.location.street.number}&nbsp;
                {state.user.location.street.name}, &nbsp;
                {state.user.location.city},&nbsp;{state.user.location.state}
                ,&nbsp;
                {state.user.location.country}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">Postal Code: </Typography>
              <Typography variant="h6">
                {state.user.location.postcode}
              </Typography>
            </Grid>
            state.
            <Grid item>
              <Typography color="textSecondary">Cell: </Typography>
              <Typography variant="h6">{state.user.cell}</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">Phone: </Typography>
              <Typography variant="h6">{state.user.phone}</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">Registered On: </Typography>
              <Typography variant="h6">
                {new Date(state.user.registered.date).toLocaleDateString()}
                &nbsp;(
                {state.user.registered.age} years)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default React.memo(UserDetails);
