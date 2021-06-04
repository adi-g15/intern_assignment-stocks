import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography"; import useScrollTrigger from "@material-ui/core/useScrollTrigger"; import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles"; import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"; import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu"; import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles((theme) => ({
    tabContainer: {
        marginLeft: "auto",
    },
    tab: {
        minWidth: 10,
        margin: "20px 25px 20px 0",
        opacity: 0.6,
        "&.Mui-selected": {
            borderBottom: "2px solid #fff",
            "&:hover": {
                opacity: 1,
            },
        },
        "&:hover": {
            opacity: 0.8,
        },
    },
    button: {
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
        "&:hover": {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));

const Header = ({ value, setValue, selectedIndex, setSelectedIndex }) => {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = useState(false);
    const handleChange = (e, newValue) => {
        e.preventDefault();
        setValue(newValue);
    };
    const menuOptions = [
        { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
        {
            name: "Custom Software Development",
            link: "/custom-software",
            activeIndex: 1,
            selectedIndex: 1,
        },
        {
            name: "IOS/Android App Development",
            link: "/mobile-apps",
            activeIndex: 1,
            selectedIndex: 2,
        },
        {
            name: "Website Develpment",
            link: "/web-sites",
            activeIndex: 1,
            selectedIndex: 3,
        },
    ];

    const routes = [
        { name: "Home", link: "/", activeIndex: 0 },
        { name: "About", link: "/about", activeIndex: 1 },];

    const tabs = (
        <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabContainer}
            indicatorColor="primary"
        >
            {routes
                .slice(0, 5)
                .map(({ name, link, ariaOwns, ariaHaspopup, onMouseOver }, idx) => (
                    <Link key={idx} to={link}>
                        <Tab
                            className={classes.tab}
                            label={name}
                            aria-owns={ariaOwns}
                            aria-haspopup={ariaHaspopup}
                            onMouseOver={onMouseOver}
                        />
                    </Link>
                ))}
        </Tabs>);

    const drawer = (
        <>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
            >
                <List disablePadding>
                    {routes.map(({ name, link, estimate, activeIndex }, idx) => (
                        <ListItem
                            component={Link}
                            to={link}
                            key={idx}
                            divider
                            button
                            onClick={() => {
                                setOpenDrawer(false);
                                setValue(idx);
                            }}
                            selected={value === activeIndex}
                        >
                            <ListItemText
                                disableTypography
                            >
                                {name}
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </SwipeableDrawer>
            <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
                disableRipple
            >
                <MenuIcon />
            </IconButton>
        </>
    );

    return (
        <>
            <ElevationScroll>
                <AppBar className={"appbar"}>
                    <Toolbar
                        disableGutters
                        style={{ maxWidth: "1280px", margin: "0 auto", width: "100%" }}
                    >
                        <Link to="/">
                            <Typography
                                onClick={() => {
                                    setValue(0);
                                }}
                                style={{ color: "#fff" }}
                            >
                                Material ui
                </Typography>
                        </Link>
                        {/* {matches ? drawer : tabs} */}
                        {tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </>);
};

Header.propTypes = {
    value: propTypes.string,
    setValue: propTypes.function,
    selectedIndex: propTypes.string,
    setSelectedIndex: propTypes.function,
};

export default Header;
