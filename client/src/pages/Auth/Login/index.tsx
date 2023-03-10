import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Copyright } from "../../../components/Copyright/Copyright";

import { RouteNames } from "../../../router";
import { fetchLogin } from "../../../store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.authReducer);
  const goToRegistration = () => {
    navigate(RouteNames.REGISTRATION, { replace: true });
  };
  const [formData, setFormData] = useState({ username: "", password: "" });
  const onSubmit = () => {
    dispatch(fetchLogin(formData, navigate));
  };
  const onUserNameChange = (value: any) => {
    setFormData({ ...formData, username: value.target.value });
  };
  const onPasswordChange = (value: any) => {
    setFormData({ ...formData, password: value.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="User name"
            autoFocus
            onChange={onUserNameChange}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
            onKeyDown={(event) => event.code === "Enter" && onSubmit()}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {message}
            </Grid>
            <Grid item>
              <Link onClick={goToRegistration} variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
