var vertices;
var distances;

var stepsTaken = [];

var numIters = 1000;

var fileText = "";

var testInstances;

var numberOfInstances = 5;
var instanceSizes = [
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  20,
  25,
  30,
  50,
  100,
  150,
  200,
  300,
  500,
  750,
  1000,
  1250,
  1500,
  2000,
  5000
];

const BRUTE_FORCE_ID        = 0,
      BRANCH_AND_BOUND_ID   = 1,
      NEAREST_NEIGHBOUR_ID  = 2,
      APPROX_SPAN_TREE_ID   = 3,
      CHRISTOFIDES_ID       = 4,
      DFJ_ID                = 5,
      MTZ_ID                = 6;

const MAX_BF_VERTEX_COUNT  = 5,
      MAX_BB_VERTEX_COUNT  = 8,
      MAX_NN_VERTEX_COUNT  = 8,
      MAX_AP_VERTEX_COUNT  = 8,
      MAX_CH_VERTEX_COUNT  = 8,
      MAX_DFJ_VERTEX_COUNT = 8,
      MAX_MTZ_VERTEX_COUNT = 8;

var instanceID = 0;

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
  fileText += `instance_id,instance_size,algorithm_id,tour_length,runtime\n`;

  for (let i = 0; i < instanceSizes.length; i++) {
    for(let j = 0; j < numberOfInstances; j++) {
      let instance = generateEuclideanInstance(instanceSizes[i]);
      instance.id = instanceID;

      if (instance.vertexCount <= MAX_BF_VERTEX_COUNT) runBf(instance);
      // if (instance.vertexCount <= MAX_BB_VERTEX_COUNT) runBb(instance);
      // if (instance.vertexCount <= MAX_NN_VERTEX_COUNT) runNn(instance);
      // if (instance.vertexCount <= MAX_AP_VERTEX_COUNT) runAp(instance);
      // if (instance.vertexCount <= MAX_CH_VERTEX_COUNT) runCh(instance);
      // if (instance.vertexCount <= MAX_DFJ_VERTEX_COUNT) runDFJ(instance);
      // if (instance.vertexCount <= MAX_MTZ_VERTEX_COUNT) runMTZ(instance);
      instanceID++;
    }
  }

  downloadResults(`all.csv`);
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

function runBf(instance) {
  let t0 = performance.now();
  let result = bruteForce();
  let t1 = performance.now();
  fileText += `${instance.id},${instance.vertexCount},${BRUTE_FORCE_ID},${result.tourLength},${t1-t0}\n`;
}

// BRANCH AND BOUND

function runBb(instance) {
  let t0 = performance.now();
  let result = branchAndBound();
  let t1 = performance.now();
  fileText += `${instance.id},${instance.vertexCount},${BRANCH_AND_BOUND_ID},${result.tourLength},${t1-t0}\n`;
}

// NEAREST NEIGHBOUR

function runNn(instance) {
  let t0 = performance.now();
  let result = nearestNeighbour();
  let t1 = performance.now();
  fileText += `${instance.id},${instance.vertexCount},${NEAREST_NEIGHBOUR_ID},${result.tourLength},${t1-t0}\n`;
}

// APPROX MIN SPAN TREE

function runAp(instance) {
  let t0 = performance.now();
  let result = approxMinSpanTree();
  let t1 = performance.now();
  fileText += `${instance.id},${instance.vertexCount},${APPROX_SPAN_TREE_ID},${result.tourLength},${t1-t0}\n`;
}

// CHRISTOFIDES

function runCh(instance) {
  let t0 = performance.now();
  let result = christofides();
  let t1 = performance.now();
  fileText += `${instance.id},${instance.vertexCount},${CHRISTOFIDES_ID},${result.tourLength},${t1-t0}\n`;
}

// DFJ

function runDFJ(instance) {
  let t0 = performance.now();
  let result = integerProgrammingDFJ();
  let t1 = performance.now();
  fileText += `${instance.id},${instance.vertexCount},${DFJ_ID},${result.tourLength},${t1-t0}\n`;
}

// MTZ

function runMTZ(instance) {
  let t0 = performance.now();
  let result = integerProgrammingMTZ();
  let t1 = performance.now();
  fileText += `${instance.id},${instance.vertexCount},${MTZ_ID},${result.tourLength},${t1-t0}\n`;
}

// INSTANCE SETUP

function generateEuclideanInstance(n) {
  vertices = generateEuclideanVertices(n);
  distances = getEuclideanDistances();
  return {"distances": distances, "vertexCount": n};
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
