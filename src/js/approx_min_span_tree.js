
function approxMinSpanTree() {

  var tree = minSpanTree();
  stepsTaken.push(new MinSpanTreeStep(0, tree.edges, tree.weight));

  generateEuclideanTour(0);

  var finalTourDetails = reduceEuclideanTour(),
      finalTour = finalTourDetails[0],
      finalTourLength = finalTourDetails[1];

  stepsTaken.push(new FinishedStep(0, finalTour, finalTourLength));

  return {
    tour: finalTour,
    tourLength: finalTourLength
  };

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
        stepsTaken.push(new AddEdgeToTourStep(0, penultimateInTour, lastInTour));
      } else {
        stepsTaken.push(new AtVertexStep(0, v));
        stepsTaken.push(new AddVertexToTourStep(0, v));
      }
    }
  }

  lastInTour        = finalTour[finalTour.length - 1];
  penultimateInTour = finalTour[finalTour.length - 2];

  finalTour.push(finalTour[0]);
  finalTourLength += distances[finalTour[0].id][finalTour[finalTour.length-2].id];
  stepsTaken.push(new AtLastVertexStep(0, finalTour[finalTour.length-2], finalTour[0]));

  return [finalTour, finalTourLength];
}
