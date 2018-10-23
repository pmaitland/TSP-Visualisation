
class AtVertexStep {
  constructor(vertex) {
    this.vertex = vertex;
  }

  toString() {
    return "At vertex " + this.vertex;
  }
}

class NearestVertexStep {
  constructor(currentVertex, nearestVertex) {
    this.currentVertex = currentVertex;
    this.nearestVertex = nearestVertex;
  }

  toString() {
    return "Nearest vertex to " + this.currentVertex + " is vertex " + this.nearestVertex;
  }
}

class AddToTourStep {
  constructor(vertex) {
    this.vertex = vertex;
  }

  toString() {
    return "Added vertex " + this.vertex + " to the tour";
  }
}

class ChangeCurrentVertexStep {
  constructor(lastVertex, newVertex) {
    this.lastVertex = lastVertex;
    this.newVertex = newVertex;
  }

  toString() {
    return "Changed current vertex from vertex " + this.lastVertex + " to vertex " + this.newVertex;
  }
}

class IncreaseTourLengthStep {
  constructor(length, totalLength) {
    this.length = length;
    this.totalLength = totalLength;
  }

  toString() {
    return "Increased tour length by " + this.length + ". Current tour length is " + this.totalLength;
  }
}

class AtLastVertexStep {
  constructor(lastVertex, startingVertex) {
    this.lastVertex = lastVertex;
    this.startingVertex = startingVertex;
  }

  toString() {
    return "Vertex " + this.lastVertex + " is the last vertex. Returning to vertex " + this.startingVertex;
  }
}

class FindingNearestUnvisitedVertexStep {
  constructor(currentVertex, unvisitedVertices) {
    this.currentVertex = currentVertex;
    this.unvisitedVertices = unvisitedVertices;
  }

  toString() {
    return "Finding the vertex nearest vertex " + this.currentVertex + " which is still unvisited";
  }
}

class FinalTourFoundStep {
  constructor(tour) {
    this.tour = tour;
  }

  toString() {
    return "Final tour found";
  }
}
