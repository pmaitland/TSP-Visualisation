
function integerProgrammingMTZ() {

  var solver = window.solver,
      results,
      model = [];

  // select edges to minimise distance
  var objective = "min:";
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices.length; j++) {
      if (i != j) {
        objective += ` ${distances[i][j]} x${i}x${j}`;
      }
    }
  }
  model.push(objective);

  // every vertex has exactly one incoming edge
  for (let i = 0; i < vertices.length; i++) {
    let constraint = "";
    for (let j = 0; j < vertices.length; j++) {
      if (i != j) {
        if (constraint.length > 0)
          constraint += ` + x${j}x${i}`;
        else
          constraint = `x${j}x${i}`;
      }
    }
    constraint += " = 1";
    model.push(constraint);
  }

  // every vertex has exactly one outgoing edge
  for (let i = 0; i < vertices.length; i++) {
    let constraint = "";
    for (let j = 0; j < vertices.length; j++) {
      if (i != j) {
        if (constraint.length > 0)
          constraint += ` + x${i}x${j}`;
        else
          constraint = `x${i}x${j}`;
      }
    }
    constraint += " = 1";
    model.push(constraint);
  }

  // subtour eliminations
  for (let i = 1; i < vertices.length; i++) {
    let constraint = "";
    for (let j = 1; j < vertices.length; j++) {
      if (i != j) {
        constraint = `u${i} - u${j} + ${vertices.length}x${i}x${j} <= ${vertices.length - 1}`;
        model.push(constraint);
      }
    }
  }

  // bounds for xij
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices.length; j++) {
      if (i != j) {
        model.push(`x${i}x${j} >= 0`);
        model.push(`x${i}x${j} <= 1`);
      }
    }
  }

  // bounds for ui
  for (let i = 1; i < vertices.length; i++) {
    model.push(`u${i} >= 0`);
    model.push(`u${i} <= ${vertices.length - 1}`);
  }

  // xij must be integer values
  for (let i = 0; i < vertices.length; i++) {
    for (let j = 0; j < vertices.length; j++) {
      if (i != j) {
        model.push(`int x${i}x${j}`);
      }
    }
  }

  console.log(model);

  model = solver.ReformatLP(model);
  results = solver.Solve(model);

  // console.log(results);

  let tour = [];
  for (let result of Object.keys(results)) {
    if (result[0] === "x" && results[result] == 1) {
      let v1, v2;
      let split = result.split("x");

      for (let vertex of vertices) {
        if (vertex.id == split[1]) v1 = vertex;
        else if (vertex.id == split[2]) v2 = vertex;
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
