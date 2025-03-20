import {randomUUID} from "../source/core/utils/Utils";

const Prism = require('prismjs');
const beautify = require('js-beautify').js;
var Normalizer = require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

var samples = [
  /*{
    name: "Simple Voltage Chart",
    description: "Display the voltage of the line tracking sensor signal over time.",
    url: "simple-voltage-chart"
  },
  {
    name: "Rotary Encoder Chart",
    description: "Graphs the rotation of a rotary encoder over time.",
    url: "rotary-encoder-chart"
  },
  {
    name: "Datasource Video",
    description: "Display video.",
    url: "datasource-video"
  },

  {
    name: "Test",
    description: "Realtime chart",
    url: "chart"
  },*/
  {
    name: "ONVIF",
    description: "Display video and task camera.",
    url: "ptz-tasking"
  },
  {
    name: "Video H264",
    description: "Display video.",
    url: "video-h264"
  },

];

// load sample cards
var currentSample;
samples.forEach(s => {
  var $newElt = $($("#card-template").html());
  $("p.card-text", $newElt).html(s.description);
  $("img", $newElt)
    .on("error", e => e.target.src = "https://opensensorhub.files.wordpress.com/2017/08/opensensorhub-logo2.png")
    .attr("title", s.name)
    .attr("src", "images/screenshots/" + s.url + ".jpg");

  // setup handler to load sample in popup
  $("button", $newElt).on("click", e => {
    // load selected sample in modal
    currentSample = s;
    $("#src-code").empty();
    $("#src-code").hide();
    $("#sample-area").empty();
    $("#sample-area").show();

    const iframeId = randomUUID();
    const iframe = document.createElement("iframe");
      iframe.setAttribute("class","iframe-example");
    iframe.setAttribute("style","width:100%;height:100%;border:none;padding:0px");
    iframe.setAttribute("id", iframeId);
    //iframe.setAttribute("src",'examples/simple-voltage-chart/simple-voltage-chart.html');
    iframe.setAttribute("src",s.url+'.html');
    iframe.onload = function() {
        let $body = $('body', iframe.contentWindow.document);
        $body.css('margin', '0');
    }
    //     $body.load("" + s.url+'.html');
    // };

    const sampleArea = document.getElementById("sample-area");
    sampleArea.appendChild(iframe);

    $("#sample-dialog h5").html(s.name);
    $("#sample-dialog").modal("show");
  });
  $("#sample-list").append($newElt);
});

$("#close-button").button().on("click", e => {
    $("#sample-area").empty();
    $("#pre-code").addClass("hide");
});
// setup handler to show code in popup
$("#src-button").button().on("click", e => {
  if ($("#sample-area").is(":hidden")) {
    $("#sample-area").show();
    $("#src-code").hide();
    $("#src-code").empty();
    $("#pre-code").addClass("hide");
    $("#pre-code").removeClass("show");
    return;
  }

  let url = 'js'+'/'+currentSample.url+'.js';
  if(currentSample.code) {
      url = currentSample.code;
  }

  fetch(url)
    .then( r => r.text() )
    .then( srcString => {
      $("#src-code").empty();
      let html = Prism.highlight(srcString, Prism.languages.javascript);
      $("#sample-area").hide();
      $("#pre-code").removeClass("hide");
      $("#pre-code").addClass("show");
      $("#src-code").append(html);
      $("#src-code").show();
    });
});

$("#shared-button").button().on("click", e => {

  let url = currentSample.url+'.html';
  const win = window.open(url, '_blank');
  win.focus();
});
