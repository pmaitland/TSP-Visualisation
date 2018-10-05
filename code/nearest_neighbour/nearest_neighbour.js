
var distanceMatrix = [
  [0, 5, 4, 3, 2],
  [6, 0, 3, 5, 1],
  [9, 4, 0, 3, 2],
  [2, 2, 2, 0, 5],
  [9, 1, 2, 6, 0]
]; // must be size m x m

var startingVertex    = 0, // must be >= 0 and <= m
    currentVertex     = startingVertex,
    numberOfVertices  = distanceMatrix.length,
    finalTour         = [startingVertex];

/**
  Builds and displays a list of vertices in they order they are visited when
  moving to each vertices nearest, unvisited neighbour.
 */
function nearestNeighbour() {
  // display each row of the matrix and fill the main diagonal with Infinity
  for (let i = 0; i < numberOfVertices; i++) {
    displayRowInHtml(i);
    distanceMatrix[i][i] = Infinity;
  }

  for (let i = 0; i < numberOfVertices - 1; i++) {
    let nearestNeighbour = findNearestUnvisitedNeighbour(distanceMatrix, currentVertex);
    finalTour.push(nearestNeighbour);
    currentVertex = nearestNeighbour;
  }

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
  Takes the index of a vertex in the distance matrix and
  displays it's row of distances.
 */
function displayRowInHtml(index) {
  var matrix = document.getElementById("distanceMatrix"),
      row    = document.createTextNode("[" + distanceMatrix[index] + "]"),
      br     = document.createElement("br");

  matrix.appendChild(row);
  matrix.appendChild(br);
}

/**
  Displays the final tour in a readable format.
 */
function displayFinalTour() {
  for (let vertex in finalTour) {
     document.getElementById("finalTour").innerHTML = document.getElementById("finalTour").innerHTML + finalTour[vertex] + "->";
  }
  document.getElementById("finalTour").innerHTML = document.getElementById("finalTour").innerHTML + startingVertex;
}
