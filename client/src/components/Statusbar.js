import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let text = "";
    if (store.currentList)
        text = store.currentList.name;

    return (
        <div>
            { auth.loggedIn ? <div id="top5-statusbar">
                <Typography variant="h4">{text}</Typography>
            </div> : null }
        </div>
    );
}

export default Statusbar;