import Button from '@mui/material/Button';
import Copyright from './Copyright';
import { Link } from 'react-router-dom';
import { GlobalStoreContext } from '../store'
import { useContext } from 'react';

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);

    function handleGuest() {
        store.setView("ALL_LISTS");
    }

    return (
        <div id="splash-screen">
            <img id = "splash-screen-logo" src = '/images/playlisterlogo.png' />
            <h2 id = "splash-screen-welcome">WELCOME</h2>
            <p id = "splash-screen-purpose">Playlister lets you create and share song playlists with others!</p>
            <div id = "splash-screen-buttons">
                <p id = "splash-screen-start">GET STARTED</p>
                <Button
                    id='login-button'>
                        <Link style = {{color: "white", textDecoration: "none"}} to='/login'>LOGIN</Link>
                </Button>
                <Button
                    id='signup-button'>
                        <Link style = {{color: "white", textDecoration: "none"}} to='/register'>CREATE ACCOUNT</Link>
                </Button>
                <Button
                    id='guest-button'
                    onClick={handleGuest}>
                        <Link style = {{color: "rgb(216, 87, 109)", textDecoration: "none"}} to='/'>CONTINUE AS GUEST</Link>
                </Button>
            </div>
            <Copyright />
        </div>
    )
}