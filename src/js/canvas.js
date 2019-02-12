
var canvasWidth;

var xScale,
    yScale;

var xPadding = 0,
    yPadding = 0;

var canvasMinX = 0,
    canvasMaxX,
    canvasMinY = 0,
    canvasMaxY;

var vertexRadius = 15;

// line weights
var vertexStrokeWeight = 2,
    selectedVertexStrokeWeight = 4,

    edgeStrokeWeight = 1;
    animatedEdgeStrokeWeight = 4;

// COLOURS
// creating graph
var vertexColour         = "#fff",
    selectedVertexColour = "#fff",
    vertexBorderColour   = "#000",
    vertexLabelColour    = "#000",

    edgeColour       = "#000",
    edgeWeightColour = "#000",

    distanceMarkingsColour = "#c8c7c7",

// animating
    currentVertexColour            = "#f4e04d",
    nearestVertexColour            = "#7bd389",
    startingVertexColour           = "#203958",
    partOfTourVertexColour         = "#778da9",
    partOfTreeVertexColour         = "#ff7c1d",
    oddDegreeVertexColour          = "#e817b4",
    waitingVertexColour            = "#e84747",
    partOfEulerianTourVertexColour = "#e84747",

    neartestEdgeColour           = "#7bd389",
    partOfTourEdgeColour         = "#778da9",
    partOfTreeEdgeColour         = "#ff7c1d",
    partofMatchingEdgeColour     = "#e817b4",
    partOfEulerianTourEdgeColour = "#e84747",
    shortcutEdgeColour           = "#778da9",
    edgeBetweenNonAdjacentColour = "#43638b",

    lineDash = [8, 8];

/**
  Called once at the very beginning.
 */
function setup() {
  canvasWidth = windowWidth * (2 / 3);

  xScale = yScale = 1;

  var canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent("canvasHolder");
  canvas.style('display', 'block');

  createVertices();
}

function windowResized() {
  canvasWidth = windowWidth * (2 / 3);
  resizeCanvas(canvasWidth, windowHeight);
  if (!inEuclideanSpace) {
    updateCanvasLayout();
  }
}

/**
  Called once every loop.
 */
function draw() {
  background("#fff");
  if (inEuclideanSpace)
    drawDistanceMarkings();

  drawAnimationEdges();
  drawEdges();
  drawVertices();
  drawAnimationEdgeWeights();
  if (!inEuclideanSpace)
    drawNonEuclideanVertexLabels();
  drawEdgeWeights();

  if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < windowHeight) {
    updateMousePosition();
  }
}

function createVertices(count) {
  clearAnimation();
  for (let i = 0; i < count; i++) {
    vertices.push({ id: i, label: i });
  }
}

function updateCanvasLayout() {
  for (let vertex of vertices) {
		var r = Math.min(canvasWidth, windowHeight) * (7/16),
				angle = (vertex.id / (vertices.length / 2)) * Math.PI,
				x = (r * Math.cos(angle)) + (canvasWidth / 2),
				y = (r * Math.sin(angle)) + (windowHeight / 2),
        nonEuclideanLabelX = ((r + 20) * Math.cos(angle)) + (canvasWidth / 2),
				nonEuclideanLabelY = ((r + 20) * Math.sin(angle)) + (windowHeight / 2),
        radius = vertexRadius;

    vertex.x = x;
    vertex.y = y;
    vertex.nonEuclideanLabelX = nonEuclideanLabelX;
    vertex.nonEuclideanLabelY = nonEuclideanLabelY;
    vertex.radius = radius;
	}
}

function drawDistanceMarkings() {
  stroke(distanceMarkingsColour);

  for (let i = 0; i < canvasWidth; i += 10) {
    if (i % 100 == 0) strokeWeight(2)
    else strokeWeight(1);
    line(i, 0, i, windowHeight);
  }

  for (let i = 0; i < windowHeight; i += 10) {
    if (i % 100 == 0) strokeWeight(2)
    else strokeWeight(1);
    line(0, i, canvasWidth, i);
  }
}

/**
  Draw edges from the selected vertex to every other vertex.
 */
function drawEdges() {
  strokeWeight(edgeStrokeWeight);

  for (let vertex of vertices) {
    if (selectedVertex == vertex.id) {
       for (let otherVertex of vertices) {
         if (vertex.id != otherVertex.id) {
           stroke(edgeColour);
           line(vertex.x, vertex.y, otherVertex.x, otherVertex.y);
         }
       }
    }
  }
}

function drawEdgeWeights() {
  for (let vertex of vertices) {
    if (selectedVertex == vertex.id) {
       for (let otherVertex of vertices) {
         if (vertex.id != otherVertex.id) {
           fill(edgeWeightColour);
           strokeWeight(1);
           textSize(16);
           text(distances[vertex.id][otherVertex.id], (vertex.x + otherVertex.x) / 2, (vertex.y + otherVertex.y) /2);
         }
       }
    }
  }
}

