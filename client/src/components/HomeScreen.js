import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import List from '@mui/material/List';
import { AppBar, Toolbar, Button, TextField, Box, Menu, MenuItem } from '@mui/material';
import { HomeOutlined, GroupsOutlined, PersonOutlineOutlined, SortOutlined } from '@mui/icons-material';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [ searchText, setSearchText ] = useState(store.searchText);

    // The menu's anchor element, i.e. where it will appear
    const [anchorEl, setAnchorEl] = useState(null);

    // Keeps track of if the menu is open (drawn) or not
    const isMenuOpen = Boolean(anchorEl);

    // Reponds to click on home button - calls store.setView("home")
    const handleClickHome = (event) => {
        event.stopPropagation();
        store.setView("HOME");
    }

    // Reponds to click on all lists button - calls store.setView("lists")
    const handleClickAllLists = (event) => {
        event.stopPropagation();
        store.setView("ALL_LISTS");
    }

    // Reponds to click on users button - calls store.setView("users")
    const handleClickUserLists = (event) => {
        event.stopPropagation();
        store.setView("USER_LISTS");
    }
    
    // Calls store.setSearchText(searchText)
    const handleEnterSearchText = (event) => {
        if (event.key === "Enter") {
            store.setSearchText(searchText);
        }
    }
    
    // Responds to click on "sort by" to open drop-down menu
    const handleSortByMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    // Responds to click away from menu, which closes it
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    
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
    }, [store.currentView]);

    const sortByMenuHome = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>By Creation Date (Old-New)</MenuItem>
            <MenuItem onClick={handleMenuClose}>By Last Edit Date (New-Old)</MenuItem>
            <MenuItem onClick={handleMenuClose}>By Name (A-Z)</MenuItem>
        </Menu>
    );

    const sortByMenuOther = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes (High - Low) </MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes (High - Low)</MenuItem>
        </Menu>
    );

    let sortByMenu = null;
    if (isMenuOpen) {
        if (store.currentView === 'HOME') {
            sortByMenu = sortByMenuHome
        } else {
            sortByMenu = sortByMenuOther
        }
    } else {
        sortByMenu = null
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '92%', left: '4%', bgcolor: '#c5d1d6' }}>
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
                        <HomeOutlined style={{ fontSize: 34 }}/>
                    </Button>
                    <Button
                        // disabled={false}
                        id='all-lists-button'
                        onClick={handleClickAllLists}>
                        <GroupsOutlined style={{ fontSize: 34 }}/>
                    </Button>
                    <Button
                        // disabled={false}
                        id='user-lists-button'
                        onClick={handleClickUserLists}>
                        <PersonOutlineOutlined style={{ fontSize: 34 }}/>
                    </Button>
                    <div id = "home-search-bar">
                        <TextField
                            label="Search"
                            fullWidth
                            value={searchText}
                            disabled={store.currentView === "HOME"}
                            onChange={(event) => setSearchText(event.target.value)}
                            onKeyDown={handleEnterSearchText}
                        />
                    </div>
                    <Button
                        // disabled={false}
                        id='sort-by-button'
                        onClick={handleSortByMenuOpen}>
                        <p style = {{paddingRight: 10}}>SORT BY</p>
                        <SortOutlined style={{ fontSize: 34 }}/>
                    </Button>
                </Toolbar>
            </AppBar>
            {sortByMenu}
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