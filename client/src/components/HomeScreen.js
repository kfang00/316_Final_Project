import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import { AppBar, Toolbar, Button, TextField, Box, Menu, MenuItem, Tab, List, Tabs } from '@mui/material';
import { HomeOutlined, GroupsOutlined, PersonOutlineOutlined, SortOutlined } from '@mui/icons-material';
import Player from './Player';
import Comments from './Comments';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [ searchText, setSearchText ] = useState(store.searchText);
    const [tab, setTab] = useState(0);

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

    const handleClickPlayer = () => {
        setTab(0);
    }

    const handleClickComments = (event) => {
        setTab(1);
    }
    
    // Responds to click on "Name (A - Z)"
    const handleSortByName = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.setFilter("name");
    }
    
    // Responds to click on "Publish Date (Newest)"
    const handleSortByPublishDate = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.setFilter("-publishedDate");
    }

    const handleSortByCreationDate = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.setFilter("creationDate");
    }

    const handleSortByLastEditDate = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.setFilter("-lastEditDate");
    }
    
    // Responds to click on "Listens (High - Low)"
    const handleSortByListens = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.setFilter("-listens");
    }
    
    // Responds to click on "Likes (High - Low)"
    const handleSortByLikes = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.setFilter("-likes");
    }
    
    // Responds to click on "Dislikes (High - Low)"
    const handleSortByDislikes = (event) => {
        event.stopPropagation();
        handleMenuClose();
        store.setFilter("-dislikes");
    }

    useEffect(() => {
        store.loadIdNamePairs();
        console.log("rann");
    }, [store.currentView, store.searchText, store.currentFilter]);

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
            <MenuItem onClick={handleSortByCreationDate}>By Creation Date (Old-New)</MenuItem>
            <MenuItem onClick={handleSortByLastEditDate}>By Last Edit Date (New-Old)</MenuItem>
            <MenuItem onClick={handleSortByName}>By Name (A-Z)</MenuItem>
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
            <MenuItem onClick={handleSortByName}>Name (A-Z)</MenuItem>
            <MenuItem onClick={handleSortByPublishDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortByListens}>Listens (High - Low)</MenuItem>
            <MenuItem onClick={handleSortByLikes}>Likes (High - Low) </MenuItem>
            <MenuItem onClick={handleSortByDislikes}>Dislikes (High - Low)</MenuItem>
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

    let homeColor = !auth.loggedIn ? "#cfcfcf" : (store.currentView === "HOME" ? "black" : "rgb(216, 87, 109)")
    let homebgColor = auth.loggedIn ? "transparent" : "#e6e6e6";
    let listsColor = store.currentView === "ALL_LISTS" ? "black" : "rgb(216, 87, 109)"
    let usersColor = store.currentView === "USER_LISTS" ? "black" : "rgb(216, 87, 109)"
    return (
        <div>
            <AppBar position="static" sx={{ bgcolor: "#edf2f2" }}>
                <Toolbar>
                    <Button
                        disabled={!auth.loggedIn}
                        id='home-button'
                        onClick={handleClickHome}
                        style = {{backgroundColor: homebgColor}}>
                        <HomeOutlined style={{ fontSize: 34, color: homeColor }}/>
                    </Button>
                    <Button
                        // disabled={false}
                        id='all-lists-button'
                        onClick={handleClickAllLists}>
                        <GroupsOutlined style={{ fontSize: 34, color: listsColor }}/>
                    </Button>
                    <Button
                        // disabled={false}
                        id='user-lists-button'
                        onClick={handleClickUserLists}>
                        <PersonOutlineOutlined style={{ fontSize: 34, color: usersColor }}/>
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
                <Box style = {{marginTop: 15, padding: "10px 15px 5px 15px", backgroundColor: "white"}}>
                    <Tabs value={tab} indicatorColor="primary" textColor="primary" style={{marginBottom: 15}}>
                        <Tab style = {{fontFamily: "Lexend Exa", fontSize: "9pt"}} label = "Player" onClick={handleClickPlayer}/>
                        <Tab style = {{fontFamily: "Lexend Exa", fontSize: "9pt"}} label = "Comments" onClick={handleClickComments}/>
                    </Tabs>
                    {tab === 0 ? <Player /> : <Comments />}
                </Box>
            </div>
        </div>)
}

export default HomeScreen;