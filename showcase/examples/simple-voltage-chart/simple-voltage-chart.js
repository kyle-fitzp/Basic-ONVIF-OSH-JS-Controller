// create data source for Android phone camera
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';

let chartDataSource = new SosGetResultJson("weather", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "192.168.1.139:8181/sensorhub/sos",
    offeringID: "urn:osh:sensor:hw-5111",
    observedProperty: "urn:osh:data:hw511",
    startTime: "now",
    endTime: "2055-01-01Z"
});

// #region snippet_curve_layer
let windSpeedLayerCurve = new CurveLayer({
    dataSourceId: chartDataSource.id,
    getValues: (rec) => {
        return {
            x: rec.sampleTime,
            y: (rec.isObservingLine ? 1 : 0)
        }
    },
    name: 'Is Observing Line'
});
// #endregion snippet_curve_layer

// Chart properties
let chartView = new ChartJsView({
    container: 'char-container',
    layers: [ windSpeedLayerCurve],
    css: "chart-view",
    chartjsProps: {
        chartProps: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        labelString: "Observation Status"
                    },
                    ticks: {
                        maxTicksLimit: 2
                    }, 
                    min: 0,
                    max: 1,
                    beginAtZero: true
                }],
                xAxes: [{
                    scaleLabel: {
                        labelString: "Time"
                    },
                    ticks: {
                        maxTicksLimit: 100
                    }
                }],
            }
        },
        datasetsProps: {
            backgroundColor: 'rgba(141,242,246, 0.1)'
        }
    }
});

// start streaming
chartDataSource.connect();
