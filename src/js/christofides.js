
var tree;

var bestMatching = [],
    bestMatchingWeight = Infinity;

function christofides() {

  tree = minSpanTree();
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
  var sharedMatchings = [];

  matchings = minimumWeightMatching(oddDegreeVertices);

  console.log("s", sharedMatchings);
  console.log("m", matchings);

  stepsTaken.push(new MinimumMatchingStep(0, matchings, sharedMatchings));

  matchings = matchings.concat(sharedMatchings);

  for (let m of matchings) {
    adj[m[0].id].push(m[1]);
    adj[m[1].id].push(m[0]);
  }

  var tour = findEulerianTour(vertices[Math.floor(Math.random() * vertices.length)]);
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
    tour: finalTour,
    tourLength: tourLength
  };
}

function minimumWeightMatching(verticesToMatch) {
  var solver = window.solver,
      results,
      model = {
        "optimize": "distance",
        "opType": "min",
        "constraints": {
        },
        "variables": {
        },
        "ints": {
        }
    };

  model.constraints.matchingSize = {"equal": verticesToMatch.length / 2};

  for (let v of verticesToMatch) {
    let vertexString = "v" + v.id.toString() + "picked";
    model.constraints[vertexString] = {"equal": 1};
    model.variables
  }

  for (let i = 0; i < verticesToMatch.length - 1; i++) {
    let v1String = "v" + verticesToMatch[i].id.toString() + "picked";
    for (let j = i + 1; j < verticesToMatch.length; j++) {
      let v2String = "v" + verticesToMatch[j].id.toString() + "picked";

      let constraintFieldName = "v" + verticesToMatch[i].id + "v" + verticesToMatch[j].id + "picked";
      model.constraints[constraintFieldName] = {"max": 1};

      let variableFieldName = "v" + verticesToMatch[i].id + "v" + verticesToMatch[j].id;
      model.variables[variableFieldName] = {
        "distance": distances[verticesToMatch[i].id][verticesToMatch[j].id],
        "matchingSize": 1
      }
      model.variables[variableFieldName][constraintFieldName] = 1;
      model.variables[variableFieldName][v1String] = 1;
      model.variables[variableFieldName][v2String] = 1;

      model.ints[variableFieldName] = 1;
    }
  }

  console.log(model);

  results = solver.Solve(model);
  console.log(results);

  let chosenMatchings = [];
  for (let result of Object.keys(results)) {
    if (results[result] === 1) {
      let split = result.split("v");
      chosenMatchings.push([split[1], split[2]]);
    }
  }

  console.log(chosenMatchings);

  var matchings = [];
  for (let matching of chosenMatchings) {
    let v1, v2;
    for (let v of vertices) {
      if (matching[0] == v.id) v1 = v;
      else if (matching[1] == v.id) v2 = v;
    }
    matchings.push([v1, v2]);
  }

  return matchings;

}

function includedInTree(v1, v2) {
  var u1, u2;
  for (let edge of tree.edges) {
    u1 = edge[0];
    u2 = edge[1];

    if ((v1.id == u1.id && v2.id == u2.id) || (v1.id == u2.id && v2.id == u1.id))
      return true;
  }
  return false;
}

function findEulerianTour(v) {
  var eCycle = [];
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
  while (eCycle.length < numEdges) {
    let nextVertex;

    if (typeof currentVertex == "undefined") {

      var leadingVertex = subTour[0];

      let indexOfLeadingVertexInTour = 0;
      for (let i = 0; i < eCycle.length; i++) {
        if (eCycle[i].id == leadingVertex.id) {
          indexOfLeadingVertexInTour = i;
          break;
        }
      }

      for (let i = subTour.length-1; i >= 0; i--) {
        eCycle.splice(indexOfLeadingVertexInTour, 0, subTour[i]);
      }

      if (eCycle.length >= numEdges) return eCycle;

      subTour = [];

      loop1:
      for (let vertex of eCycle) {
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
  return eCycle;
}

function takeShortcuts(vertices) {
  var tour = [];
  var shortcuts = [];
  var shortcutStart, shortcutEnd;

  for (let v of vertices) {
    if (!tour.includes(v)) {
      tour.push(v);
    } else {
      shortcutStart = tour[tour.length-1];
      for (let u of vertices) {
        if (!tour.includes(u)) {
          shortcutEnd = u;
          break;
        }
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
