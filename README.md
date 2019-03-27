# TSP-Visualisation

Level 4 project to visualise algorithms for the Travelling Salesman Problem by Peter Maitland (2200049m) at the Univeristy of Glasgow, supervised by Professor David Manlove.

A live version of the project is available at https://pmaitland.github.io/TSP-Visualisation/.

## User Guide

### Graph

The graph tab is used to create TSP instances. Instances can only be edited when in the graph tab.

Instances can be created in Euclidean and non-Euclidean space. To select a space click the 'Graph' tab at the top of the screen and select an option from the dropdown menu.

To change when vertex labels are shown, select an option from the 'Show vertex labels' dropdown in the bottom right of the window. The options are 'Never' which means vertex labels will never appear; 'On hover' which means a vertex's label will only appear when the mouse hovers over this vertex; and 'Always' which means the vertex labels will always be shown.

#### Euclidean Space

##### Plotting Vertices
Click on the canvas to plot a vertex at the location of the mouse.

##### Randomising Vertices
To randomise vertices enter the number of vertices you wish to appear in the graph in the input under the heading 'Randomise Vertices' and press the 'Randomise Vertices' button.

##### Viewing Distances
Click on a vertex to see the edges between in and other vertices. The edge weight shown next to an edge is the Euclidean distance between these vertices. Alternatively, the distance matrix on the right of the screen contains all distances between pairs of vertices.

##### Importing an Instance
To import an instance press the 'Browse...' button under the 'Import Instance' heading and select the file to import. Only files with the extension '.tsp' can be imported.

##### Exporting an Instance
To export an instance, enter the filename in the input under the 'Export File' heading and press the 'Export' button.

##### Deleting vertices
To delete a vertex from the graph, select the vertex by clicking on it and then press the 'Selected Vertex Only' button under the 'Delete Vertices' heading. To delete all vertices, press the 'All Vertices' button under the 'Delete Vertices' heading.

#### Non-Euclidean Space

##### Plotting Vertices
Set the value of the input under the 'Change Vertex Count' heading to increase or decrease the number of vertices.

##### Viewing Distances
Click on a vertex to see the edges between in and other vertices. The edge weight shown next to an edge is the Euclidean distance between these vertices. Alternatively, the distance matrix on the right of the screen contains all distances between pairs of vertices.

##### Editing Distances
To edit the distance between two vertices, click on the corresponding value in the distance matrix and change it to the distance you wish to set.

##### Randomising Distances
To randomise the distance between vertices, enter the minimum distance allowed between two vertices in the first input under the 'Randomise Distances' heading and enter the maximum distance in the second input under this heading. Then press the 'Randomise Distances' button.

##### Importing an Instance
To import an instance press the 'Browse...' button under the 'Import Instance' heading and select the file to import. Only files with the extension '.tsp' can be imported.

##### Exporting an Instance
To export an instance, enter the filename in the input under the 'Export File' heading and press the 'Export' button.

### Solve
The solve tab is used to run algorithms on an instances. It also provides information about an algorithm.

##### Running an Algorithm
To run an algorithm press its button from the selection of buttons on the right of the screen. An animation of the algorithm will begin to play once the algorithm has finished running.

##### Step Log
Below the algorithm buttons, a step log gives detailed information about each step the algorithm takes. The step log updates whenever a step is taken in the algorithm.

##### Animation Controls
Below the step log are five buttons which can be used to control the animation of an algorithm. From left to right they jump to the start of the animation, take one step backwards in the animation, pause or resume the animation, take one step forwards in the animation, and jump to the end of the animation.

##### Pseudocode
Below the animation controls, pseudocode for an algorithm will appear. As the animation plays, the line of pseudocode the current algorithm represents is highlighted in yellow. Currently, Nearest Neighbour is the only algorithm with pseudocode.

### Results
The results tab contains a list of results of algorithms. The result of an algorithm is added to this list once it has finished running.

An item in the list contains five things: the name of the algorithm run; the length of the tour found by the algorithm; the runtime of the algorithm; the resulting tour as a list of vertices; and a button to view the tour found by the algorithm.
