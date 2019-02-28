
var vertices;
var distances;

var stepsTaken = [];

var numIters = 1000;

var fileText = "";

var smallInstances  = [3,4,5,6,7,8,9,10];
var mediumInstances = [11,12,13,14,15,16,17,18,19,20];
var largeInstances  = [25,50,75,100,150,200];

function runAll() {
  runAllBf();
}

function downloadResults(filename) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileText));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// BRUTE FORCE

function runAllBf() {
  fileText = "";
  for (let s of smallInstances) runBf(s);
}

function runBf(n) {
  fileText += `\n${n}: `;
  for (let i = 0; i < numIters; i++) {
    generateEuclideanInstance(n);
    validateBf(bruteForce());
  }
  downloadResults(`BruteForce${numIters}.txt`);
}

function validateBf(result) {
  var errors = "";

  if (result.tour.length != vertices.length + 1)
    errors += `Tour array only includes ${result.tour.length} vertices. `;
  if (result.tour[0] != result.tour[result.tour.length - 1])
    errors += `Tour does not start and return and same vertex. `;

  if (errors.length == 0)
    fileText += "✓ ";
  else {
    fileText += "✘ ";
    fileText += errors;
  }
}

// BRANCH AND BOUND

function runAllBb() {
  fileText = "";
  for (let s of smallInstances) runBb(s);
}

function runBb(n) {
  fileText += `\n${n}: `;
  for (let i = 0; i < numIters; i++) {
    generateEuclideanInstance(n);
    validateBb(branchAndBound());
  }
  downloadResults(`BranchAndBound${numIters}.txt`);
}

function validateBb(result) {
  var errors = "";

  if (result.tour.length != vertices.length + 1)
    errors += `Tour array only includes ${result.tour.length} vertices. `;
  if (result.tour[0] != result.tour[result.tour.length - 1])
    errors += `Tour does not start and return and same vertex. `;

  if (errors.length == 0)
    fileText += "✓ ";
  else {
    fileText += "✘ ";
    fileText += errors;
  }
}

// NEAREST NEIGHBOUR

function runAllNn() {
  fileText = "";
  for (let s of smallInstances) runNn(s);
  for (let s of mediumInstances) runNn(s);
  for (let s of largeInstances) runNn(s);
}

function runNn(n) {
  fileText += `\n${n}: `;
  for (let i = 0; i < numIters; i++) {
    generateEuclideanInstance(n);
    validateBb(nearestNeighbour());
  }
  downloadResults(`NearestNeighbour${numIters}.txt`);
}

function validateNn(result) {
  var errors = "";

  if (result.tour.length != vertices.length + 1)
    errors += `Tour array only includes ${result.tour.length} vertices. `;
  if (result.tour[0] != result.tour[result.tour.length - 1])
    errors += `Tour does not start and return and same vertex. `;

  if (errors.length == 0)
    fileText += "✓ ";
  else {
    fileText += "✘ ";
    fileText += errors;
  }
}

// INSTANCE SETUP

function generateEuclideanInstance(n) {
  vertices = generateEuclideanVertices(n);
  distances = getEuclideanDistances();
}

function getEuclideanDistances() {
  var dist = [];

  for (let i = 0; i < vertices.length; i++) dist.push([]);

  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (i == j) dist[i][j] = 0;
      else {
        var d = distanceBetween(vertices[i], vertices[j]);
        dist[i][j] = d;
        dist[j][i] = d;
      }
    }
  }
  return dist;
}

function distanceBetween(v1, v2) {
  return Math.sqrt((v2.x-v1.x)**2 + (v2.y-v1.y)**2);
}

function generateEuclideanVertices(n) {
  var ver = [];
  for (let i = 0; i < n; i++) {
    ver.push({
      "id": i, 
      "x": Math.floor(Math.random()*1000) + 1,
      "y": Math.floor(Math.random()*1000) + 1
    });
  }
  return ver;
}

function generateNonEuclideanVertices(n) {
  var ver = [];
  for (let i = 0; i < n; i++)
    ver.push({"id": i});
  return ver;
}

function generateDistances(n) {
  var dist = [];

  for (let i = 0; i < n; i++) dist.push([]);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      if (i == j) dist[i][j] = 0;
      else {
        var d = Math.floor(Math.random()*1000) + 1;
        dist[i][j] = d;
        dist[j][i] = d;
      }
    }
  }
  return dist;
}
