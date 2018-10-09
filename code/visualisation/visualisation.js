
class Vertex {
  constructor(id, x, y, radius) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

var windowDividingLineX;

// line weights
var vertexStrokeWeight = 2,
    selectedVertexStrokeWeight = 3,

    edgeStrokeWeight = 1;

// colours
var vertexColour = "#FFF",
    selectedVertexColour = "#FFF",
    edgeColour = "#000",
    edgeWeightColour = "#000";

var distanceMatrix = [
  [ 0, 24, 28,  44, 91, 16,  38,  1, 84, 23],
  [24,  0, 83,  27, 67, 99,  82, 79, 65, 58],
  [28, 83,  0,  85, 39, 75,  59,  8, 86, 33],
  [44, 27, 85,   0, 72, 29, 100, 98, 41, 54],
  [91, 67, 39,  72,  0, 32,  17, 76, 90, 45],
  [16, 99, 75,  29, 32,  0,   4, 95, 93, 47],
  [38, 82, 59, 100, 17,  4,   0, 19,  7, 31],
  [ 1, 79,  8,  98, 76, 95,  19,  0, 37, 13],
  [84, 65, 86,  41, 90, 93,   7, 37,  0, 77],
  [23, 58, 33,  54, 45, 47,  31, 13, 77,  0]
];

var vertices = [],
    vertexCount = distanceMatrix.length;

var selectedVertex = null,
    draggingVertex = null,
    dragOffsetX, dragOffsetY;

/**
  Called once at the very beginning.
 */
function setup() {
	createCanvas(windowWidth, windowHeight);
  windowDividingLineX = windowWidth * (2 / 3);

  for (let i = 0; i < vertexCount; i++) {
		var r = Math.min(width, height) * (1 / 3),
				angle = (i / (vertexCount / 2)) * Math.PI,
				x = (r * Math.cos(angle)) + r * (3 / 2),
				y = (r * Math.sin(angle)) + r * (3 / 2),
        radius = 25;

		vertices.push(new Vertex(i, x, y, radius));
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowDividingLineX = windowWidth * (2 / 3);
}

/**
  Called once every loop.
 */
function draw() {
  background("#DDD");
  line(windowDividingLineX, 0, windowDividingLineX, windowHeight);

  drawEdges();
  drawVertices();
  fill("#FFF");
  rect(windowDividingLineX, 0, windowWidth - windowDividingLineX, windowHeight);
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
           fill(edgeColour);
           line(vertex.x, vertex.y, otherVertex.x, otherVertex.y);
           fill(edgeWeightColour);
           textSize(16);
           text(distanceMatrix[vertex.id][otherVertex.id], (vertex.x + otherVertex.x) / 2, (vertex.y + otherVertex.y) /2);
         }
       }
    }
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

    if (draggingVertex == vertex.id) {
      vertex.x = mouseX + dragOffsetX;
      vertex.y = mouseY + dragOffsetY;

      if (vertex.x > windowDividingLineX) {
        vertex.x = windowDividingLineX;
      } else if (vertex.x < 0) {
        vertex.x = 0;
      }

      if (vertex.y > height) {
        vertex.y = height;
      } else if (vertex.y < 0) {
        vertex.y = 0;
      }
    }

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
      // select and start dragging the vertex
      selectedVertex = v.id;
      draggingVertex = v.id;

      // use an offset to stop the vertex center from jumping to the mouse position
      dragOffsetX = v.x - mouseX;
      dragOffsetY = v.y - mouseY;
    }
  }
}

/**
  Stop dragging.
 */
function mouseReleased() {
  draggingVertex = null;
}
