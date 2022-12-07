import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import {DeleteIcon, EditIcon, ThumbUpOutlined, ThumbDownOutlined, KeyboardDoubleArrowUp,  KeyboardDoubleArrowDown}from '@mui/icons-material';
import {Typography, TextField, ListItem, IconButton, Box} from "@mui/material";
import WorkspaceScreen from "./WorkspaceScreen";

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [showSongs, showSongsToggle] = useState(false);
    const { idNamePair, selected } = props;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function handleClickListItem(event) {
        if (event.detail === 2) {
            handleToggleEdit(event);
        } else if (event.detail === 1) {
            handleLoadList(event, idNamePair._id)
        }
    }


    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleClickUsername() {
        store.setView("USER_LISTS");
    }

    function handleShowSongs() {
        // store.setCurrentList(idNamePair._id);
        showSongsToggle(!showSongs);
        // store.setCurrentList(idNamePair._id).then(showSongsToggle(!showSongs));
        
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let playlistName = idNamePair.name;
    if (editActive) {
        playlistName =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 35}}}
                InputLabelProps={{style: {fontSize: 20}}}
                autoFocus
            />
    } else {
        playlistName = idNamePair.name
    }

    let cardElement = (
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            className={selectClass}
            sx={{ display: 'flex', p: 1, flexDirection: "column" }}
            style={{ margin: "6px 2% 15px 2%", width: '96%', fontSize: '22pt', backgroundColor: "white", borderRadius: 10, marginBottom: 15}}
            button
            onClick={handleClickListItem}
        >
            <Box style = {{width: '100%', display: 'flex', justifyContent: "space-between"}}>
                <div>
                    <Box sx={{ p: 1, flexGrow: 1, fontSize: '16pt' }}>{playlistName}</Box>
                    <Box sx={{ display: 'flex', flexGrow: 1, fontSize: '9pt', flexDirection: "row", padding: "1px 10px" }}>By: <Box sx = {{ textDecoration: "underline", color: "blue"}} onClick = {handleClickUsername}>{idNamePair.username}</Box></Box>
                </div>
                <div style = {{ height: "30px", display: "flex", fontSize: '9pt', alignItems: "center", padding: 5 }}>
                    <ThumbUpOutlined /> <p style = {{padding: "10px 20px"}}>{idNamePair.likes}</p>
                    <ThumbDownOutlined />  <p style = {{padding: "10px 20px"}}>{idNamePair.dislikes}</p>
                </div>
            </Box>
            {showSongs ? <WorkspaceScreen /> : null }
            <Box sx = {{display: "flex", width: "100%"}} style = {{justifyContent: "space-between", alignItems: "center"}}>
                <Typography style = {{fontSize: "9pt", display: "flex", alignItems: "center", padding: "0px 10px"}}>Published: <p style = {{color: "green", padding: "0px 5px"}}>{`${new Date(idNamePair.publishedDate).toDateString()}`}</p></Typography>
                <Typography style = {{fontSize: "9pt", display: "flex", alignItems: "center"}}>Listens: <p style = {{color: "red", padding: "0px 5px"}}>{`${idNamePair.listens}`}</p></Typography>
                <Box onClick = {handleShowSongs}>
                    {showSongs ? <KeyboardDoubleArrowUp /> : <KeyboardDoubleArrowDown />}
                </Box>
            </Box>
            {/* <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box> */}
            {/* <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'30pt'}} />
                </IconButton>
            </Box> */}
        </ListItem>
    )
    return (
        cardElement
    );
}

export default ListCard;