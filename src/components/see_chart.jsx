import React from "react";
import DropDown from "./dropdown";
import {
    InputLabel,
    FormControl
} from "@material-ui/core";

export default function SeeChart() {
    return (
        <div className="see_chart">
            <FormControl style={{width: "100%", alignItems: "center"}}>
            <InputLabel htmlFor="stock-select" style={{position: "relative", color: "whitesmoke"}}>Select Stock</InputLabel>
            <DropDown dropdown_list={[]} />
            </FormControl>
        </div>
    );
}
