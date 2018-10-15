
var StepsEnum = Object.freeze({
  at:                 0,
  nearest:            1,
  addToTour:          2,
  move:               3,
  increaseTourLength: 4,
  last:               5
});

var stepsTaken,
    currentAnimationStep = 0,
    playingAnimation = false,
    edgesInTour = [],
    edgeToNearest = [];

var canvasWidth;

// line weights
var vertexStrokeWeight = 2,
    selectedVertexStrokeWeight = 4,

    edgeStrokeWeight = 1;

// COLOURS
// creating graph
var vertexColour = "#fff",
    selectedVertexColour = "#fff"
    vertexBorderColour = "#000",

    edgeColour = "#000",
    edgeWeightColour = "#000",

// animating
    atVertexColour = "#f4e04d",
    nearestVertexColour = "#7bd389",
    partOfTourVertexColour = "#778da9",

    neartestEdgeColour = "#7bd389",
    partOfTourEdgeColour = "#778da9";

var distances = [
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
    vertexCount = distances.length;

var selectedVertex = null,
    draggingVertex = null,
    dragOffsetX, dragOffsetY;

/**
  Called once at the very beginning.
 */
function setup() {
  canvasWidth = windowWidth * (2 / 3);

  var canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent("canvasHolder");
  canvas.style('display', 'block');

  for (let i = 0; i < vertexCount; i++) {
		var r = Math.min(canvasWidth, windowHeight) * (1 / 3),
				angle = (i / (vertexCount / 2)) * Math.PI,
				x = (r * Math.cos(angle)) + r * (3 / 2),
				y = (r * Math.sin(angle)) + r * (3 / 2),
        radius = 25;

		vertices.push({
      id: i,
      x: x,
      y: y,
      radius: radius,
      label: i.toString()
    });
	}

  displayDistanceMatrix();
}

function windowResized() {
  canvasWidth = windowWidth * (2 / 3);
  resizeCanvas(canvasWidth, windowHeight);
}

/**
  Called once every loop.
 */
function draw() {
  background("#fff");

  drawEdges();
  drawAnimationEdges();
  drawVertices();
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
           fill(edgeWeightColour);
           textSize(16);
           text(distances[vertex.id][otherVertex.id], (vertex.x + otherVertex.x) / 2, (vertex.y + otherVertex.y) /2);
         }
       }
    }
  }
}

