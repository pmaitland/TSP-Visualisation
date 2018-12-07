
var bestMatching = [],
    bestMatchingWeight = Infinity;

function christofides() {

  var tree = minSpanTree();
  stepsTaken.push(new MinSpanTreeStep(0, tree.edges, tree.weight));

  var oddDegreeVertexIds = [];
  for (let v of Object.keys(adj)) {
    if (adj[v].length % 2 != 0)
      oddDegreeVertexIds.push(v);
  }

  var oddDegreeVertices = [];
  for (let v of vertices) {
    for (let o of oddDegreeVertexIds) {
      if (v.id == parseInt(o))
        oddDegreeVertices.push(v);
    }
  }

  stepsTaken.push(new OddDegreeVerticesStep(0, oddDegreeVertices));

  var vertexIds = [];
  for (let v of oddDegreeVertices)
    vertexIds.push(v.id);

  // BRUTE FORCE
  // -----------
  //generateMatchingPermutations(vertexIds, vertexIds.length);
  //
  // console.log(bestMatching);
  //
  // var matchings = [];
  // for (let m of bestMatching) {
  //   let v1, v2;
  //   for (let v of vertices) {
  //     if (v.id == m[0]) v1 = v;
  //     if (v.id == m[1]) v2 = v;
  //   }
  //   matchings.push([v1, v2]);
  // }

  // PAIRING BY INDEX
  // ----------------
  // var matchings = [];
  // for (let i = 0; i < oddDegreeVertices.length; i+=2) {
  //   matchings.push([oddDegreeVertices[i], oddDegreeVertices[i+1]]);
  // }

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

  console.log(matchings);

  stepsTaken.push(new MinimumMatchingStep(0, matchings));

  for (let m of matchings) {
    adj[m[0].id].push(m[1]);
    adj[m[1].id].push(m[0]);
  }

  console.log(adj);

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

function generateMatchingPermutations(a, n) {
  if (n == 1) {
    checkIfBestMatching(a);
    return;
  }

  for (let i = 0; i < (n - 1); i++) {
      generateMatchingPermutations(a, n-1);

      if (n % 2 == 0) {
        let e = a[n-1];
        a[n-1] = a[i];
        a[i] = e;
      } else {
        let e = a[n-1];
        a[n-1] = a[0];
        a[0] = e;
      }
  }

  generateMatchingPermutations(a, n-1);
}

function checkIfBestMatching(m) {
  var weight = 0;
  var matching = [];
  for (let i = 0; i < m.length - 1; i+=2) {
    weight += distances[m[i]][m[i+1]];
    matching.push([m[i], m[i+1]]);
  }

  if (weight < bestMatchingWeight) {
    bestMatching = matching;
    bestMatchingWeight = weight;
  }
}
