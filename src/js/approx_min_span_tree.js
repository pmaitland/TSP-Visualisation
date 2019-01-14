
function approxMinSpanTree() {

  var tree = minSpanTree();
  stepsTaken.push(new MinSpanTreeStep(0, tree.edges, tree.weight));

  var tour = depthFirstSearch(vertices[Math.floor(Math.random() * vertices.length)]);

  var tourLength = 0;
  for (let i = 0; i < tour.length-1; i++)
    tourLength += distances[tour[i].id][tour[i+1].id];

  stepsTaken.push(new FinishedStep(0, tour, tourLength));

  return {
    tour: tour,
    tourLength: tourLength
  };

}
