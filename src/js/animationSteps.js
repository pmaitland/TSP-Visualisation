
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
    return "At vertex " + this.vertex;
  }
}

class NearestVertexStep extends AnimationStep {
  constructor(pseudocodeLine, currentVertex, nearestVertex) {
    super(pseudocodeLine);
    this.currentVertex = currentVertex;
    this.nearestVertex = nearestVertex;
  }

  toString() {
    return "Nearest vertex to " + this.currentVertex + " is vertex " + this.nearestVertex;
  }
}

class AddToTourStep extends AnimationStep {
  constructor(pseudocodeLine, vertex) {
    super(pseudocodeLine);
    this.vertex = vertex;
  }

  toString() {
    return "Added vertex " + this.vertex + " to the tour";
  }
}

class ChangeCurrentVertexStep extends AnimationStep {
  constructor(pseudocodeLine, lastVertex, newVertex) {
    super(pseudocodeLine);
    this.lastVertex = lastVertex;
    this.newVertex = newVertex;
  }

  toString() {
    return "Changed current vertex from vertex " + this.lastVertex + " to vertex " + this.newVertex;
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
    return "Vertex " + this.lastVertex + " is the last vertex. Returning to vertex " + this.startingVertex;
  }
}

class FindingNearestUnvisitedVertexStep extends AnimationStep {
  constructor(pseudocodeLine, currentVertex, unvisitedVertices) {
    super(pseudocodeLine);
    this.currentVertex = currentVertex;
    this.unvisitedVertices = unvisitedVertices;
  }

  toString() {
    return "Finding the vertex nearest vertex " + this.currentVertex + " which is still unvisited";
  }
}
