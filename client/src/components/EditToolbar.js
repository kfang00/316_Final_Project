import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import AuthContext from '../auth'

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

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

    function handlePublish(event) {
        event.stopPropagation();
        store.publishList();
    }

    function handleDuplicate(event) {
        event.stopPropagation();
        store.duplicate();
    }

    async function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(store.currentList._id);
    }

    function handleClose() {
        store.closeCurrentList();
    }
    return (
        <div id="edit-toolbar">
            {!store.currentList.isPublished ? 
            <Button
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained"
                style = {{fontSize: "8pt", fontFamily: "Lexend Exa", color: "#4197bf", width: "96%", margin: "0px 2% 12px 2%", borderRadius: "15px", backgroundColor: "#edf2f2", border: "1px solid #4197bf", boxShadow: "none", fontWeight: "bold"}}>
                Add
            </Button> : null }
            <div className = "edit-toolbar-bottom">
                {!store.currentList.isPublished ? 
                    <div>
                        <Button 
                            disabled={!store.canUndo()}
                            id='undo-button'
                            onClick={handleUndo}
                            variant="contained"
                            // className="toolbar-button"
                            style = {{fontFamily: "Lexend Exa", borderRadius: "10px", fontSize: "8pt", margin: "5px", boxShadow: "none"}}>
                            Undo
                        </Button>
                        <Button 
                            disabled={!store.canRedo()}
                            id='redo-button'
                            onClick={handleRedo}
                            variant="contained"
                            // className="toolbar-button"
                            style = {{fontFamily: "Lexend Exa", borderRadius: "10px", fontSize: "8pt", margin: "5px", boxShadow: "none"}}>
                            Redo
                        </Button>
                    </div> : 
                    <div></div> }
                <div>
                    {!store.currentList.isPublished ? 
                        <Button 
                            variant="contained"
                            // className="toolbar-button"
                            onClick={handlePublish}
                            style = {{fontFamily: "Lexend Exa", borderRadius: "10px", fontSize: "8pt", margin: "5px", boxShadow: "none"}}>
                            Publish
                        </Button> : null }
                    {store.currentView === "HOME" ? 
                        <Button 
                            variant="contained"
                            // className="toolbar-button"
                            onClick={handleDeleteList}
                            style = {{fontFamily: "Lexend Exa", borderRadius: "10px", fontSize: "8pt", margin: "5px", boxShadow: "none"}}>
                            Delete
                        </Button> : null }
                    {auth.loggedIn !== false ? 
                        <Button 
                            variant="contained"
                            // className="toolbar-button"
                            onClick={handleDuplicate}
                            style = {{fontFamily: "Lexend Exa", borderRadius: "10px", fontSize: "8pt", margin: "5px", boxShadow: "none"}}>
                            Duplicate
                        </Button> : null }
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