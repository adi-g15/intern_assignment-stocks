// Since, in this, one page is enough for assignment, so creating a big App function here itself instead of using a 'page/'

import React, {useEffect} from "react";
import {} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/header";
import "fontsource-roboto";
import CompareComponent from "./components/compare";
import SeeChartComponent from "./components/see_chart";

export default function App() {
    useEffect(() => {
        // todo: Fetch list of stock symbols/name
    }, []);

    return (<>
            <Header />
            <BrowserRouter>
                <Route exact path="/" component={() => <SeeChartComponent/>} />
                {/* <Route exact path="/compare" component={() => <CompareComponent/>} /> */}
            </BrowserRouter>
        </>
    );
}
