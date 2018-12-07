var bestTour, btLength;

function bruteForce() {

  bestTour = [];
  btLength = -1;

  var ids = [];

  for (let v of vertices)
    ids.push(v.id);

  generateBruteForcePermutations(ids, ids.length);

  bestTour.push(bestTour[0]);

  let tour = [];

  for (let v of bestTour) {
    for (let vertex of vertices) {
      if (vertex.id == v)
        tour.push(vertex);
    }
  }

  stepsTaken.push(new FinishedStep(6, tour, btLength));

  return {
    tour: tour,
    tourLength: btLength
  };
}

function generateBruteForcePermutations(a, n) {

  if (n == 1) {
    checkIfBestTour(a);
    return;
  }

  for (let i = 0; i < (n - 1); i++) {
      generateBruteForcePermutations(a, n-1);

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

  generateBruteForcePermutations(a, n-1);
}

function checkIfBestTour(t) {
  var tLength = 0;

  for (let i = 0; i < t.length - 1; i++) {
    tLength += distances[t[i]][t[i+1]];
  }

  tLength += distances[t[t.length - 1]][t[0]];

  if (btLength == -1 || tLength < btLength) {
    btLength = tLength;
    bestTour = Array.from(t);
  }
}
