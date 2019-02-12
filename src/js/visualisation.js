
var stepsTaken = [],
    currentAnimationStep = 0,
    playingAnimation = false,
    edgesInTour = [],
    edgesInTree = [],
    edgesToNearest = [],
    edgesInMatching = [],
    edgesInMatchingCurved = [],
    edgesInEulerianTour = [],
    edgesWhichShortcut = [],
    edgesBetweenNonAdjacent = [];

var mst = [],
    eulTour = [],
    firstVertex = -1,
    currentAlgorithm = "";

var distances = [],
    vertices = [];

var currentTab = 'graph';

var selectedVertex = null,
    lastSelectedVertex = null,
    showVertexLabels = 0;

var inEuclideanSpace;

var resultsCount = 0;

var pseudocodeHighlightColour = "#f4e04d";

var stepLogColour1 = "#fff",
    stepLogColour2 = "#eee",
    stepLogUsingColour1 = true;

var timeout = 0;

window.onload = function() {
  let number = Math.floor(Math.random() * 5);
  document.getElementById("favicon").href = `assets/favicons/favicon${number}.ico`;

  changeShowLabels();
  inEuclideanSpace = true;

  document.getElementById("vertexCount").value = vertices.length;
};

function saveInstance() {
  var filename;
  var text;

  if (inEuclideanSpace) {
    filename = `${document.getElementById("saveEuclideanFileName").value}`;
    filename = filename.replace(/\s/g, "");
    filename = filename.split(/\W+/)[0];
    if (filename.length == 0) filename = "TSP-Instance";
    if (!filename.endsWith(".tsp")) filename += ".tsp";

    text = generateEuclideanFileContent(filename);
  } else {
    filename = `${document.getElementById("saveNonEuclideanFileName").value}`;
    filename = filename.replace(/\s/g, "");
    filename = filename.split(/\W+/)[0];
    if (filename.length == 0) filename = "TSP-Instance";
    if (!filename.endsWith(".tsp")) filename += ".tsp";

    text = generateNonEuclideanFileContent(filename);
  }

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function generateEuclideanFileContent(filename) {
  var name                  = `NAME: ${filename}`;
  var type                  = `TYPE: TSP`;
  var comment               = `COMMENT: Generated using https://pmaitland.github.io/TSP-Visualisation/`;
  var dimension             = `DIMENSION: ${vertices.length}`;
  var edgeWeightType        = `EDGE_WEIGHT_TYPE: EUC_2D`;
  var nodeCoordType         = `NODE_COORD_TYPE: TWOD_COORDS`;
  var nodeCoordSectionLabel = `NODE_COORD_SECTION`;

  var nodeCoordSection = ``;
  for (let v of vertices)
    nodeCoordSection += `${v.id} ${v.x} ${v.y}\n`;

  var text = name + "\n"
              + type + "\n"
              + comment + "\n"
              + dimension + "\n"
              + edgeWeightType + "\n"
              + nodeCoordType + "\n"
              + nodeCoordSectionLabel + "\n"
              + nodeCoordSection;
  return text;
}

function generateNonEuclideanFileContent(filename) {
  var name                   = `NAME: ${filename}`;
  var type                   = `TYPE: TSP`;
  var comment                = `COMMENT: Generated using https://pmaitland.github.io/TSP-Visualisation/`;
  var dimension              = `DIMENSION: ${vertices.length}`;
  var edgeWeightType         = `EDGE_WEIGHT_TYPE: EXPLICIT`;
  var edgeWeightFormat       = `EDGE_WEIGHT_FORMAT: FULL_MATRIX`;
  var edgeWeightSectionLabel = `EDGE_WEIGHT_SECTION`

  var lengthOfMaxDistance = getLengthOfMaxDistance();

  var edgeWeightSection = ``;
  for (let distanceArray of distances) {
    for (let distance of distanceArray) {
      let whiteSpaceCount = lengthOfMaxDistance - distance.toString().length;
      for (let i = 0; i < whiteSpaceCount; i++)
        edgeWeightSection += ` `;
      edgeWeightSection += `${distance} `;
    }
    edgeWeightSection += `\n`;
  }

  var text = name + "\n"
              + type + "\n"
              + comment + "\n"
              + dimension + "\n"
              + edgeWeightType + "\n"
              + edgeWeightFormat + "\n"
              + edgeWeightSectionLabel + "\n"
              + edgeWeightSection;
  return text;
}

function getLengthOfMaxDistance() {
  var maxRow = distances.map(function(row){ return Math.max.apply(Math, row); });
  var max = Math.max.apply(null, maxRow);
  return max.toString().length;
}

function changeVertexCount(count) {
  vertices = [];
  if (count < 0)
    count = document.getElementById("vertexCount").value;

  createVertices(count);
  updateCanvasLayout();
  resetDistances();
  displayDistanceMatrix();
}

function resetDistances() {
  distances = [];
  for (let i = 0; i < vertices.length; i++) {
    let d = [];
    for (let j = 0; j < vertices.length; j++) {
      if (i == j) {
        d.push(0);
      } else {
        d.push(1);
      }
    }
    distances.push(d);
  }
}

function displayDistanceMatrix() {

  // get distance matrix element from HTML
  var distanceMatrix;
  if (inEuclideanSpace)
    distanceMatrix = document.getElementById("distanceMatrixEuclidean");
  else
    distanceMatrix = document.getElementById("distanceMatrixNonEuclidean");

  // delete all cells in the distance matrix
  while(distanceMatrix.hasChildNodes()) {
     distanceMatrix.removeChild(distanceMatrix.firstChild);
  }

  // create a row to hold vertex labels
  var labelRow = distanceMatrix.insertRow(0),
      row, cell;

  // leave the top-left cell empty
  if (vertices.length > 0) {
    let emptyCell = labelRow.insertCell(0);
    emptyCell.style.backgroundColor = '#778da9';
    emptyCell.style.textAlign = 'right';
  }

  // fill the top row with vertex labels
  for (let i = 0; i < vertices.length; i++) {
    let vertex = vertices[i];
    cell = labelRow.insertCell(i+1);
    // cell.setAttribute("contenteditable", true);
    cell.style.backgroundColor = '#778da9';
    cell.style.textAlign = 'right';
    cell.classList.add(vertex.id + "label");
    // cell.addEventListener("blur", function(){editVertexLabel(vertex.id, this.innerHTML)});
    cell.innerHTML = vertex.label;
  }

  // create a row for every vertex
  for (let i = 0; i < vertices.length; i++) {
    let row = distanceMatrix.insertRow(i+1);

    // insert the vertex label in the first cell of its row
    cell = row.insertCell(0);
    // cell.setAttribute("contenteditable", true);
    cell.style.backgroundColor = '#778da9';
    cell.style.textAlign = 'right';
    cell.classList.add(vertices[i].id + "label");
    // cell.addEventListener("blur", function(){editVertexLabel(vertices[i].id, this.innerHTML)});
    cell.innerHTML = vertices[i].label;

    // fill the rest of the row with distances to other vertices
    for (let j = 0; j < vertices.length; j++) {
      var distanceCell = row.insertCell(j+1);

      if (i == j) {
        distanceCell.innerHTML = 0;
        distanceCell.style.backgroundColor = '#eee';
      } else {
        if (i < j) {
          distanceCell.classList.add("v" + i.toString() + "v" + j.toString() + "distance");
          distanceCell.addEventListener("blur", function(){editDistance(i, j, this.innerHTML)});
        } else {
          distanceCell.classList.add("v" + j.toString() + "v" + i.toString() + "distance");
          distanceCell.addEventListener("blur", function(){editDistance(j, i, this.innerHTML)});
        }
        distanceCell.innerHTML = distances[i][j];
        if (!inEuclideanSpace) {
          distanceCell.setAttribute("contenteditable", true);
        }
      }
      distanceCell.style.textAlign = 'right';
    }
  }

}

function appendToDistanceMatrix(vertex) {
  var distanceMatrix;
  if (inEuclideanSpace)
    distanceMatrix = document.getElementById("distanceMatrixEuclidean");
  else
    distanceMatrix = document.getElementById("distanceMatrixNonEuclidean");

  var row = distanceMatrix.insertRow(-1),
      cell;

  // start new row with vertex label
  cell = row.insertCell(-1);
  // cell.setAttribute("contenteditable", true);
  cell.style.backgroundColor = '#778da9';
  cell.style.textAlign = 'right';
  cell.classList.add(vertex.id + "label");
  // cell.addEventListener("blur", function(){editVertexLabel(vertex.id, this.innerHTML)});
  cell.innerHTML = vertex.label;

  // insert a cell for the distance from this vertex to every other vertex
  for (let i = 0; i < vertices.length - 1; i ++) {
    cell = row.insertCell(-1);
    cell.innerHTML = distances[vertex.id][vertices[i].id];
  }

  // insert a cell for the distance from this vertex to itself
  cell = row.insertCell(-1);
  cell.innerHTML = 0;
  cell.style.textAlign = 'right';
  cell.style.backgroundColor = '#eee';

  var rows = distanceMatrix.rows;

  cell = rows[0].insertCell(-1);
  // cell.setAttribute("contenteditable", true);
  cell.style.backgroundColor = '#778da9';
  cell.style.textAlign = 'right';
  cell.classList.add(vertex.id + "label");
  // cell.addEventListener("blur", function(){editVertexLabel(vertex.id, this.innerHTML)});
  cell.innerHTML = vertex.label;

  for (let i = 0; i < vertices.length - 1; i++) {
    cell = rows[i+1].insertCell(-1);
    cell.innerHTML = distances[vertex.id][vertices[i].id];
    cell.style.textAlign = 'right';
  }
}

function editVertexLabel(vertexID, newLabel) {
  for (let vertex of vertices) {
    if (vertex.id == vertexID) {
      vertex.label = newLabel;
      let labelCells = document.getElementsByClassName(vertex.id + "label");
      for (let cell of labelCells) {
        cell.innerHTML = newLabel;
      }
    }
  }
}

function editDistance(v1, v2, newDistance) {
  distances[v1][v2] = parseInt(newDistance, 10);
  distances[v2][v1] = parseInt(newDistance, 10);
  let cells = document.getElementsByClassName("v" + v1.toString() + "v" + v2.toString() + "distance");
  for (let cell of cells) {
    cell.innerHTML = newDistance;
  }
}

function disableButtons(btns) {
  for (let b of btns)
    b.disabled = true;
}

function enableButtons(btns) {
  for (let b of btns)
    b.disabled = false;
}

function togglePauseButton() {
  let btn = document.getElementById("play-pause-btn-span");

  if (playingAnimation) {
    btn.classList.remove("glyphicon-play");
    btn.classList.add("glyphicon-pause");
  } else {
    btn.classList.remove("glyphicon-pause");
    btn.classList.add("glyphicon-play"); 
  }
}

function restartAnimation() {
  currentAnimationStep = 0;
  document.getElementById("currentStep").innerHTML = currentAnimationStep;
  playingAnimation = false;
  edgesInTour = [];
  edgesInTree = [];
  edgesInMatching = [];
  edgesInMatchingCurved = [];
  edgesToNearest = [];
  edgesInEulerianTour = [];
  edgesWhichShortcut = [];

  for (let vertex of vertices) {
    vertex.isAt = false;
    vertex.isNearest = false;
    vertex.isPartOfTour = false;
    vertex.isInTree = false;
    vertex.isOddDegree = false;
    vertex.isWaiting = false;
    vertex.isStart = false;
    vertex.isPartOfEulerianTour = false;
  }

  clearElementChildren("stepLog");
  disableButtons(document.getElementsByClassName("back-step-btn"));
  enableButtons(document.getElementsByClassName("forward-step-btn"));
  togglePauseButton();
}

function endAnimation() {
  if (currentAnimationStep >= stepsTaken.length) return;

  jumpLogToEnd(currentAnimationStep);
  currentAnimationStep = stepsTaken.length - 1;
  document.getElementById("currentStep").innerHTML = currentAnimationStep;
  stepForwardAnimation();

  for (let step of stepsTaken) {
    switch (step.constructor) {
    case EdgeBetweenNonAdjacentVerticesStep:
      edgesWhichShortcut.push([step.mate, step.currentVertex]);
      break;
    case StartingVertexStep:
      firstVertex = step.vertex.id;
      break;
    case TakeShortcutStep:
      edgesWhichShortcut.push(step.edge);
      break;
    case EulerianTourStep:
      for (let e of step.edges)
        eulTour.push(e);
      break;
    default:
      break;
    }
  }

  playingAnimation = false;
}

function playAnimation() {
  if (playingAnimation) {
    stepForwardAnimation();
    timeout = setTimeout(playAnimation, 1000);
  }
}

function togglePauseAnimation() {
  playingAnimation = !playingAnimation;

  if (playingAnimation)
    playAnimation();

  togglePauseButton();
}

function takeStep(currentStep) {
  switch (currentStep.constructor) {

    case AtVertexStep:
      currentStep.vertex.isAt = true;
      currentStep.vertex.isPartOfTour = true;
      break;

    case NearestVertexStep:
      for (let vertex of vertices) {
        vertex.isNearest = false;
      }
      currentStep.nearestVertex.isNearest = true;
      edgesToNearest = [[currentStep.currentVertex, currentStep.nearestVertex]];
      break;

    case AddVertexToTourStep:
      currentStep.vertex.isPartOfTour = true;
      break;

    case AddEdgeToTourStep:
      for (let v of vertices) {
        if (v.id != currentStep.vertex2.id)
          v.isAt = false;
      }
      currentStep.vertex1.isPartOfTour = true;
      currentStep.vertex2.isAt = true;
      edgesInTour.push([currentStep.vertex1, currentStep.vertex2]);
      break;

    case ChangeCurrentVertexStep:
      currentStep.lastVertex.isAt = false;
      currentStep.lastVertex.isPartOfTour = true;
      currentStep.newVertex.isAt = true;
      currentStep.newVertex.isNearest = false;
      edgesInTour.push([currentStep.lastVertex, currentStep.newVertex]);
      edgesToNearest = [];
      break;

    case IncreaseTourLengthStep:
    break;

    case AtLastVertexStep:
      currentStep.lastVertex.isAt = false;
      currentStep.lastVertex.isPartOfTour = true;
      edgesInTour.push([currentStep.lastVertex, currentStep.startingVertex]);
      edgesToNearest = [];
      break;

    case FindingNearestUnvisitedVertexStep:
      edgesToNearest = [];
      for (let v of vertices) {
        for (let u of currentStep.unvisitedVertices) {
          if (v.id == u.id) {
            v.isNearest = true;
            edgesToNearest.push([currentStep.currentVertex, v]);
          }
        }
      }
      break;

    case FinishedStep:
      showTour(currentStep.finalTour, false);
      break;

    case MinSpanTreeStep:
      for (let edge of currentStep.edges) {
        edgesInTree.push(edge);
        mst.push(edge);
      }
      for (let v of vertices)
        v.isInTree = true;
      break;

    case OddDegreeVerticesStep:
      for (let v of currentStep.vertices)
        v.isOddDegree = true;
      break;

    case MinimumMatchingStep:
      for (let e of currentStep.edges)
        edgesInMatching.push(e);
      for (let e of currentStep.sharedEdges)
        edgesInMatchingCurved.push(e);
      break;

    case BacktrackingStep:
      for (let v of vertices) {
        if (v.id != currentStep.vertex.id)
          v.isAt = false;
      }
      currentStep.vertex.isAt = true;
      break;

    case NoUnvisitedNeighboursStep:
      currentStep.vertex.isWaiting = true;
      break;

    case EdgeBetweenNonAdjacentVerticesStep:
      for (let v of vertices) {
        if (v.id != currentStep.currentVertex.id)
          v.isAt = false;
      }
      currentStep.mate.isPartOfTour = true;
      currentStep.mate.isWaiting = false;
      currentStep.currentVertex.isAt = true;
      edgesWhichShortcut.push([currentStep.mate, currentStep.currentVertex]);
      break;

    case StartingVertexStep:
      currentStep.vertex.isPartOfEulerianTour = false;
      currentStep.vertex.isStart = true;
      currentStep.vertex.isAt = true;
      firstVertex = currentStep.vertex.id;
      break;

    case EulerianTourStep:
      edgesInMatching = [];
      edgesInMatchingCurved = [];
      for (let edge of currentStep.edges) {
        edgesInEulerianTour.push(edge);
        eulTour.push(edge);
      }
      for (let vertex of vertices)
        vertex.isPartOfEulerianTour = true;
      break;

    case TakeShortcutStep:
      let shortcut = currentStep.edge;
      console.log(shortcut);
      edgesWhichShortcut.push(shortcut);

      for (let v of vertices) {
        if (v.id == shortcut[0].id) {
          v.isAt = false;
          v.isPartOfTour = true;
        }
        if (v.id == shortcut[1].id) {
          v.isAt = true;
          v.isPartOfEulerianTour = false;
        }
      }
      break;

    case TraverseEdgeInEulerianTourStep:
      let edge = currentStep.edge,
          edgeToDelete;
      for (let e of edgesInEulerianTour) {
        if (e[0].id == edge[0].id && e[1].id == edge[1].id) {
          edgeToDelete = e;
          break;
        }
      }
      edgesInEulerianTour.splice(edgesInEulerianTour.indexOf(edgeToDelete), 1);
      edgesInTour.push(edge);

      for (let v of vertices) {
        if (v.id == edge[0].id) {
          v.isAt = false;
          v.isPartOfTour = true;
        }
        if (v.id == edge[1].id) {
          v.isAt = true;
          v.isPartOfEulerianTour = false;
        }
      }
      break;

    default:
      break;
  }
}

function pressStepForward() {
  playingAnimation = false;
  togglePauseButton();
  stepForwardAnimation();
}

function pressStepBackward() {
  playingAnimation = false;
  togglePauseButton();
  stepBackwardAnimation();
}

function stepForwardAnimation() {
  if (currentAnimationStep >= stepsTaken.length) return;

  if (currentAnimationStep == stepsTaken.length - 1)
    disableButtons(document.getElementsByClassName("forward-step-btn"));

  currentStep = stepsTaken[currentAnimationStep];

  takeStep(currentStep);

  enableButtons(document.getElementsByClassName("back-step-btn"));
  currentAnimationStep++;
  document.getElementById("currentStep").innerHTML = currentAnimationStep;
  showStepInLog(currentStep.toString());
  highlightPseudocode(currentStep.pseudocodeLine);
}

function stepBackwardAnimation() {
  if (currentAnimationStep < 0) return;

  if (currentAnimationStep == 1)
    disableButtons(document.getElementsByClassName("back-step-btn"));

  if (currentAnimationStep == 0) {
    restartAnimation();
    return;
  }

  currentStep = stepsTaken[currentAnimationStep - 1];
  previousStep = stepsTaken[currentAnimationStep - 2];

  switch (currentStep.constructor) {
    case AtVertexStep:
      currentStep.vertex.isPartOfTour = false;
      break;

    case NearestVertexStep:
      edgesToNearest = [];
      for (let vertex of vertices) {
        if (vertex.id != currentStep.currentVertex.id && !vertex.isPartOfTour) {
          vertex.isNearest = true;
          edgesToNearest.push([currentStep.currentVertex, vertex]);
        }
      }
      break;

    case AddVertexToTourStep:
      currentStep.vertex.isPartOfTour = false;
      break;

    case AddEdgeToTourStep:
      currentStep.vertex1.isAt = true;
      currentStep.vertex1.isPartOfTour = false;
      currentStep.vertex2.isAt = false;
      removeEdgeFromTour(currentStep.vertex1.id, currentStep.vertex2.id);
      break;

    case ChangeCurrentVertexStep:
      currentStep.lastVertex.isAt = true;
      currentStep.lastVertex.isPartOfTour = false;
      currentStep.newVertex.isAt = false;
      currentStep.newVertex.isNearest = true;
      removeEdgeFromTour(currentStep.lastVertex.id, currentStep.newVertex.id);
      edgesToNearest = [[currentStep.lastVertex, currentStep.newVertex]];
      break;

    case IncreaseTourLengthStep:
      break;

    case FindingNearestUnvisitedVertexStep:
      edgesToNearest = [];
      for (let vertex of vertices) {
        vertex.isNearest = false;
      }
      break;

    case FinishedStep:
      var algorithmsWithStartingVertex = [
        "approxMinSpanTree", "christofides", "nearestNeighbour"
      ];
      if (algorithmsWithStartingVertex.includes(currentAlgorithm)) {
        if (firstVertex >= 0) {
          for (let v of vertices) {
            if (v.id == firstVertex)
              v.isStart = true;
          }
        }
      }
      
      if (currentAnimationStep == 1) {
        for (let v of vertices) {
          v.isPartOfTour = false;
        }
        edgesInTour = [];
      }

      switch (currentAlgorithm) {
        case "approxMinSpanTree":
          for (let v of vertices)
            v.isInTree = true;
          showMinSpanTree();
          break;
        case "christofides":
          for (let v of vertices)
            v.isPartOfEulerianTour = true;
          showEulTour();
          break;
        default:
          break;

      }

      console.log(edgesWhichShortcut);
      for (let edge of edgesWhichShortcut) {
        removeEdgeFromTour(edge[0].id, edge[1].id);
      }

      break;

    case AtLastVertexStep:
      currentStep.lastVertex.isAt = true;
      currentStep.lastVertex.isPartOfTour = false;
      removeEdgeFromTour(currentStep.lastVertex.id, currentStep.startingVertex.id);
      edgesToNearest = [[currentStep.lastVertex, currentStep.startingVertex]];
      break;

    case StartingVertexStep:
      currentStep.vertex.isPartOfEulerianTour = false;
      currentStep.vertex.isStart = false;
      currentStep.vertex.isPartOfTour = false;
      currentStep.vertex.isAt = false;
      break;

    case BacktrackingStep:
      if (previousStep.constructor == NoUnvisitedNeighboursStep) {
        currentStep.vertex.isAt = false;
        previousStep.vertex.isAt = true;
        previousStep.vertex.isWaiting = false;
      }
      break;

    case EdgeBetweenNonAdjacentVerticesStep:
      removeEdgeFromShortcuts(currentStep.mate.id, currentStep.currentVertex.id);
      currentStep.mate.isWaiting = true;
      break;

    case NoUnvisitedNeighboursStep:
      currentStep.vertex.isWaiting = false;
      currentStep.vertex.isPartOfTour = false;
      break;

    case MinSpanTreeStep:
      for (let v of vertices)
        v.isInTree = false;
      edgesInTree = [];
      break;

    case TakeShortcutStep:
      currentStep.edge[1].isAt = false;
      currentStep.edge[1].isPartOfTour = false;
      if (currentAlgorithm == "christofides")
        currentStep.edge[1].isPartOfEulerianTour = true;
      removeEdgeFromShortcuts(currentStep.edge[0].id, currentStep.edge[1].id);
      break;

    case TraverseEdgeInEulerianTourStep:
      currentStep.edge[1].isAt = false;
      currentStep.edge[1].isPartOfTour = false;
      currentStep.edge[1].isPartOfEulerianTour = true;
      removeEdgeFromTour(currentStep.edge[0].id, currentStep.edge[1].id);
      edgesInEulerianTour.push(currentStep.edge);
      break;

    case EulerianTourStep:
      edgesInEulerianTour = [];
      for (let v of vertices) {
        v.isPartOfEulerianTour = false;
        v.isInTree = true;
      }

      for (let e of previousStep.edges) {
        e[0].isOddDegree = true;
        e[1].isOddDegree = true;
      }

      for (let e of previousStep.sharedEdges) {
        e[0].isOddDegree = true;
        e[1].isOddDegree = true;
      }

      showMinSpanTree();
      break;

    case MinimumMatchingStep:
      edgesInMatching = [];
      break;

    case OddDegreeVerticesStep:
      for (let v of vertices)
        v.isOddDegree = false;
      break;

    default:
      break;
  }

  if (previousStep) {
    takeStep(previousStep);
    highlightPseudocode(previousStep.pseudocodeLine);
  }
  enableButtons(document.getElementsByClassName("forward-step-btn"));
  currentAnimationStep -= 1;
  document.getElementById("currentStep").innerHTML = currentAnimationStep;
  removeStepFromLog();
}

function removeEdgeFromTour(v1, v2) {
  let indexesToRemove = [];
  for (let i = 0; i < edgesInTour.length; i++) {
    let edgeV1 = edgesInTour[i][0].id,
        edgeV2 = edgesInTour[i][1].id;
    if ((edgeV1 === v1 && edgeV2 === v2) || (edgeV1 === v2 && edgeV2 === v1)) {
      indexesToRemove.push(i);
    }
  }

  for (let i = 0; i < indexesToRemove.length; i++) {
    edgesInTour.splice(indexesToRemove[i] - i, 1);
  }
}

function removeEdgeFromShortcuts(v1, v2) {
  let indexesToRemove = [];
  for (let i = 0; i < edgesWhichShortcut.length; i++) {
    let edgeV1 = edgesWhichShortcut[i][0].id,
        edgeV2 = edgesWhichShortcut[i][1].id;
    if ((edgeV1 === v1 && edgeV2 === v2) || (edgeV1 === v2 && edgeV2 === v1)) {
      indexesToRemove.push(i);
    }
  }

  for (let i = 0; i < indexesToRemove.length; i++) {
    edgesWhichShortcut.splice(indexesToRemove[i] - i, 1);
  }
}

function showMinSpanTree() {
  for (let edge of mst)
    edgesInTree.push(edge);
}

function showEulTour() {
  for (let edge of eulTour)
    edgesInEulerianTour.push(edge);
}

function openTab(evt, tabName) {
    switch (tabName) {
      case "input":
        currentTab = 'graph';
        break;
      case "algorithms":
        currentTab = 'algorithms';
        break;
      case "output":
        currentTab = 'results';
        break;
      default:
        currentTab = 'graph';
        break;
    }
}

function distanceBetween(v1, v2) {
  return Math.round(Math.hypot((v2.x - v1.x) / xScale, (v2.y - v1.y) / yScale)) ;
}

function changeSpace(evt, space) {

  if ((space == "euclidean" && inEuclideanSpace) || (space == "nonEuclidean") && !inEuclideanSpace)
    return;

  vertices = [];
  edgesInTour = [];
  edgesInTree = [];
  edgesToNearest = [];
  edgesInMatching = [];
  edgesInMatchingCurved = [];
  edgesInEulerianTour = [];
  edgesWhichShortcut = [];
  edgesBetweenNonAdjacent = [];

  if (space == 'euclidean' && !inEuclideanSpace) {
    inEuclideanSpace = true;
    resetDistances();
    displayDistanceMatrix();
  } else if (space == 'nonEuclidean') {
    inEuclideanSpace = false;
    document.getElementById("vertexCount").value = 3;
    changeVertexCount(3);
  }
}

function changeShowLabels() {
  var selection = document.getElementById("changeShowLabelsSelect");

  switch (selection.value) {
    case 'never':
      showVertexLabels = 0;
      break;
    case 'onHover':
      showVertexLabels = 1;
      break;
    case 'always':
      showVertexLabels = 2;
      break;
    default:
      break;
  }
}

function showStepInLog(stepString) {
  var log     = document.getElementById("stepLog"),
      stepDiv = document.createElement("div"),
      step    = document.createTextNode(stepString),
      br      = document.createElement("br");

  stepDiv.style.float = "left";
  stepDiv.style.width = "100%";
  stepDiv.appendChild(step);
  if (stepLogUsingColour1)
    stepDiv.style.backgroundColor = stepLogColour1;
  else
    stepDiv.style.backgroundColor = stepLogColour2;
  stepLogUsingColour1 = !stepLogUsingColour1;

  log.appendChild(stepDiv);
  log.appendChild(br);
  log.scrollTop = log.scrollHeight;
}

function removeStepFromLog() {
  var log = document.getElementById("stepLog");

  // called twice to remove text AND break
  log.removeChild(log.lastChild);
  log.removeChild(log.lastChild);
  stepLogUsingColour1 = !stepLogUsingColour1;
}

function jumpLogToEnd(startingStep) {
  for (let step of stepsTaken.slice(startingStep, stepsTaken.length - 1)) {
    showStepInLog(step.toString());
  }
}

function showPseudocode(algorithm) {
  var pseudocode = document.getElementById("pseudocode");
  clearElementChildren("pseudocode");

  switch (algorithm) {
    case "nn":
      for (let line of nnPseudocode) {
        var lineDiv = document.createElement("div"),
            text = document.createTextNode(line);

        lineDiv.appendChild(text);
        pseudocode.appendChild(lineDiv);
      }
      break;

    default:
      break;
  }

}

function highlightPseudocode(lineNumber) {
  var pseudocode = document.getElementById("pseudocode");

  for (let i = 0; i < pseudocode.children.length; i++) {
    if (i == lineNumber) {
      pseudocode.children[i].style.backgroundColor = pseudocodeHighlightColour;
    } else {
      pseudocode.children[i].style.backgroundColor = 'white';
    }
  }
}

function clearElementChildren(id) {
  let el = document.getElementById(id);
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function updateMousePosition() {
  var x = document.getElementById("mouseCoordsX"),
      y = document.getElementById("mouseCoordsY");

  x.innerHTML = `X: ${Math.round((mouseX + canvasMinX) * xScale - xPadding)}`;
  y.innerHTML = `Y: ${Math.round((mouseY + canvasMinY) * yScale - yPadding)}`;

  for (let v of vertices) {
    if (mouseX > v.x - v.radius && mouseX < v.x + v.radius &&
        mouseY > v.y - v.radius && mouseY < v.y + v.radius &&
        showVertexLabels == 1 && inEuclideanSpace) {
      drawVertexLabel(v);
    }
  }
}

function clearAnimation() {
  clearElementChildren("results");
  clearElementChildren("stepLog");

  document.getElementById("currentAlgorithm").innerHTML = '&nbsp';
  document.getElementById("stepCounter").hidden = true;

  stepsTaken = [];
  currentAnimationStep = 0;
  playingAnimation = false;
  edgesInTour = [];
  edgesInTree = [];
  edgesToNearest = [];
  edgesInMatching = [];
  edgesInMatchingCurved = [];
  edgesInEulerianTour = [];
  edgesWhichShortcut = [];
  edgesBetweenNonAdjacent = [];

  mst = [];
  eulTour = [];
  firstVertex = -1;
  currentAlgorithm = "";

  for (let v of vertices) {
    v.isAt = false;
    v.isNearest = false;
    v.isPartOfTour = false;
    v.isInTree = false;
    v.isOddDegree = false;
    v.isWaiting = false;
    v.isStart = false;
    v.isPartOfEulerianTour = false;
  }
}

function createNewVertex(x, y) {
  clearAnimation();

  var id = Math.max.apply(Math, vertices.map(function(v) { return v.id; })) + 1;
  if (id == -Infinity) id = 0;

  var v = {
    id: id,
    label: id,
    x: (x * xScale) + xPadding,
    y: (y * yScale) + yPadding,
    radius: vertexRadius
  };

  vertices.push(v);
  distances.push([]);
  for (let i = 0; i < vertices.length; i++) {
    let distance = distanceBetween(v, vertices[i]);
    distances[i][id] = distance;
    distances[id][i] = distance;
  }
  distances[id][id] = 0;

  if (vertices.length == 1) {
    displayDistanceMatrix();
  } else {
    appendToDistanceMatrix(v);
  }
}

function createNewVertices(coords) {
  for (let c of coords)
    createNewVertex(c[0], c[1]);
}

function randomiseVertices() {
  var count = document.getElementById("randomiseVerticesCount").value;

  if (count < 3 || count % 1 != 0) return;

  vertices = [];

  let xMin = 0 + (vertexRadius / 2),
      xMax = canvasWidth - (vertexRadius / 2),
      yMin = 0 + (vertexRadius / 2),
      yMax = windowHeight - (vertexRadius / 2);

  for (let i = 0; i < count; i++) {
    let x = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
        y = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
    createNewVertex(x, y);
  }
}

function deleteSelectedVertex() {
  if (lastSelectedVertex == null) return;

  // delete vertex
  vertices.splice(lastSelectedVertex, 1);

  // remove vertex from distance matrix
  distances.splice(lastSelectedVertex, 1);
  for (let d of distances)
    d.splice(lastSelectedVertex, 1);

  // decrement ids of vertices with ids greater than the
  // vertex being deleted
  for (let i = lastSelectedVertex; i < vertices.length; i++) {
    vertices[i].id--;
    vertices[i].label = vertices[i].id;
  }

  // get the distance matrix table
  let dMatrix;
  if (inEuclideanSpace)
    dMatrix= document.getElementById("distanceMatrixEuclidean");
  else
    dMatrix = document.getElementById("distanceMatrixNonEuclidean");

  // remove vertex's row in distance matrix
  dMatrix.deleteRow(lastSelectedVertex + 1);

  // remove vertex's column in distance matrix
  for (let i = 0; i < dMatrix.rows.length; i++)
    dMatrix.rows[i].deleteCell(lastSelectedVertex + 1);

  // decrement column headings for vertices with dercremented ids
  for (let i = lastSelectedVertex; i < dMatrix.rows[0].cells.length; i++) {
    if (i > 0)
      dMatrix.rows[0].cells[i].innerHTML = i - 1;
  }

  // derement row headings for vertices with decremented ids
  for (let i = lastSelectedVertex; i < dMatrix.rows.length; i++) {
    if (i > 0)
      dMatrix.rows[i].cells[0].innerHTML = i - 1;
  }
}

function deleteAllVertices() {
  vertices = [];
  distances = [];
  displayDistanceMatrix();
}

function randomiseNonEuclideanDistances() {
  var table;
  if (inEuclideanSpace)
    table = document.getElementById("distanceMatrixEuclidean");
  else
    table = document.getElementById("distanceMatrixNonEuclidean")

  var min = document.getElementById("minNonEuclideanDistance").value,
      max = document.getElementById("maxNonEuclideanDistance").value;

  min = Math.ceil(min);
  max = Math.floor(max);

  for (let i = 1; i < table.rows.length; i++) {
    for (let j = 1; j < table.rows[i].cells.length; j++) {
      if (i > j) {
        let distance = Math.floor(Math.random() * (max - min + 1)) + min;
        editDistance(j-1, i-1, distance);
      }
    }
  }
}

function showResults(results) {
  var resultsDiv = document.getElementById("results");

  var resultDiv = document.createElement("div"),
      resultContent = document.createElement("div"),

      algNameDiv = document.createElement("div"),
      algNameBold = document.createElement("b"),
      algName = document.createTextNode(`${results.id}. ${results.algName}`),

      tourLengthSpan = document.createElement("div"),
      tourLengthBold = document.createElement("b"),
      tourLengthLabel = document.createTextNode(`Tour length: `),
      tourLengthValue = document.createTextNode(`${results.tourLength}`),

      elapsedTimeSpan = document.createElement("div"),
      elapsedTimeBold = document.createElement("b"),
      elapsedTimeLabel = document.createTextNode(`Elapsed time: `),
      elapsedTimeValue = document.createTextNode(`${results.elapsedTime} ms`),

      tourDiv = document.createElement("div"),
      tourBold = document.createElement("b"),
      tourText = document.createTextNode(`Tour: `),
      tour,

      showTourButtonWrapper = document.createElement("div"),
      showTourButton = document.createElement("button"),
      showTourButtonText = document.createTextNode(`Display Tour`),

      br = document.createElement("br");

  var tourString = results.tour[0].label;
  for (let v of results.tour.slice(1)) {
    tourString = tourString + " → " + v.label;
  }
  tour = document.createTextNode(tourString);

  algNameBold.appendChild(algName);
  algNameDiv.appendChild(algNameBold);
  resultDiv.appendChild(algNameDiv);

  tourLengthBold.appendChild(tourLengthLabel);
  tourLengthSpan.appendChild(tourLengthBold);
  tourLengthSpan.appendChild(tourLengthValue);
  resultContent.appendChild(tourLengthSpan);

  elapsedTimeBold.appendChild(elapsedTimeLabel);
  elapsedTimeSpan.appendChild(elapsedTimeBold)
  elapsedTimeSpan.appendChild(elapsedTimeValue);
  resultContent.appendChild(elapsedTimeSpan);

  tourBold.appendChild(tourText);
  tourDiv.appendChild(tourBold);
  tourDiv.appendChild(tour);
  resultContent.appendChild(tourDiv);

  showTourButton.onclick = function() { showTour(results.tour, true) };
  showTourButton.style.display = "inline-block";
  showTourButton.appendChild(showTourButtonText);
  showTourButtonWrapper.appendChild(showTourButton);
  resultContent.appendChild(showTourButtonWrapper);

  resultDiv.classList.add("result");
  showTourButtonWrapper.classList.add("showTourButtonWrapper");

  resultDiv.appendChild(resultContent);
  resultsDiv.appendChild(resultDiv);
  resultsDiv.appendChild(br);
}

function showTour(tour, fromResults) {
  playingAnimation = false;
  currentAnimationStep = stepsTaken.length - 1;

  if (fromResults) {
    currentAnimationStep = 0;
    stepsTaken = [];
    currentAlgorithm = "";
    clearElementChildren("pseudocode");
    clearElementChildren("stepLog");
    disableButtons(document.getElementsByClassName("forward-step-btn"));
    disableButtons(document.getElementsByClassName("back-step-btn"));
    document.getElementById("currentAlgorithm").innerHTML = "&nbsp";
    document.getElementById("stepCounter").hidden = true;
  }

  edgesInTour = [];
  edgesInTree = [];
  edgesInMatching = [];
  edgesInMatchingCurved = [];
  edgesToNearest = [];
  edgesInEulerianTour = [];
  if (fromResults)
    edgesWhichShortcut = [];
  for (let vertex of vertices) {
    vertex.isAt = false;
    vertex.isNearest = false;
    vertex.isInTree = false;
    vertex.isOddDegree = false;
    vertex.isWaiting = false;
    vertex.isStart = false;
    vertex.isPartOfEulerianTour = false;

    vertex.isPartOfTour = true;
  }

  for (let i = 0; i < tour.length; i++) {
    edgesInTour.push([tour[i], tour[(i+1) % (tour.length - 1)]]);
  }
}

function solveWithNearestNeighbour() {
  restartAnimation();
  stepsTaken = [];

  let t0 = performance.now();
  let result = nearestNeighbour();
  let t1 = performance.now();
  result.algName = "Nearest Neighbour";
  result.elapsedTime = t1 - t0;
  result.id = resultsCount++;
  showResults(result);

  currentAlgorithm = "nearestNeighbour";
  document.getElementById("currentAlgorithm").innerHTML = "<b>Nearest Neighbour</b>";
  clearElementChildren("pseudocode");
  document.getElementById("stepCounter").hidden = false;
  document.getElementById("totalSteps").innerHTML = stepsTaken.length;
  document.getElementById("currentStep").innerHTML = "0";
  showPseudocode("nn");
  clearTimeout(timeout);
  playingAnimation = true;
  playAnimation();
  togglePauseButton();
}

function solveWithBranchAndBound() {
  restartAnimation();
  stepsTaken = [];

  let t0 = performance.now();
  let result = branchAndBound();
  let t1 = performance.now();
  result.algName = "Branch and Bound";
  result.elapsedTime = t1 - t0;
  result.id = resultsCount++;
  showResults(result);

  currentAlgorithm = "branchAndBound";
  document.getElementById("currentAlgorithm").innerHTML = "<b>Branch and Bound</b>";
  clearElementChildren("pseudocode");
  document.getElementById("stepCounter").hidden = false;
  document.getElementById("totalSteps").innerHTML = stepsTaken.length;
  document.getElementById("currentStep").innerHTML = "0";
  clearTimeout(timeout);
  playingAnimation = true;
  playAnimation();
  togglePauseButton();
}

function solveWithBruteForce() {
  restartAnimation();
  stepsTaken = [];

  let t0 = performance.now();
  let result = bruteForce();
  let t1 = performance.now()
  result.algName = "Brute Force";
  result.elapsedTime = t1 - t0;
  result.id = resultsCount++;
  showResults(result);

  currentAlgorithm = "bruteForce";
  document.getElementById("currentAlgorithm").innerHTML = "<b>Brute Force</b>";
  clearElementChildren("pseudocode");
  document.getElementById("stepCounter").hidden = false;
  document.getElementById("totalSteps").innerHTML = stepsTaken.length;
  document.getElementById("currentStep").innerHTML = "0";
  clearTimeout(timeout);
  playingAnimation = true;
  playAnimation();
  togglePauseButton();
}

function solveWithApproxMinSpanTree() {
  restartAnimation();
  stepsTaken = [];

  let t0 = performance.now();
  let result = approxMinSpanTree();
  let t1 = performance.now();
  result.algName = "Approx Min Span Tree";
  result.elapsedTime = t1 - t0;
  result.id = resultsCount++;
  showResults(result);

  currentAlgorithm = "approxMinSpanTree";
  document.getElementById("currentAlgorithm").innerHTML = "<b>Approx Min Span Tree</b>";
  clearElementChildren("pseudocode");
  document.getElementById("stepCounter").hidden = false;
  document.getElementById("totalSteps").innerHTML = stepsTaken.length;
  document.getElementById("currentStep").innerHTML = "0";
  clearTimeout(timeout);
  playingAnimation = true;
  playAnimation();
  togglePauseButton();
}

function solveWithChristofides() {
  restartAnimation();
  stepsTaken = [];

  let t0 = performance.now();
  let result = christofides();
  let t1 = performance.now();
  result.algName = "Christofides";
  result.elapsedTime = t1 - t0;
  result.id = resultsCount++;
  showResults(result);

  currentAlgorithm = "christofides";
  document.getElementById("currentAlgorithm").innerHTML = "<b>Christofides</b>";
  clearElementChildren("pseudocode");
  document.getElementById("stepCounter").hidden = false;
  document.getElementById("totalSteps").innerHTML = stepsTaken.length;
  document.getElementById("currentStep").innerHTML = "0";
  clearTimeout(timeout);
  playingAnimation = true;
  playAnimation();
  togglePauseButton();
}

function solveWithIntegerProgrammingDFJ() {
  restartAnimation();
  stepsTaken = [];

  let t0 = performance.now();
  let result = integerProgrammingDFJ();
  let t1 = performance.now();
  result.algName = "Integer Programming (DFJ)";
  result.elapsedTime = t1 - t0;
  result.id = resultsCount++;
  showResults(result);

  currentAlgorithm = "ipdfj";
  document.getElementById("currentAlgorithm").innerHTML = "<b>Integer Programming (DFJ)</b>";
  clearElementChildren("pseudocode");
  document.getElementById("stepCounter").hidden = false;
  document.getElementById("totalSteps").innerHTML = stepsTaken.length;
  document.getElementById("currentStep").innerHTML = "0";
  clearTimeout(timeout);
  playingAnimation = true;
  playAnimation();
  togglePauseButton();
}

function solveWithIntegerProgrammingMTZ() {
  restartAnimation();
  stepsTaken = [];

  let t0 = performance.now();
  let result = integerProgrammingMTZ();
  let t1 = performance.now();
  result.algName = "Integer Programming (MTZ)";
  result.elapsedTime = t1 - t0;
  result.id = resultsCount++;
  showResults(result);

  currentAlgorithm = "ipmtz";
  document.getElementById("currentAlgorithm").innerHTML = "<b>Integer Programming (MTZ)</b>";
  clearElementChildren("pseudocode");
  document.getElementById("stepCounter").hidden = false;
  document.getElementById("totalSteps").innerHTML = stepsTaken.length;
  document.getElementById("currentStep").innerHTML = "0";
  clearTimeout(timeout);
  playingAnimation = true;
  playAnimation();
  togglePauseButton();
}
