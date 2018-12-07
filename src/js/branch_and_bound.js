
var currentTour, bestTour, unvisited;
var currentTourLength, bestTourLength, numCities;

function branchAndBound() {

  for (let i = 0; i < vertices.length -1; i++)
    distances[i][i] = Infinity;

  currentTour = [vertices[0].id];
  bestTour = [];
  unvisited = [];
  for (let i = 1; i <= vertices.length - 1; i++)
    unvisited.push(vertices[i].id);

  currentTourLength = 0;
  bestTourLength = -1;

  numCities = vertices.length;

  choose(1);

  bestTour.push(bestTour[0]);

  let tour = [];

  for (let v of bestTour) {
    for (let vertex of vertices) {
      if (vertex.id == v)
        tour.push(vertex);
    }
  }

  stepsTaken.push(new FinishedStep(6, tour, bestTourLength));

  return {
    tour: tour,
    tourLength: bestTourLength
  };
}

function choose(i) {

  if (i >= numCities) {

    currentTourLength += distance(currentTour[numCities-1], currentTour[0]);

    if (bestTourLength == -1 || currentTourLength < bestTourLength) {
      bestTourLength = currentTourLength;
      bestTour = Array.from(currentTour);
    }

    currentTourLength -= distance(currentTour[numCities-1], currentTour[0]);

  } else {

    let currentCity = currentTour[i-1];

    let clonedUnvisited = Array.from(unvisited);

    for (let nextCity of clonedUnvisited) {

      currentTour[i] = nextCity;
      currentTourLength += distance(currentCity, nextCity);

      let tempLength = currentTourLength;
      for (let city of unvisited) {
        let nearest = nearestTo(city);
        if (city != nearest)
          tempLength += distance(city, nearest);
      }

      if(tempLength < bestTourLength || bestTourLength == -1) {
        unvisited.splice(unvisited.indexOf(nextCity), 1);
        choose(i+1);
        unvisited.push(nextCity);
      }

      currentTourLength -= distance(currentCity, nextCity);

    }
  }
}

function nearestTo(c) {
  var nearest = 0;

  for (let otherCity of unvisited) {
    if (distance(c, otherCity) < distance(c, nearest))
      nearest = otherCity;
  }

  return nearest;
}

function distance(a, b) {
  return distances[a][b];
}
