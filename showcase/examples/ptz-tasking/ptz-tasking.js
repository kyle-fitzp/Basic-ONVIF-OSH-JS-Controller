import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import FFMPEGView from 'osh-js/core/ui/view/video/FFMPEGView.js';
import OnvifTasking from './OnvifTasking.js';
import PtzTaskingView from 'osh-js/ext/ui/view/tasking/PtzTaskingView.js';

let videoDataSource = new SosGetResultVideo("drone-Video", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "localhost:8282/sensorhub/sos",
  offeringID: "urn:onvif:cam:C4D6553BCCDB",
  observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
  startTime: "now",
  endTime: "2035-12-19T21:09:19Z",
  replaySpeed: 1
});


// show it in video view using FFMPEG JS decoder
let videoView = new FFMPEGView({
  container: 'video-h264',
  css: 'video-h264',
  name: 'UAV Video',
  framerate:30,
  showTime: true,
  showStats: true,
  dataSourceId: videoDataSource.id
});

let ptzTask = new OnvifTasking("Ptz", {
    protocol: "http",
    service: "SPS",
    version: "2.0.0",
    endpointUrl: "localhost:8282/sensorhub/sps",
    procedure: "urn:onvif:cam:C4D6553BCCDB"
});
/*
let ptzView  = new PtzTaskingView("tasking-container",{
    dataSenderId:ptzTasking.id,
    presets:["Reset","TopMost","BottomMost","LeftMost","RightMost"]
});*/

// start streaming
videoDataSource.connect();
/*
ptzView.onChange = function(rpan, rtilt, rzoom, preset) {
    let cmdData = ptzTasking.getCommandData({
        cpan: rpan, ctilt:rtilt, czoom:rzoom, preset:preset
    });
    ptzTasking.sendRequest(cmdData);
};
*/
const left = document.getElementById("left");

left.onmousedown = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "-0.5", ctilt: "0.0", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
};
left.onmouseup = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0.0", ctilt: "0.0", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
}

const right = document.getElementById("right");

right.onmousedown = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0.5", ctilt: "0.0", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
};
right.onmouseup = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0.0", ctilt: "0.0", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
}

const up = document.getElementById("up");

up.onmousedown = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0.0", ctilt: "0.5", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
};
up.onmouseup = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0.0", ctilt: "0.0", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
}

const down = document.getElementById("down");

down.onmousedown = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0.0", ctilt: "-0.5", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
};
down.onmouseup = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0.0", ctilt: "0.0", czoom: "0.0"
  });
  ptzTask.sendRequest(cmdData);
}

