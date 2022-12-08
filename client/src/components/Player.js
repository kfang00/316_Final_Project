import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import YouTube from 'react-youtube';
import { Box, Typography } from '@mui/material';
import { FastForward, FastRewind, PlayArrow, Stop } from '@mui/icons-material';

function Player() {
    const { store } = useContext(GlobalStoreContext);
    const [ isPaused, setPaused ] = useState(false);

    let player = null;

    let iconBackColor = (store.currentList !== null && store.currentSongIndex > 0) ? "rgb(216, 87, 109)" : "#bfbfbf" 
    let iconFrontColor = (store.currentList !== null && store.currentSongIndex < store.getPlaylistSize() - 1 ) ? "rgb(216, 87, 109)" : "#bfbfbf"

    function handleClickBack(event) {
        if (store.currentList !== null && store.currentSongIndex > 0) {
            store.decSongIndex();
        }
    }

    function handleClickPause(event) {
        event.stopPropagation();
        player.pauseVideo();
    }

    function handleClickPlay(event) {
        event.stopPropagation();
        player.playVideo();
    }

    function handleClickForward(event) {
        if (store.currentList !== null && store.currentSongIndex < store.getPlaylistSize() - 1 ) {
            store.incSongIndex();
        }
    }


    const onPlayerReady = (event) => {
        event.target.playVideo();
        player = event.target;
    }

    const handleChange = (event) => {
        if (event.data === 0) {
            if (store.currentList !== null && store.currentSongIndex < store.getPlaylistSize() - 1 ) {
                store.incSongIndex();
            }
        }
    }

    const opts = {
        width: "100%",
        height: "200px",
        playerVars: {
            autoplay: 1
        }
    }

    return (
        <div>
            {(store.currentList !== null && store.getPlaylistSize() > 0 && store.currentSong === null) ? 
                <YouTube isPaused = {isPaused} videoId={store.currentList.songs[store.currentSongIndex].youTubeId} opts={opts} onReady = {onPlayerReady} onStateChange={handleChange}/>
                : <div style = {{height: "200px", backgroundColor: "#f7f7f7"}}></div>            
            }       
            <Box style = {{margin: "0px 8px"}}>
                <Typography style = {{padding: 7, fontWeight: "bold", textAlign: "center", fontFamily: "Lexend Exa", fontSize: "10pt", color: "rgb(216, 87, 109)"}}>Now Playing</Typography>
                {store.currentList !== null ? 
                    <div style = {{fontSize: "10pt"}}>
                        <div><b style = {{paddingRight: 8}}>Playlist:</b> {store.currentList.name}</div>
                        <div><b style = {{paddingRight: 8}}>Song #:</b>{store.getPlaylistSize() > 0 ? store.currentSongIndex + 1: ""}</div>
                        <div><b style = {{paddingRight: 8}}>Title:</b>{store.getPlaylistSize() > 0 ? store.currentList.songs[store.currentSongIndex].title : ""}</div>
                        <div><b style = {{paddingRight: 8}}>Artist:</b>{store.getPlaylistSize() > 0 ? store.currentList.songs[store.currentSongIndex].artist : ""}</div>
                    </div> 
                    : null 
                }
                <Box style = {{backgroundColor: "#ffeeed", padding: "5px 10px", margin: "10px 0px", display: "flex", justifyContent: "center", color: "rgb(216, 87, 109)"}}>
                    <FastRewind style = {{fontSize: "22pt", color: iconBackColor}} onClick={handleClickBack}/>
                    <Stop style = {{fontSize: "22pt"}} onClick={handleClickPause}/>
                    <PlayArrow style = {{fontSize: "22pt"}} onClick={handleClickPlay}/>
                    <FastForward style = {{fontSize: "22pt", color: iconFrontColor}} onClick={handleClickForward}/>
                </Box>
            </Box>
        </div>
    );
}

export default Player;