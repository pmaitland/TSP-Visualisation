
var canvasWidth;

// line weights
var vertexStrokeWeight = 2,
    selectedVertexStrokeWeight = 4,

    edgeStrokeWeight = 1;
    animatedEdgeStrokeWeight = 4;

// COLOURS
// creating graph
var vertexColour         = "#fff",
    selectedVertexColour = "#fff",
    vertexBorderColour   = "#000",
    vertexLabelColour    = "#000",

    edgeColour       = "#000",
    edgeWeightColour = "#000",

    distanceMarkingsColour = "#c8c7c7",

// animating
    currentVertexColour    = "#f4e04d",
    nearestVertexColour    = "#7bd389",
    startingVertexColour   = "#43638b",
    partOfTourVertexColour = "#778da9",
    partOfTreeVertexColour = "#ff7c1d",
    oddDegreeVertexColour  = "#e817b4",
    waitingVertexColour    = "#e84747",

    neartestEdgeColour       = "#7bd389",
    partOfTourEdgeColour     = "#778da9",
    partOfTreeEdgeColour     = "#ff7c1d",
    partofMatchingEdgeColour = "#e817b4";

/**
  Called once at the very beginning.
 */
function setup() {
  canvasWidth = windowWidth * (2 / 3);

  var canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent("canvasHolder");
  canvas.style('display', 'block');

  createVertices();
}

function windowResized() {
  canvasWidth = windowWidth * (2 / 3);
  resizeCanvas(canvasWidth, windowHeight);
  if (!inEuclideanSpace) {
    updateCanvasLayout();
  }
}

/**
  Called once every loop.
 */
function draw() {
  background("#fff");
  if (inEuclideanSpace)
    drawDistanceMarkings();

  drawAnimationEdges();
  drawEdges();
  drawVertices();
  drawAnimationEdgeWeights();
  if (!inEuclideanSpace)
    drawNonEuclideanVertexLabels();
  drawEdgeWeights();

  if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < windowHeight) {
    updateMousePosition();
  }
}

function createVertices() {
  for (let i = 0; i < vertexCount; i++) {
    vertices.push({ id: i, label: i });
  }
}

function updateCanvasLayout() {
  for (let vertex of vertices) {
		var r = Math.min(canvasWidth, windowHeight) * (7/16),
				angle = (vertex.id / (vertexCount / 2)) * Math.PI,
				x = (r * Math.cos(angle)) + (canvasWidth / 2),
				y = (r * Math.sin(angle)) + (windowHeight / 2),
        nonEuclideanLabelX = ((r + 20) * Math.cos(angle)) + (canvasWidth / 2),
				nonEuclideanLabelY = ((r + 20) * Math.sin(angle)) + (windowHeight / 2),
        radius = 15;

    vertex.x = x;
    vertex.y = y;
    vertex.nonEuclideanLabelX = nonEuclideanLabelX;
    vertex.nonEuclideanLabelY = nonEuclideanLabelY;
    vertex.radius = radius;
	}
}

function drawDistanceMarkings() {
  stroke(distanceMarkingsColour);

  for (let i = 0; i < canvasWidth; i += 10) {
    if (i % 100 == 0) strokeWeight(2)
    else strokeWeight(1);
    line(i, 0, i, windowHeight);
  }

  for (let i = 0; i < windowHeight; i += 10) {
    if (i % 100 == 0) strokeWeight(2)
    else strokeWeight(1);
    line(0, i, canvasWidth, i);
  }
}

/**
  Draw edges from the selected vertex to every other vertex.
 */
function drawEdges() {
  strokeWeight(edgeStrokeWeight);

  for (let vertex of vertices) {
    if (selectedVertex == vertex.id) {
       for (let otherVertex of vertices) {
         if (vertex.id != otherVertex.id) {
           stroke(edgeColour);
           line(vertex.x, vertex.y, otherVertex.x, otherVertex.y);
         }
       }
    }
  }
}

function drawEdgeWeights() {
  for (let vertex of vertices) {
    if (selectedVertex == vertex.id) {
       for (let otherVertex of vertices) {
         if (vertex.id != otherVertex.id) {
           fill(edgeWeightColour);
           strokeWeight(1);
           textSize(16);
           text(distances[vertex.id][otherVertex.id], (vertex.x + otherVertex.x) / 2, (vertex.y + otherVertex.y) /2);
         }
       }
    }
  }
}

