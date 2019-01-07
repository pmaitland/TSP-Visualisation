
var adj = {};

var euclideanTour     = [],
    hasBeenVisited    = [];

function minSpanTree() {

  var visited     = [],
      unvisited   = [],
      edgesInTree = [],
      treeWeight  = 0;

  adj = {};

  euclideanTour     = [];
  hasBeenVisited    = [];

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

  return {edges: edgesInTree, weight: treeWeight};

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

function depthFirstSearch(v) {
  var tour = [];
  var visited = [];
  var stack = [];
  stack.push(v);

  while (stack.length > 0) {
    let u = stack.pop();
    if (visited.includes(u.id)) {
      if ((u.id != v.id && vertices.length == visited.length) || (u.id == v.id && vertices.length != visited.length) || (u.id != v.id && vertices.length != visited.length))
        stepsTaken.push(new BacktrackingStep(0, u));
    } else {
      visited.push(u.id);

      if (tour.length > 0) {
        if (!adj[u.id].includes(tour[tour.length-1]))
          stepsTaken.push(new EdgeBetweenNonAdjacentVerticesStep(0, u, tour[tour.length-1]));
        else
          stepsTaken.push(new AddEdgeToTourStep(0, tour[tour.length-1], u));

        let hasUnvisitedNeighbours = false;
        for (let n of adj[u.id]) {
          if (!visited.includes(n.id))
           hasUnvisitedNeighbours = true;
        }
        if (!hasUnvisitedNeighbours)
          stepsTaken.push(new NoUnvisitedNeighboursStep(0, u));
      } else {
        stepsTaken.push(new StartingVertexStep(0, u));
        stepsTaken.push(new AddVertexToTourStep(0, u));
      }

      tour.push(u);
      for (let w of adj[u.id]) {
        if (visited.includes(w.id))
          stack.push(w);
      }
      for (let w of adj[u.id]) {
        if (!visited.includes(w.id))
          stack.push(w);
      }
    }
  }

  let areAdjacent = false;
  for (let a of adj[tour[0].id]) {
    if (a.id == tour[tour.length-1].id) areAdjacent = true;
  }

  if (areAdjacent)
    stepsTaken.push(new AddEdgeToTourStep(0, tour[0], tour[tour.length-1]));
  else
    stepsTaken.push(new EdgeBetweenNonAdjacentVerticesStep(0, tour[0], tour[tour.length-1]));
  tour.push(tour[0]);

  return tour;
}

function allAdjacentVisited(visited, v) {
  allVisited = true;
  for (let a of adj[v]) {
    if (!visited.includes(a.id)) allVisited = false;
  }
  return allVisited;
}
