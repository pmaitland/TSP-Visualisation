
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
    return `At vertex ${this.vertex.label}`;
  }
}

class NearestVertexStep extends AnimationStep {
  constructor(pseudocodeLine, currentVertex, nearestVertex) {
    super(pseudocodeLine);
    this.currentVertex = currentVertex;
    this.nearestVertex = nearestVertex;
  }

  toString() {
    return `Nearest vertex to ${this.currentVertex.label} is vertex ${this.nearestVertex.label}`;
  }
}

class AddVertexToTourStep extends AnimationStep {
  constructor(pseudocodeLine, vertex) {
    super(pseudocodeLine);
    this.vertex = vertex;
  }

  toString() {
    return `Added vertex ${this.vertex.label} to the tour`;
  }
}

class AddEdgeToTourStep extends AnimationStep {
  constructor(pseudocodeLine, vertex1, vertex2) {
    super(pseudocodeLine);
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
  }

  toString() {
    return `Added vertex ${this.vertex2.label} to the tour`;
  }
}

class ChangeCurrentVertexStep extends AnimationStep {
  constructor(pseudocodeLine, lastVertex, newVertex) {
    super(pseudocodeLine);
    this.lastVertex = lastVertex;
    this.newVertex = newVertex;
  }

  toString() {
    return `Changed current vertex from vertex ${this.lastVertex.label} to vertex ${this.newVertex.label}`;
  }
}

class IncreaseTourLengthStep extends AnimationStep {
  constructor(pseudocodeLine, length, totalLength) {
    super(pseudocodeLine);
    this.length = length;
    this.totalLength = totalLength;
  }

  toString() {
    return `Increased tour length by ${this.length}. Current tour length is ${this.totalLength}`;
  }
}

class AtLastVertexStep extends AnimationStep {
  constructor(pseudocodeLine, lastVertex, startingVertex) {
    super(pseudocodeLine);
    this.lastVertex = lastVertex;
    this.startingVertex = startingVertex;
  }

  toString() {
    return `Vertex ${this.lastVertex.label} is the last vertex. Returning to vertex ${this.startingVertex.label}`;
  }
}

class FindingNearestUnvisitedVertexStep extends AnimationStep {
  constructor(pseudocodeLine, currentVertex, unvisitedVertices) {
    super(pseudocodeLine);
    this.currentVertex = currentVertex;
    this.unvisitedVertices = unvisitedVertices;
  }

  toString() {
    return `Finding the vertex nearest vertex ${this.currentVertex.label} which is still unvisited`;
  }
}

class FinishedStep extends AnimationStep {
  constructor(pseudocodeLine, finalTour, tourLength) {
    super(pseudocodeLine);
    this.finalTour = finalTour;
    this.tourLength = tourLength;
  }

  toString() {
    return `Final tour found. Length of tour is ${this.tourLength}`;
  }
}

class MinSpanTreeStep extends AnimationStep {
  constructor(pseudocodeLine, edges, treeWeight) {
    super(pseudocodeLine);
    this.edges = edges;
    this.treeWeight = treeWeight;
  }

  toString() {
    return `Found minimum weight spanning tree with weight ${this.treeWeight}`;
  }
}

class OddDegreeVerticesStep extends AnimationStep {
  constructor(pseudocodeLine, vertices) {
    super(pseudocodeLine);
    this.vertices = vertices;
  }

  toString() {
    return `Found vertices with odd degree`;
  }
}

class MinimumMatchingStep extends AnimationStep {
  constructor(pseudocodeLine, edges, sharedEdges) {
    super(pseudocodeLine);
    this.edges = edges;
    this.sharedEdges = sharedEdges;
  }

  toString() {
    return `Found minimum weight matching of odd degree vertices`;
  }
}

class BacktrackingStep extends AnimationStep {
  constructor(pseudocodeLine, vertex) {
    super(pseudocodeLine);
    this.vertex = vertex;
  }

  toString() {
    return `Backtracking to vertex ${this.vertex.label}`;
  }
}

class NoUnvisitedNeighboursStep extends AnimationStep {
  constructor(pseudocodeLine, vertex) {
    super(pseudocodeLine);
    this.vertex = vertex;
  }

  toString() {
    return `Vertex ${this.vertex.label} has no unvisited neighbours`;
  }
}

class EdgeBetweenNonAdjacentVerticesStep extends AnimationStep {
  constructor(pseudocodeLine, currentVertex, mate) {
    super(pseudocodeLine);
    this.currentVertex = currentVertex;
    this.mate = mate;
  }

  toString() {
    return `Finished backtracking. Added vertex ${this.currentVertex.label} to the tour by connecting it with vertex ${this.mate.label}`;
  }
}

class StartingVertexStep extends AnimationStep {
  constructor(pseudocodeLine, vertex) {
    super(pseudocodeLine);
    this.vertex = vertex;
  }

  toString() {
    return `Starting at vertex ${this.vertex.label}`;
  }
}

class EulerianTourStep extends AnimationStep {
  constructor(pseudocodeLine, edges) {
    super(pseudocodeLine);
    this.edges = edges;
  }

  toString() {
    return `Found Eulerian tour`;
  }
}

class TakeShortcutStep extends AnimationStep {
  constructor(pseudocodeLine, edge) {
    super(pseudocodeLine);
    this.edge = edge;
  }

  toString() {
    return `Added vertex ${this.edge[1].label} to the tour by taking a shortcut from vertex ${this.edge[0].label}`;
  }
}

class TraverseEdgeInEulerianTourStep extends AnimationStep {
  constructor(pseudocodeLine, edge) {
    super(pseudocodeLine);
    this.edge = edge;
  }

  toString() {
    return `Added vertex ${this.edge[1].label} to the tour`;
  }
}
