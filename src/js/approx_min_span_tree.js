
function approxMinSpanTree() {

  var tree = minSpanTree();
  stepsTaken.push(new MinSpanTreeStep(0, tree.edges, tree.weight));

  var tour = depthFirstSearch(vertices[0]);

  var tourLength = 0;
  for (let i = 0; i < tour.length-1; i++)
    tourLength += distances[tour[i].id][tour[i+1].id];
  tourLength += distances[tour[0].id][tour[tour.length-2].id];

  stepsTaken.push(new FinishedStep(0, tour, tourLength));

  return {
    tour: tour,
    tourLength: tourLength
  };

}
