
function integerProgrammingDFJ() {

  var solver = window.solver,
      results,
      model = {
        "optimize": "distance",
        "opType": "min",
        "constraints": {},
        "variables": {},
        "ints": {}
      };
  model.constraints.numEdges = {"equal": vertices.length};

  var ids = [];
  for (let v of vertices)
    ids.push(v.id);

  var combinations = [];
  if (vertices.length >= 6)
    combinations = generateCombinations(ids);

  // console.log(combinations);

  for (let v of vertices) {
    let vertexString = "v" + v.id.toString() + "degree";
    model.constraints[vertexString] = {"equal": 2};
  }

  for (let c of combinations) {
    let string = "edgeIncluding";
    for (let d of c)
      string += ("v" + d);
    model.constraints[string] = {"max": c.length - 1};
  }

  for (let i = 0; i < vertices.length - 1; i++) {
    let v1String = `v${vertices[i].id.toString()}degree`;
    for (let j = i + 1; j < vertices.length; j++) {
      let v2String = `v${vertices[j].id.toString()}degree`;

      let constraintFieldName = `edgeBetweenv${vertices[i].id}v${vertices[j].id}`;
      model.constraints[constraintFieldName] = {"max": 1};

      let variableFieldName = `v${vertices[i].id}v${vertices[j].id}`;
      model.variables[variableFieldName] = {
        "distance": distances[vertices[i].id][vertices[j].id],
        "numEdges": 1
      }
      model.variables[variableFieldName][constraintFieldName] = 1;
      model.variables[variableFieldName][v1String] = 1;
      model.variables[variableFieldName][v2String] = 1;

      for (let c of combinations) {
        if (c.includes(i) && c.includes(j)) {
          let combinationString = "edgeIncluding";
          for (let d of c)
            combinationString += ("v" + d);
          model.variables[variableFieldName][combinationString] = 1;
        }
      }

      model.ints[variableFieldName] = 1;
    }
  }

  // console.log(model);

  results = solver.Solve(model);

  // console.log(results);

  let tour = [];
  for (let result of Object.keys(results)) {
    if (results[result] === 1) {
      let split = result.split("v"),
          v1, v2;
      for (let vertex of vertices) {
        if (vertex.id == split[1])
          v1 = vertex;
        else if (vertex.id == split[2])
          v2 = vertex;
      }
      tour.push({
        "edge": [v1, v2],
        "inFinalTour": false
      });
    }
  }
  let finalTour = []
      tourLength = 0;

  let currentVertex = vertices[0];
  finalTour.push(currentVertex);
  for (let i = 0; i < vertices.length; i++) {
    for (let e of tour) {
      if (e.edge[0].id == currentVertex.id && !e.inFinalTour) {
        currentVertex = e.edge[1];
        e.inFinalTour = true;
        finalTour.push(currentVertex);
        tourLength += distances[e.edge[0].id][e.edge[1].id];
      } else if (e.edge[1].id == currentVertex.id && !e.inFinalTour) {
        currentVertex = e.edge[0];
        e.inFinalTour = true;
        finalTour.push(currentVertex);
        tourLength += distances[e.edge[0].id][e.edge[1].id];
      }
    }
  }

  // console.log(finalTour);

  stepsTaken.push(new FinishedStep(0, finalTour, tourLength));

  return {
    tour: finalTour,
    tourLength: tourLength
  };

}

function generateCombinations(array) {

  var combinations = [];
  for (let i = 0; i < array.length; i++) {
    generateCombination(i, array, [], combinations);
  }
  combinations.push(array);

  let indexesToRemove = [];
  for (let c of combinations) {
    if (c.length < 3 || c.length > vertices.length - 3)
      indexesToRemove.push(combinations.indexOf(c) - indexesToRemove.length);
  }

  for (let i of indexesToRemove)
    combinations.splice(i, 1);

  return combinations;
}

function generateCombination(n, src, got, combinations) {
  if (n == 0) {
    if (got.length > 0) {
      combinations[combinations.length] = got;
    }
    return;
  }
  for (let j = 0; j < src.length; j++) {
    generateCombination(n - 1, src.slice(j + 1), got.concat([src[j]]), combinations);
  }
}
