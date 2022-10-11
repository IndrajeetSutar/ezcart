import firebase from 'firebase';
import { Component } from 'react';
import { signInWithGoogle, isLoggedIn, getCurrentUser, signOut } from '../config/firebaseConfig';

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
import './login.css'
import LockIcon from '@material-ui/icons/Lock';

export const firestore = firebase.firestore();

export interface ILoginProps {

}
export interface ILoginState {
    user: firebase.User | null
}

class login extends Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            user: null
        }
    }

    render() {

        var user = getCurrentUser();
    

        return (

            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <div className="paper">
                    <Avatar className="avatar">
                        <LockIcon fontSize="medium" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={signInWithGoogle}
                    >
                        Sign In with Google
                        </Button>
                        
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={signOut}
                    >
                        Sign out 
                        </Button>
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={getCurrentUser}
                    >
                        Sign out 
                        </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                                </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <div></div>
                    <Box mt={1} fontSize={16}>
                        Or sign in with:
                    </Box>
                    <Box mt={1}>
                        <Grid container spacing={2}>
                            <Grid item>
                                {/* <div id="facebookIcon" onClick={signInWithFacebook}></div> */}
                            </Grid>
                            <Grid item>
                                <div id="googleIcon" onClick={signInWithGoogle}> Google</div>
                            </Grid>
                            <Grid item>
                                {/* <div id="twitterIcon" onClick={signInWithTwitter}></div> */}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <Box mt={8}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://material-ui.com/">
                            Your Website
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        )
    }
}
export default login;