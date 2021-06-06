// eslint-disable-next-line no-undef
const fetch = require("node-fetch");

// eslint-disable-next-line
exports.handler = async (event, _context) => {
    if (event.path === "/") {
        return {
            statusCode: 404
        };
    }

    console.log(event.path, event.path.indexOf("/"));

    const api_url = "https://www.alphavantage.co" + event.path + "&apikey=DAZ20E8GOU6IRU9T";
    console.log("Calling...", api_url);

    try {
        const res = await fetch(api_url);

        return {
            statusCode: 200,
            body: await res.text()
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 304,
            body: "{}"
        };
    }
};

    // "Access-Control-Allow-Origin", "*";
    // "Access-Control-Allow-Headers", "X-Requested-With";