function drawAnimationEdges() {
  var v1, v2;

  // tree edges
  for (let edge of edgesInTree) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partOfTreeEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }

  // matching edges
  for (let edge of edgesInMatching) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partofMatchingEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    drawingContext.setLineDash(lineDash);
    line(v1.x, v1.y, v2.x, v2.y);
  }
  drawingContext.setLineDash([]);

  // curved matching edges
  for (let edge of edgesInMatchingCurved) {
    v1 = edge[0];
    v2 = edge[1];

    let leftMost;
    let rightMost;
    if (v1.x <= v2.x) {
      leftMost = v1;
      rightMost = v2;
    } else {
      leftMost = v2;
      rightMost = v1;
    }

    let upMost;
    let downMost;
    if (v1.y <= v2.y) {
      upMost = v1;
      downMost = v2;
    } else {
      upMost = v2;
      downMost = v1;
    }

    let c1 = {
      x: leftMost.x + Math.abs(v1.x - v2.x),
      y: upMost.y
    }
    let c2 = {
      x: rightMost.x - Math.abs(v1.x - v2.x),
      y: downMost.y
    };

    stroke(partofMatchingEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    drawingContext.setLineDash(lineDash);
    curve(c1.x, c1.y, v1.x, v1.y, v2.x, v2.y, c2.x, c2.y);
  }
  drawingContext.setLineDash([]);

  // eulerian tour edges
  for (let edge of edgesInEulerianTour) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partOfEulerianTourEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);

    drawArrowHead(v1, v2);
  }

  // tour edges
  for (let edge of edgesInTour) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(partOfTourEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);

    drawArrowHead(v1, v2);
  }

  // nearest neighbour edges
  for (let edge of edgesToNearest) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(neartestEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }

  // shortcut edges
  for (let edge of edgesWhichShortcut) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(shortcutEdgeColour);
    strokeWeight(animatedEdgeStrokeWeight);
    drawingContext.setLineDash(lineDash);
    line(v1.x, v1.y, v2.x, v2.y);
    drawingContext.setLineDash([]);

    drawArrowHead(v1, v2);
  }

  // edges between non adjacent
  for (let edge of edgesBetweenNonAdjacent) {
    v1 = edge[0];
    v2 = edge[1];

    stroke(edgeBetweenNonAdjacentColour);
    strokeWeight(animatedEdgeStrokeWeight);
    line(v1.x, v1.y, v2.x, v2.y);
  }
}

function drawArrowHead(v1, v2) {
  push();
  var angle = atan2(v1.y - v2.y, v1.x - v2.x);
  translate(v2.x, v2.y);
  rotate(angle-HALF_PI);
  var offset = v1.radius;
  fill(partOfEulerianTourEdgeColour);
  triangle(-offset*0.25, offset, offset*0.25, offset, 0, offset*0.5);
  pop();
}

function drawAnimationEdgeWeights() {
  // nearest neighbour edge weights
  for (let edge of edgesToNearest) {
    v1 = edge[0];
    v2 = edge[1];

    fill(edgeWeightColour);
    strokeWeight(1);
    textSize(16);
    text(distances[v1.id][v2.id], (v1.x + v2.x) / 2, (v1.y + v2.y) /2);
  }
}

/**
  Draw every vertex.
 */
function drawVertices() {
  for (let vertex of vertices) {
    fill(vertexColour);
    strokeWeight(vertexStrokeWeight);

    if (selectedVertex == vertex.id) {
      fill(selectedVertexColour);
      strokeWeight(selectedVertexStrokeWeight);
    }

    if (vertex.isInTree)
      fill(partOfTreeVertexColour);
    if (vertex.isNearest)
      fill(nearestVertexColour);
    if (vertex.isOddDegree)
      fill(oddDegreeVertexColour);
    if (vertex.isWaiting)
      fill(waitingVertexColour);
    if (vertex.isPartOfEulerianTour)
      fill(partOfEulerianTourVertexColour);
    if (vertex.isPartOfTour)
      fill(partOfTourVertexColour);
    if (vertex.isStart)
      fill(startingVertexColour);
    if (vertex.isAt)
      fill(currentVertexColour);

    stroke(vertexBorderColour);
    ellipse(vertex.x, vertex.y, vertex.radius);

    if (showVertexLabels == 2 && inEuclideanSpace) {
      drawVertexLabel(vertex);
    }
  }
}

function drawVertexLabel(v) {
  fill(vertexLabelColour);
  strokeWeight(1);
  textSize(16);
  text(v.label, v.x - v.radius / 2 + 3, v.y - v.radius);
}

function drawNonEuclideanVertexLabels() {
  if (showVertexLabels == 1) {
    for (let v of vertices) {
      if (mouseX > v.x - v.radius && mouseX < v.x + v.radius &&
          mouseY > v.y - v.radius && mouseY < v.y + v.radius) {
        fill(vertexLabelColour);
        strokeWeight(1);
        textSize(16);
        text(v.label, v.nonEuclideanLabelX - 5, v.nonEuclideanLabelY + 5);
      }
    }
  } else if (showVertexLabels == 2) {
    for (let v of vertices) {
      fill(vertexLabelColour);
      strokeWeight(1);
      textSize(16);
      text(v.label, v.nonEuclideanLabelX - 5, v.nonEuclideanLabelY + 5);
    }
  }
}

/**
  Detect if the mouse is clicking on a vertex.
 */
function mousePressed() {
  var isSelecting = false;
  lastSelectedVertex = selectedVertex;
  selectedVertex = null;

  for (let v of vertices) {
    // check to see if the mouse has clicked the vertex
    if (mouseX > v.x - v.radius && mouseX < v.x + v.radius &&
        mouseY > v.y - v.radius && mouseY < v.y + v.radius) {
      selectedVertex = v.id;
      isSelecting = true;
    }
  }

  if (inEuclideanSpace && !isSelecting && currentTab == 'graph' &&
      mouseX > 0 && mouseX < canvasWidth &&
      mouseY > 0 && mouseY < windowHeight) {
    createNewVertex(mouseX, mouseY);
  }
}
