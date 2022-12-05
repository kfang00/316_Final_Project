import { useContext, useEffect } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

    // useEffect(() => {
    //     if (auth.loggedIn) {
    //         console.log("hey");
    //         store.setView("HOME");
    //     };
    // }, [auth.loggedIn]);

    if (auth.loggedIn) {
        return <HomeScreen />
    }
    if (store.currentView === "SPLASH")
        return <SplashScreen />
    else
        return <HomeScreen />
}