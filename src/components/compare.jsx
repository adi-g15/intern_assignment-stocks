import React from "react";
import DropDown from "./dropdown";
import {
    InputLabel,
    FormControl,
    Container
} from "@material-ui/core";

export default function SeeChart() {
    return (
        <div className="compare">
            <FormControl style={{width: "50%", alignItems: "center"}}>
                <InputLabel htmlFor="stock-select-a" style={{position: "relative", color: "whitesmoke"}}>Stock A</InputLabel>
                <DropDown id="stock-select-a" dropdown_list={[]} style={{width: "80%"}} />
            </FormControl>
            <FormControl style={{width: "50%", alignItems: "center"}}>
                <InputLabel htmlFor="stock-select-b" style={{position: "relative", color: "whitesmoke"}}>Stock B</InputLabel>
                <DropDown id="stock-select-b" dropdown_list={[]} style={{width: "80%"}} />
            </FormControl>
        </div>
    );
}
