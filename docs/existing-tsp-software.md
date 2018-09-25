Listed below are examples of existing visualisations of TSP and positive and negative aspects of their implementation. This document was created to review these pieces of software with an aim to decide on requirements for my own.

#### VISUALGO
Contains animations for a wide vareity of algorithms, including TSP.

https://visualgo.net/en/tsp

##### Creating Graphs

<ul class="positive">
  <li>vertices can be plotted with mouse</li>
  <li>example graphs are provided</li>
  <li>can copy manually created graphs to clipboard as json</li>
</ul>

<ul class="negative">
  <li>vertices cannot be repositioned without deleting them</li>
  <li>can draw edges, but won't work if you do</li>
  <li>cannot randomly generate graphs</li>
  <li>max number of vertices is 8 (relatively small number)</li>
  <li>nowhere to import json</li>
  <li>can't export a graph or an algorithms results</li>
  <li>edge weights can't be set/changed</li>
</ul>

##### Algorithms
<ul class="positive">
  <li>brute force</li>
  <li>dynamic/integer programming</li>
  <li>approximation using minimum spanning tree</li>
  <li>christofides</li>
  <li>provides MST visualisation on another page</li>
</ul>

##### Animation and Controls
<ul class="positive">
  <li>play/pause</li>
  <li>step forwards/backwards</li>
  <li>skip to start/end</li>
  <li>speed slider (slow -> fast)</li>
  <li>percentage bar can be clicked to jump to point in animation</li>
</ul>

##### Description of Algorithms
<ul class="positive">
  <li>shows algorithm in pseudocode</li>
  <li>highlights current location in pseudocode</li>
  <li>provides a more detailed description of the current step</li>
</ul>

##### UI
<ul class="positive">
  <li>most space dedicated to the graph</li>
  <li>colourful</li>
  <li>tabs with additional info (pseudocode, current step, etc) can be hidden</li>
  <li>clearly shows which vertices have been visited/ which edge is be traversed</li>
</ul>

<ul class="negative">
  <li>can draw edges, but won't work if you do</li>
</ul>

##### Summary
<ul class="positive">
  <li>very visually appealing and clear</li>
  <li>common algorithms shown</li>
  <li>animation is easy to control</li>
</ul>

<ul class="negative">
  <li>graphs/results can't be exported/imported</li>
  <li>could show even more algorithms</li>
  <li>creating a graph could be made easier</li>
</ul>

---

#### Todd W. Schneider
Blog post about creating TSP visualisation with R.

http://toddwschneider.com/posts/traveling-salesman-with-simulated-annealing-r-and-shiny/#salesman-app

##### Creating Graphs
<ul class="positive">
  <li>cities can be chosen randomly</li>
  <li>max number of 30 cities</li>
</ul>

<ul class="negative">
  <li>must pick from real world cities</li>
  <li>cannot import</li>
</ul>

##### Algorithms
<ul class="positive">
  <li>simulated annealing</li>
</ul>

<ul class="negative">
  <li>only simulated annealing</li>
</ul>

##### Animation and Controls
<ul class="positive">
  <li>steps through stages</li>
</ul>

<ul class="negative">
  <li>no animation or controls</li>
</ul>

##### Description of Algorithms
<ul class="positive">
  <li>blog post describing/summarising algorithm</li>
</ul>

##### UI
<ul class="positive">
  <li>graph is large and easy to read</li>
  <li>instructions for use provided</li>
  <li>well labelled</li>
  <li>allows simulated annealing parameters to be adjusted</li>
</ul>

##### Summary
<ul class="positive">
  <li>well laid out</li>
  <li>cities and tour easy to see on map</li>
</ul>

<ul class="negative">
  <li>only provides simulated annealing</li>
  <li>no control of animation</li>
  <li>nothing can be exported/imported</li>
</ul>

---

#### Department of Mathematics, Technical University of Munich
Game involving manually solving TSP instance and comparing to algorithm results.

https://www-m9.ma.tum.de/games/tsp-game/index_en.html

