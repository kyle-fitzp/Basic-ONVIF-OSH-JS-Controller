import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import OnvifTasking from '../ptz-tasking/OnvifTasking.js'
import FFMPEGView from 'osh-js/core/ui/view/video/FFMPEGView.js';
//import YUVCanvas from 'osh-js/core/ui/view/video/YUVCanvas.js'
// create data source for UAV camera
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
  container: 'video-h264-container',
  css: 'video-h264',
  name: 'UAV Video',
  framerate:30,
  showTime: true,
  showStats: true,
  dataSourceId: videoDataSource.id
});


// start streaming
videoDataSource.connect();
/*
const left = document.getElementById("left");


left.mousedown = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "-1", ctilt: "0", czoom: "0"
  });
  ptzTask.sendRequest(cmdData);
};
left.onmouseup = () => {
  let cmdData = ptzTask.getCommandData({
    cpan: "0", ctilt: "0", czoom: "0"
  });
  ptzTask.sendRequest(cmdData);
}
*/