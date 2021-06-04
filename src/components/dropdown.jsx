import React, {useState} from "react";
import PropTypes from "prop-types";
import {
    Fade,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from "@material-ui/core";

// The value chosen will be made available to parent through redux
function DropDown({dropdown_list,style={}}) {
    const [selected, setSelected] = useState("");
    const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return (
            <Select
            id="stock-select"
            fullWidth
            value={selected}
            defaultValue=""
            onChange={handleChange}
            displayEmpty
            TransitionComponent={Fade}
            className="dropbox"
            style={{color: "whitesmoke", width: "40%", ...style}}
            >
                <MenuItem style={{color: "black"}} value="Loading..." disabled><em style={{color: "black"}} >Loading...</em></MenuItem>
                {
                    dropdown_list.map((val,i) => (
                        <MenuItem value={val} key={i} style={{color: "black"}}>
                            {val}
                        </MenuItem>)
                    )
                }
            </Select>
    );
}

DropDown.propTypes = {
    dropdown_list: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object
};

export default DropDown;
