
var startingVertex, // must be >= 0 and <= m
    currentVertex,
    finalTour,
    tourLength     = 0,
    stepsTaken     = [],
    animationSteps = [];

var nnPseudocode = [
  "Start at any vertex",
  "Mark the current vertex as visited and add it to the tour",
  "While there is an unvisited vertex",
  "  Find the vertex nearest the current vertex which has not been visited",
  "  Set the current vertex to this vertex",
  "  Mark the new current vertex as visited and add it to the tour",
  "Return to the starting vertex and add it to the tour again"
];

/**
  Builds and displays a list of vertices in the order they are visited when
  moving to each vertices nearest, unvisited neighbour.
 */
function nearestNeighbour(distances) {
  startingVertex = Math.floor(Math.random() * (distances.length));
  currentVertex  = startingVertex,
  finalTour      = [startingVertex],

  console.log(startingVertex);

  stepsTaken = [];
  animationSteps = [];

  // fills the main diagonal with Infinity
  for (let i = 0; i < distances.length; i++) {
    distances[i][i] = Infinity;
  }

  animationSteps.push(new AtVertexStep(0, currentVertex));
  animationSteps.push(new AddToTourStep(1, currentVertex));

  for (let i = 0; i < distances.length - 1; i++) {
    let nearestNeighbour = findNearestUnvisitedNeighbour(currentVertex);
    animationSteps.push(new NearestVertexStep(3, currentVertex, nearestNeighbour));

    animationSteps.push(new ChangeCurrentVertexStep(4, currentVertex, nearestNeighbour));

    tourLength += distances[currentVertex][nearestNeighbour]
    animationSteps.push(new IncreaseTourLengthStep(5, distances[currentVertex][nearestNeighbour], tourLength));

    finalTour.push(nearestNeighbour);
    animationSteps.push(new AddToTourStep(5, nearestNeighbour));

    currentVertex = nearestNeighbour;

    animationSteps.push(new AtVertexStep(5, currentVertex));
  }

  animationSteps.push(new AtLastVertexStep(6, currentVertex, startingVertex));
  tourLength += distances[currentVertex][startingVertex];
  animationSteps.push(new IncreaseTourLengthStep(6, distances[currentVertex][startingVertex], tourLength));

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

  animationSteps.push(new FindingNearestUnvisitedVertexStep(3, currentVertex, unvisitedVertices));
  return nearest;
}
