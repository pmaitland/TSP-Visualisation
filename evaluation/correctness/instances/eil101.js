var eil101 = {
	"name": "eil101",
	"vertexCount": 101,
	"optimalTourLength": 629,
	"optimalTour": [0,68,26,100,52,27,25,11,79,67,28,23,53,54,24,3,38,66,22,55,74,40,21,73,71,72,20,39,57,12,93,94,96,86,1,56,14,42,41,13,43,37,85,15,60,84,90,99,97,36,91,58,92,98,95,5,88,51,17,82,59,4,83,16,44,7,45,46,35,48,63,62,89,31,9,61,10,18,47,81,6,87,30,69,29,19,65,70,64,34,33,77,80,8,50,32,78,2,76,75,49],
	"distances": [
		[0,33,15,32,32,25,21,32,18,16,26,17,26,47,45,42,41,23,28,16,29,39,46,28,38,19,11,12,24,11,10,21,12,25,27,41,36,57,42,24,42,41,49,46,37,39,34,28,40,6,12,15,18,26,34,39,38,24,32,28,38,19,24,38,35,25,51,18,4,8,25,34,32,36,39,11,13,20,16,19,15,26,30,35,37,48,34,15,21,21,40,33,34,27,30,29,32,36,31,39,15],
		[33,0,34,20,24,16,36,36,47,43,50,23,9,21,13,25,33,27,47,49,10,12,23,35,30,16,23,21,38,43,35,52,39,48,56,54,15,32,25,9,12,12,18,24,36,45,47,41,59,32,43,27,14,25,29,19,6,9,16,25,24,42,53,63,66,58,34,30,30,39,56,12,9,12,15,29,32,44,38,29,42,36,29,28,20,31,7,36,20,50,20,14,18,13,12,16,11,16,17,17,18],
		[15,34,0,25,43,34,35,45,15,29,40,11,32,53,47,51,52,35,43,22,27,36,40,14,27,18,21,16,9,21,25,31,7,14,22,55,43,64,33,25,40,45,53,54,49,53,48,43,54,8,14,28,23,16,23,33,40,27,40,40,48,34,37,51,33,29,42,6,18,21,23,30,30,33,35,7,3,9,4,8,9,40,42,46,45,58,38,30,31,33,48,40,43,34,37,38,38,43,40,46,22],
		[32,20,25,0,41,32,46,51,40,47,57,16,25,41,29,45,51,40,57,46,10,14,15,18,10,14,28,22,24,43,40,53,32,36,46,66,35,52,9,16,18,32,36,44,52,60,59,53,69,28,38,36,21,9,9,8,24,20,34,40,43,49,56,70,57,53,19,19,32,40,48,9,11,11,11,23,23,33,28,17,34,48,44,45,39,51,27,43,33,53,40,33,37,30,30,34,30,36,36,37,25],
		[32,24,43,41,0,10,21,14,50,34,35,35,16,20,29,11,10,11,30,46,32,36,47,50,51,30,22,27,50,39,27,44,44,56,59,33,11,27,48,25,35,20,28,16,12,22,27,22,39,36,44,18,22,42,49,42,25,21,8,4,7,29,41,47,66,55,58,42,28,34,57,35,32,35,39,36,40,51,46,42,47,17,7,4,8,16,18,25,12,40,11,11,7,11,12,8,13,10,6,12,21],
		[25,16,34,32,10,0,21,20,42,30,35,25,7,22,25,18,20,11,32,40,22,28,39,40,41,20,14,17,41,34,23,40,36,47,52,38,11,32,39,16,29,18,27,21,21,29,31,25,42,28,37,13,12,32,39,33,19,12,7,9,14,28,39,48,60,49,49,32,21,29,50,26,23,27,31,27,31,42,37,32,38,20,13,14,12,24,12,22,5,37,15,9,9,3,6,4,9,11,6,14,11],
		[21,36,35,46,21,21,0,12,36,14,15,34,27,40,46,32,25,10,11,29,39,47,57,47,54,32,18,25,45,22,11,24,33,45,46,21,30,47,55,32,48,38,47,37,18,18,13,7,23,27,30,10,25,43,51,50,40,29,26,16,27,9,20,27,50,37,65,38,17,18,41,43,41,45,49,30,34,41,37,38,35,6,14,21,28,36,33,6,16,20,31,28,26,24,26,23,29,29,24,32,21],
		[32,36,45,51,14,20,12,0,48,26,24,41,27,33,43,23,14,10,18,41,42,48,59,56,60,37,25,32,54,34,23,36,44,56,57,19,25,38,59,35,48,34,42,29,6,9,13,9,25,37,42,17,30,49,57,53,38,31,22,11,19,21,31,34,62,49,69,46,27,30,53,46,43,47,50,39,43,52,47,46,46,6,7,12,22,26,31,18,18,32,25,24,21,23,24,20,27,24,20,26,26],
		[18,47,15,40,50,42,36,48,0,25,35,25,43,64,60,60,58,40,40,11,41,51,55,27,41,32,28,27,20,15,25,22,8,11,9,53,53,74,48,38,55,57,65,64,54,54,47,43,50,15,6,33,34,31,38,48,53,39,50,46,56,31,29,43,18,14,56,21,22,18,8,45,44,48,49,19,17,10,12,23,6,42,47,53,54,66,50,30,38,25,57,50,52,44,47,47,49,53,49,56,32],
		[16,43,29,47,34,30,14,26,25,0,11,32,35,52,55,45,39,22,15,16,43,52,60,43,53,34,21,25,38,10,8,10,24,35,33,28,41,60,57,36,54,48,57,50,33,30,22,19,25,21,19,17,30,41,50,53,48,35,37,29,40,6,9,23,36,23,66,33,15,8,28,47,45,50,53,26,29,32,30,35,26,20,28,35,40,49,42,9,25,7,44,39,38,33,36,34,39,41,35,44,25],
		[26,50,40,57,35,35,15,24,35,11,0,42,41,55,61,46,38,25,7,25,51,60,69,54,64,43,29,35,50,21,17,16,35,46,43,19,45,62,66,45,62,53,62,52,30,25,15,15,14,32,30,23,38,52,60,62,54,42,41,31,42,8,8,13,44,30,76,44,25,19,37,56,54,58,61,37,40,43,41,46,37,19,29,35,43,50,48,14,31,11,46,43,41,38,41,38,44,44,39,47,34],
		[17,23,11,16,35,25,34,41,25,32,42,0,22,43,36,43,45,30,43,30,16,25,30,15,21,7,16,9,16,27,25,37,17,25,33,54,34,54,25,14,29,35,42,44,44,50,47,41,55,12,23,24,14,9,18,23,29,17,31,33,40,35,41,55,44,38,34,7,18,25,34,19,19,22,24,7,9,20,15,6,20,37,36,39,36,49,28,29,24,37,38,31,34,25,27,29,29,34,31,36,15],
		[26,9,32,25,16,7,27,27,43,35,41,22,0,21,20,21,25,18,38,43,16,21,32,36,35,16,16,16,38,36,27,44,35,46,52,45,11,32,33,10,22,14,23,22,27,36,38,32,49,28,38,18,9,27,33,26,13,6,9,16,18,34,44,54,61,52,42,30,23,32,51,19,16,20,24,25,29,41,35,29,38,27,20,20,14,27,7,27,11,42,16,9,12,4,5,8,6,12,10,14,11],
		[47,21,53,41,20,22,40,33,64,52,55,43,21,0,16,11,22,30,50,63,32,30,40,56,51,36,36,37,59,56,45,62,57,67,73,52,11,11,45,29,27,9,11,6,29,40,47,42,59,49,59,35,30,46,50,38,17,26,15,24,14,49,60,67,82,72,52,50,43,51,72,33,30,31,34,47,50,62,57,49,59,37,27,21,12,14,15,43,27,59,9,14,14,20,17,18,15,12,17,9,32],
		[45,13,47,29,29,25,46,43,60,55,61,36,20,16,0,25,35,36,57,62,21,16,25,46,38,29,35,34,50,56,47,64,52,61,68,62,18,25,31,22,12,9,7,21,41,51,56,50,67,45,56,38,27,36,38,24,7,22,21,32,26,53,64,74,79,71,37,43,43,51,69,20,18,18,20,42,44,56,51,41,55,45,36,32,22,29,13,47,30,62,21,19,22,22,20,23,17,19,23,18,30],
		[42,25,51,45,11,18,32,23,60,45,46,43,21,11,25,0,11,22,40,57,35,36,47,57,55,36,32,35,58,50,38,55,54,65,70,41,10,16,51,30,35,16,21,6,18,29,36,32,48,46,54,29,29,48,53,44,23,27,12,16,4,40,52,57,77,66,59,50,38,45,67,37,34,37,40,45,49,60,55,49,56,27,17,11,6,6,18,36,22,51,5,12,9,17,16,14,15,9,12,8,29],
		[41,33,52,51,10,20,25,14,58,39,38,45,25,22,35,11,0,18,32,53,41,45,56,60,61,40,32,37,60,46,34,49,53,65,68,30,18,25,58,35,44,26,32,17,8,18,26,23,38,45,52,26,32,52,58,51,32,31,17,13,9,34,45,48,74,62,67,52,36,41,64,44,41,44,48,46,50,60,55,51,55,20,11,6,14,12,26,30,22,45,15,19,14,21,21,17,22,17,16,18,30],
		[23,27,35,40,11,11,10,10,40,22,25,30,18,30,36,22,18,0,21,35,32,39,49,45,49,27,15,21,44,28,16,33,35,47,50,27,20,38,49,25,40,28,37,28,14,20,20,14,31,28,34,8,19,39,46,43,30,21,16,7,18,18,30,37,56,44,59,36,18,23,46,36,33,37,41,29,33,43,38,36,38,9,7,13,18,27,23,13,8,29,22,18,16,14,17,13,20,19,14,22,16],
		[28,47,43,57,30,32,11,18,40,15,7,43,38,50,57,40,32,21,0,30,50,58,68,56,64,42,28,35,52,25,18,22,39,50,48,13,40,56,66,43,59,49,58,46,24,18,8,8,12,35,34,21,36,52,61,61,51,40,36,26,36,9,15,17,50,36,76,46,26,22,43,54,52,56,60,38,42,47,44,47,40,13,23,29,38,43,44,14,27,17,41,39,36,35,37,34,40,39,34,42,32],
		[16,49,22,46,46,40,29,41,11,16,25,30,43,63,62,57,53,35,30,0,45,55,61,36,49,35,27,28,30,7,19,11,15,22,18,43,51,72,55,40,58,57,66,61,47,46,38,35,39,18,8,28,35,38,46,54,55,40,48,42,53,22,18,32,21,9,64,28,20,12,12,49,48,52,54,23,23,21,21,30,15,35,42,48,52,62,50,23,36,14,55,49,49,42,46,44,48,51,46,54,32],
		[29,10,27,10,32,22,39,42,41,43,51,16,16,32,21,35,41,32,50,45,0,10,18,25,20,10,22,17,29,40,35,50,33,40,48,59,25,43,17,7,13,22,28,35,43,51,52,45,62,27,38,29,14,15,18,11,15,11,24,31,33,43,52,64,59,53,27,22,28,37,49,4,3,7,10,22,24,36,30,20,35,40,35,36,29,41,17,37,24,49,30,23,27,20,20,24,20,26,26,27,18],
		[39,12,36,14,36,28,47,48,51,52,60,25,21,30,16,36,45,39,58,55,10,0,11,32,22,20,32,27,37,50,44,60,43,49,58,66,27,40,15,16,4,21,23,34,48,57,59,53,70,37,48,38,22,22,22,8,13,18,28,37,36,52,62,73,69,63,23,31,38,47,59,6,7,3,4,32,34,45,40,29,45,48,41,40,31,42,19,46,31,59,31,26,30,25,24,29,23,28,30,28,27],
		[46,23,40,15,47,39,57,59,55,60,69,30,32,40,25,47,56,49,68,61,18,11,0,32,18,27,40,35,38,57,53,67,47,51,61,76,38,50,9,25,13,32,32,45,59,68,69,63,80,43,53,47,32,24,20,7,24,28,39,48,47,61,70,82,72,68,12,34,46,54,63,14,16,12,8,37,38,47,43,32,49,58,52,51,43,53,30,55,42,66,42,37,42,36,36,40,34,39,41,39,36],
		[28,35,14,18,50,40,47,56,27,43,54,15,36,56,46,57,60,45,56,36,25,32,32,0,15,21,30,24,7,35,38,45,21,20,30,68,47,67,24,27,36,47,53,58,59,64,61,55,68,22,28,39,28,10,12,26,40,30,45,48,54,47,51,65,42,41,30,10,30,35,34,26,28,29,29,17,14,17,15,9,21,51,51,54,51,63,41,43,39,47,52,45,48,40,41,44,42,48,46,50,30],
		[38,30,27,10,51,41,54,60,41,53,64,21,35,51,38,55,61,49,64,49,20,22,18,15,0,22,36,29,22,47,47,57,34,35,45,75,45,62,9,25,26,42,45,54,62,69,67,61,76,32,41,44,30,12,4,14,34,30,44,50,53,56,62,76,57,55,15,21,39,46,49,18,21,20,18,27,26,32,29,19,35,57,54,55,49,61,37,50,42,58,50,43,47,40,40,44,40,46,45,47,34],
		[19,16,18,14,30,20,32,37,32,34,43,7,16,36,29,36,40,27,42,35,10,20,27,21,22,0,14,8,22,30,26,40,23,32,39,52,27,47,23,7,23,28,35,38,40,47,45,39,54,17,28,22,8,12,19,20,22,10,25,28,34,35,43,56,50,43,33,14,19,27,40,14,13,17,19,13,15,27,22,13,26,34,32,34,30,43,21,29,20,40,32,24,28,19,21,23,22,28,25,30,11],
		[11,23,21,28,22,14,18,25,28,21,29,16,16,36,35,32,32,15,28,27,22,32,40,30,36,14,0,7,29,21,13,29,22,34,38,39,25,46,38,16,34,30,39,35,29,34,31,25,40,14,23,9,9,25,33,33,28,14,21,19,28,21,30,42,46,36,47,21,7,16,36,27,25,29,32,14,18,29,23,21,24,21,21,26,26,38,23,15,10,27,29,22,23,16,19,18,21,25,21,28,5],
		[12,21,16,22,27,17,25,32,27,25,35,9,16,37,34,35,37,21,35,28,17,27,35,24,29,8,7,0,24,23,18,33,19,30,36,45,27,48,31,12,30,30,38,38,35,41,38,32,47,12,22,15,7,18,26,28,27,12,24,24,32,27,35,48,45,37,41,15,11,19,35,22,20,25,27,9,13,25,19,15,22,28,27,31,29,42,23,21,15,32,32,24,26,18,21,21,23,27,24,30,6],
		[24,38,9,24,50,41,45,54,20,38,50,16,38,59,50,58,60,44,52,30,29,37,38,7,22,22,29,24,0,30,34,40,15,13,23,65,49,70,30,29,41,50,57,60,58,62,58,52,64,18,22,37,29,15,19,32,44,32,47,48,55,43,46,60,35,34,37,9,27,30,27,31,32,34,34,15,11,10,9,9,15,49,50,54,52,65,43,39,39,41,54,47,49,41,43,45,44,50,47,52,30],
		[11,43,21,43,39,34,22,34,15,10,21,27,36,56,56,50,46,28,25,7,40,50,57,35,47,30,21,23,30,0,12,10,15,25,24,38,45,65,52,35,53,51,59,54,40,40,32,28,35,15,9,21,29,35,44,50,49,34,41,35,46,16,16,30,28,16,61,26,13,5,19,45,43,47,50,20,21,22,21,28,16,28,35,41,45,55,44,16,29,11,48,42,42,36,39,38,42,44,39,47,25],
		[10,35,25,40,27,23,11,23,25,8,17,25,27,45,47,38,34,16,18,19,35,44,53,38,47,26,13,18,34,12,0,17,22,34,35,30,34,54,49,28,46,41,50,43,29,29,23,18,30,17,19,10,22,35,43,46,40,26,30,23,34,9,17,30,40,28,59,28,8,7,31,39,37,42,45,21,24,30,26,29,24,17,23,29,34,43,34,5,18,15,37,31,31,25,29,27,32,33,28,36,17],
		[21,52,31,53,44,40,24,36,22,10,16,37,44,62,64,55,49,33,22,11,50,60,67,45,57,40,29,33,40,10,17,0,25,33,28,34,51,71,62,44,62,58,67,60,42,39,30,28,29,25,18,27,38,46,54,60,57,43,47,39,51,16,8,22,28,15,72,37,22,13,22,54,53,57,60,30,32,31,30,38,25,30,38,45,51,60,51,19,35,4,54,49,48,43,46,44,49,51,46,54,34],
		[12,39,7,32,44,36,33,44,8,24,35,17,35,57,52,54,53,35,39,15,33,43,47,21,34,23,22,19,15,15,22,25,0,12,16,52,46,67,41,30,46,49,57,57,49,51,45,40,50,8,7,28,26,23,31,40,45,31,43,40,50,30,31,45,27,21,49,13,17,16,16,36,36,40,41,11,9,8,6,15,3,38,42,47,48,60,42,27,32,27,50,43,45,37,40,40,42,46,42,49,25],
		[25,48,14,36,56,47,45,56,11,35,46,25,46,67,61,65,65,47,50,22,40,49,51,20,35,32,34,30,13,25,34,33,12,0,10,63,57,78,43,39,53,59,67,68,61,63,57,52,60,20,16,40,37,27,32,45,54,41,54,52,61,41,40,55,22,24,50,18,29,28,15,43,43,46,47,21,17,5,11,20,10,51,54,59,59,71,52,39,44,36,62,54,56,48,51,51,52,57,54,60,36],
		[27,56,22,46,59,52,46,57,9,33,43,33,52,73,68,70,68,50,48,18,48,58,61,30,45,39,38,36,23,24,35,28,16,10,0,61,62,83,53,46,62,66,74,73,63,63,56,52,57,24,16,42,43,36,42,54,61,47,59,55,65,40,36,49,12,16,60,27,32,28,7,52,52,55,56,27,24,13,18,29,14,51,56,62,64,75,59,39,48,32,66,59,61,53,56,56,58,62,58,65,41],
		[41,54,55,66,33,38,21,19,53,28,19,54,45,52,62,41,30,27,13,43,59,66,76,68,75,52,39,45,65,38,30,34,52,63,61,0,44,55,75,52,66,53,61,47,22,12,7,14,9,47,47,30,45,63,71,70,57,48,41,30,37,22,27,21,62,49,85,58,37,35,56,63,60,64,68,50,54,60,56,59,53,18,26,30,40,42,49,25,35,30,43,43,39,41,43,39,45,43,38,45,41],
		[36,15,43,35,11,11,30,25,53,41,45,34,11,11,18,10,18,20,40,51,25,27,38,47,45,27,25,27,49,45,34,51,46,57,62,44,0,21,41,21,26,9,17,11,23,33,38,33,50,38,48,24,20,38,43,34,14,17,4,14,9,38,49,57,71,60,49,41,32,40,61,27,24,27,30,36,40,52,46,40,49,27,18,14,4,16,8,33,16,48,5,3,4,9,6,7,5,1,6,3,21],
		[57,32,64,52,27,32,47,38,74,60,62,54,32,11,25,16,25,38,56,72,43,40,50,67,62,47,46,48,70,65,54,71,67,78,83,55,21,0,55,40,37,20,18,11,33,43,51,48,63,59,69,44,41,57,61,49,28,37,25,31,20,56,68,73,92,81,62,61,53,60,82,43,41,42,44,57,61,73,67,60,70,43,33,27,20,13,26,51,37,67,17,24,23,30,28,28,26,21,26,18,42],
		[42,25,33,9,48,39,55,59,48,57,66,25,33,45,31,51,58,49,66,55,17,15,9,24,9,23,38,31,30,52,49,62,41,43,53,75,41,55,0,24,19,36,38,49,60,68,68,62,78,37,47,45,30,17,11,7,28,28,41,48,49,58,66,79,65,62,10,27,42,50,56,14,17,14,11,32,32,40,36,25,42,57,52,53,45,56,33,52,41,62,46,39,44,37,37,41,36,42,42,42,34],
		[24,9,25,16,25,16,32,35,38,36,45,14,10,29,22,30,35,25,43,40,7,16,25,27,25,7,16,12,29,35,28,44,30,39,46,52,21,40,24,0,18,21,28,31,36,44,45,38,55,23,34,22,7,17,23,18,15,4,19,25,28,37,46,58,56,49,34,21,22,31,46,11,9,13,17,19,22,34,29,20,33,33,29,30,24,37,14,30,17,43,26,18,22,14,15,18,16,21,20,23,11],
		[42,12,40,18,35,29,48,48,55,54,62,29,22,27,12,35,44,40,59,58,13,4,13,36,26,23,34,30,41,53,46,62,46,53,62,66,26,37,19,18,0,19,19,32,48,57,60,54,71,40,51,39,25,27,26,12,11,20,27,37,34,54,64,75,73,66,25,35,40,49,63,10,10,7,8,36,38,49,44,33,49,48,41,39,30,40,18,48,32,61,30,25,29,26,24,28,22,27,29,26,29],
		[41,12,45,32,20,18,38,34,57,48,53,35,14,9,9,16,26,28,49,57,22,21,32,47,42,28,30,30,50,51,41,58,49,59,66,53,9,20,36,21,19,0,9,13,32,42,47,41,59,42,52,31,23,37,41,29,8,18,12,23,17,46,57,66,75,66,44,42,37,46,65,23,21,22,25,39,42,54,49,41,52,36,27,23,13,21,7,40,23,55,11,10,13,15,12,15,9,10,15,8,25],
		[49,18,53,36,28,27,47,42,65,57,62,42,23,11,7,21,32,37,58,66,28,23,32,53,45,35,39,38,57,59,50,67,57,67,74,61,17,18,38,28,19,9,0,16,39,50,55,50,67,50,61,40,31,43,45,31,13,26,21,32,24,55,66,74,84,75,44,49,46,55,73,27,25,25,27,47,50,62,56,47,60,45,35,30,20,24,16,49,32,64,18,19,22,24,21,24,18,18,23,16,34],
		[46,24,54,44,16,21,37,29,64,50,52,44,22,6,21,6,17,28,46,61,35,34,45,58,54,38,35,38,60,54,43,60,57,68,73,47,11,11,49,31,32,13,16,0,25,35,42,38,54,49,58,33,31,48,53,42,21,28,14,21,10,46,57,63,81,70,57,51,42,49,71,36,33,35,38,47,51,63,57,51,59,33,23,17,9,8,17,41,26,57,6,14,12,20,17,17,16,11,15,8,32],
		[37,36,49,52,12,21,18,6,54,33,30,44,27,29,41,18,8,14,24,47,43,48,59,59,62,40,29,35,58,40,29,42,49,61,63,22,23,33,60,36,48,32,39,25,0,11,18,16,30,42,47,22,32,52,59,54,37,32,21,12,15,27,37,40,68,55,69,50,32,36,59,47,43,47,51,43,47,57,52,50,52,13,8,9,19,20,30,24,20,38,21,23,18,23,24,19,25,21,18,23,29],
		[39,45,53,60,22,29,18,9,54,30,25,50,36,40,51,29,18,20,18,46,51,57,68,64,69,47,34,41,62,40,29,39,51,63,63,12,33,43,68,44,57,42,50,35,11,0,10,12,20,45,48,25,39,58,66,62,47,40,31,21,26,24,33,32,67,53,78,55,35,36,59,55,52,56,60,47,51,59,55,55,53,13,16,19,30,30,40,24,27,35,32,33,29,32,33,29,35,32,28,34,35],
		[34,47,48,59,27,31,13,13,47,22,15,47,38,47,56,36,26,20,8,38,52,59,69,61,67,45,31,38,58,32,23,30,45,57,56,7,38,51,68,45,60,47,55,42,18,10,0,6,12,40,41,23,38,56,64,63,50,41,35,24,32,16,23,22,58,44,78,51,30,29,50,56,53,57,61,43,47,53,50,52,47,11,20,25,35,38,43,18,28,25,38,37,34,34,36,32,39,37,32,39,34],
		[28,41,43,53,22,25,7,9,43,19,15,41,32,42,50,32,23,14,8,35,45,53,63,55,61,39,25,32,52,28,18,28,40,52,52,14,33,48,62,38,54,41,50,38,16,12,6,0,17,34,36,17,32,50,58,57,44,35,29,18,28,13,22,25,55,42,72,45,25,24,47,50,47,51,55,37,41,48,44,46,42,5,15,21,30,35,37,13,21,23,33,31,28,28,30,27,33,32,27,34,28],
		[40,59,54,69,39,42,23,25,50,25,14,55,49,59,67,48,38,31,12,39,62,70,80,68,76,54,40,47,64,35,30,29,50,60,57,9,50,63,78,55,71,59,67,54,30,20,12,17,0,46,44,33,48,64,73,73,62,52,46,36,44,21,21,13,57,43,88,58,37,33,51,66,64,68,71,50,53,57,55,59,51,23,32,37,47,50,55,26,39,25,50,49,46,46,48,44,51,49,44,51,44],
		[6,32,8,28,36,28,27,37,15,21,32,12,28,49,45,46,45,28,35,18,27,37,43,22,32,17,14,12,18,15,17,25,8,20,24,47,38,59,37,23,40,42,50,49,42,45,40,34,46,0,11,20,19,21,29,36,38,24,35,33,42,25,30,44,34,26,47,12,10,13,23,31,30,34,36,5,7,15,10,13,11,32,34,39,40,52,35,22,24,26,43,35,37,29,32,32,34,38,34,41,17],
		[12,43,14,38,44,37,30,42,6,19,30,23,38,59,56,54,52,34,34,8,38,48,53,28,41,28,23,22,22,9,19,18,7,16,16,47,48,69,47,34,51,52,61,58,47,48,41,36,44,11,0,27,30,30,38,46,49,35,44,40,50,25,25,39,23,15,56,20,16,12,13,42,41,45,47,16,16,13,13,22,7,36,41,47,49,60,45,24,33,20,52,45,46,39,42,41,44,48,43,51,27],
		[15,27,28,36,18,13,10,17,33,17,23,24,18,35,38,29,26,8,21,28,29,38,47,39,44,22,9,15,37,21,10,27,28,40,42,30,24,44,45,22,39,31,40,33,22,25,23,17,33,20,27,0,16,33,41,40,31,19,20,13,24,15,26,36,49,37,55,29,11,16,39,34,31,36,39,22,26,35,30,30,30,13,14,20,24,34,25,9,8,24,27,22,21,16,19,17,22,23,18,27,11],
		[18,14,23,21,22,12,25,30,34,30,38,14,9,30,27,29,32,19,36,35,14,22,32,28,30,8,9,7,29,29,22,38,26,37,43,45,20,41,30,7,25,23,31,31,32,39,38,32,48,19,30,16,0,20,27,25,20,5,17,20,26,30,39,51,52,44,40,21,16,25,42,18,16,20,23,16,20,32,26,20,29,27,24,26,23,35,16,24,12,36,25,17,20,12,14,16,16,21,18,23,4],
		[26,25,16,9,42,32,43,49,31,41,52,9,27,46,36,48,52,39,52,38,15,22,24,10,12,12,25,18,15,35,35,46,23,27,36,63,38,57,17,17,27,37,43,48,52,58,56,50,64,21,30,33,20,0,8,17,30,21,36,40,45,44,50,64,48,45,26,10,27,34,39,16,18,19,20,15,15,23,19,8,25,46,44,46,42,54,31,39,32,46,43,36,39,31,32,35,33,39,37,41,23],
		[34,29,23,9,49,39,51,57,38,50,60,18,33,50,38,53,58,46,61,46,18,22,20,12,4,19,33,26,19,44,43,54,31,32,42,71,43,61,11,23,26,41,45,53,59,66,64,58,73,29,38,41,27,8,0,15,33,27,42,47,51,52,58,72,54,52,18,17,35,42,45,17,20,20,18,24,22,29,26,16,32,54,51,53,47,59,35,47,39,54,48,41,45,37,38,41,38,44,43,45,30],
		[39,19,33,8,42,33,50,53,48,53,62,23,26,38,24,44,51,43,61,54,11,8,7,26,14,20,33,28,32,50,46,60,40,45,54,70,34,49,7,18,12,29,31,42,54,62,63,57,73,36,46,40,25,17,15,0,21,22,34,42,43,54,63,75,66,61,16,27,38,47,56,7,10,7,4,30,31,41,36,25,42,52,46,46,38,49,26,48,35,59,39,33,37,31,30,34,29,35,36,36,29],
		[38,6,40,24,25,19,40,38,53,48,54,29,13,17,7,23,32,30,51,55,15,13,24,40,34,22,28,27,44,49,40,57,45,54,61,57,14,28,28,15,11,8,13,21,37,47,50,44,62,38,49,31,20,30,33,21,0,15,16,27,23,47,57,67,72,63,36,36,35,44,61,16,13,14,17,34,37,49,44,35,48,39,31,28,19,29,7,40,24,55,18,14,18,16,14,18,11,16,18,15,23],
		[24,9,27,20,21,12,29,31,39,35,42,17,6,26,22,27,31,21,40,40,11,18,28,30,30,10,14,12,32,34,26,43,31,41,47,48,17,37,28,4,20,18,26,28,32,40,41,35,52,24,35,19,5,21,27,22,15,0,15,21,24,34,44,55,57,49,37,24,21,30,47,15,12,16,20,21,24,36,30,23,34,30,25,25,20,33,11,28,13,41,22,15,18,10,11,14,12,18,16,20,9],
		[32,16,40,34,8,7,26,22,50,37,41,31,9,15,21,12,17,16,36,48,24,28,39,45,44,25,21,24,47,41,30,47,43,54,59,41,4,25,41,19,27,12,21,14,21,31,35,29,46,35,44,20,17,36,42,34,16,15,0,11,9,34,45,53,67,56,50,38,28,36,57,27,24,27,31,33,37,49,43,37,45,24,15,12,5,18,9,28,12,44,8,2,3,6,4,3,5,4,2,7,18],
		[28,25,40,40,4,9,16,11,46,29,31,33,16,24,32,16,13,7,26,42,31,37,48,48,50,28,19,24,48,35,23,39,40,52,55,30,14,31,48,25,37,23,32,21,12,21,24,18,36,33,40,13,20,40,47,42,27,21,11,0,11,25,36,43,62,50,58,39,24,30,52,35,32,36,39,33,37,48,42,39,43,13,4,7,12,21,19,20,9,36,15,13,10,11,13,9,15,13,9,16,18],
		[38,24,48,43,7,14,27,19,56,40,42,40,18,14,26,4,9,18,36,53,33,36,47,54,53,34,28,32,55,46,34,51,50,61,65,37,9,20,49,28,34,17,24,10,15,26,32,28,44,42,50,24,26,45,51,43,23,24,9,11,0,36,47,53,73,61,58,46,34,41,63,36,33,36,39,41,45,56,51,46,52,23,13,7,4,10,17,31,18,47,6,10,6,14,13,10,13,8,8,8,25],
		[19,42,34,49,29,28,9,21,31,6,8,35,34,49,53,40,34,18,9,22,43,52,61,47,56,35,21,27,43,16,9,16,30,41,40,22,38,56,58,37,54,46,55,46,27,24,16,13,21,25,25,15,30,44,52,54,47,34,34,25,36,0,11,21,42,29,68,37,17,13,34,48,46,50,53,30,33,37,34,38,31,14,23,30,37,45,40,6,23,11,40,36,35,31,34,31,37,37,32,40,25],
		[24,53,37,56,41,39,20,31,29,9,8,41,44,60,64,52,45,30,15,18,52,62,70,51,62,43,30,35,46,16,17,8,31,40,36,27,49,68,66,46,64,57,66,57,37,33,23,22,21,30,25,26,39,50,58,63,57,44,45,36,47,11,0,14,36,22,75,42,24,16,30,57,55,59,62,35,37,38,37,43,32,25,35,41,48,56,51,17,34,4,51,47,46,42,45,42,48,49,44,52,35],
		[38,63,51,70,47,48,27,34,43,23,13,55,54,67,74,57,48,37,17,32,64,73,82,65,76,56,42,48,60,30,30,22,45,55,49,21,57,73,79,58,75,66,74,63,40,32,22,25,13,44,39,36,51,64,72,75,67,55,53,43,53,21,14,0,47,34,89,56,37,30,43,69,67,71,74,49,51,52,51,57,46,30,40,46,55,60,60,27,43,19,58,55,53,51,54,50,57,56,51,59,47],
		[35,66,33,57,66,60,50,62,18,36,44,44,61,82,79,77,74,56,50,21,59,69,72,42,57,50,46,45,35,28,40,28,27,22,12,62,71,92,65,56,73,75,84,81,68,67,58,55,57,34,23,49,52,48,54,66,72,57,67,62,73,42,36,47,0,14,72,38,39,33,10,63,63,66,67,37,35,25,29,40,24,56,62,69,72,83,68,44,55,33,75,68,69,62,65,64,67,71,66,74,50],
		[25,58,29,53,55,49,37,49,14,23,30,38,52,72,71,66,62,44,36,9,53,63,68,41,55,43,36,37,34,16,28,15,21,24,16,49,60,81,62,49,66,66,75,70,55,53,44,42,43,26,15,37,44,45,52,61,63,49,56,50,61,29,22,34,14,0,70,35,29,21,9,57,56,60,62,31,30,24,26,37,20,43,50,57,61,71,59,31,44,19,64,58,58,51,55,53,57,60,55,63,40],
		[51,34,42,19,58,49,65,69,56,66,76,34,42,52,37,59,67,59,76,64,27,23,12,30,15,33,47,41,37,61,59,72,49,50,60,85,49,62,10,34,25,44,44,57,69,78,78,72,88,47,56,55,40,26,18,16,36,37,50,58,58,68,75,89,72,70,0,36,52,59,64,23,26,22,19,41,40,47,44,34,50,67,62,62,54,64,41,62,51,72,54,48,53,47,46,50,45,51,51,51,44],
		[18,30,6,19,42,32,38,46,21,33,44,7,30,50,43,50,52,36,46,28,22,31,34,10,21,14,21,15,9,26,28,37,13,18,27,58,41,61,27,21,35,42,49,51,50,55,51,45,58,12,20,29,21,10,17,27,36,24,38,39,46,37,42,56,38,35,36,0,21,25,29,25,25,28,29,8,5,14,9,2,15,42,42,46,43,56,35,33,30,38,46,38,41,32,34,36,36,41,38,43,21],
		[4,30,18,32,28,21,17,27,22,15,25,18,23,43,43,38,36,18,26,20,28,38,46,30,39,19,7,11,27,13,8,22,17,29,32,37,32,53,42,22,40,37,46,42,32,35,30,25,37,10,16,11,16,27,35,38,35,21,28,24,34,17,24,37,39,29,52,21,0,9,29,33,31,35,38,13,16,25,20,21,19,22,25,31,33,44,30,12,16,21,36,29,30,23,26,25,29,32,27,35,12],
		[8,39,21,40,34,29,18,30,18,8,19,25,32,51,51,45,41,23,22,12,37,47,54,35,46,27,16,19,30,5,7,13,16,28,28,35,40,60,50,31,49,46,55,49,36,36,29,24,33,13,12,16,25,34,42,47,44,30,36,30,41,13,16,30,33,21,59,25,9,0,23,41,40,44,47,18,21,24,22,27,18,24,30,36,40,50,39,12,24,13,43,37,37,31,34,33,37,39,34,42,21],
		[25,56,23,48,57,50,41,53,8,28,37,34,51,72,69,67,64,46,43,12,49,59,63,34,49,40,36,35,27,19,31,22,16,15,7,56,61,82,56,46,63,65,73,71,59,59,50,47,51,23,13,39,42,39,45,56,61,47,57,52,63,34,30,43,10,9,64,29,29,23,0,53,53,56,58,27,25,16,20,31,14,47,53,59,62,73,58,35,45,26,65,58,59,51,54,54,57,60,56,63,40],
		[34,12,30,9,35,26,43,46,45,47,56,19,19,33,20,37,44,36,54,49,4,6,14,26,18,14,27,22,31,45,39,54,36,43,52,63,27,43,14,11,10,23,27,36,47,55,56,50,66,31,42,34,18,16,17,7,16,15,27,35,36,48,57,69,63,57,23,25,33,41,53,0,3,3,5,26,28,39,34,23,39,45,39,39,32,43,19,42,28,53,32,26,30,24,23,27,23,28,29,29,22],
		[32,9,30,11,32,23,41,43,44,45,54,19,16,30,18,34,41,33,52,48,3,7,16,28,21,13,25,20,32,43,37,53,36,43,52,60,24,41,17,9,10,21,25,33,43,52,53,47,64,30,41,31,16,18,20,10,13,12,24,32,33,46,55,67,63,56,26,25,31,40,53,3,0,4,8,25,28,39,34,23,39,42,36,36,28,40,16,39,25,52,29,23,27,21,20,24,19,25,26,26,20],
		[36,12,33,11,35,27,45,47,48,50,58,22,20,31,18,37,44,37,56,52,7,3,12,29,20,17,29,25,34,47,42,57,40,46,55,64,27,42,14,13,7,22,25,35,47,56,57,51,68,34,45,36,20,19,20,7,14,16,27,36,36,50,59,71,66,60,22,28,35,44,56,3,4,0,4,29,31,42,37,26,42,46,40,39,31,42,19,44,30,56,32,26,30,24,24,28,22,28,29,28,25],
		[39,15,35,11,39,31,49,50,49,53,61,24,24,34,20,40,48,41,60,54,10,4,8,29,18,19,32,27,34,50,45,60,41,47,56,68,30,44,11,17,8,25,27,38,51,60,61,55,71,36,47,39,23,20,18,4,17,20,31,39,39,53,62,74,67,62,19,29,38,47,58,5,8,4,0,31,32,43,38,27,43,50,44,43,35,46,22,47,33,59,35,29,34,28,27,31,26,32,33,32,28],
		[11,29,7,23,36,27,30,39,19,26,37,7,25,47,42,45,46,29,38,23,22,32,37,17,27,13,14,9,15,20,21,30,11,21,27,50,36,57,32,19,36,39,47,47,43,47,43,37,50,5,16,22,16,15,24,30,34,21,33,33,41,30,35,49,37,31,41,8,13,18,27,26,25,29,31,0,4,16,10,9,13,34,35,40,39,51,32,25,24,31,41,34,36,27,30,31,32,37,33,39,16],
		[13,32,3,23,40,31,34,43,17,29,40,9,29,50,44,49,50,33,42,23,24,34,38,14,26,15,18,13,11,21,24,32,9,17,24,54,40,61,32,22,38,42,50,51,47,51,47,41,53,7,16,26,20,15,22,31,37,24,37,37,45,33,37,51,35,30,40,5,16,21,25,28,28,31,32,4,0,12,6,7,11,38,39,44,43,55,35,28,28,33,45,37,40,31,34,35,36,40,37,43,20],
		[20,44,9,33,51,42,41,52,10,32,43,20,41,62,56,60,60,43,47,21,36,45,47,17,32,27,29,25,10,22,30,31,8,5,13,60,52,73,40,34,49,54,62,63,57,59,53,48,57,15,13,35,32,23,29,41,49,36,49,48,56,37,38,52,25,24,47,14,25,24,16,39,39,42,43,16,12,0,6,16,6,46,49,54,54,66,47,35,39,34,57,49,51,43,46,46,48,52,49,55,31],
		[16,38,4,28,46,37,37,47,12,30,41,15,35,57,51,55,55,38,44,21,30,40,43,15,29,22,23,19,9,21,26,30,6,11,18,56,46,67,36,29,44,49,56,57,52,55,50,44,55,10,13,30,26,19,26,36,44,30,43,42,51,34,37,51,29,26,44,9,20,22,20,34,34,37,38,10,6,6,0,11,6,42,44,49,49,61,42,31,34,32,51,44,46,37,40,41,42,47,43,49,26],
		[19,29,8,17,42,32,38,46,23,35,46,6,29,49,41,49,51,36,47,30,20,29,32,9,19,13,21,15,9,28,29,38,15,20,29,59,40,60,25,20,33,41,47,51,50,55,52,46,59,13,22,30,20,8,16,25,35,23,37,39,46,38,43,57,40,37,34,2,21,27,31,23,23,26,27,9,7,16,11,0,17,42,42,45,43,55,34,34,30,39,45,37,40,32,34,35,35,40,38,42,21],
		[15,42,9,34,47,38,35,46,6,26,37,20,38,59,55,56,55,38,40,15,35,45,49,21,35,26,24,22,15,16,24,25,3,10,14,53,49,70,42,33,49,52,60,59,52,53,47,42,51,11,7,30,29,25,32,42,48,34,45,43,52,31,32,46,24,20,50,15,19,18,14,39,39,42,43,13,11,6,6,17,0,41,44,50,50,62,45,29,35,27,53,46,48,40,42,43,45,49,45,52,28],
		[26,36,40,48,17,20,6,6,42,20,19,37,27,37,45,27,20,9,13,35,40,48,58,51,57,34,21,28,49,28,17,30,38,51,51,18,27,43,57,33,48,36,45,33,13,13,11,5,23,32,36,13,27,46,54,52,39,30,24,13,23,14,25,30,56,43,67,42,22,24,47,45,42,46,50,34,38,46,42,42,41,0,10,16,25,31,32,12,16,26,28,26,23,23,25,21,28,26,22,29,23],
		[30,29,42,44,7,13,14,7,47,28,29,36,20,27,36,17,11,7,23,42,35,41,52,51,54,32,21,27,50,35,23,38,42,54,56,26,18,33,52,29,41,27,35,23,8,16,20,15,32,34,41,14,24,44,51,46,31,25,15,4,13,23,35,40,62,50,62,42,25,30,53,39,36,40,44,35,39,49,44,42,44,10,0,7,15,21,24,19,12,34,18,17,14,16,17,13,19,17,13,19,21],
		[35,28,46,45,4,14,21,12,53,35,35,39,20,21,32,11,6,13,29,48,36,40,51,54,55,34,26,31,54,41,29,45,47,59,62,30,14,27,53,30,39,23,30,17,9,19,25,21,37,39,47,20,26,46,53,46,28,25,12,7,7,30,41,46,69,57,62,46,31,36,59,39,36,39,43,40,44,54,49,45,50,16,7,0,10,15,21,26,16,41,13,14,10,16,16,12,17,13,10,15,24],
		[37,20,45,39,8,12,28,22,54,40,43,36,14,12,22,6,14,18,38,52,29,31,43,51,49,30,26,29,52,45,34,51,48,59,64,40,4,20,45,24,30,13,20,9,19,30,35,30,47,40,49,24,23,42,47,38,19,20,5,12,4,37,48,55,72,61,54,43,33,40,62,32,28,31,35,39,43,54,49,43,50,25,15,10,0,13,13,32,16,47,3,6,3,11,9,8,9,3,6,4,23],
		[48,31,58,51,16,24,36,26,66,49,50,49,27,14,29,6,12,27,43,62,41,42,53,63,61,43,38,42,65,55,43,60,60,71,75,42,16,13,56,37,40,21,24,8,20,30,38,35,50,52,60,34,35,54,59,49,29,33,18,21,10,45,56,60,83,71,64,56,44,50,73,43,40,42,46,51,55,66,61,55,62,31,21,15,13,0,24,40,28,56,11,18,15,24,22,20,21,15,18,14,35],
		[34,7,38,27,18,12,33,31,50,42,48,28,7,15,13,18,26,23,44,50,17,19,30,41,37,21,23,23,43,44,34,51,42,52,59,49,8,26,33,14,18,7,16,17,30,40,43,37,55,35,45,25,16,31,35,26,7,11,9,19,17,40,51,60,68,59,41,35,30,39,58,19,16,19,22,32,35,47,42,34,45,32,24,21,13,24,0,34,17,49,13,7,12,9,7,11,4,9,11,10,18],
		[15,36,30,43,25,22,6,18,30,9,14,29,27,43,47,36,30,13,14,23,37,46,55,43,50,29,15,21,39,16,5,19,27,39,39,25,33,51,52,30,48,40,49,41,24,24,18,13,26,22,24,9,24,39,47,48,40,28,28,20,31,6,17,27,44,31,62,33,12,12,35,42,39,44,47,25,28,35,31,34,29,12,19,26,32,40,34,0,17,16,35,30,29,25,28,25,31,32,27,35,19],
		[21,20,31,33,12,5,16,18,38,25,31,24,11,27,30,22,22,8,27,36,24,31,42,39,42,20,10,15,39,29,18,35,32,44,48,35,16,37,41,17,32,23,32,26,20,27,28,21,39,24,33,8,12,32,39,35,24,13,12,9,18,23,34,43,55,44,51,30,16,24,45,28,25,30,33,24,28,39,34,30,35,16,12,16,16,28,17,17,0,32,19,14,14,8,11,9,14,16,11,19,9],
		[21,50,33,53,40,37,20,32,25,7,11,37,42,59,62,51,45,29,17,14,49,59,66,47,58,40,27,32,41,11,15,4,27,36,32,30,48,67,62,43,61,55,64,57,38,35,25,23,25,26,20,24,36,46,54,59,55,41,44,36,47,11,4,19,33,19,72,38,21,13,26,53,52,56,59,31,33,34,32,39,27,26,34,41,47,56,49,16,32,0,51,46,45,40,43,41,46,48,42,51,32],
		[40,20,48,40,11,15,31,25,57,44,46,38,16,9,21,5,15,22,41,55,30,31,42,52,50,32,29,32,54,48,37,54,50,62,66,43,5,17,46,26,30,11,18,6,21,32,38,33,50,43,52,27,25,43,48,39,18,22,8,15,6,40,51,58,75,64,54,46,36,43,65,32,29,32,35,41,45,57,51,45,53,28,18,13,3,11,13,35,19,51,0,8,6,14,11,11,10,4,9,3,26],
		[33,14,40,33,11,9,28,24,50,39,43,31,9,14,19,12,19,18,39,49,23,26,37,45,43,24,22,24,47,42,31,49,43,54,59,43,3,24,39,18,25,10,19,14,23,33,37,31,49,35,45,22,17,36,41,33,14,15,2,13,10,36,47,55,68,58,48,38,29,37,58,26,23,26,29,34,37,49,44,37,46,26,17,14,6,18,7,30,14,46,8,0,4,6,4,5,3,3,4,6,18],
		[34,18,43,37,7,9,26,21,52,38,41,34,12,14,22,9,14,16,36,49,27,30,42,48,47,28,23,26,49,42,31,48,45,56,61,39,4,23,44,22,29,13,22,12,18,29,34,28,46,37,46,21,20,39,45,37,18,18,3,10,6,35,46,53,69,58,53,41,30,37,59,30,27,30,34,36,40,51,46,40,48,23,14,10,3,15,12,29,14,45,6,4,0,9,7,5,8,3,3,6,20],
		[27,13,34,30,11,3,24,23,44,33,38,25,4,20,22,17,21,14,35,42,20,25,36,40,40,19,16,18,41,36,25,43,37,48,53,41,9,30,37,14,26,15,24,20,23,32,34,28,46,29,39,16,12,31,37,31,16,10,6,11,14,31,42,51,62,51,47,32,23,31,51,24,21,24,28,27,31,43,37,32,40,23,16,16,11,24,9,25,8,40,14,6,9,0,3,4,6,9,6,12,12],
		[30,12,37,30,12,6,26,24,47,36,41,27,5,17,20,16,21,17,37,46,20,24,36,41,40,21,19,21,43,39,29,46,40,51,56,43,6,28,37,15,24,12,21,17,24,33,36,30,48,32,42,19,14,32,38,30,14,11,4,13,13,34,45,54,65,55,46,34,26,34,54,23,20,24,27,30,34,46,40,34,42,25,17,16,9,22,7,28,11,43,11,4,7,3,0,4,3,7,5,9,15],
		[29,16,38,34,8,4,23,20,47,34,38,29,8,18,23,14,17,13,34,44,24,29,40,44,44,23,18,21,45,38,27,44,40,51,56,39,7,28,41,18,28,15,24,17,19,29,32,27,44,32,41,17,16,35,41,34,18,14,3,9,10,31,42,50,64,53,50,36,25,33,54,27,24,28,31,31,35,46,41,35,43,21,13,12,8,20,11,25,9,41,11,5,5,4,4,0,7,7,2,10,15],
		[32,11,38,30,13,9,29,27,49,39,44,29,6,15,17,15,22,20,40,48,20,23,34,42,40,22,21,23,44,42,32,49,42,52,58,45,5,26,36,16,22,9,18,16,25,35,39,33,51,34,44,22,16,33,38,29,11,12,5,15,13,37,48,57,67,57,45,36,29,37,57,23,19,22,26,32,36,48,42,35,45,28,19,17,9,21,4,31,14,46,10,3,8,6,3,7,0,6,7,8,17],
		[36,16,43,36,10,11,29,24,53,41,44,34,12,12,19,9,17,19,39,51,26,28,39,48,46,28,25,27,50,44,33,51,46,57,62,43,1,21,42,21,27,10,18,11,21,32,37,32,49,38,48,23,21,39,44,35,16,18,4,13,8,37,49,56,71,60,51,41,32,39,60,28,25,28,32,37,40,52,47,40,49,26,17,13,3,15,9,32,16,48,4,3,3,9,7,7,6,0,5,3,21],
		[31,17,40,36,6,6,24,20,49,35,39,31,10,17,23,12,16,14,34,46,26,30,41,46,45,25,21,24,47,39,28,46,42,54,58,38,6,26,42,20,29,15,23,15,18,28,32,27,44,34,43,18,18,37,43,36,18,16,2,9,8,32,44,51,66,55,51,38,27,34,56,29,26,29,33,33,37,49,43,38,45,22,13,10,6,18,11,27,11,42,9,4,3,6,5,2,7,5,0,8,17],
		[39,17,46,37,12,14,32,26,56,44,47,36,14,9,18,8,18,22,42,54,27,28,39,50,47,30,28,30,52,47,36,54,49,60,65,45,3,18,42,23,26,8,16,8,23,34,39,34,51,41,51,27,23,41,45,36,15,20,7,16,8,40,52,59,74,63,51,43,35,42,63,29,26,28,32,39,43,55,49,42,52,29,19,15,4,14,10,35,19,51,3,6,6,12,9,10,8,3,8,0,24],
		[15,18,22,25,21,11,21,26,32,25,34,15,11,32,30,29,30,16,32,32,18,27,36,30,34,11,5,6,30,25,17,34,25,36,41,41,21,42,34,11,29,25,34,32,29,35,34,28,44,17,27,11,4,23,30,29,23,9,18,18,25,25,35,47,50,40,44,21,12,21,40,22,20,25,28,16,20,31,26,21,28,23,21,24,23,35,18,19,9,32,26,18,20,12,15,15,17,21,17,24,0]
	]
}