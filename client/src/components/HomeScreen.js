import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import List from '@mui/material/List';
import { AppBar, Toolbar, Button, TextField, Box } from '@mui/material';
import { HomeOutlined, GroupsOutlined, PersonOutlineOutlined, SortOutlined } from '@mui/icons-material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [ searchText, setSearchText ] = useState("");

    // The menu's anchor element, i.e. where it will appear
    const [anchorEl, setAnchorEl] = useState(null);

    // Keeps track of if the menu is open (drawn) or not
    const isMenuOpen = Boolean(anchorEl);

    // Reponds to click on home button - calls store.setView("home")
    const handleClickHome = () => {

    }

    // Reponds to click on all lists button - calls store.setView("lists")
    const handleClickAllLists = () => {

    }

    // Reponds to click on users button - calls store.setView("users")
    const handleClickUserLists = () => {

    }
    
    // Calls setSearchText()
    const handleUpdateSearchText = (event) => {}
    
    // Calls store.setSearchText(searchText)
    const handleEnterSearchText = () => {}
    
    // Responds to click on "sort by" to open drop-down menu
    const handleSortByMenuOpen = (event) => {}
    
    // Responds to click away from menu, which closes it
    const handleMenuClose = () => {}
    
    // Responds to click on "Name (A - Z)" - calls store.sortLists("name")
    const handleSortByName = () => {}
    
    // Responds to click on "Publish Date (Newest)" - calls store.sortLists("publishDate")
    const handleSortByPublishDate = () => {}
    
    // Responds to click on "Listens (High - Low)" - calls store.sortLists("listens")
    const handleSortByListens = () => {}
    
    // Responds to click on "Likes (High - Low)" - calls store.sortLists("likes")
    const handleSortByLikes = () => {}
    
    // Responds to click on "Dislikes (High - Low)" - calls store.sortLists("dislikes")
    const handleSortByDislikes = () => {}

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    return (
        <div>
            <AppBar position="static" sx={{ bgcolor: "#edf2f2" }}>
                <Toolbar>
                    <Button
                        // disabled={false}
                        id='home-button'
                        onClick={handleClickHome}>
                        <HomeOutlined />
                    </Button>
                    <Button
                        // disabled={false}
                        id='all-lists-button'
                        onClick={handleClickAllLists}>
                        <GroupsOutlined />
                    </Button>
                    <Button
                        // disabled={false}
                        id='user-lists-button'
                        onClick={handleClickUserLists}>
                        <PersonOutlineOutlined />
                    </Button>
                    <TextField
                        // margin="normal"
                        // fullWidth
                        // id="email"
                        // label="Email Address"
                        // name="email"
                        // autoComplete="email"
                        // autoFocus
                    />
                    <Button
                        // disabled={false}
                        id='sort-by-button'
                        onClick={handleSortByMenuOpen}>
                        <SortOutlined />
                    </Button>
                </Toolbar>
            </AppBar>
            <div id = "home-layout">
                <Box>
                    <div id="playlist-selector">
                        <div id="list-selector-list">
                            {
                                listCard
                            }
                            <MUIDeleteModal />
                        </div>
                    </div>
                </Box>
                <Box>
                    <div>Hello</div>
                </Box>
            </div>
        </div>)
}

export default HomeScreen;