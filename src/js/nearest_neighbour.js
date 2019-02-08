
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
  let index = Math.floor(Math.random() * (vertices.length)),
      startingVertex = vertices[index],
      currentVertex  = startingVertex,
      finalTour      = [startingVertex],
      tourLength     = 0,
      unvisitedVertices = JSON.parse(JSON.stringify(vertices));

  // fills the main diagonal with Infinity
  for (let i = 0; i < vertices.length; i++) {
    distances[i][i] = Infinity;
  }

  // remove the starting vertex from the unvisted vertices
  let indexToRemove;
  for (let i = 0; i < unvisitedVertices.length; i++) {
    if (unvisitedVertices[i].id == startingVertex.id)
      indexToRemove = i;
  }
  unvisitedVertices.splice(indexToRemove, 1);

  stepsTaken.push(new StartingVertexStep(0, currentVertex));
  stepsTaken.push(new AddVertexToTourStep(1, currentVertex));

  for (let i = 0; i < vertices.length - 1; i++) {
    stepsTaken.push(new FindingNearestUnvisitedVertexStep(3, currentVertex, JSON.parse(JSON.stringify(unvisitedVertices))));
    let nearestNeighbour = findNearestUnvisitedNeighbour(currentVertex, finalTour, unvisitedVertices);
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
function findNearestUnvisitedNeighbour(vertex, tour, unvisited) {
  let nearestVertex = vertex,
      distanceToNearest = distances[vertex.id][vertex.id];

  for (let v of vertices) {
    if (!tour.includes(v) && distances[vertex.id][v.id] < distanceToNearest) {
      nearestVertex = v;
      distanceToNearest = distances[vertex.id][v.id];
    }
  }

  let indexToRemove;
  for (let i = 0; i < unvisited.length; i++) {
    if (unvisited[i].id == nearestVertex.id) {
      indexToRemove = i;
      break;
    }
  }
  unvisited.splice(indexToRemove, 1);

  return nearestVertex;
}
