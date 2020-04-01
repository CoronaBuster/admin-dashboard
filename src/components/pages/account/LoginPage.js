import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import {SnackbarWrapper} from "../../../util/SnackbarComponent";
import {Copyright, useStyles} from "./util";
import {withRouter} from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CONFIG from "../../../util/config";

function Login({onLoginAttempt,history}) {
    const classes = useStyles();

    const [state, setState] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [snackbar, setSnackbar] = React.useState({
        open:false,
        message:'',
        variant:'error'
    });

    const showMessage = (message,variant) => {
        setSnackbar({
            open:true,
            message,
            variant
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            open:false
        });
    };

    const submitForm = ()=>{
        onLoginAttempt(state).then(isSuccess => {
            if (isSuccess) {
                showMessage('Login successful, dashboard opening...','success')
            }else{
                showMessage('Email or password is wrong. Try again','error')
            }
        })
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in to {CONFIG.brand}
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
                        value={state.email}
                        onChange={(e) => setState({...state, email: e.target.value})}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="off"
                        value={state.password}
                        onChange={(e) => setState({...state, password: e.target.value})}
                        onKeyPress={
                            (e) => {
                                console.log('pressed',e.key)
                                if (e.key === 'Enter') {
                                    submitForm()
                                }
                            }
                        }


                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"
                                           checked={state.rememberMe}
                                           onChange={(e) => {
                                               console.log('check', e)
                                               setState({...state, rememberMe: !state.rememberMe})
                                           }}
                        />}
                        label="Remember me"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitForm}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            {/*<Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>*/}
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <SnackbarWrapper
                    onClose={handleClose}
                    variant={snackbar.variant}
                    message={snackbar.message}
                />
            </Snackbar>
        </Container>
    );
}


export default withRouter(Login);