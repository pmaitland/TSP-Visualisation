
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

  var matchings = [];
  var sharedMatchings = [];

  matchings = minimumWeightMatching(oddDegreeVertices);

  // console.log("s", sharedMatchings);
  // console.log("m", matchings);

  stepsTaken.push(new MinimumMatchingStep(0, matchings, sharedMatchings));

  matchings = matchings.concat(sharedMatchings);

  // console.log(matchings);

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
      model = [];

  // select edges to minimise distance
  var objective = "min:";
  for (let i = 0; i < verticesToMatch.length - 1; i++) {
    for (let j = i + 1; j < verticesToMatch.length; j++) {
      if (i != j) {
        let v1 = verticesToMatch[i].id,
            v2 = verticesToMatch[j].id;
        objective += ` ${distances[v1][v2]} x${v1}x${v2}`;
      }
    }
  }
  model.push(objective);

  // every vertex has exactly one edge
  for (let i = 0; i < verticesToMatch.length; i++) {
    let constraint = "";
    for (let j = 0; j < verticesToMatch.length; j++) {
      if (i != j) {
        let v1 = verticesToMatch[i].id,
            v2 = verticesToMatch[j].id;
        if (constraint.length > 0) {
          constraint += ` + x${v1}x${v2}`;
          constraint += ` + x${v2}x${v1}`;
        }
        else {
          constraint = `x${v1}x${v2} + x${v2}x${v1}`;
        }
      }
    }
    constraint += " = 1";
    model.push(constraint);
  }

  // number of edges must be half the number of vertices to match
  let constraint = "";
  for (let i = 0; i < verticesToMatch.length - 1; i++) {
    for (let j = i + 1; j < verticesToMatch.length; j++) {
      if (i != j) {
        let v1 = verticesToMatch[i].id,
            v2 = verticesToMatch[j].id;
        if (constraint.length > 0)
          constraint += ` + x${v1}x${v2}`;
        else
          constraint = `x${v1}x${v2}`;
      }
    }
  }
  constraint += ` = ${verticesToMatch.length / 2}`;
  model.push(constraint);

  // bounds for xij
  for (let i = 0; i < verticesToMatch.length; i++) {
    for (let j = 0; j < verticesToMatch.length; j++) {
      if (i != j) {
        let v1 = verticesToMatch[i].id,
            v2 = verticesToMatch[j].id;
        model.push(`x${v1}x${v2} >= 0`);
        model.push(`x${v1}x${v2} <= 1`);
      }
    }
  }

  // xij must be integer values
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices.length; j++) {
      if (i != j) {
        model.push(`int x${i}x${j}`);
      }
    }
  }

  // console.log(model);

  // model.constraints.matchingSize = {"equal": verticesToMatch.length / 2};

  // for (let v of verticesToMatch) {
  //   let vertexString = "v" + v.id.toString() + "picked";
  //   model.constraints[vertexString] = {"equal": 1};
  // }

  // for (let i = 0; i < verticesToMatch.length - 1; i++) {
  //   let v1String = "v" + verticesToMatch[i].id.toString() + "picked";
  //   for (let j = i + 1; j < verticesToMatch.length; j++) {
  //     let v2String = "v" + verticesToMatch[j].id.toString() + "picked";

  //     let constraintFieldName = "v" + verticesToMatch[i].id + "v" + verticesToMatch[j].id + "picked";
  //     model.constraints[constraintFieldName] = {"max": 1};

  //     let variableFieldName = "v" + verticesToMatch[i].id + "v" + verticesToMatch[j].id;
  //     model.variables[variableFieldName] = {
  //       "distance": distances[verticesToMatch[i].id][verticesToMatch[j].id],
  //       "matchingSize": 1
  //     }
  //     model.variables[variableFieldName][constraintFieldName] = 1;
  //     model.variables[variableFieldName][v1String] = 1;
  //     model.variables[variableFieldName][v2String] = 1;

  //     model.ints[variableFieldName] = 1;
  //   }
  // }

  // console.log(model);

  model = solver.ReformatLP(model);
  results = solver.Solve(model);

  // console.log(results);

  let chosenMatchings = [];
  for (let result of Object.keys(results)) {
    if (results[result] === 1) {
      let split = result.split("x");
      chosenMatchings.push([split[1], split[2]]);
    }
  }

  // console.log(chosenMatchings);

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

function takeShortcuts(eTour) {
  var tour = [];
  var shortcuts = [];

  // console.log(eTour);

  for (let v of eTour) {
    if (!tour.includes(v))
      tour.push(v);
  }

  stepsTaken.push(new StartingVertexStep(0, tour[0]));

  for (let i = 0; i < tour.length - 1; i++) {
    let currentV = tour[i],
        nextV = tour[i+1],
        edge = [currentV, nextV];

    if (eTour[eTour.indexOf(currentV) + 1] != nextV)
      stepsTaken.push(new TakeShortcutStep(0, edge));
    else
      stepsTaken.push(new TraverseEdgeInEulerianTourStep(0, edge));
  }

  let currentV = tour[tour.length - 1],
      nextV = tour[0],
      edge = [currentV, nextV];

  // console.log(adj[currentV.id]);

  let adjacent = false;
  for (let a of adj[currentV.id]) {
    if (nextV.id == a.id) {
      adjacent = true;
      break;
    }
  }

  if (adjacent)
    stepsTaken.push(new TraverseEdgeInEulerianTourStep(0, edge));
  else
    stepsTaken.push(new TakeShortcutStep(0, edge));

  return tour;
}
