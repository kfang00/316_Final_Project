import { useContext } from 'react'
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AuthContext from '../auth'

export default function MUIAccountErrorModal() {
    const { auth } = useContext(AuthContext);
    return (
        <Modal
            open={auth.showAccountErrorModal}
        >
            <Alert 
                icon={<WarningAmberIcon style={{color: "white"}} />}
                style={{backgroundColor: "#e6aeda", color: "white"}}
                severity="warning"
                action={
                    <Button color="inherit" size="small" onClick={() => auth.hideAccountErrorModal()}>
                      <b>CLOSE</b>
                    </Button>
                  }
            >
                    <AlertTitle><b>Warning</b></AlertTitle>
                    {auth.errorMessage}
            </Alert>
        </Modal>
    );
}