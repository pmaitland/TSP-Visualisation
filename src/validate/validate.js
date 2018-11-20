
var numInstances   = 100,
    minNumVertices = 5,
    maxNumVertices = 12,
    minDistance    = 10,
    maxDistance    = 1000;

var instances = generateInstances(numInstances, minNumVertices, maxNumVertices, minDistance, maxDistance);

for (let instance of instances) {
  let bnb = branchAndBound(instance.distances, instance.vertices);
  let bf  = bruteForce(instance.distances, instance.vertices);

  if (bnb != bf)
    console.log("FAIL BNB:", bnb, "BF:", bf);
  else
    console.log("PASS BNB:", bnb, "BF:", bf);
}

function generateInstances(n, minV, maxV, minD, maxD){

  var instances = [];

  for (let i = 0; i < n; i++) {
    let numVertices = Math.floor(Math.random() * (maxV - minV + 1)) + minV,
        distances   = [],
        vertices    = [];

    for (let j = 0; j < numVertices; j++) {
      let d = [];
      for (let k = 0; k < numVertices; k++)
        d.push(0);
      distances.push(d);
      vertices.push({"id": j});
    }

    for (let j = 0; j < numVertices; j++) {
      for (let k = 0; k < numVertices; k++) {
        let distance = Math.floor(Math.random() * (maxD - minD + 1)) + minD;
        if (j == k)
          distances[j][k] = 0;
        else {
          distances[j][k] = distance;
          distances[k][j] = distance;
        }
      }
    }

    instances.push({"distances": distances, "vertices": vertices});
  }

  return instances;

}
