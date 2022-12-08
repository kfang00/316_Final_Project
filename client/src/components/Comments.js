import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

function Comments() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [text, setText] = useState("");

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleTextEnter(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            store.addComment(text);
        }
    }

    function handleClickUsername(event) {
        event.stopPropagation();
        store.setView("USER_LISTS");
    }


    return (
        <div>
            {store.currentList !== null ? 
                <div style = {{overflow: "scroll", height: "36vh", margin: 10}}>
                    {store.currentList.comments.map((comment) => (
                        <Box style = {{backgroundColor: "#aedae6", padding: 15, margin: "10px 0px", borderRadius: 15}}>
                            <Typography style = {{textDecoration: "underline", color: "blue"}} onClick={handleClickUsername}><b>{comment.username}</b></Typography>
                            <Typography>{comment.comment}</Typography>
                        </Box>
                    ))} 
                </div>
                : null
            }
           
            <TextField 
                value = {text}
                onChange = {handleUpdateText}
                onKeyDown= {handleTextEnter}
                fullWidth
                disabled={store.currentList === null || (store.currentList !== null && store.currentList.isPublished === false) || auth.loggedIn === false}
            />
        </div>
    );
}

export default Comments;