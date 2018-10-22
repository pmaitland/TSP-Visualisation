
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

  animationSteps.push(new AtVertexStep(currentVertex));
  animationSteps.push(new AddToTourStep(currentVertex));

  for (let i = 0; i < distances.length - 1; i++) {
    let nearestNeighbour = findNearestUnvisitedNeighbour(currentVertex);
    animationSteps.push(new NearestVertexStep(currentVertex, nearestNeighbour));

    tourLength += distances[currentVertex][nearestNeighbour]
    animationSteps.push(new IncreaseTourLengthStep(distances[currentVertex][nearestNeighbour], tourLength));

    animationSteps.push(new ChangeCurrentVertexStep(currentVertex, nearestNeighbour));
    currentVertex = nearestNeighbour;

    animationSteps.push(new AtVertexStep(currentVertex));

    finalTour.push(currentVertex);
    animationSteps.push(new AddToTourStep(currentVertex));
  }

  animationSteps.push(new AtLastVertexStep(currentVertex, startingVertex));
  tourLength += distances[currentVertex][startingVertex];
  animationSteps.push(new IncreaseTourLengthStep(distances[currentVertex][startingVertex], tourLength));

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
