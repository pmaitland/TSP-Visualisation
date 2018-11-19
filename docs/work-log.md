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

**14:30-13:50**
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
