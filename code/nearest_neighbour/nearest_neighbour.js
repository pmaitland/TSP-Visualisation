
var StepsEnum = Object.freeze({
  at:                 0,
  nearest:            1,
  addToTour:          2,
  move:               3,
  increaseTourLength: 4,
  last:               5
});

var startingVertex   = 0, // must be >= 0 and <= m
    currentVertex    = startingVertex,
    finalTour        = [startingVertex],
    tourLength       = 0,
    stepsTaken       = [],
    animationSteps   = [];

/**
  Builds and displays a list of vertices in the order they are visited when
  moving to each vertices nearest, unvisited neighbour.
 */
function nearestNeighbour(distances) {
  stepsTaken = [];
  animationSteps = [];

  // fills the main diagonal with Infinity
  for (let i = 0; i < distances.length; i++) {
    distances[i][i] = Infinity;
  }

  addToStepsTaken(StepsEnum.at, [currentVertex]);
  animationSteps.push([StepsEnum.at, currentVertex]);

  addToStepsTaken(StepsEnum.addToTour, [startingVertex]);
  animationSteps.push([StepsEnum.addToTour, startingVertex]);

  for (let i = 0; i < distances.length - 1; i++) {
    let nearestNeighbour = findNearestUnvisitedNeighbour(currentVertex);
    addToStepsTaken(StepsEnum.nearest, [currentVertex, nearestNeighbour]);
    animationSteps.push([StepsEnum.nearest, currentVertex, nearestNeighbour]);

    finalTour.push(nearestNeighbour);
    addToStepsTaken(StepsEnum.addToTour, [nearestNeighbour]);
    animationSteps.push([StepsEnum.addToTour, nearestNeighbour]);

    tourLength += distances[currentVertex][nearestNeighbour]
    addToStepsTaken(StepsEnum.increaseTourLength, [distances[currentVertex][nearestNeighbour]]);
    animationSteps.push([StepsEnum.increaseTourLength, distances[currentVertex][nearestNeighbour], tourLength]);

    addToStepsTaken(StepsEnum.move, [currentVertex, nearestNeighbour]);
    animationSteps.push([StepsEnum.move, currentVertex, nearestNeighbour]);
    currentVertex = nearestNeighbour;

    addToStepsTaken(StepsEnum.at, [currentVertex]);
    animationSteps.push([StepsEnum.at, currentVertex]);
  }

  addToStepsTaken(StepsEnum.last);
  animationSteps.push([StepsEnum.last, currentVertex, startingVertex]);
  tourLength += distances[currentVertex][startingVertex];
  addToStepsTaken(StepsEnum.increaseTourLength, [distances[currentVertex][startingVertex]]);
  animationSteps.push([StepsEnum.increaseTourLength, distances[currentVertex][startingVertex], tourLength]);

  //displayFinalTour();
  //displayStepsTaken();

  return animationSteps;
}

/**
  Takes a vertex and returns its nearest neighbour which has not already
  been included in the tour.
 */
function findNearestUnvisitedNeighbour(v) {
  let neighbours = distances[v],
      nearest    = v; // infinity

  for (let n = 0; n < distances.length; n++) {
    if (neighbours[n] < neighbours[nearest] && !finalTour.includes(n)) {
      nearest = n;
    }
  }
  return nearest;
}

/**
  Adds a string to the list of steps taken by using the passed information
  to describe the most recent step taken.
 */
function addToStepsTaken(stepType, info) {
  var step;

  switch (stepType) {
    case StepsEnum.at:
      step = "At vertex " + info[0];
      break;

    case StepsEnum.nearest:
      step = "Nearest to vertex " + info[0] + " is vertex " + info[1];
      break;

    case StepsEnum.addToTour:
      step = "Added vertex " + info[0] + " to the tour";
      break;

    case StepsEnum.move:
      step = "Moved from vertex " + info[0] + " to vertex " + info[1];
      break;

    case StepsEnum.increaseTourLength:
      step = "Added " + info[0] + " to tour length. Current tour length is " + tourLength;
      break;

    case StepsEnum.last:
      step = "At the last vertex";
      break;

    case StepsEnum.start:
      step = "Start";
      break;

    case StepsEnum.end:
      step = "End"
      break;

    default:
      break;
  }
  stepsTaken.push(step);
}

/**
  Displays the distance matrix on window load.
 */
window.onload = function displayDistances() {
  for (let i = 0; i < distances.length; i++) {
    //displayMatrixRow(i);
  }
}

/**
  Takes the index of a vertex in the distance matrix and
  displays it's row of distances.
 */
function displayMatrixRow(index) {
  var matrix = document.getElementById("distances"),
      row    = document.createTextNode("[" + distances[index] + "]"),
      br     = document.createElement("br");

  matrix.appendChild(row);
  matrix.appendChild(br);
}

/**
  Displays the final tour in a legible format.
 */
function displayFinalTour() {
  for (let vertex in finalTour) {
     document.getElementById("finalTour").innerHTML += finalTour[vertex] + "->";
  }
  document.getElementById("finalTour").innerHTML += startingVertex;
  document.getElementById("tourLength").innerHTML = tourLength;
}

/**
  Displys the steps taken by the algorithm.
 */
function displayStepsTaken() {
  for (let step in stepsTaken) {
    displayStep(step);
  }
}

/**
  Displays a single step taken by the algorithm.
 */
function displayStep(index) {
  var log  = document.getElementById("stepsTaken"),
      step = document.createTextNode(stepsTaken[index]),
      br   = document.createElement("br");

  log.appendChild(step);
  log.appendChild(br);
}
