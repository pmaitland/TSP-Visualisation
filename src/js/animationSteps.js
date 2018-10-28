
class AnimationStep {
  constructor(pseudocodeLine) {
    this.pseudocodeLine = pseudocodeLine;
  }

  toString() {}
}

class AtVertexStep extends AnimationStep {
  constructor(pseudocodeLine, vertex) {
    super(pseudocodeLine);
    this.vertex = vertex;
  }

  toString() {
    return "At vertex " + this.vertex.label;
  }
}

class NearestVertexStep extends AnimationStep {
  constructor(pseudocodeLine, currentVertex, nearestVertex) {
    super(pseudocodeLine);
    this.currentVertex = currentVertex;
    this.nearestVertex = nearestVertex;
  }

  toString() {
    return "Nearest vertex to " + this.currentVertex.label + " is vertex " + this.nearestVertex.label;
  }
}

class AddToTourStep extends AnimationStep {
  constructor(pseudocodeLine, vertex) {
    super(pseudocodeLine);
    this.vertex = vertex;
  }

  toString() {
    return "Added vertex " + this.vertex.label + " to the tour";
  }
}

class ChangeCurrentVertexStep extends AnimationStep {
  constructor(pseudocodeLine, lastVertex, newVertex) {
    super(pseudocodeLine);
    this.lastVertex = lastVertex;
    this.newVertex = newVertex;
  }

  toString() {
    return "Changed current vertex from vertex " + this.lastVertex.label + " to vertex " + this.newVertex.label;
  }
}

class IncreaseTourLengthStep extends AnimationStep {
  constructor(pseudocodeLine, length, totalLength) {
    super(pseudocodeLine);
    this.length = length;
    this.totalLength = totalLength;
  }

  toString() {
    return "Increased tour length by " + this.length + ". Current tour length is " + this.totalLength;
  }
}

class AtLastVertexStep extends AnimationStep {
  constructor(pseudocodeLine, lastVertex, startingVertex) {
    super(pseudocodeLine);
    this.lastVertex = lastVertex;
    this.startingVertex = startingVertex;
  }

  toString() {
    return "Vertex " + this.lastVertex.label + " is the last vertex. Returning to vertex " + this.startingVertex.label;
  }
}

class FindingNearestUnvisitedVertexStep extends AnimationStep {
  constructor(pseudocodeLine, currentVertex, unvisitedVertices) {
    super(pseudocodeLine);
    this.currentVertex = currentVertex;
    this.unvisitedVertices = unvisitedVertices;
  }

  toString() {
    return "Finding the vertex nearest vertex " + this.currentVertex.label + " which is still unvisited";
  }
}

class FinishedStep extends AnimationStep {
  constructor(pseudocodeLine, finalTour, tourLength) {
    super(pseudocodeLine);
    this.finalTour = finalTour;
    this.tourLength = tourLength;
  }

  toString() {
    return "Final tour found. Length of tour is " + this.tourLength;
  }
}