##### Creating Graphs
<ul class="positive">
  <li>max number of 50 cities (relatively large number)</li>
  <li>graph setup can be saved as a code to be reused</li>
</ul>

<ul class="negative">
  <li>cannot manually place cities/ set distances between cities</li>
</ul>

##### Algorithms
<ul class="positive">
  <li>nearest neighbour</li>
  <li>multiple fragment</li>
  <li>lagrangian relaxation</li>
  <li>branch and bound</li>
</ul>

##### Animation and Controls
<ul class="positive">
  <li>allows comparison of users attempt at a solution and the algorithmically calculated solution</li>
</ul>

<ul class="negative">
  <li>no animation</li>
  <li>doesn't show detailed step-through of algorithms</li>
  <li>runs all algorithms at once and displays the result of the best performing</li>
</ul>

##### Description of Algorithms
<ul class="positive">
  <li>detailed descriptions of each algorithm (and tsp in general)</li>
</ul>

##### UI
<ul class="positive">
  <li>shows total distance travelled by tour</li>
  <li>shows time to calculate</li>
  <li>graph is main focus</li>
  <li>information is split across multiple tabs, maintaining neatness</li>
</ul>

<ul class="negative">
  <li>no pseudocode</li>
  <li>description of algorithm and actual results cannot be seen simultaniously</li>
</ul>

##### Summary
<ul class="positive">
  <li>detailed, but concise, descriptions of algorithms</li>
  <li>presented as a game where user attempts a solution before seeing algorithmically calculated tour</li>
</ul>

<ul class="negative">
  <li>no detailed step-through of what algorithm is doing</li>
  <li>no pseudocode</li>
</ul>

---

#### Gurobi
Creates a 'math programming solver'. This implementation makes use of it.

http://examples.gurobi.com/traveling-salesman-problem

##### Creating Graphs
<ul class="positive">
  <li>available cities are always visible and can be added and removed from the tour by clicking on them</li>
</ul>

<ul class="negative">
  <li>limited to a set of US cities</li>
  <li>must include new york</li>
</ul>

##### Algorithms
<ul class="positive">
  <li>integer programming</li>
</ul>

<ul class="negative">
  <li>no others</li>
</ul>

##### Animation and Controls
<ul class="negative">
  <li>no animation of algorithm</li>
</ul>

##### Description of Algorithms
<ul class="positive">
  <li>detailed descrition of algorithm</li>
  <li>mathematical explanation provided</li>
  <li>code provided</li>
</ul>

<ul class="negative">
  <li>no pseudocode</li>
</ul>

##### UI
<ul class="positive">
  <li>visually appealing map of USA</li>
  <li>can easily tell which cities will and will not be included in tour</li>
  <li>city name appear when hovering over them</li>
  <li>current tour disappears when a city is added/removed</li>
</ul>

<ul class="negative">
  <li>doesn't show total distance</li>
  <li>doesn't show time taken to calculate</li>
</ul>

##### Summary
<ul class="positive">
  <li>very visually appealing</li>
  <li>easy to use</li>
  <li>detailed and consice description of integer programming solution</li>
  <li>full code provided</li>
</ul>

<ul class="negative">
  <li>only one method of solving implemented</li>
  <li>no pseudocode</li>
  <li>no animation or way to step through process</li>
</ul>

---

#### Concorde
Software developed to solve instances of TSP.

http://www.math.uwaterloo.ca/tsp/concorde/

