import React, {useState} from "react";
import PropTypes from "prop-types";
import {
    Fade,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TextField
} from "@material-ui/core";
import {
    Autocomplete
} from "@material-ui/lab";

// The value chosen will be made available to parent through redux
function DropDown({selected="", setSelected, dropdown_list,style={}}) {
    const [options_array, setOptionsArray] = useState([]);

    const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (<Autocomplete
        freeSolo
        id="stock-select"
        fullWidth
        value={selected}
        disableClearable
        TransitionComponent={Fade}
        className="dropbox"
        style={{color: "whitesmoke", width: "40%", ...style}}
        options={options_array.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />);

    // return (
    //         <Select
    //         defaultValue=""
    //         onChange={handleChange}
    //         displayEmpty
    //         >
    //             <MenuItem style={{color: "black"}} value="Loading..." disabled><em style={{color: "black"}} >Loading...</em></MenuItem>
    //             {
    //                 dropdown_list.map((val,i) => (
    //                     <MenuItem value={val} key={i} style={{color: "black"}}>
    //                         {val}
    //                     </MenuItem>)
    //                 )
    //             }
    //         </Select>
    // );
}

DropDown.propTypes = {
    selected: PropTypes.string,
    setSelected: PropTypes.func,
    dropdown_list: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object
};

export default DropDown;
