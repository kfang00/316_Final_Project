import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }
    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleClose() {
        store.closeCurrentList();
    }
    return (
        <div id="edit-toolbar">
            <Button
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained"
                style = {{color: "#4197bf", width: "96%", margin: "0px 2% 12px 2%", borderRadius: "15px", backgroundColor: "#edf2f2", border: "1px solid #4197bf", boxShadow: "none", fontWeight: "bold"}}>
                Add
            </Button>
            <div className = "edit-toolbar-bottom">
                <div>
                    <Button 
                        disabled={!store.canUndo()}
                        id='undo-button'
                        onClick={handleUndo}
                        variant="contained"
                        // className="toolbar-button"
                        style = {{borderRadius: "10px", fontSize: "9pt", margin: "5px", boxShadow: "none"}}>
                        Undo
                    </Button>
                    <Button 
                        disabled={!store.canRedo()}
                        id='redo-button'
                        onClick={handleRedo}
                        variant="contained"
                        // className="toolbar-button"
                        style = {{borderRadius: "10px", fontSize: "9pt", margin: "5px", boxShadow: "none"}}>
                        Redo
                    </Button>
                </div>
                <div>
                    <Button 
                        variant="contained"
                        // className="toolbar-button"
                        style = {{borderRadius: "10px", fontSize: "9pt", margin: "5px", boxShadow: "none"}}>
                        Publish
                    </Button>
                    <Button 
                        variant="contained"
                        // className="toolbar-button"
                        onClick={handleDeleteList}
                        style = {{borderRadius: "10px", fontSize: "9pt", margin: "5px", boxShadow: "none"}}>
                        Delete
                    </Button>
                    <Button 
                        variant="contained"
                        // className="toolbar-button"
                        style = {{borderRadius: "10px", fontSize: "9pt", margin: "5px", boxShadow: "none"}}>
                        Duplicate
                    </Button>
                </div>
            </div>
            {/* <Button 
                disabled={!store.canClose()}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button> */}
        </div>
    )
}

export default EditToolbar;