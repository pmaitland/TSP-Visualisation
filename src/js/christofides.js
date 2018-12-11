
var bestMatching = [],
    bestMatchingWeight = Infinity;

function christofides() {

  var tree = minSpanTree();
  stepsTaken.push(new MinSpanTreeStep(0, tree.edges, tree.weight));

  var oddDegreeVertexIds = [];
  for (let v of Object.keys(adj))
    if (adj[v].length % 2 != 0) oddDegreeVertexIds.push(v);

  var oddDegreeVertices = [];
  for (let v of vertices) {
    for (let o of oddDegreeVertexIds)
      if (v.id == parseInt(o)) oddDegreeVertices.push(v);
  }

  stepsTaken.push(new OddDegreeVerticesStep(0, oddDegreeVertices));

  var vertexIds = [];
  for (let v of oddDegreeVertices)
    vertexIds.push(v.id);

  // GREEDY PAIRING
  var matchings = [];
  var oddVertices = Array.from(oddDegreeVertices);
  while (oddVertices.length > 0) {
    let v = oddVertices[0];
    let distanceToNearest = Infinity;
    let nearest;

    for (let u of oddVertices) {
      if (!(v.id == u.id) && distances[v.id][u.id] < distanceToNearest) {
        distanceToNearest = distances[v.id][u.id];
        nearest = u;
      }
    }

    matchings.push([v, nearest]);
    oddVertices.splice(oddVertices.indexOf(v), 1);
    oddVertices.splice(oddVertices.indexOf(nearest), 1);
  }

  stepsTaken.push(new MinimumMatchingStep(0, matchings));

  for (let m of matchings) {
    adj[m[0].id].push(m[1]);
    adj[m[1].id].push(m[0]);
  }

  var tour = findEulerianTour(vertices[0]);
  let tourAsEdges = [];
  for (let i = 0; i < tour.length-1; i++)
    tourAsEdges.push([tour[i], tour[i+1]]);
  tourAsEdges.push([tour[tour.length-1], tour[0]]);
  stepsTaken.push(new EulerianTourStep(0, tourAsEdges));

  var finalTour = takeShortcuts(tour);
  finalTour.push(finalTour[0]);
  var tourLength = 0;
  for (let i = 0; i < finalTour.length - 1; i++) {
    tourLength += distances[finalTour[i].id][finalTour[i+1].id];
  }

  stepsTaken.push(new FinishedStep(0, finalTour, tourLength));

  return {
    tour: tour,
    tourLength: tourLength
  };
}

function findEulerianTour(v) {
  var eTour = [];
  var currentVertex = v;

  var edgesToTravel = [];
  for (let vertex of Object.keys(adj)) {
    for (let i = 0; i < adj[vertex].length; i++)
      edgesToTravel.push([parseInt(vertex), adj[vertex][i].id]);
  }

  function inEdgesToTravel(e) {
    for (let edge of edgesToTravel) {
      if (e[0] == edge[0] && e[1] == edge[1])
        return true;
    }
    return false;
  }

  function findIndexInEdgesToTravel(e) {
    for (let i = 0; i < edgesToTravel.length; i++) {
      if (e[0] == edgesToTravel[i][0] && e[1] == edgesToTravel[i][1]) {
        return i;
      }
    }
    return -1;
  }

  let startOfSubTour = currentVertex;
  let subTour = [];

  let numEdges = Math.floor(edgesToTravel.length / 2);
  while (eTour.length < numEdges) {
    let nextVertex;

    if (typeof currentVertex == "undefined") {

      var leadingVertex = subTour[0];

      let indexOfLeadingVertexInTour = 0;
      for (let i = 0; i < eTour.length; i++) {
        if (eTour[i].id == leadingVertex.id) {
          indexOfLeadingVertexInTour = i;
          break;
        }
      }

      for (let i = subTour.length-1; i >= 0; i--) {
        eTour.splice(indexOfLeadingVertexInTour, 0, subTour[i]);
      }

      if (eTour.length >= numEdges) return eTour;

      subTour = [];

      loop1:
      for (let vertex of eTour) {
        loop2:
        for (let edge of edgesToTravel) {
          if (vertex.id == edge[0]) {
            startOfSubTour = vertex;
            currentVertex = vertex;
            break loop1;
          }
        }
      }
    }

    for (let u of adj[currentVertex.id]) {
      if (inEdgesToTravel([currentVertex.id, u.id])) {
        edgesToTravel.splice(findIndexInEdgesToTravel([currentVertex.id, u.id]), 1);
        edgesToTravel.splice(findIndexInEdgesToTravel([u.id, currentVertex.id]), 1);
        subTour.push(currentVertex);
        nextVertex = u;
        break;
      } else if (inEdgesToTravel([u.id, currentVertex.id])) {
        edgesToTravel.splice(findIndexInEdgesToTravel([currentVertex.id, u.id]), 1);
        edgesToTravel.splice(findIndexInEdgesToTravel([u.id, currentVertex.id]), 1);
        subTour.push(u);
        nextVertex = u;
        break;
      }
    }
    currentVertex = nextVertex;
  }
  return eTour;
}

function takeShortcuts(vertices) {
  var tour = [];
  var shortcuts = [];
  var shortcutStart, shortcutEnd;

  var eulerianTour = [];
  for (let v of vertices)
    eulerianTour.push(v);

  for (let v of vertices) {
    if (!tour.includes(v)) {
      tour.push(v);
    } else {
      shortcutStart = tour[tour.length-1];
      for (let u of vertices) {
        if (!tour.includes(u))
          shortcutEnd = u;
          break;
      }
      if (typeof shortcutEnd == "undefined")
        shortcutEnd = tour[0];
      shortcuts.push([shortcutStart, shortcutEnd]);
    }
  }
  if (shortcuts.length > 0)
    stepsTaken.push(new TakeShortcutsStep(0, shortcuts));
  return tour;
}
