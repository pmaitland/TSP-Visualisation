This document is a work log for this project. Dates are in *DD/MM/YY* format. Times are in 24 hour clock and are approximate.

## Week 1

17/09/18

**10:00-10:30**
[Supervisor Meeting](./meetings/18-09-17.md)

**14:00-16:30**
Looked for existing visualisations. Found VISUALGO and T. W. Schneider's implementations.

---

18/09/18

**15:30-17:00**
Looked at Uni of Munich's implementation and wrote up summary of yesterday's supervisor meeting.

---

19/09/18

**10:00-11:30**
Looked at Gurobi's implementation.

**13:30-15:30**
Looked at Concorde.

**17:30-19:00**
Looked at Concorde and TSP Solver and Generator.

---

20/09/18

**14:00-16:00**
Looked at Routific and Tookan.

---

21/09/18

**11:00-12:00**
Read *The Traveling Salesman Problem: A Computational Study, David L. Applegate et al.*

**13:30-17:00**
Continued with reading.

## Week 2

24/09/18

**13:00-13:30**
Prepared for supervisor meeting.

**15:00-15:30**
[Supervisor Meeting](./meetings/18-09-24.md)

**16:00-16:30**
Set up GitHub repository and added existing files. Wrote up summary of supervisor meeting.

---

25/09/18

**15:30-17:30**
Summarised existing TSP software into table and wrote up initial requirements.

---

30/09/18

**09:30-10:30**
Began creating initial wireframes.

**16:00-17:00**
Continued with wireframes.

**17:45-19:30**
Looked into JavaScript libraries which could be used for implementation.

**23:00-00:00**
Continued with wireframes.

## Week 3

01/10/18

**12:50-13:50**
Prepared for supervisor meeting.

**15:00-15:30**
[Supervisor Meeting](./meetings/18-10-01.md)

**16:00-17:50**
Wrote up summary of supervisor meeting and played around with D3.js.

---

04/10/18

**20:00-22:20**
Began implementing nearest neighbour in JavaScript.

---

05/10/18

**00:40-01:00**
Continued with nearest neighbour in JavaScript.

**14:00-15:00**
Continued with nearest neighbour in JavaScript.

**16:40-17:00**
Began implementing brute force in JavaScript.

---

07/10/18

**10:30-10:50**
Continued with nearest neighbour in JavaScript.

## Week 4

08/10/18

**11:00-12:00**
Added tracking of steps taken to nearest neighbour implementation.

**12:30-14:00**
Worked on improving steps taken to nearest neighbour and prepared for supervisor meeting.

**15:00-15:30**
[Supervisor Meeting](./meetings/18-10-08.md)

**16:00-18:00**
Wrote up summary of supervisor meeting and began implementing initial visualisation.

**21:30-22:30**
Continued with implementation of visualisation.

---

09/10/18

**12:15-13:45**
Changed visualisation to use p5.js instead of d3.js

**15:15-16:15**
Allowed vertices to be selected and dragged.

**19:30-19:50**
Prevented vertices from being able to be dragged off the canvas.

**23:00-00:00**
Made the canvas take up the full window size and added a configuration box to the right.

---

10/10/18

**15:20-18:20**
Separated the configuration box from the canvas and implemented rough animation using nearest neighbour.

---

11/10/18

**14:30-15:50**
Added log of steps to html.

## Week 5

15/10/18

**15:00-15:30**
[Supervisor Meeting](./meetings/18-10-15.md)

**16:00-16:20**
Wrote up summary of supervisor meeting.

---

20/10/18

**15:30-16:50**
Created classes for animation steps.

**18:10-18:30**
Tidied folder structure.

**23:00-00:20**
Implemented play, pause, and step forward buttons for animation.

## Week 6

22/10/18

**10:00-10:55**
Implemented a step backwards button.

**14:00-14:20**
Prepared for supervisor meeting.

**15:00-15:30**
[Supervisor Meeting](./meetings/18-10-22.md)

**16:30-17:00**
Wrote up summary of supervisor meeting and added an animation step for finding the nearest neighbour.

---

23/10/18

**09:50-10:20**
Began updating visualisation to show new animation step.

**13:00-13:50**
Updated visualisation to show the new step and began implementing buttons to jump to the start/end of the animation.

**15:05-17:10**
Finished implementing buttons to jump to the start/end of the animation and added hardcoded pseudocode for nearest neighbour.

---

24/10/18

**13:35-13:50**
Worked on making pseudocode dynamic instead of hardcoded.

---

25/10/18

**11:00-13:00**
Completed pseudocode implementation and improved skipping to end of animation.

**18:30-20:05**
Split configuration pane between tabs and began accepting user input for non-euclidean space.

---

26/10/18

**16:00-16:30**
Reduced distance matrix to a triangle.

