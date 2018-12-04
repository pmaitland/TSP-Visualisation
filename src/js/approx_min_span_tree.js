
var adj = {};

var euclideanTour     = [],
    hasBeenVisited    = [];

function approxMinSpanTree(distances, vertices) {

  var tree = findMinWeightSpanningTree(distances, vertices);

}

function findMinWeightSpanningTree(distances, vertices) {

  var visited     = [],
      unvisited   = [],
      edgesInTree = [],
      treeWeight  = 0;

  for (let v of vertices) {
    distances[v.id][v.id] = Infinity;
    adj[v.id] = [];
  }

  hasBeenVisited = [];

  visited.push(vertices[0]);

  for (let i = 1; i < vertices.length; i++)
    unvisited.push(vertices[i]);

  while (unvisited.length > 0) {
    let newEdge = getNextEdge(visited, unvisited);
        edge    = newEdge.edge;

    edgesInTree.push(edge);
    visited.push(edge[1]);
    unvisited.splice(unvisited.indexOf(edge[1]), 1);
    treeWeight += newEdge.length;
  }

  animationSteps.push(new MinSpanTreeStep(0, edgesInTree, treeWeight));

  var doubledUpEdges = [];

  for (let edge of edgesInTree) {
    doubledUpEdges.push(edge);
    doubledUpEdges.push(Array.from(edge).reverse());
  }

  generateEuclideanTour(0);

  var finalTourDetails = reduceEuclideanTour(),
      finalTour = finalTourDetails[0],
      finalTourLength = finalTourDetails[1];

  animationSteps.push(new FinishedStep(0, finalTour, finalTourLength));

  return animationSteps;

}

function getNextEdge(visited, unvisited) {
  var shortestEdge       = [visited[0], unvisited[0]],
      shortestEdgeLength = distances[shortestEdge[0].id][shortestEdge[1].id];

  for (let u of unvisited) {
    for (let v of visited) {
      if (distances[u.id][v.id] < shortestEdgeLength) {
        shortestEdge       = [v, u];
        shortestEdgeLength = distances[u.id][v.id];
      }
    }
  }

  adj[shortestEdge[0].id].push(shortestEdge[1]);
  adj[shortestEdge[1].id].push(shortestEdge[0]);

  return {edge: shortestEdge, length: shortestEdgeLength};
}

function generateEuclideanTour(i) {

  for (let v of vertices) {
    if (v.id == i) {
      hasBeenVisited.push(v.id);
      euclideanTour.push(v);
    }
  }

  for (let v of adj[i]) {
    if (!hasBeenVisited.includes(v.id))
      generateEuclideanTour(v.id);
  }

}

function reduceEuclideanTour() {
  var finalTour = []
      finalTourLength = 0;

  var lastInTour, penultimateInTour;

  for (let v of euclideanTour) {
    if (!finalTour.includes(v)) {

      finalTour.push(v);

      if (finalTour.length > 1) {
        lastInTour        = finalTour[finalTour.length - 1];
        penultimateInTour = finalTour[finalTour.length - 2];

        finalTourLength += distances[lastInTour.id][penultimateInTour.id];
        animationSteps.push(new AddEdgeToTourStep(0, penultimateInTour, lastInTour));
      } else {
        animationSteps.push(new AtVertexStep(0, v));
        animationSteps.push(new AddVertexToTourStep(0, v));
      }
    }
  }

  lastInTour        = finalTour[finalTour.length - 1];
  penultimateInTour = finalTour[finalTour.length - 2];

  finalTour.push(finalTour[0]);
  finalTourLength += distances[finalTour[0].id][finalTour[finalTour.length-2].id];
  animationSteps.push(new AtLastVertexStep(0, finalTour[finalTour.length-2], finalTour[0]));

  return [finalTour, finalTourLength];
}
