
let mobilenet; // Classifier
let targetImg; // Image from user
let dropzone;  // Place to drop image

let labelP;
let confidenceP;


function modelReady() {
  console.log('Model is ready!!!');
  mobilenet.predict(targetImg, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].label;
    let confidence = results[0].confidence;

    fill(0);
    rect(0, height - 50, width, 50);
    fill(255);
    textSize(36);
    text(label, 10, height - 10);

    labelP.html("Label: " + label);
    let confidencePercent = nf(confidence * 100.0, 0, 2);
    confidenceP.html("Confidence: " + confidencePercent + "%");
  }
}

function imageReady() {
  image(targetImg, 0, 0, width, height);

}

function setup() {
  createCanvas(640, 550);

  background(0);
  labelP = createP("Label: ");
  labelP.id('label');
  confidenceP = createP("Confidence: ");
  confidenceP.id('label');

  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight); // (handlefile, dropevent)
}

function gotFile(file) {
  //createP(file.name + " " + file.size);
  //createP(file.type);

  targetImg = createImg(file.data, imageReady);
  targetImg.hide(); // Canvas上にのみイメージを配置したい。

  // generate Image classification object (model name, callback function)
  mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}

function highlight() {
  dropzone.style('background-color', '#ccc');
}

function unhighlight() {
  dropzone.style('background-color', '#fff');
}