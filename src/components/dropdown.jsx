import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Fade,
    TextField
} from "@material-ui/core";
import {
    Autocomplete
} from "@material-ui/lab";

// The value chosen will be made available to parent through redux
function DropDown({ setStockSymbol, style = {} }) {
    const [search, setSearch] = useState("");
    const [options_array, setOptionsArray] = useState([]);

    //     const handleChange = (event) => {
    //     setSelected(event.target.value);
    //   };

    const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;// || "demo";
    function handleInputChange(e) {
        // eslint-disable-next-line no-undef
        setSearch(e.target.value);
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log("Received: ", data);
                if (!data["bestMatches"]) {
                    throw new Error(JSON.stringify(data));
                }
                data = data["bestMatches"].map(d => ({
                    symbol: d["1. symbol"],
                    name: d["2. name"],
                    type: d["3. type"],
                }));
                setOptionsArray(data || []);
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (<Autocomplete
        freeSolo
        id="stock-select"
        fullWidth
        // disableClearable
        TransitionComponent={Fade}
        onChange={(_, val) => setStockSymbol(val.symbol)}
        onInputChange={handleInputChange}
        className="dropbox"
        options={options_array}
        getOptionLabel={(opt) => (opt ? `${opt.name.substr(0, 15)} (${opt.symbol}; ${opt.type})` : "")}
        style={{ width: "40%", ...style }}
        renderInput={(params) => (
            <TextField
                {...params}
                value={search}
                label="Select Stock"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
            // style={{color: "whitesmoke"}}
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
    setStockSymbol: PropTypes.func,
    dropdown_list: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.object
};

export default DropDown;