##### Creating Graphs
<ul class="positive">
  <li>can place individual nodes with mouse</li>
  <li>can move placed nodes by dragging them</li>
  <li>can delete a single node, or drag to select an area of nodes to delete</li>
  <li>can add nodes in random positions (quantity can be selected)</li>
  <li>can add large number of nodes</li>
  <li>can save node coordinates to file, allowing them to be loaded in and used again later</li>
  <li>can print as pdf (not attempted so don't know what this looks like)</li>
</ul>

<ul class="negative">
  <li>can't see or set the weight of an edge</li>
</ul>

##### Algorithms
<ul class="positive">
  <li>greedy</li>
  <li>boruvka</li>
  <li>quick boruvka</li>
  <li>nearest neighbour</li>
  <li>lin kernighan</li>
  <li>random</li>
  <li>can also generate min spanning tree, nearest neighbour edges, random edges, among others</li>
</ul>

##### Animation and Controls
<ul class="positive">
  <li>graph shows process by changing node and edge colours as it goes</li>
  <li>can force stop</li>
</ul>

<ul class="negative">
  <li>visualisation of process can be too fast to see</li>
  <li>cannot step through or pause process</li>
</ul>

##### Description of Algorithms
<ul class="negative">
  <li>no descriptions of algorithms</li>
  <li>no pseudocode</li>
</ul>

##### UI
<ul class="positive">
  <li>most space dedicated to graph</li>
  <li>nodes and edges distinctly different colours</li>
  <li>provides node count, edge count, tour length, calculation time</li>
</ul>

##### Summary
<ul class="positive">
  <li>very easy to plot, relocate, and delete nodes</li>
  <li>can save a graph to be reused again later</li>
</ul>

<ul class="negative">
  <li>to be used to solve tsp instances, not to teach about the process behind solving</li>
  <li>no description or pseudocode of algorithms</li>
</ul>

---

#### TSP Solver and Generator
Software developed to solve instances of TSP.

https://tspsg.info/

##### Creating Graphs
<ul class="positive">
  <li>distances can be randomised</li>
</ul>

<ul class="negative">
  <li>max 50 cities</li>
  <li>distances entered into distance matrix</li>
  <li>dimensions of distance matrix determines number of cities</li>
  <li>must enter all distances manually/ no way to load distances in from file when starting from scratch</li>
</ul>

##### Algorithms
<ul class="positive">
  <li>branch and bound</li>
</ul>

<ul class="negative">
  <li>no others</li>
</ul>

##### Animation and Controls
<ul class="negative">
  <li>no graphical representation of nodes and edges</li>
</ul>

##### Description of Algorithms
<ul class="positive">
  <li>steps taken are included in results as text</li>
</ul>

<ul class="negative">
  <li>no pseudocode</li>
  <li>no description or explaination of algorithm</li>
</ul>

##### UI
<ul class="positive">
  <li>simple and concise</li>
  <li>results show total tour length</li>
</ul>

##### Summary
<ul class="positive">
  <li>steps taken included in results</li>
  <li>results are very detailed</li>
  <li>results can be saved as pdf or printed directly</li>
</ul>

<ul class="negative">
  <li>to be used to solve instances, not to educate</li>
  <li>no graphical representation of instance</li>
</ul>

---

#### Jon Eisen
Personal blog.

http://joneisen.me/development/code/2013/04/24/a-d3-js-demo-with-tsp.html

<ul class="positive">
  <li>simulated annealing</li>
  <li>cities can be plotted quickly and easily</li>
  <li>looks very clean</li>
</ul>

<ul class="negative">
  <li>only simulated annealing</li>
  <li>focus on d3.js rather than tsp</li>
  <li>very much a demo, rather than a final product</li>
</ul>

---

#### Routific
API designed for professional use to route delivery vehicles. Make calls to the API with details of your depot, delivery addresses, vehicle fleet, time scale, priority deliveries, etc. Returns solution as json. Requires payment after free trial. Possibly more vehicle routing problem than TSP.

https://dev.routific.com/

---

#### Tookan
Website and mobile app for commercial use. Aimed at buisnesses which need to route drivers making deliveries/pickups/vists/etc. Many features require payment after free (limited) trial. Again possibly more vehicle routing than TSP.

https://jungleworks.com/tookan/


<style>
  ul {
    list-style-type: none;
  }
  ul > li:before {
    font-weight: bold;
    padding-right: 1rem;
  }
  ul.positive > li:before {
    content: '+';
  }
  ul.negative > li:before {
    content: '-';
  }
</style>
