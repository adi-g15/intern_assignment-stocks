import React, { useEffect, useState } from "react";
import DropDown from "./dropdown";
import {
    FormControl,
    Container
} from "@material-ui/core";
import Highcharts from "highcharts/highstock";
import "highcharts/themes/dark-unica";

export default function SeeChart() {
    const [chartData, setChartData] = useState([]);

    const symbolName = "";  // not as hook state; doesn't directly affect re rendering of any component
    const API_KEY = process.env.REACT_APP_ALPHA_API_KEY;// || "demo";

    function setStockSymbol(symbol) {
        symbol = symbol.trim();
        console.log("Symbol is: ", symbol);
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log("Received: ", data);
                if (data["Error Message"]) {
                    throw new Error(JSON.stringify(data));
                }
                const time_zone = data["Meta Data"] ? data["Meta Data"]["Time Zone"] : "UTC";
                let timezone_offset = time_zone === "US/Eastern" ? 300 : 0;

                const intraday = data["Time Series (5min)"];

                console.log(data);
                const new_data = [];
                for (let key in intraday) {
                    new_data.push([
                        Date.parse(key) + timezone_offset,
                        intraday[key]
                    ]);
                }

                symbol_name = symbol;
                setChartData(
                    new_data.map(pair => ({
                        date: pair[0],    // date
                        ohlc: [
                            parseFloat(pair[1]["1. open"]),
                            parseFloat(pair[1]["2. high"]),
                            parseFloat(pair[1]["3. low"]),
                            parseFloat(pair[1]["4. close"])
                        ],
                        volume: parseFloat(pair[1]["5. volume"])
                    }))
                );
            })
            .catch(err => {
                console.error(err);
            });
    }

    function updateChart() {
        const ohlc = [], volume = [];

        chartData.forEach(obj => {
            ohlc.push([obj.date, ...obj.ohlc]);
            volume.push([obj.date, obj.volume]);
        });

        Highcharts.color("dark-unica");
        Highcharts.stockChart("container", {
            yAxis: [
                {
                    labels: { align: "left" },
                    height: "80%",
                    resize: { enabled: true }
                }, {
                    labels: { align: "left" },
                    top: "80%",
                    height: "20%",
                    offset: 0
                }],
            tooltip: {
                shape: "square",
                headerShape: "callout",
                borderWidth: 0,
                // leave same as HighCharts docs
                positioner: function (width, _height, point) {
                    const chart = this.chart, position;

                    if (point.isHeader) {
                        position = {
                            x: Math.max(
                                chart.plotLeft,
                                Math.min(
                                    point.plotX + chart.plotLeft - width / 2,
                                    chart.chartWidth - width - chart.marginRight
                                )
                            ),
                            y: point.plotY
                        };
                    } else {
                        position = {
                            x: point.series.chart.plotLeft,
                            y: point.series.yAxis.top - chart.plotTop
                        };
                    }
                    return position;
                }
            },
            series: [{
                type: "ohlc",
                id: `${symbolName}-ohlc`,
                name: `${symbolName} Stock Price`,
                data: ohlc
            }, {
                type: "column",
                id: `${symbolName}-volume`,
                name: `${symbolName} Volume`,
                data: volume,
                yAxis: 1
            }],
            responsive: {
                rules: [{
                    condition: { maxWidth: 800 },
                    chartOptions: {
                        rangeSelector: { inputEnabled: false }
                    }
                }]
            }
        });
    }

    useEffect(() => {
        updateChart();
    }, [chartData]);

    return (
        <div className="see_chart">
            <FormControl style={{ width: "100%", alignItems: "center" }}>
                {/* <InputLabel htmlFor="stock-select" style={{ position: "relative", color: "whitesmoke" }}>Select Stock</InputLabel> */}
                <DropDown setStockSymbol={setStockSymbol} />
            </FormControl>
            <Container>
                <div id="container" className="chart"></div>
            </Container>
        </div>
    );
}
