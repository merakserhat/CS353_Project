import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SportMan from '../../assets/sport_man.png';
import { postLoginFe } from '../../data/network/Network';
import { GlobalContext } from '../../data/context/GlobalContextProps';
import { useNavigate } from 'react-router-dom';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// // TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function LoginPage() {
    const {setUser} = React.useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        const result: ApiResponse<LoginModel> = await postLoginFe(email, password);
        console.log(result);

        if (result.data.user) {
            console.log("Login successful");
            console.log(result.data.user);
            setUser(result.data.user);
            navigate('/');

        } else {
            alert("Login failed");
        }

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} alignItems={'center'} justifyContent={'center'} container>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, maxWidth: "400px", }}>
                            <TextField
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
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    container
                    xs={false}
                    sm={4}
                    md={5}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={
                        {
                            backgroundColor: "#EBF3FA",
                        }
                    }
                >
                    <Grid
                        sx={{
                            backgroundImage: `url(${SportMan})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            width: '300px',
                            height: '300px',
                            marginLeft: '40px',
                            marginRight: '40px',
                            backgroundPosition: 'center',
                        }} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginPage