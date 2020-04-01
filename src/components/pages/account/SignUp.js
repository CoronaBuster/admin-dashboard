import {Copyright, useStyles} from "./util";
import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import {SnackbarWrapper} from "../../../util/SnackbarComponent";
import {withRouter} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CONFIG from "../../../util/config";
 function SignUp() {
    const classes = useStyles();

    const [state, setState] = useState({
        email: ''
    });
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        variant: 'error'
    });

    const showMessage = (message, variant) => {
        setSnackbar({
            open: true,
            message,
            variant
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            open: false
        });
    };

    const submitForm = (e) => {
        showMessage('Sign up link was sent to email address, check it', 'success');
        console.error('TODO: implement reset password');
        e.preventDefault();
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create your {CONFIG.brand} Account
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


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={submitForm}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                Sign in to {CONFIG.brand}
                            </Link>
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

export default withRouter(SignUp)