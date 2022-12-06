import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Typography, TextField, ListItem, IconButton, Box} from "@mui/material";

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
            sx={{ display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '22pt'}}
            button
            onClick={handleClickListItem}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{playlistName}</Box>
            <Box sx={{ p: 1, flexGrow: 1 }}>{playlistName}</Box>
            <Box>
                <Typography></Typography>
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