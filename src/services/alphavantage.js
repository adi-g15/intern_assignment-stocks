// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;

/**
 * For simple abstraction, so that I can move between Polygon IO api or alphavantage api
 * 
 * @param {string} symbol_name 
 * 
 * @returns Promise, containing the returned data by API, or an Error object
 */
export async function get_intraday_data(symbol_name) {    // 5 min by default
    symbol_name = symbol_name.trim();
    const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol_name/*.substr(symbol_name.indexOf(".")+1)*/}&interval=5min&apikey=${API_KEY}`);
    let data = await res.json();

    console.debug("Received: ", data);

    if (data["Note"]) {  // Call limit reached, RETRY
        console.debug("Retrying...");
        const res = await fetch(`https://secondaryalphavantage.herokuapp.com/query?function=TIME_SERIES_INTRADAY&symbol=${symbol_name/*.substr(symbol_name.indexOf(".")+1)*/}&interval=5min`);
        // const res = await fetch(`/api/index/query?function=GLOBAL_QUOTE&symbol=${symbol_name.trim()}`);
        data = await res.json();
    }
    if (data["Error Message"])
        throw new Error(JSON.stringify(data));
    else
        return data;
}

/**
 * For search bar functionality
 * 
 * @param {string} search_input 
 * 
 * @returns Promise, containing the returned data by API, or an Error object
 */
export async function get_search_results(search_input) {  // returns at max 10 results
    const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search_input}&apikey=${API_KEY}`);
    let data = await res.json();

    console.debug("Received: ", data);
    if (data["Note"]) {  // Call limit reached, RETRY
        console.debug("Retrying...");
        const res = await fetch(`https://secondaryalphavantage.herokuapp.com/query?function=SYMBOL_SEARCH&keywords=${search_input}`);
        // const res = await fetch(`/api/index/query?function=GLOBAL_QUOTE&symbol=${symbol_name.trim()}`);
        data = await res.json();
    }
    if (!data["bestMatches"]) {
        throw new Error(JSON.stringify(data));
    }

    // prune the result, this function will only return these 3
    data = data["bestMatches"].map(d => ({
        symbol: d["1. symbol"],
        name: d["2. name"],
        type: d["3. type"],
    }));

    return data;
}


/**
 * A lightweight API, returns just 10 data points for the stock
 * 
 * @param {string} symbol_name 
 */
export async function get_global_quote(symbol_name) {
    const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol_name.trim()}&apikey=${API_KEY}`);
    let data = await res.json();

    console.debug("Received: ", data);
    if (data["Note"]) {  // Call limit reached, RETRY
        console.debug("Retrying...");
        const res = await fetch(`https://secondaryalphavantage.herokuapp.com/query?function=GLOBAL_QUOTE&symbol=${symbol_name.trim()}`);
        // const res = await fetch(`/api/index/query?function=GLOBAL_QUOTE&symbol=${symbol_name.trim()}`);
        data = await res.json();
    }
    if (!data["Global Quote"]) {
        throw new Error(JSON.stringify(data));
    }

    let obj = {
        symbol: data["Global Quote"]["01. symbol"] /**string */,
        open: parseFloat(data["Global Quote"]["02. open"]),
        high: parseFloat(data["Global Quote"]["03. high"]),
        low: parseFloat(data["Global Quote"]["04. low"]),
        price: parseFloat(data["Global Quote"]["05. price"]),
        volume: parseInt(data["Global Quote"]["06. volume"]),
        ltd: data["Global Quote"]["07. latest trading day"],
        previous_close: parseFloat(data["Global Quote"]["08. previous close"]),
        change: parseFloat(data["Global Quote"]["09. change"]),
        change_percent: data["Global Quote"]["10. change percent"],
    };
    return obj;
}
