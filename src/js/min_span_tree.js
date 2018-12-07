
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
