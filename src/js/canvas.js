
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

    edgeColour       = "#000",
    edgeWeightColour = "#000",

// animating
    currentVertexColour    = "#f4e04d",
    nearestVertexColour    = "#7bd389",
    partOfTourVertexColour = "#778da9",
    partOfTreeVertexColour = "#ff7c1d",

    neartestEdgeColour   = "#7bd389",
    partOfTourEdgeColour = "#778da9",
    partOfTreeEdgeColour = "#ff7c1d";

/**
  Called once at the very beginning.
 */
function setup() {
  canvasWidth = windowWidth * (2 / 3);

  var canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent("canvasHolder");
  canvas.style('display', 'block');

  noLoop();

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
  drawCurvedEdges();
  drawEdges();
  drawVertices();
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
        radius = 15;

    vertex.x = x;
    vertex.y = y;
    vertex.radius = radius;
	}
}

function drawDistanceMarkings() {
  stroke("#c8c7c7");

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

  for (let edge of edgesToNearest) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(neartestEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);

    fill(edgeWeightColour);
    strokeWeight(1);
    textSize(16);
    text(distances[v1.id][v2.id], (v1.x + v2.x) / 2, (v1.y + v2.y) /2);
  }

  for (let edge of edgesInTree) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partOfTreeEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }

  for (let edge of edgesInTour) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partOfTourEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }
}

function drawCurvedEdges() {
  for (let i = 0; i < curvedEdges.length; i++) {

    let edge = curvedEdges[i];

    let v1 = edge[0],
        v2 = edge[1];

    let c = {x: v1.x, y: v2.y};

    let x1 = c.x,
        y1 = c.y,
        x2 = v1.x,
        y2 = v1.y,
        x3 = v2.x,
        y3 = v2.y,
        x4 = c.x,
        y4 = c.y;

    noFill();
    stroke(edgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    curve(x1, y1, x2, y2, x3, y3, x4, y4);
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
    if (vertex.isPartOfTour)
      fill(partOfTourVertexColour);
    if (vertex.isAt)
      fill(currentVertexColour);

    stroke(vertexBorderColour);
    ellipse(vertex.x, vertex.y, vertex.radius);
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
      distances[id][id] = 0;
    }
    vertexCount++;

    displayDistanceMatrix();
  }

  redraw();
}
