import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import {Box, List, Typography} from '@mui/material';
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    // if (store.currentList === null) {
    //     store.history.push("/");
    // }
    return (
        <Box sx = {{width: "100%"}}>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%'}}
        >
            { store.currentList ? (
                store.currentList.isPublished ? 
                <div className = "published-workspace">
                    { store.currentList.songs.map((song, index) => (
                        <Typography style = {{padding: "5px 0px", fontFamily: "Lexend Exa"}}>{`${index + 1}. ${song.title}`}</Typography>
                    )) } 
                </div>
                 : store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
            ) : null }
        </List>
        <EditToolbar />   
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;