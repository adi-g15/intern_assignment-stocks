import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { AppBar, Tabs, Tab, Container } from "@material-ui/core";

function Header({tabNum, setTabNum}) {
    const history = useHistory();

    return (
        <>
            <AppBar style={{ position: "relative" }}>
                <Container style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <span className="logo">StockAssess</span>
                    {/* <span class="separater"></span> */}
                    <span className="tabs">
                        <Tabs style={{ display: "inline-flex" }}>
                            <Tab onClick={()=>history.push("/")} label="See Chart"></Tab>
                            <Tab onClick={()=>history.push("/compare")} label="Compare"></Tab>
                        </Tabs>
                    </span>
                </Container>
            </AppBar>
        </>
    );
}

Header.propTypes = {
    tabNum: PropTypes.number,
    setTabNum: PropTypes.func
};

export default Header;
