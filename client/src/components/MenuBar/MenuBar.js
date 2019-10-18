import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {NavLink} from 'react-router-dom';

import {Divider, List, ListItem, Hidden, Drawer } from '@material-ui/core';

const MenuList = {
    'school': [{name: 'My School', url: '/school/main'}, {name: 'Notifications', url: '/school/notifications'}, {name: 'Else', url: '/school/else'}],
    'myPage': ['My Portfolio, Profile, My Clubs', {name: 'Profile', url: '/mypage'}, {name: 'My Portfolio', url: '/mypage/portfolio'}, {name: 'My Clubs', url: '/mypage/clubs'}],
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },

}));


export default function MenuBar({onSignOut, container}) {
    const classes = useStyles();
    const theme = useTheme();

    const [selected, setSelected] = React.useState('myPage');

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        onSignOut();
        handleClose();
    };

    // code down here is for responsive drawer.

    //FIXME: url링크 맞게 수정해 나중에
    //TODO: divider 아래에 로그아웃, 마이페이지 바로갈수있게
    const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    { MenuList[selected].map((item) => (
                        <ListItem key={item.name}>
                            <NavLink exact onClick to={item.url}>{item.name}</NavLink>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </div>
    );

    //code up here is for responsive drawer.

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        Palette
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>

    );
}