---

28/10/18

**10:50-11:55**
Improved how the animation makes use of vertices and allowed vertex labels to be edited through the distance matrix.

**15:15-15:50**
Allowed distances between vertices to be edited through the distance matrix.

## Week 7

29/10/18

**14:15-14:50**
Prepared for supervisor meeting.

**15:00-15:30**
[Supervisor Meeting](./meetings/18-10-29.md)

**16:15-16:50**
Wrote up summary of supervisor meeting and updated nearest neighbour pseudocode.

---

01/11/18

**11:00-13:00**
Changed distance matrix back to the full square, allowed canvas to update when window is resized, and added tabs to change between euclidean and non-euclidean space.

---

02/11/18

**18:30-19:00**
Began implementing euclidean space.

**19:30-20:15**
Continued implementing euclidean space.

## Week 8

05/11/18

**12:00-13:00**
Continued implementing euclidean space.

**14:00-14:50**
Improved look of distance matrix and prepared for supervisor meeting.

**15:00-15:50**
[Supervisor Meeting](./meetings/18-11-05.md)

**16:00-16:30**
Wrote up summary of supervisor meeting.

---

06/11/18

**12:30-13:00**
Allowed the randomisation of distances in non-euclidean space.

## Week 9

12/11/18

**14:15-14:50**
Prepared for supervisor meeting.

**15:00-15:35**
Supervisor Meeting

---

15/11/18

**16:30-17:00**
Started implementing branch and bound.

**18:30-20:00**
Continued with branch and bound.

---

16/11/18

**14:00-15:00**
Continued with branch and bound.

**23:00-00:40**
Continued with branch and bound.

---

17/11/18

**19:10-21:00**
Continued with branch and bound.

---

18/11/18

**11:30-13:30**
Continued with branch and bound.

**14:00-15:45**
Continued with branch and bound.

**18:00-20:00**
Implemented brute force and attempted to fix branch and bound.

## Week 10

19/11/18

**14:30-14:55**
Prepared for supervisor meeting.

**15:00-15:30**
Supervisor Meeting.

---

20/11/18

**21:00-22:15**
Developed method for validating branch and bound implementation generating instances and comparing the result to brute force.

---

21/11/18

**11:00-12:00**
Implemented creation of spanning tree for approximation with minimum spanning tree.

**22:30-23:10**
Continued with approximation.

---

25/11/18

**22:00-23:00**
Continued with approximation.

## Week 11

29/11/18

**17:00-17:40**
Added distances markings to euclidean space and continued with approximation.

---

30/11/18

**14:15-14:55**
Supervisor meeting.

**15:20-17:00**
Continued with approximation.

## Week 12

03/12/18

**11:05-12:15**
Continued with approximation.

**13:40-18:00**
Continued with approximation. Fixed stepping forward in other algorithms. Alternated background colour of lines in step log. Improved CSS of configuration tab.

---

04/12/18

**10:10-11:45**
Looked into Blossom algorithm for use in Christofides.

**15:45-16:20**
Began implementing Christofides.

---

05/12/18

**09:45-12:00**
Continued with Christofides. Removed code related to curved edges. Allowed dashed edges to be drawn.

**13:15-13:50**
Continued with Christofides.

