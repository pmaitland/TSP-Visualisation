
var canvasWidth;

// line weights
var vertexStrokeWeight = 2,
    selectedVertexStrokeWeight = 4,

    edgeStrokeWeight = 1;
    animatedEdgeStrokeWeight = 4;

// COLOURS
// creating graph
var vertexColour = "#fff",
    selectedVertexColour = "#fff"
    vertexBorderColour = "#000",

    edgeColour = "#000",
    edgeWeightColour = "#000",

// animating
    currentVertexColour = "#f4e04d",
    nearestVertexColour = "#7bd389",
    partOfTourVertexColour = "#778da9",

    neartestEdgeColour = "#7bd389",
    partOfTourEdgeColour = "#778da9";

/**
  Called once at the very beginning.
 */
function setup() {
  canvasWidth = windowWidth * (2 / 3);

  var canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent("canvasHolder");
  canvas.style('display', 'block');

  createVertices();

  noLoop();
}

function windowResized() {
  canvasWidth = windowWidth * (2 / 3);
  resizeCanvas(canvasWidth, windowHeight);
  updateCanvasLayout();
}

/**
  Called once every loop.
 */
function draw() {
  background("#fff");

  drawAnimationEdges();
  drawEdges();
  drawEdgeWeights();
  drawVertices();
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
  redraw();
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
  var vertex1, vertex2;

  for (let edge of edgesInTour) {
    for (let vertex of vertices) {
      if (vertex.id == edge[0]) {
        vertex1 = vertex;
      } else if (vertex.id == edge[1]) {
        vertex2 = vertex;
      }
    }
    stroke(partOfTourEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
  }

  for (let edge of edgesToNearest) {
    for (let vertex of vertices) {
      if (vertex.id == edge[0]) {
        vertex1 = vertex;
      } else if (vertex.id == edge[1]) {
        vertex2 = vertex;
      }
    }
    stroke(neartestEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);

    fill(edgeWeightColour);
    strokeWeight(1);
    textSize(16);
    text(distances[vertex1.id][vertex2.id], (vertex1.x + vertex2.x) / 2, (vertex1.y + vertex2.y) /2);
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

    if (vertex.isNearest) {
      fill(nearestVertexColour);
    }
    if (vertex.isPartOfTour) {
      fill(partOfTourVertexColour);
    }
    if (vertex.isAt) {
      fill(currentVertexColour);
    }

    stroke(vertexBorderColour);
    ellipse(vertex.x, vertex.y, vertex.radius);
  }
}

/**
  Detect if the mouse is clicking on a vertex.
 */
function mousePressed() {
  // deselect the selected vertex
  selectedVertex = null;

  for (let v of vertices) {
    // check to see if the mouse has clicked the vertex
    if (mouseX > v.x - v.radius && mouseX < v.x + v.radius
      && mouseY > v.y - v.radius && mouseY < v.y + v.radius) {
      selectedVertex = v.id;
    }
  }
  redraw();
}
