var vertices;
var distances;

var stepsTaken = [];

var numIters = 1000;

var fileText = "";

var testInstances;

var maxBfVertexCount = 10,
    maxBbVertexCount = 15,
    maxNnVertexCount = 100;

window.onload = function() {
  testInstances = [
    ch130,    ch150,  eil101,   eil51,
    eil76,    gr120,  kroA100,  kroC100,
    kroD100,  lin105, pcb442,   pr76,
    rand10,   rand11, rand12,   rand13,
    rand14,   rand15, rand3,    rand4,
    rand5,    rand6,  rand7,    rand8,
    rand9,    rd100,  st70,     tsp225
  ];
};

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
  for (let instance of testInstances)
    if (instance.vertexCount <= maxBfVertexCount) runBf(instance);
  downloadResults(`BruteForce${numIters}.txt`);
}

function runBf(instance) {
  fileText += `\n${instance.name}: `;

  vertices  = generateVertices(instance.vertexCount);
  distances = instance.distances;

  for (let i = 0; i < numIters; i++)
    validateBf(bruteForce(), instance);
}

function validateBf(result, instance) {
  var errors = "";

  if (result.tour.length-1 != instance.vertexCount)
    errors += `Tour array only includes ${result.tour.length} vertices. `;
  if (result.tour[0] != result.tour[result.tour.length - 1])
    errors += `Tour does not start and return and same vertex. `;
  if (result.tourLength != instance.optimalTourLength)
    errors += `Non-optimal tour length returned. `;

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
  for (let instance of testInstances)
    if (instance.vertexCount <= maxBbVertexCount) runBb(instance);
  downloadResults(`BranchAndBound${numIters}.txt`);
}

function runBb(instance) {
  fileText += `\n${instance.name}:`;

  vertices  = generateVertices(instance.vertexCount);
  distances = instance.distances;

  for (let i = 0; i < numIters; i++)
    validateBb(branchAndBound(), instance);
}

function validateBb(result, instance) {
  var errors = "";

  if (result.tour.length-1 != instance.vertexCount)
    errors += `Tour array only includes ${result.tour.length} vertices. `;
  if (result.tour[0] != result.tour[result.tour.length - 1])
    errors += `Tour does not start and return and same vertex. `;
  if (result.tourLength != instance.optimalTourLength)
    errors += `Non-optimal tour length returned. `;

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
  for (let instance of testInstances)
    if (instance.vertexCount <= maxNnVertexCount) runNn(instance);
  downloadResults(`NearestNeighbour${numIters}.txt`);
}

function runNn(instance) {
  fileText += `\n${instance.name}:`;

  vertices  = generateVertices(instance.vertexCount);
  distances = instance.distances;

  for (let i = 0; i < numIters; i++)
    validateNn(nearestNeighbour(), instance);
}

function validateNn(result, instance) {
  var errors = "";

  if (result.tour.length-1 != instance.vertexCount)
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

function generateVertices(n) {
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
