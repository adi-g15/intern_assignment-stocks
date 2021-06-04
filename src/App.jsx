// Since, in this, one page is enough for assignment, so creating a big App function here itself instead of using a 'page/'

import React, {useEffect, useState, lazy} from "react";
import {} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./components/header";
import "fontsource-roboto";
import SeeChartComponent from "./components/see_chart";
import CompareComponent from "./components/compare";

export default function App() {

    const [tabNum, setTabNum] = useState(0);

    useEffect(() => {
        // todo: Fetch list of stock symbols/name
    }, []);

    return (
            <BrowserRouter>
                <Header tabNum={tabNum} setTabNum={setTabNum} />
                    {/* <Route exact path="/" component={() => <SeeChartComponent/>} />
                    <Route exact path="/compare" component={() => <CompareComponent/>} /> */}
                    <Switch>
                        <Route exact path="/" component={() => <SeeChartComponent/>} />
                        <Route exact path="/compare" component={() => <CompareComponent/>} />
                    </Switch>
            </BrowserRouter>
    );
}
