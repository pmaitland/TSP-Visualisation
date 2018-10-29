
var startingVertex, // must be >= 0 and <= m
    currentVertex,
    finalTour,
    tourLength     = 0,
    stepsTaken     = [],
    animationSteps = [];

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
function nearestNeighbour(distances, vertices) {
  startingVertex = Math.floor(Math.random() * (distances.length));
  currentVertex  = startingVertex,
  finalTour      = [startingVertex],
  stepsTaken = [];
  animationSteps = [];

  // fills the main diagonal with Infinity
  for (let i = 0; i < distances.length; i++) {
    distances[i][i] = Infinity;
  }

  animationSteps.push(new AtVertexStep(0, vertices[currentVertex]));
  animationSteps.push(new AddToTourStep(1, vertices[currentVertex]));

  for (let i = 0; i < distances.length - 1; i++) {
    let nearestNeighbour = findNearestUnvisitedNeighbour(currentVertex);
    animationSteps.push(new NearestVertexStep(3, vertices[currentVertex], vertices[nearestNeighbour]));

    animationSteps.push(new ChangeCurrentVertexStep(4, vertices[currentVertex], vertices[nearestNeighbour]));

    tourLength += distances[currentVertex][nearestNeighbour]
    animationSteps.push(new IncreaseTourLengthStep(5, distances[currentVertex][nearestNeighbour], tourLength));

    finalTour.push(nearestNeighbour);
    animationSteps.push(new AddToTourStep(5, vertices[nearestNeighbour]));

    currentVertex = nearestNeighbour;

    animationSteps.push(new AtVertexStep(5, vertices[currentVertex]));
  }

  animationSteps.push(new AtLastVertexStep(6, vertices[currentVertex], vertices[startingVertex]));
  tourLength += distances[currentVertex][startingVertex];
  finalTour.push(startingVertex);
  animationSteps.push(new IncreaseTourLengthStep(6, distances[currentVertex][startingVertex], tourLength));

  animationSteps.push(new FinishedStep(6, finalTour, tourLength));
  return animationSteps;
}

/**
  Takes a vertex and returns its nearest neighbour which has not already
  been included in the tour.
 */
function findNearestUnvisitedNeighbour(v) {
  let neighbours = distances[v],
      nearest    = v, // infinity
      unvisitedVertices = [];

  for (let n = 0; n < distances.length; n++) {
    if (!finalTour.includes(n)) {
      unvisitedVertices.push(n);

      if (neighbours[n] < neighbours[nearest]) {
        nearest = n;
      }
    }
  }

  animationSteps.push(new FindingNearestUnvisitedVertexStep(3, vertices[currentVertex], unvisitedVertices));
  return nearest;
}