function drawAnimationEdges() {
  var vertex1, vertex2;
  strokeWeight(4);

  for (let edge of edgesInTour) {
    for (let vertex of vertices) {
      if (vertex.id == edge[0]) {
        vertex1 = vertex;
      } else if (vertex.id == edge[1]) {
        vertex2 = vertex;
      }
    }
    stroke(partOfTourEdgeColour);
    line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
  }

  if (edgeToNearest.length > 0) {
    for (let vertex of vertices) {
      if (vertex.id == edgeToNearest[0]) {
        vertex1 = vertex;
      } else if (vertex.id == edgeToNearest[1]) {
        vertex2 = vertex;
      }
    }
    stroke(neartestEdgeColour);
    line(vertex1.x, vertex1.y, vertex2.x, vertex2.y);
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

      if (vertex.x > canvasWidth) {
        vertex.x = canvasWidth;
      } else if (vertex.x < 0) {
        vertex.x = 0;
      }

      if (vertex.y > height) {
        vertex.y = height;
      } else if (vertex.y < 0) {
        vertex.y = 0;
      }
    }

    if (vertex.isPartOfTour) {
      fill(partOfTourVertexColour);
    }
    if (vertex.isNearest) {
      fill(nearestVertexColour);
    }
    if (vertex.isAt) {
      fill(atVertexColour);
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

function displayDistanceMatrix() {

  // get distance matrix element from HTML
  var distanceMatrix = document.getElementById("distanceMatrix");

  var labelRow = distanceMatrix.insertRow(0),
      row, cell;

  // leave the top-left cell empty
  labelRow.insertCell(0)

  // fill the top row with vertex labels
  for (let vertex of vertices) {
    cell = labelRow.insertCell(vertex.id + 1);
    cell.setAttribute("contenteditable", true);
    cell.id = vertex.id + "label";
    cell.addEventListener("blur", function(){editVertexLabel(vertex.id, this.innerHTML)});
    cell.innerHTML = vertex.label;
  }

  // create a row for every vertex
  for (let i = 0; i < vertexCount; i++) {
    row = distanceMatrix.insertRow(i + 1);

    // insert the vertex label in the first cell of its row
    cell = row.insertCell(0);
    cell.setAttribute("contenteditable", true);
    cell.innerHTML = vertices[i].label;

    // fill the rest of the row with distances to other vertices
    for (let j = 0; j < vertexCount; j++) {
      cell = row.insertCell(j + 1);
      cell.setAttribute("contenteditable", true);
      cell.innerHTML = distances[i][j];
    }
  }

}

function editVertexLabel(vertexID, newLabel) {
  for (let vertex of vertices) {
    if (vertex.id == vertexID) {
      vertex.label = newLabel;
    }
  }
}

function restartAnimation() {
  currentAnimationStep = 0;
  playingAnimation = true;
  setInterval(function(){
    playAnimationStep()
  }, 1000);
}

function playAnimationStep() {
  if (playingAnimation) {
    if (currentAnimationStep < animationSteps.length) {

      currentStep = animationSteps[currentAnimationStep];

      var stepAsString = "";

      var vertex1, vertex2;

      switch (currentStep[0]) {
        case StepsEnum.at:
          for (let vertex of vertices) {
            if (vertex.id == currentStep[1]) {
              vertex.isAt = true;
              vertex.isPartOfTour = true;
              stepAsString = "At vertex " + vertex.label;
            }
          }
          break;

        case StepsEnum.nearest:
          for (let vertex of vertices) {
            if (vertex.id == currentStep[1]) {
              vertex1 = vertex;
            } else if (vertex.id == currentStep[2]) {
              vertex.isNearest = true;
              vertex2 = vertex;
            }
          }
          edgeToNearest = [currentStep[1], currentStep[2]];

          stepAsString = "Nearest to vertex " + vertex1.label + " is vertex " + vertex2.label;
          break;

        case StepsEnum.addToTour:
          for (let vertex of vertices) {
            if (vertex.id == currentStep[1]) {
              vertex.isPartOfTour = true;
              stepAsString = "Added vertex " + vertex.label + " to the final tour";
            }
          }
          break;

        case StepsEnum.move:
          for (let vertex of vertices) {
            if (vertex.id == currentStep[1]) {
              vertex.isAt = false;
              vertex1 = vertex;
            } else if (vertex.id == currentStep[2]) {
              vertex.isAt = true;
              vertex.isNearest = false;
              vertex2 = vertex;
            }
          }
          edgesInTour.push([currentStep[1], currentStep[2]]);
          edgeToNearest = [];

          stepAsString = "Moved from vertex " + vertex1.label + " to vertex " + vertex2.label;
          break;

        case StepsEnum.increaseTourLength:
          stepAsString = "Added " + currentStep[1] + " to tour length. Current tour length is " + currentStep[2];
          break;

        case StepsEnum.last:
          for (let vertex of vertices) {
            if (vertex.id == currentStep[1]) {
              vertex.isAt = false;
            } else if (vertex.id == currentStep[2]) {
              stepAsString = "At the last vertex. Returning to starting vertex (vertex " + vertex.label + ")";
            }
          }
          edgesInTour.push([currentStep[1], currentStep[2]]);
          edgeToNearest = [];
          break;

        default:
          break;
      }

      currentAnimationStep++;
      showStepInLog(stepAsString);

      //setTimeout(playAnimationStep, 1000);
    } else {
      playingAnimation = false;
    }
  }
}

function showStepInLog(stepString) {
  var log  = document.getElementById("stepLog"),
      step = document.createTextNode(stepString)
      br   = document.createElement("br");

  log.appendChild(step);
  log.appendChild(br);
  log.scrollTop = log.scrollHeight;
}

function solveWithNearestNeighbour() {
  stepsTaken = nearestNeighbour(distances);
  restartAnimation();
}