function drawAnimationEdges() {
  var v1, v2;

  // tree edges
  for (let edge of edgesInTree) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partOfTreeEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }

  // matching edges
  let dashLength = 4;
  for (let edge of edgesInMatching) {
    v1 = edge[0];
    v2 = edge[1];

    let leftVertex;
    if (v1.x < v2.x) leftVertex = v1;
    else leftVertex = v2;

    let topVertex;
    if (v1.y < v2.y) topVertex = v1;
    else topVertex = v2;

    let distanceBetweenVertices = distanceBetween(v1, v2);
    let xDistance = Math.abs(v1.x - v2.x);
    let yDistance = Math.abs(v1.y - v2.y);
    let numberOfDashes = distanceBetweenVertices / (dashLength * 2);
    let dx = xDistance / numberOfDashes;
    let dy = yDistance / numberOfDashes;

    let xValues = [];
    if (leftVertex.id == v1.id) {
      for (let i = 0; i < numberOfDashes; i++) {
        xValues.push(leftVertex.x + i*dx);
      }
    } else {
      for (let i = numberOfDashes - 1; i >= 0; i--) {
        xValues.push(leftVertex.x + i*dx);
      }
    }

    let yValues = [];
    if (topVertex.id == v1.id) {
      for (let i = 0; i < numberOfDashes; i++) {
        yValues.push(topVertex.y + i*dy);
      }
    } else {
      for (let i = numberOfDashes - 1; i >= 0; i--) {
        yValues.push(topVertex.y + i*dy);
      }
    }

    stroke(partofMatchingEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    for (let i = 0; i < numberOfDashes; i+=2)
      line(xValues[i], yValues[i], xValues[i+1], yValues[i+1]);
  }

  // tour edges
  for (let edge of edgesInTour) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partOfTourEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }

  // nearest neighbour edges
  for (let edge of edgesToNearest) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(neartestEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }
}

function drawAnimationEdgeWeights() {
  // nearest neighbour edge weights
  for (let edge of edgesToNearest) {
    v1 = edge[0];
    v2 = edge[1];

    fill(edgeWeightColour);
    strokeWeight(1);
    textSize(16);
    text(distances[v1.id][v2.id], (v1.x + v2.x) / 2, (v1.y + v2.y) /2);
  }
}

/**
  Draw every vertex.
 */
function drawVertices() {
  for (let vertex of vertices) {
    fill(vertexColour);
    strokeWeight(vertexStrokeWeight);

    if (selectedVertex == vertex.id) {
      fill(selectedVertexColour);
      strokeWeight(selectedVertexStrokeWeight);
    }

    if (vertex.isInTree)
      fill(partOfTreeVertexColour);
    if (vertex.isNearest)
      fill(nearestVertexColour);
    if (vertex.isOddDegree)
      fill(oddDegreeVertexColour);
    if (vertex.isPartOfTour)
      fill(partOfTourVertexColour);
    if (vertex.isStart)
      fill(startingVertexColour);
    if (vertex.isWaiting)
      fill(waitingVertexColour);
    if (vertex.isAt)
      fill(currentVertexColour);

    stroke(vertexBorderColour);
    ellipse(vertex.x, vertex.y, vertex.radius);
  }
}

function drawVertexLabel(v) {
  fill(vertexLabelColour);
  strokeWeight(1);
  textSize(16);
  text(v.label, v.x - v.radius / 2, v.y - v.radius);
}

function drawNonEuclideanVertexLabels() {
  for (let v of vertices) {
    fill(vertexLabelColour);
    strokeWeight(1);
    textSize(16);
    text(v.label, v.nonEuclideanLabelX - 5, v.nonEuclideanLabelY + 5);
  }
}

/**
  Detect if the mouse is clicking on a vertex.
 */
function mousePressed() {
  var isSelecting = false;
  // deselect the selected vertex
  selectedVertex = null;

  for (let v of vertices) {
    // check to see if the mouse has clicked the vertex
    if (mouseX > v.x - v.radius && mouseX < v.x + v.radius &&
        mouseY > v.y - v.radius && mouseY < v.y + v.radius) {
      selectedVertex = v.id;
      isSelecting = true;
    }
  }

  if (inEuclideanSpace && !isSelecting && mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < windowHeight) {
    var id = Math.max.apply(Math, vertices.map(function(v) { return v.id; })) + 1;
    if (id == -Infinity) {
      id = 0;
    }

    var v = {
      id: id,
      label: id,
      x: mouseX,
      y: mouseY,
      radius: 15
    };

    vertices.push(v);
    distances.push([]);
    for (let i = 0; i < vertexCount; i++) {
      let distance = distanceBetween(v, vertices[i]);
      distances[i][id] = distance;
      distances[id][i] = distance;
    }
    distances[id][id] = 0;
    vertexCount++;

    displayDistanceMatrix();
  }
}
