import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'

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

    function handleCreateNewList() {
        store.createNewList();
    }
    let addListButtonStyle = store.currentModal === "NONE" ? "white": "#b8b8b8";
    let addListButtonStyleBackground = store.currentModal === "NONE" ? "#aedae6": "#e3e3e3";
    return (
        <div>
            { store.currentView !== "SPLASH" ? 
            <div id="top5-statusbar">
                {(store.currentView === "HOME") ?
                    <div id="status-bar-add-list">
                        <Fab 
                            style={{color: `${addListButtonStyle}`, width: "45px", height: "45px", backgroundColor: `${addListButtonStyleBackground}`}}
                            aria-label="add"
                            id="add-list-button"
                            onClick={handleCreateNewList}
                        >
                            <AddIcon />
                        </Fab>
                        <Typography variant="h3" style = {{fontWeight: "400", fontSize: "32px", marginLeft: "10px", color: "white"}} >Your Lists</Typography>
                    </div> : null
                }
                <Typography variant="h4">{text}</Typography>
            </div> 
            : null }
        </div>
    );
}

export default Statusbar;