import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Tabs, Tab, Container } from "@material-ui/core";

function Header() {
    const [selected, setSelected] = useState(0);
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
                        <Tabs
                            style={{ display: "inline-flex" }}
                            value={selected}
                            onChange={(_, i) => setSelected(i)}
                        >
                            <Tab onClick={() => history.push("/")} label="See Chart"></Tab>
                            <Tab onClick={() => history.push("/compare")} label="Compare"></Tab>
                        </Tabs>
                    </span>
                </Container>
            </AppBar>
        </>
    );
}

export default Header;
