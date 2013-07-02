var data = [40, 20, 10, 5, 24];
var onlyAB = true;
var onlyAdjacent = true; 
var labels;
var Apos = -1, Bpos = -1;
var w = 380;
var h = 380;

if(onlyAB && !onlyAdjacent) {
  // choose label positions
  while(Apos == Bpos || Apos > Bpos) { // choose until not equal
    Apos = Math.floor(Math.random()*5)
    Bpos = Math.floor(Math.random()*5)
  }
  // set label string accoringly
  labels = ['', '', '', '', ''];
  labels[Apos] = 'A';
  labels[Bpos] = 'B';
} else if (onlyAB && onlyAdjacent) {
  // choose label positions
  while(Math.abs(Apos - Bpos) != 1) { // choose until not equal
    Apos = Math.floor(Math.random()*5)
    Bpos = Math.floor(Math.random()*5)
  }
  // set label string accordingly
  labels = ['', '', '', '', ''];
  labels[Apos] = 'A';
  labels[Bpos] = 'B';
} else {
  labels = ['A', 'B', 'C', 'D', 'E'];
}

var sum = data[0] + data[1] + data[2] + data[3] + data[4];
while(sum != 100) {
  data = randomizeData();
  sum = data[0] + data[1] + data[2] + data[3] + data[4];
}

// make nonAdjacent arrays based on original data
// shuffle data and Apos + Bpos
var nonAdjData = data.slice();
var nonAdjLabels = labels.slice();
var swapTo = Apos;
while( Math.abs(swapTo - Bpos) <= 1) {
  swapTo = Math.floor(Math.random()*5);
}
//swap label
nonAdjLabels[Apos] = '';
nonAdjLabels[swapTo] = 'A';

//swap data
var tmp = nonAdjData[Apos];
nonAdjData[Apos] = nonAdjData[swapTo];
nonAdjData[swapTo] = tmp;

/* randomize data according to Cleveland84
 * specifically:
 *  - 5 numbers
 *  - add to 100
 *  - none less than 3
 *  - none greater than 39
 *  - differences greater than .1
 */
function randomizeData() { // TODO finish
  var max = 36;
  var min = 3;
  var diff = 0.1;

  var d = [];

  while(d.length < 5) {
    var randomnumber=Math.ceil(Math.random()*36 + 3);
    var found=false;
    for(var i=0;i<d.length;i++) {
      if(!ensureDifference(d, randomnumber)) {
        found=true;
        break;
      }
    }
    if(!found)
      d[d.length]=randomnumber;
  }

  return d;
}

function fillDataArray(A) {
  var max = 36;
  var min = 3;
  var diff = 0.1;

  var d = A;

  while(d.length < 5) {
    var randomnumber=Math.ceil(Math.random()*36 + 3);
    var found=false;
    for(var i=0;i<d.length;i++) {
      if(!ensureDifference(d, randomnumber)) {
        found=true;
        break;
      }
    }
    if(!found)
      d[d.length]=randomnumber;
  }

  return d;
}

function ensureDifference(A, c) {
  var result = true; // assume true
  for(var i=0;i<A.length;i++) {
     if( c > (A[i] - 3) && c < (A[i] + 3) ) {
       result = false;
     }
  }
  return result;
}