**14:20-16:50**
Continued with Christofides. Found an implementation of [Blossom algorithm](https://github.com/jimbdooley/Edmond-s-Blossom-Algorithm/blob/master/blossom.js).

**22:55-23:55**
Looked into Christofides more. Did some minor refactoring.

---

06/12/18

**10:00-12:00**
Add vertex labels to non-euclidean space. Looked at implementations of matching for Christofides on GitHub.

**13:30-16:20**
Made changes to CSS. Added displaying of algorithm result in 'Results' tab.

---

07/12/18

**10:00-11:30**
Tried to convince self implementation of tree traversal was correct.

**14:00-14:50**
Supervisor meeting.

**16:00-16:10**
Removed unused Christofides code.

**16:50-17:10**
Started improving visualisation of backtracking in approx min span tree.

## Week 13

10/12/18

**10:05-12:00**
Continued with backtracking.

**13:30-17:05**
Continued with backtracking and started improving visualisation of Christofides.

---

11/12/18

**11:20-13:20**
Continued with improving Christofides.

**14:30-17:10**
Fixed generation of Euclidean cycle in Christofides and allowed vertices to be placed randomly in euclidean space.

---

12/12/18

**11:00-12:10**
Wrote status report.

**13:25-15:20**
Continued writing status report fixed Christofides shortcuts.

**17:00-18:00**
Made changes to Christofides colours. Changed how dashed lines with aims to improve visualisation of dashed lines in Christofides.

**20:30-21:30**
Worked on curved lines in minimum weight matching.

---

13/12/18

**09:50-12:00**
Tried to get javascript-lp-solver to work.

**13:20-16:20**
Implemented minimum weight matching using javascript-lp-solver.

**16:40-16:55**
Started visualising minimum weight matching.

---

14/12/18

**00:50-01:00**
Updated Christofides visualisation to use linear programming matchings.

**13:05-13:40**
Fixed shortcuts in Christofides.

**14:00-14:35**
Supervisor meeting.

## Week 14

## Week 15

## Week 16

## Week 17

07/01/19

**10:10-10:50**
Improved visualisation of approx min span tree.

**11:20-12:00**
Continued improving approx min span tree.

**14:10-16:00**
Continued improving approx min span tree.

**16:30-17:25**
Allowed final tours to be viewed from results page.

**17:45-17:55**
Worked on fixing Christofides shortcuts.

---

08/01/19

**10:10-10:25**
Prepared for supervsor meeting.

**10:30-11:05**
Supervisor meeting.

**15:00-16:05**
Fixed Christofides shortcuts.

**16:30-17:25**
Improved Christofides visualisation.

---

09/01/19

**09:00-11:00**
Fixed bugs in 2-approximation (random selection of starting vertex and tour length calculation were incorrect) and began implementing integer programming.

**11:10-12:10**
Continued implementing integer programming.

**12:40-13:05**
Continued implementing integer programming.

**15:00-15:30**
Continued implementing integer programming.

**16:20-16:45**
Added favicons.

---

10/01/19

**15:45-17:55**
Implemented the generation of integer programming constraints to eliminate sub-tours.

**21:30-22:00**
Tided integer programming code.

---

11/01/19

**10:40-11:55**
Allowed labels to be shown in different ways and fixed CSS.

## Week 18

14/01/19

**14:45-16:45**
Fixed CSS and method for changing when vertex labels are shown. Prevented vertices from being placed if not in graph tab.

---

15/01/19

**10:35-11:10**
Supervisor meeting.

**11:15-12:00**
Read about MTZ formulation for integer programming.

---

16/01/19

**08:50-09:25**
Read about MTZ.

**09:35-11:30**
Attempted to implement MTZ.

**15:00-16:00**
Continued with MTZ.

**16:20-17:20**
Continued with MTZ.

---

17/01/19

**08:50-09:50**
Read TSPLIB documentation.

**11:10-11:50**
Improved how the distance matrix is updated.

**17:00-17:50**
Starting allowing TSPLIB files to be imported.

---

18/01/19

**10:20-11:10**
Worked on processing files.

## Week 19

21/01/19

**14:00-17:00**
Continued implementing file processing.

**17:20-18:00**
Continued implementing file processing.

**21:55-23:44**
Continued implementing file processing and improved CSS.

---

22/01/19

**10:30-11:00**
Supervisor meeting.

**11:15-12:00**
Continued implementing file processing.

**13:25-14:40**
Continued implementing file processing.

---

24/01/19

**15:50-17:50**
Returned to MTZ.

---

25/01/19

**10:10-11:50**
Continued with MTZ.

## Week 20

28/01/19

**17:30-18:05**
Continued with MTZ.

**22:10-23:30**
Continued with MTZ.

---

29/01/19

**10:00-11:00**
Improved MTZ.

**12:00-12:30**
Supervisor meeting.

---

30/01/19

**10:00-11:10**
Reworkd MTZ.

**12:00-12:10**
Improved CSS.

---

31/01/19

**10:10-10:50**
Added arrow heads to more edges.

**12:10-12:45**
Attempted to improve CSS.

**16:00-17:00**
Began using Bootstrap.

---

01/02/19

**10:05-11:55**
Improved CSS with Bootstrap.

**14:25-16:25**
Continued with Bootstrap.

**16:35-17:40**
Continued with Bootstrap.

## Week 21

04/02/19

**09:45-11:30**
Changed DFJ to use array model instead of JSON model.

**12:50-13:20**
Changed Chrisofides matching to use array model instead of JSON model.

**14:40-17:10**
Started fixing stepping backwards.

---

05/02/19

**10:30-11:00**
Supervisor meeting.

**13:00-14:10**
Continued with stepping backwards.

**14:50-16:30**
Continued with stepping backwards.

---

06/02/19

**10:15-10:25**
Continued with stepping backwards.

**10:35-12:45**
Continued with stepping backwards.

**13:35-14:00**
Continued with stepping backwards.

**15:30-18:10**
Continued with stepping backwards.

---

07/02/19

**10:00-10:40**
Finished with stepping backwards.

**12:15-13:10**
Disabled media buttons when they can not be used.

**15:05-16:00**
Attempted to fix nearest neighbour.

---

08/02/19

**10:10-11:30**
Fixed nearest neighbour, added step counter to UI and made other small changes to UI.