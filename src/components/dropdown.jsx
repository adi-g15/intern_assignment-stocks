import React, {useState} from "react";
import PropTypes from "prop-types";
import {
    Menu,
    MenuItem
} from "@material-ui/core";

// The value chosen will be made available to parent through redux
function DropDown({dropdown_list}) {
    const [selected, setSelected] = useState("Loading...");

    return (
        <Menu>
            <MenuItem>Loading...</MenuItem>
            {
                dropdown_list.map((val,i) => (
                    <MenuItem key={i}>
                        {val}
                    </MenuItem>)
                )
            }
        </Menu>
    );
}

DropDown.propTypes = {
    dropdown_list: PropTypes.arrayOf(PropTypes.string)
};

export default DropDown;
