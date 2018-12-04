
var stepsTaken,
    currentAnimationStep = 0,
    playingAnimation = false,
    edgesInTour = [],
    edgesInTree = [],
    curvedEdges = [],
    edgesToNearest = [];

var distances = [],
    vertices = [],
    vertexCount = 0;

var selectedVertex = null;

var inEuclideanSpace = true;

var pseudocodeHighlightColour = "#f4e04d";

var stepLogColour1 = "#fff",
    stepLogColour2 = "#eee",
    stepLogUsingColour1 = true;

window.onload = function() {
  document.getElementById("inputTab").click();
  document.getElementById("euclideanSpace").click();
  document.getElementById("vertexCount").value = vertexCount;
};

function changeVertexCount() {
  vertices = [];
  vertexCount = document.getElementById("vertexCount").value;

  createVertices();
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
  var distanceMatrix = document.getElementById("distanceMatrix");

  // delete all cells in the distance matrix
  while(distanceMatrix.hasChildNodes()) {
     distanceMatrix.removeChild(distanceMatrix.firstChild);
  }

  // create a row to hold vertex labels
  var labelRow = distanceMatrix.insertRow(0),
      row, cell;

  // leave the top-left cell empty
  let emptyCell = labelRow.insertCell(0);
  emptyCell.style.backgroundColor = '#bbb';
  emptyCell.style.textAlign = 'right';


  // fill the top row with vertex labels
  for (let i = 0; i < vertexCount; i++) {
    let vertex = vertices[i];
    cell = labelRow.insertCell(i+1);
    cell.setAttribute("contenteditable", true);
    cell.style.backgroundColor = '#bbb';
    cell.style.textAlign = 'right';
    cell.classList.add(vertex.id + "label");
    cell.addEventListener("blur", function(){editVertexLabel(vertex.id, this.innerHTML)});
    cell.innerHTML = vertex.label;
  }

  // create a row for every vertex
  for (let i = 0; i < vertexCount; i++) {
    let row = distanceMatrix.insertRow(i+1);

    // insert the vertex label in the first cell of its row
    cell = row.insertCell(0);
    cell.setAttribute("contenteditable", true);
    cell.style.backgroundColor = '#bbb';
    cell.style.textAlign = 'right';
    cell.classList.add(vertices[i].id + "label");
    cell.addEventListener("blur", function(){editVertexLabel(vertices[i].id, this.innerHTML)});
    cell.innerHTML = vertices[i].label;

    // fill the rest of the row with distances to other vertices
    for (let j = 0; j < vertexCount; j++) {
      var distanceCell = row.insertCell(j+1);

      if (i == j) {
        distanceCell.innerHTML = 0;
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

function restartAnimation() {
  currentAnimationStep = 0;
  playingAnimation = false;
  edgesInTour = [];
  edgesToNearest = [];

  for (let vertex of vertices) {
    vertex.isAt = false;
    vertex.isNearest = false;
    vertex.isPartOfTour = false;
    vertex.inTree = false;
  }

  clearElementChildren("stepLog");
}

function endAnimation() {
  jumpLogToEnd(currentAnimationStep);
  currentAnimationStep = stepsTaken.length - 1;
  stepForwardAnimation();
  playingAnimation = false;
}

function playAnimation() {
  if (playingAnimation) {
    stepForwardAnimation();
    setTimeout(playAnimation, 1000);
  }
}

function togglePauseAnimation() {
  playingAnimation = !playingAnimation;
  if (playingAnimation) {
    playAnimation();
  }
}

function stepForwardAnimation() {
  if (currentAnimationStep < animationSteps.length) {

    currentStep = animationSteps[currentAnimationStep];

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
        currentStep.vertex1.isPartOfTour = true;
        currentStep.vertex1.isAt = false;
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
        for (let vertex of vertices) {
          if (currentStep.unvisitedVertices.includes(vertex)) {
            vertex.isNearest = true;
            edgesToNearest.push([currentStep.currentVertex, vertex]);
          }
        }
        break;

      case FinishedStep:
        edgesToNearest = [];
        edgesInTour = [];
        edgesInTree = [];
        curvedEdges = [];

        for (let vertex of vertices) {
          vertex.isAt = false;
          vertex.isNearest = false;
          vertex.isPartOfTour = true;
          vertex.isInTree = false;
        }

        for (let i = 0; i < currentStep.finalTour.length; i++) {
          edgesInTour.push([currentStep.finalTour[i], currentStep.finalTour[(i+1) % (currentStep.finalTour.length - 1)]]);
        }
        break;

      case MinSpanTreeStep:
        for (let i = 0; i < currentStep.edges.length; i++)
          edgesInTree.push(currentStep.edges[i]);
        for (let v of vertices)
          v.isInTree = true;
        break;

      default:
        break;
    }

    currentAnimationStep++;
    showStepInLog(currentStep.toString());
    highlightPseudocode(currentStep.pseudocodeLine);
  }
}

function stepBackwardAnimation() {
  if (currentAnimationStep > 0) {

    currentStep = animationSteps[currentAnimationStep - 1];

    switch (currentStep.constructor) {

      case AtVertexStep:
        break;

      case NearestVertexStep:
        currentStep.nearestVertex.isNearest = false;

        let previousStep = animationSteps[currentAnimationStep - 2];
        for (let vertex of vertices) {
          if (previousStep.unvisitedVertices.includes(vertex.id)) {
            vertex.isNearest = true;
            edgesToNearest.push([previousStep.currentVertex.id, vertex.id]);
          }
        }
        break;

      case AddToTourStep:
        currentStep.vertex.isPartOfTour = false;
        break;

      case ChangeCurrentVertexStep:
        currentStep.lastVertex.isAt = true;
        currentStep.lastVertex.isPartOfTour = false;
        currentStep.newVertex.isAt = false;
        currentStep.newVertex.isNearest = true;
        currentStep.newVertex.isPartOfTour = false;
        edgesInTour.splice(-1, 1);
        edgesToNearest = [[currentStep.lastVertex.id, currentStep.newVertex.id]];
        break;

      case IncreaseTourLengthStep:
      break;

      case AtLastVertexStep:
        currentStep.lastVertex.isAt = true;
        while (edgesInTour.length > vertexCount - 1) {
          edgesInTour.pop();
        }
        edgesToNearest = [];
        break;

      case FindingNearestUnvisitedVertexStep:
        edgesToNearest = [];
        for (let vertex of vertices) {
          if (currentStep.unvisitedVertices.includes(vertex.id)) {
            vertex.isNearest = false;
          }
        }
        break;

      case FinishedStep:
        edgesToNearest = [];
        edgesInTour = [];

        for (let vertex of vertices) {
          vertex.isAt = false;
          vertex.isNearest = false;
          vertex.isPartOfTour = true;
        }

        for (let i = 0; i < currentStep.finalTour.length; i++) {
          edgesInTour.push([currentStep.finalTour[i], currentStep.finalTour[(i+1) % (currentStep.finalTour.length - 1)]]);
        }
        break;

      default:
        break;
    }

    removeStepFromLog();
    highlightPseudocode(animationSteps[currentAnimationStep - 2].pseudocodeLine);
    currentAnimationStep--;
  }
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabContent, tablinks;

    // Get all elements with class="tabContent" and hide them
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }

    if (tabName == "input") {
      document.getElementById("inputTab").style.backgroundColor = "#c7c7c7";
      document.getElementById("algorithmsTab").style.backgroundColor = "#f1f1f1";
      document.getElementById("outputTab").style.backgroundColor = "#f1f1f1";
    } else if (tabName == "algorithms") {
      document.getElementById("inputTab").style.backgroundColor = "#f1f1f1";
      document.getElementById("algorithmsTab").style.backgroundColor = "#c7c7c7";
      document.getElementById("outputTab").style.backgroundColor = "#f1f1f1";
    } else if (tabName == "output") {
      document.getElementById("inputTab").style.backgroundColor = "#f1f1f1";
      document.getElementById("algorithmsTab").style.backgroundColor = "#f1f1f1";
      document.getElementById("outputTab").style.backgroundColor = "#c7c7c7";
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function distanceBetween(v1, v2) {
  return Math.round(Math.hypot((v2.x - v1.x), (v2.y - v1.y)));
}

function changeSpace(evt, space) {
  // Declare all variables
  var i, content, links;

  // Get all elements with class="spaceTabContent" and hide them
  content = document.getElementsByClassName("spaceTabContent");
  for (i = 0; i < content.length; i++) {
      content[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tabs = document.getElementsByClassName("spaceTab");
  for (i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" active", "");
  }

  if (space == "euclidean") {
    document.getElementById("euclideanSpace").style.backgroundColor = "#c7c7c7";
    document.getElementById("nonEuclideanSpace").style.backgroundColor = "#f1f1f1";
  } else if (space == "nonEuclidean") {
    document.getElementById("euclideanSpace").style.backgroundColor = "#f1f1f1";
    document.getElementById("nonEuclideanSpace").style.backgroundColor = "#c7c7c7";
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(space).style.display = "block";
  evt.currentTarget.className += " active";

  if (space == 'euclidean' && !inEuclideanSpace) {
    inEuclideanSpace = true;
    vertices = [];
    vertexCount = 0;
    edgesInTour = [];
    edgesToNearest = [];
    resetDistances();
    displayDistanceMatrix();
  } else if (space == 'nonEuclidean') {
    inEuclideanSpace = false;
    document.getElementById("vertexCount").value = 3;
    changeVertexCount();
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
        var lineDiv = document.createElement("DIV"),
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

  x.innerHTML = "X: " + Math.round(mouseX);
  y.innerHTML = "Y: " + Math.round(mouseY);
}

function randomiseNonEuclideanDistances() {
  var table = document.getElementById("distanceMatrix");

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

function solveWithNearestNeighbour() {
  stepsTaken = nearestNeighbour(distances, vertices);
  showPseudocode("nn");
  playingAnimation = true;
  playAnimation();
}

function solveWithBranchAndBound() {
  stepsTaken = branchAndBound(distances, vertices);
  playingAnimation = true;
  playAnimation();
}

function solveWithBruteForce() {
  stepsTaken = bruteForce(distances, vertices);
  playingAnimation = true;
  playAnimation();
}

function solveWithApproxMinSpanTree() {
  stepsTaken = approxMinSpanTree(distances, vertices);
  playingAnimation = true;
  playAnimation();
}
