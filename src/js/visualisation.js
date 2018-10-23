
var stepsTaken,
    currentAnimationStep = 0,
    playingAnimation = false,
    edgesInTour = [],
    edgesToNearest = [];

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

var selectedVertex = null;

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
  playingAnimation = false;
  edgesInTour = [];
  edgesToNearest = [];

  for (let vertex of vertices) {
    vertex.isAt = false;
    vertex.isNearest = false;
    vertex.isPartOfTour = false;
  }

  let log = document.getElementById("stepLog")
  while (log.firstChild) {
    log.removeChild(log.firstChild);
  }
}

function endAnimation() {
  playingAnimation = false;

  let stepStartingFrom = currentAnimationStep - 1;
  if (stepStartingFrom < 0) {
    stepStartingFrom = 0;
  }
  for (let step in animationSteps.slice(stepStartingFrom)) {
    stepForwardAnimation();
  }
}

function playAnimation() {
  if (playingAnimation) {
    stepForwardAnimation();
    setTimeout(playAnimation, 1000);
  }
}

function resumeAnimation() {
  if (!playingAnimation) {
    playingAnimation = true;
    playAnimation();
  }
}

function pauseAnimation() {
  playingAnimation = false;
}

function stepForwardAnimation() {
  if (currentAnimationStep < animationSteps.length) {

    currentStep = animationSteps[currentAnimationStep];

    switch (currentStep.constructor) {

      case AtVertexStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.vertex) {
            vertex.isAt = true;
            vertex.isPartOfTour = true;
          }
        }
        break;

      case NearestVertexStep:
        for (let vertex of vertices) {
          vertex.isNearest = false;
          if (vertex.id == currentStep.currentVertex) {
            vertex1 = vertex;
          } else if (vertex.id == currentStep.nearestVertex) {
            vertex.isNearest = true;
            vertex2 = vertex;
          }
        }
        edgesToNearest = [[currentStep.currentVertex, currentStep.nearestVertex]];
        break;

      case AddToTourStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.vertex) {
            vertex.isPartOfTour = true;
          }
        }
        break;

      case ChangeCurrentVertexStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.lastVertex) {
            vertex.isAt = false;
          } else if (vertex.id == currentStep.newVertex) {
            vertex.isAt = true;
            vertex.isNearest = false;
          }
        }
        edgesInTour.push([currentStep.lastVertex, currentStep.newVertex]);
        edgesToNearest = [];
        break;

      case IncreaseTourLengthStep:
      break;

      case AtLastVertexStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.lastVertex) {
            vertex.isAt = false;
          }
        }
        edgesInTour.push([currentStep.lastVertex, currentStep.startingVertex]);
        edgesToNearest = [];
        break;

      case FindingNearestUnvisitedVertexStep:
        edgesToNearest = [];
        for (let vertex of vertices) {
          if (currentStep.unvisitedVertices.includes(vertex.id)) {
            vertex.isNearest = true;
            edgesToNearest.push([currentStep.currentVertex, vertex.id]);
          }
        }

      default:
        break;
    }

    currentAnimationStep++;
    showStepInLog(currentStep.toString());

    redraw();
  }
}

function stepBackwardAnimation() {
  if (currentAnimationStep > 0) {

    currentStep = animationSteps[currentAnimationStep - 1];

    switch (currentStep.constructor) {

      case AtVertexStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.vertex) {

          }
        }
        break;

      case NearestVertexStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.nearestVertex) {
            vertex.isNearest = false;
          }

          let previousStep = animationSteps[currentAnimationStep - 2];
          if (previousStep.unvisitedVertices.includes(vertex.id)) {
            vertex.isNearest = true;
            edgesToNearest.push([previousStep.currentVertex, vertex.id]);
          }
        }
        break;

      case AddToTourStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.vertex) {
            vertex.isPartOfTour = false;
          }
        }
        break;

      case ChangeCurrentVertexStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.lastVertex) {
            vertex.isAt = true;
          } else if (vertex.id == currentStep.newVertex) {
            vertex.isAt = false;
            vertex.isNearest = true;
            vertex.isPartOfTour = false;
          }
        }
        edgesInTour.splice(-1, 1);
        edgesToNearest = [[currentStep.lastVertex, currentStep.newVertex]];
        break;

      case IncreaseTourLengthStep:
      break;

      case AtLastVertexStep:
        for (let vertex of vertices) {
          if (vertex.id == currentStep.lastVertex) {
            vertex.isAt = true;
          }
        }
        edgesInTour.pop();
        edgesToNearest = [];
        break;

      case FindingNearestUnvisitedVertexStep:
        edgesToNearest = [];
        for (let vertex of vertices) {
          if (currentStep.unvisitedVertices.includes(vertex.id)) {
            vertex.isNearest = false;
          }
        }

      default:
        break;
    }

    removeStepFromLog();
    currentAnimationStep--;

    redraw();
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

function removeStepFromLog() {
  var log = document.getElementById("stepLog");

  // called twice to remove text AND break
  log.removeChild(log.lastChild);
  log.removeChild(log.lastChild);
}

function solveWithNearestNeighbour() {
  stepsTaken = nearestNeighbour(distances);
  playingAnimation = true;
  playAnimation();
}
