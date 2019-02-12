
function readFile(evt) {
   var files = evt.target.files;
   var file = files[0];
   var reader = new FileReader();
   reader.onload = function(event) {
     // try {
       parseFile(event.target.result);
     // } catch (e) {
     //   alert(e);
     //   console.log(e);
     // }
   }
   reader.readAsText(file);
}

function parseFile(fileAsText) {
  var lines = fileAsText.split("\n");

  if (!isTypeTSP(lines)) {
    throw ".";
    return;
  }

  var name,
      comment,
      dimension = getDimension(lines),
      capacity,
      edgeWeightType = getEdgeWeightType(lines),
      edgeWeightFormat,
      edgeDataFormat,
      nodeCoordType,
      displayDataType = getDisplayDataType(lines);

  console.log(lines);
  console.log(`dimension: ${dimension}`);
  console.log(`edge weight type: ${edgeWeightType}`);
  console.log(`display data type: ${displayDataType}`);

  if (dimension < 3) return;

  switch (displayDataType) {
    case "COORD_DISPLAY":
      break;
    case "TWOD_DISPLAY":
      let vertexCoords = getTwodData(lines, dimension);
      scaleCanvas(vertexCoords);
      vertices = [];
      displayDistanceMatrix();
      createNewVertices(vertexCoords);
      return;
      break;
    case "NO_DISPLAY":
      break;
    default:
      break;
  }

  switch (edgeWeightType) {
    case "EXPLICIT":
      inEuclideanSpace = false;
      $('[href="#graphNonEuclidean"]').tab('show');
      edgeWeightFormat = getEdgeWeightFormat(lines);
      vertices = [];
      createVertices(dimension);
      updateCanvasLayout();
      setEdgeWeightData(lines, dimension, edgeWeightFormat);
      displayDistanceMatrix();
      break;
    case "EUC_2D":
      inEuclideanSpace = true;
      $('[href="#graphEuclidean"]').tab('show');
      let vertexCoords = getEuc2DCoords(lines, dimension);
      scaleCanvas(vertexCoords);
      vertices = [];
      displayDistanceMatrix();
      createNewVertices(vertexCoords);
      break;
    default:
      break;
  }

}

function scaleCanvas(c) {
  canvasMinX = Math.min(...c.map(x => x[0]));
  canvasMaxX = Math.max(...c.map(x => x[0]));
  canvasMinY = Math.min(...c.map(x => x[1]));
  canvasMaxY = Math.max(...c.map(x => x[1]));

  xPadding = yPadding = 20;
  
  xScale = (canvasWidth - (xPadding * 2)) / canvasMaxX;
  yScale = (windowHeight - (yPadding * 2)) / canvasMaxY;

  console.log(xScale, yScale);
}

function isTypeTSP(l) {
  for (let line of l) {
    if (line.includes("TYPE") && line.includes("TSP") && !line.includes("ATSP"))
      return true;
  }
  return false;
}

function getDimension(l) {
  for (let line of l) {
    if (line.includes("DIMENSION"))
      return line.match(/\d+$/)[0];
  }
  return -1;
}

function getEdgeWeightType(l) {
  for (let line of l) {
    if (line.includes("EDGE_WEIGHT_TYPE")) {
      if (line.includes("EXPLICIT")) return "EXPLICIT";
      if (line.includes("EUC_2D")) return "EUC_2D";
      throw "EDGE_WEIGHT_TYPE must be EXPLCIT or EUC_2D.";
    }
  }
  throw "EDGE_WEIGHT_TYPE not defined.";
}


function getEdgeWeightFormat(l) {
  for (let line of l) {
    if (line.includes("EDGE_WEIGHT_FORMAT")) {
      if (line.includes("FULL_MATRIX")) return "FULL_MATRIX";
      if (line.includes("UPPER_ROW")) return "UPPER_ROW";
      if (line.includes("LOWER_ROW")) return "LOWER_ROW";
      if (line.includes("UPPER_DIAG_ROW")) return "UPPER_DIAG_ROW";
      if (line.includes("LOWER_DIAG_ROW")) return "LOWER_DIAG_ROW";
      if (line.includes("UPPER_COL")) return "UPPER_COL";
      if (line.includes("LOWER_COL")) return "LOWER_COL";
      if (line.includes("UPPER_DIAG_COL")) return "UPPER_DIAG_COL";
      if (line.includes("LOWER_DIAG_COL")) return "LOWER_DIAG_COL";
    }
  }
  throw "EDGE_WEIGHT_FORMAT not defined."
}

function getDisplayDataType(l) {
  for (let line of l) {
    if (line.includes("DISPLAY_DATA_TYPE")) {
      if (line.includes("COORD_DISPLAY")) return "COORD_DISPLAY";
      if (line.includes("TWOD_DISPLAY")) return "TWOD_DISPLAY";
      if (line.includes("NO_DISPLAY")) return "NO_DISPLAY";
    }
  }
  return "NO_DISPLAY";
}

function getEuc2DCoords(l, d) {
  for (let i = 0; i < l.length; i++) {
    if (l[i].includes("NODE_COORD_SECTION")) {
      let finalIndex = parseInt(d) + i + 1;
      let allCoords = [];
      console.log(finalIndex);
      for (let j = i+1; j < finalIndex; j++) {
        let coords = l[j].split(/[ ]+/);
        allCoords.push([coords[1], coords[2]]);
      }
      console.log(allCoords);
      return allCoords;
    }
  }
  throw "NODE_COORD_SECTION not defined.";
}

function getTwodData(l ,d) {
  for (let i = 0; i < l.length; i++) {
    if (l[i].includes("DISPLAY_DATA_SECTION")) {
      let finalIndex = parseInt(d) + i + 1;
      let allCoords = [];
      console.log(finalIndex);
      for (let j = i+1; j < finalIndex; j++) {
        let coords = l[j].split(/[ ]+/);
        console.log(l[j], coords);
        allCoords.push([coords[coords.length-2], coords[coords.length-1]]);
      }
      console.log(allCoords);
      return allCoords;
    }
  }
  throw "DISPLAY_DATA_SECTION not defined.";
}

function setEdgeWeightData(l, d, type) {
  switch (type) {
    case "FULL_MATRIX":
      for (let i = 0; i < l.length; i++) {
        if (l[i].includes("EDGE_WEIGHT_SECTION")) {
          let finalIndex = parseInt(d) + i + 1;
          distances = [];
          for (let j = i+1; j < finalIndex; j++) {
            let weights = l[j].split(/[ ]+/).filter(function(e){return e});
            distances.push(weights);
          }
          return;
        }
      }
      throw "DISPLAY_DATA_SECTION not defined.";
      break;
    default:
      break;
  }
}
