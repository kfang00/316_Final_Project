import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    // bgcolor: 'background.paper',
    // border: '2px solid #2abae2',
    // boxShadow: 24,
    p: 4,
};

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong (event) {
        event.stopPropagation();
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong () {
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    function handleModalClick(event) {
        event.stopPropagation();
    }

    return (
        <Modal
            open={store.isRemoveSongModalOpen()}
            onClick = {handleModalClick}
        >
            <Box sx={style}>
                <div
                    id="remove-song-modal"
                    className={modalClass}
                    data-animation="slideInOutLeft">
                    <div className="modal-dialog" id='verify-remove-song-root'>
                        <div className="modal-header">
                            Remove {songTitle}?
                        </div>
                        <div className="dialog-header">
                            Are you sure you wish to permanently remove <b>{songTitle}</b> from the playlist?
                        </div>
                        <div id="confirm-cancel-container">
                            <input type="button" 
                                id="dialog-yes-button" 
                                className="modal-button" 
                                onClick={handleConfirmRemoveSong} 
                                value='Confirm' />
                            <input 
                                type="button" 
                                id="dialog-no-button" 
                                className="modal-button" 
                                onClick={handleCancelRemoveSong} 
                                value='Cancel' />
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}