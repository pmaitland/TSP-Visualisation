
var distanceMatrix = [
  [0, 3, 4, 5],
  [1, 0, 7, 4],
  [1, 3, 0, 1],
  [7, 3, 6, 0]
]; // must b size m x m

var startingVertex    = 2, // must be >= 0 and <= m
    currentVertex     = startingVertex,
    numberOfVertices  = distanceMatrix.length,
    finalTour         = [startingVertex],
    tourLength        = 0;

/**
  Builds and displays a list of vertices in they order they are visited when
  moving to each vertices nearest, unvisited neighbour.
 */
function nearestNeighbour() {
  // fills the main diagonal with Infinity
  for (let i = 0; i < numberOfVertices; i++) {
    distanceMatrix[i][i] = Infinity;
  }

  for (let i = 0; i < numberOfVertices - 1; i++) {
    let nearestNeighbour = findNearestUnvisitedNeighbour(distanceMatrix, currentVertex);
    finalTour.push(nearestNeighbour);
    tourLength += distanceMatrix[currentVertex][nearestNeighbour];
    currentVertex = nearestNeighbour;
  }
  tourLength += distanceMatrix[currentVertex][startingVertex];

  displayFinalTour();
}

/**
  Takes a vertex and returns its nearest neighbour which has not already
  been included in the tour.
 */
function findNearestUnvisitedNeighbour(distances, v) {
  let neighbours = distances[v],
      nearest    = v; // infinity

  for (let n = 0; n < numberOfVertices; n++) {
    if (neighbours[n] < neighbours[nearest] && !finalTour.includes(n)) {
      nearest = n;
    }
  }
  return nearest;
}

/**
  Displays the distance matrix on window load.
 */
window.onload = function displayDistanceMatrix() {
  for (let i = 0; i < numberOfVertices; i++) {
    displayMatrixRow(i);
  }
}

/**
  Takes the index of a vertex in the distance matrix and
  displays it's row of distances.
 */
function displayMatrixRow(index) {
  var matrix = document.getElementById("distanceMatrix"),
      row    = document.createTextNode("[" + distanceMatrix[index] + "]"),
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
