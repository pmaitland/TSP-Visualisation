
var startingVertex, // must be >= 0 and <= m
    currentVertex,
    finalTour,
    tourLength     = 0,
    stepsTaken     = [];

var nnPseudocode = [
  "start at a vertex v",
  "mark v as visited and add v to tour",
  "while there exists an unvisited vertex",
  "  w = nearest unvisited vertex to v",
  "  v = w",
  "  set v as visited and add v to tour",
  "finished"
];

/**
  Builds and displays a list of vertices in the order they are visited when
  moving to each vertices nearest, unvisited neighbour.
 */
function nearestNeighbour() {
  let index = Math.floor(Math.random() * (vertices.length));
  // console.log(vertices.length, index);
  startingVertex = vertices[index];
  currentVertex  = startingVertex,
  finalTour      = [startingVertex],
  tourLength     = 0,
  stepsTaken     = [];

  // fills the main diagonal with Infinity
  for (let i = 0; i < distances.length; i++) {
    distances[i][i] = Infinity;
  }

  stepsTaken.push(new StartingVertexStep(0, currentVertex));
  stepsTaken.push(new AddVertexToTourStep(1, currentVertex));

  for (let i = 0; i < distances.length - 1; i++) {
    let nearestNeighbour = findNearestUnvisitedNeighbour(currentVertex);
    stepsTaken.push(new NearestVertexStep(3, currentVertex, nearestNeighbour));

    stepsTaken.push(new ChangeCurrentVertexStep(4, currentVertex, nearestNeighbour));

    tourLength += distances[currentVertex.id][nearestNeighbour.id];
    stepsTaken.push(new IncreaseTourLengthStep(5, distances[currentVertex.id][nearestNeighbour.id], tourLength));

    finalTour.push(nearestNeighbour);
    stepsTaken.push(new AddVertexToTourStep(5, nearestNeighbour));

    currentVertex = nearestNeighbour;

    stepsTaken.push(new AtVertexStep(5, currentVertex));
  }

  stepsTaken.push(new AtLastVertexStep(6, currentVertex, startingVertex));
  tourLength += distances[currentVertex.id][startingVertex.id];
  finalTour.push(startingVertex);
  stepsTaken.push(new IncreaseTourLengthStep(6, distances[currentVertex.id][startingVertex.id], tourLength));

  stepsTaken.push(new FinishedStep(6, finalTour, tourLength));

  return {
    tour: finalTour,
    tourLength: tourLength
  };
}

/**
  Takes a vertex and returns its nearest neighbour which has not already
  been included in the tour.
 */
function findNearestUnvisitedNeighbour(v) {
  let neighbours = distances[v.id],
      nearest    = v, // infinity
      unvisitedVertices = [];

  for (let i = 0; i < distances.length; i++) {
    if (i < vertices.length) {
      let n = vertices[i];
      // console.log(vertices, i, vertices[i]);
      if (!finalTour.includes(n)) {
        unvisitedVertices.push(n);

        if (neighbours[n.id] < neighbours[nearest.id])
          nearest = n;
      }
    }
  }

  stepsTaken.push(new FindingNearestUnvisitedVertexStep(3, currentVertex, unvisitedVertices));
  return nearest;
}
