// create data source for Android phone camera
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import {DATASOURCE_DATA_TOPIC} from 'osh-js/core/Constants';

let wasButtonPressed = false;


let chartDataSource = new SosGetResultJson("rotary-encoder", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "192.168.1.139:8181/sensorhub/sos",
    offeringID: "urn:osh:sensor:hw-0401",
    observedProperty: "urn:osh:data:hw040",
    startTime: "now",
    endTime: "2055-01-01Z",
    reconnectTimeout: 1000 * 60,
});

// #region snippet_curve_layer
let encoderLayerCurve = new CurveLayer({
    dataSourceId: chartDataSource.id,

    getValues: (rec) => {
        return {
            x: rec.sampleTime,
            y: (rec.encoderPosition)
        }
    },
    getStroke: (rec) => {
        return rec.encoderButton ? 0 : 1;
    },
    name: 'Encoder Rotation',
    
});
// #endregion snippet_curve_layer

// Chart properties
let chartView = new ChartJsView({
    container: 'char-container',
    layers: [ encoderLayerCurve],
    css: "chart-view",
    chartjsProps: {
        chartProps: {
            tension: 0,
            scales: {
                stepped: true,
                yAxes: [{
                    scaleLabel: {
                        labelString: "Rotation (deg)"
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }, 
                    suggestedMin: -360,
                    suggestedMax: 360,
                }],
                xAxes: [{
                    scaleLabel: {
                        labelString: "Time"
                    },
                    ticks: {
                        maxTicksLimit: 20
                    }
                }],
            },
            
        },
        datasetsProps: {
            backgroundColor: 'rgba(141, 152, 246, 0.1)',
            tension: 0,
            steppedLine: true
           
        }
    }
});



// start streaming
chartDataSource.connect();


// Connect checkbox to data stream
const encoderBroadcastChannel  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + chartDataSource.id);
const encoderCheckElement = document.getElementById('is-button-pressed');

// Toggle checkbox when sensor button is pressed
// Step chart to zero on button press (might not work)
encoderBroadcastChannel.onmessage = (message) => {
    let isButtonPressed = message.data.values[0].data.encoderButton

    encoderCheckElement.checked = isButtonPressed;
    
}

