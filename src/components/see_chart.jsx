import React, { useEffect } from "react";
import DropDown from "./dropdown";
import {
    InputLabel,
    FormControl,
    Container
} from "@material-ui/core";
import Highcharts from "highcharts/highstock";

export default function SeeChart() {
    useEffect(() => {
        fetch("https://demo-live-data.highcharts.com/aapl-ohlcv.json")
            .then(res => res.json()).then((data) => {
                // split the data set into ohlc and volume
                var ohlc = [],
                    volume = [],
                    dataLength = data.length,
                    i = 0;

                for (i; i < dataLength; i += 1) {
                    ohlc.push([
                        data[i][0], // the date
                        data[i][1], // open
                        data[i][2], // high
                        data[i][3], // low
                        data[i][4] // close
                    ]);

                    volume.push([
                        data[i][0], // the date
                        data[i][5] // the volume
                    ]);
                }

                Highcharts.stockChart("container", {
                    yAxis: [{
                        labels: {
                            align: "left"
                        },
                        height: "80%",
                        resize: {
                            enabled: true
                        }
                    }, {
                        labels: {
                            align: "left"
                        },
                        top: "80%",
                        height: "20%",
                        offset: 0
                    }],
                    tooltip: {
                        shape: "square",
                        headerShape: "callout",
                        borderWidth: 0,
                        shadow: false,
                        positioner: function (width, height, point) {
                            var chart = this.chart,
                                position;

                            if (point.isHeader) {
                                position = {
                                    x: Math.max(
                                        // Left side limit
                                        chart.plotLeft,
                                        Math.min(
                                            point.plotX + chart.plotLeft - width / 2,
                                            // Right side limit
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
                        id: "aapl-ohlc",
                        name: "AAPL Stock Price",
                        data: ohlc
                    }, {
                        type: "column",
                        id: "aapl-volume",
                        name: "AAPL Volume",
                        data: volume,
                        yAxis: 1
                    }],
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 800
                            },
                            chartOptions: {
                                rangeSelector: {
                                    inputEnabled: false
                                }
                            }
                        }]
                    }
                });
            });
    }, []);

    return (
        <div className="see_chart">
            <FormControl style={{ width: "100%", alignItems: "center" }}>
                <InputLabel htmlFor="stock-select" style={{ position: "relative", color: "whitesmoke" }}>Select Stock</InputLabel>
                <DropDown dropdown_list={["affsrf","435345df","345fsw"]} />
            </FormControl>
            <Container>
                <div id="container" className="chart"></div>
            </Container>
        </div>
    );
}
