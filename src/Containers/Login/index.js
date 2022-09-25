import React, { useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import omit from "lodash/omit";
import Paper from "@material-ui/core/Paper";
import { validateInput } from "../../Utils/InputValidator";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { login } from "../../Store/Actions/Auth";

function Login() {
  const { isAdmin, authError, isAuthenticating } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  // Setting up the input filds
  const [inputs, setinputs] = useState([
    {
      id: "el1",
      element: "input",
      type: "text",
      value: "",
      placeholder: "Full Name",
      label: "Name",
      validations: [{ rule: "notNull" }],
      valid: false,
      error: false,
      show: false,
    },
    {
      id: "el2",
      element: "input",
      type: "text",
      value: "",
      placeholder: "Enter Username",
      label: "Username",
      validations: [{ rule: "notNull" }],
      valid: false,
      error: false,
      show: true,
    },
    {
      id: "el3",
      element: "input",
      type: "password",
      value: "",
      placeholder: "Enter Password",
      label: "Password",
      validations: [{ rule: "notNull" }, { rule: "password" }],
      valid: false,
      error: false,
      show: true,
    },
  ]);
  const [isPageValid, setisPageValid] = useState(false);
  const [isSignin, setisSignin] = useState(true);

  // Input change handler
  const handleInputChange = React.useCallback(
    (event) => {
      const newValue = event.target.value;
      const inputIndex = inputs.findIndex(
        (input) => input.id === event.target.id
      );
      const newInput = { ...inputs[inputIndex] };
      newInput.value = newValue;

      if (newInput.validations) {
        for (let rule = 0; rule < newInput.validations.length; rule++) {
          newInput.error = validateInput(newValue, newInput.validations[rule]);
          if (newInput.error) {
            newInput.valid = false;
            break;
          } else {
            newInput.valid = true;
          }
        }
      }
      let newInputs = [...inputs];
      newInputs[inputIndex] = newInput;
      let status = true;
      for (let i = 0; i < newInputs.length; i++) {
        if (newInputs[i].show) {
          status = status && newInputs[i].valid;
        }
      }
      setisPageValid(status);
      setinputs(newInputs);
    },
    [inputs, setisPageValid, setinputs]
  );

  // Sign-in / sign-up toogle
  const loginToogleHandler = React.useCallback(
    (event) => {
      let newInputs = [...inputs];

      for (let i = 0; i < newInputs.length; i++) {
        newInputs[i].error = null;
        newInputs[i].valid = true;
        newInputs[i].value = "";
      }

      newInputs[0].show = !newInputs[0].show;

      setinputs(newInputs);
      setisSignin((prevState) => !prevState);
    },
    [inputs, setinputs, setisSignin]
  );

  //Login handler
  const handleLogin = React.useCallback(() => {
    const loginData = {
      username: inputs[1].value,
      password: inputs[2].value,
    };
    dispatch(login(loginData));
  }, [inputs, dispatch]);

  // handle input key press
  const handleKeyPress = React.useCallback(
    (event) => {
      if (
        (event.which === 13 || event.keycode === 13) &&
        isPageValid &&
        event.target.id === "el3"
      )
        handleLogin();
    },
    [isPageValid, handleLogin]
  );

  return (
    <div className="login">
      <Paper
        className={`form ${isSignin ? "signin" : "signup"}`}
        variant="elevation"
        square
        component="form"
        elevation={15}
      >
        <Typography variant="h5" component="h5" color="primary">
          {isAdmin ? "ADMIN LOGIN" : isSignin ? "SIGN IN" : "SIGN UP"}
        </Typography>
        <Grid container spacing={5} alignItems="center" justify="center">
          {inputs.map(
            (input) =>
              input.show && (
                <Grid item xs={12} className="input" key={input.id}>
                  <TextField
                    {...omit(input, ["valid", "show"])}
                    helperText={input.error}
                    error={Boolean(input.error)}
                    onChange={handleInputChange}
                    autoComplete="off"
                    variant="standard"
                    disabled={isAuthenticating}
                    fullWidth
                    required
                    color="primary"
                    onKeyPress={handleKeyPress}
                  />
                </Grid>
              )
          )}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          disabled={!isPageValid || isAuthenticating}
          onClick={handleLogin}
        >
          {isAuthenticating
            ? "Authenticating..."
            : isSignin
            ? "SIGN IN"
            : "SIGN UP"}
        </Button>
        {!isAdmin && (
          <Typography>
            {isSignin ? "Not a user ?" : "Switch back to"}{" "}
            <Button
              variant="text"
              color="secondary"
              onClick={loginToogleHandler}
            >
              {isSignin ? "SIGN UP" : "SIGN IN"}
            </Button>
          </Typography>
        )}
        {authError && <Typography color="error">{authError}</Typography>}
      </Paper>
      {isSignin && (
        <Paper variant="elevation" square elevation={5} className="credsBox">
          <Typography>Credentials:</Typography>
          <Typography>Username: {isAdmin ? "hopkins" : "johnd"}</Typography>
          <Typography>
            Password: {isAdmin ? "William56$hj" : "m38rmF$"}{" "}
          </Typography>
        </Paper>
      )}
    </div>
  );
}

export default React.memo(Login);
