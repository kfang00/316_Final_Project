import { TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function Comments() {
    const { store } = useContext(GlobalStoreContext);

    function handleClick(event) {

    }


    return (
        <div>
            Comments
            <TextField />
        </div>
    );
}

export default Comments;