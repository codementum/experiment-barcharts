/*global define, d3 */
define(['d3'], function () {
  'use strict';

  // given a random set, find if any meet the type criteria
  var criteria = {
    "low":          {"min": 0.80, "max":0.99},
    "mediumLow":    {"min": 0.60, "max":0.80},
    "medium":       {"min": 0.40, "max":0.60},
    "mediumHigh":   {"min": 0.20, "max":0.40},
    "high":         {"min": 0.01, "max":0.20}
  };

  var d = generate(9, criteria.low, 90);

  function makeAdjacent(arr) {
    var aLoc   = find(arr, 'A')
      , bLoc   = find(arr, 'B')
      , newArr = arr.splice(0);
    
    if(aLoc === 0) {
      swap(newArr, 1, bLoc); 
    } else if(aLoc === newArr.length-1) {
      swap(newArr, newArr.length-2, bLoc); 
    } else {
      var newBLoc = plusOrMinus() + aLoc;
      swap(newArr, newBLoc, bLoc); 
    }

    return newArr;
  }

  function find(arr, letter) {
    var loc = -1;
    arr.forEach(function(d, i) {
      if(d.name === letter)
        loc = i;
    });
    return loc;
  }

  function makeNonAdjacent(arr, len) {
    var aLoc   = find(arr, 'A')
      , bLoc   = find(arr, 'B')
      , newArr = arr.splice(0);

    var aNewLoc = randomInt(0, newArr.length)
      , bNewLoc = randomInt(0, newArr.length);

    while(Math.abs(aNewLoc - bNewLoc) < len) {
      aNewLoc = randomInt(-1, newArr.length-1);
      bNewLoc = randomInt(-1, newArr.length-1);
      console.log(Math.abs(aNewLoc - bNewLoc));
    }

    swap(newArr, aNewLoc, aLoc); 
    swap(newArr, bNewLoc, bLoc); 
    
    return newArr;
  }

  function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  function generate(length, criteria, minSum) {
    if(length > 9) {
      console.log('Do not go past 9, or else. Setting length to 9.');
      length = 9;
    }
    var attempt = null;
    var arr = null;

    while (!attempt) {
      arr = randomizeData(length);
      if(sum(arr) > minSum)
        attempt = mark(arr, criteria);
    }

    return constructLabeledDataset(arr, attempt);
  }

  function constructLabeledDataset(arr, marks) {
    var dataset = []
      , smallerIsA = randomInt(0, 2) > 1 ? true : false;

    arr.forEach(function(d, i) {
      var name = '';
      var value = d;

      if(i === marks.index) {
        if(smallerIsA)
          name = 'A';
        else
          name = 'B';
      }

      if(i === marks.coindex) {
        if(!smallerIsA)
          name = 'A';
        else
          name = 'B';
      }
      
      dataset[i] = {
        name: name,
        value: value
      };
    });

    return dataset;
  }

  function sum(arr) {
    var total = 0;
    for(var i in arr) { total += arr[i]; }
    return total;
  }

  function mark(arr, range) {
    var index = randomInt(0, arr.length-1)
      , value = arr[index];
    for(var i = 0; i < arr.length; i++) {
      var covalue = arr[i]
        , diff = value/covalue;
      if(range.min < diff && diff <= range.max)
        return {"index": index, "value": value, "coindex": i, "covalue": covalue, "diff": diff};
    }
    return null;
  }

  function randomInt(min, max) {
    return Math.ceil(Math.random()*max + min);
  }

  function plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1; 
  }

  function randomizeData(len) { 
    var max = 36;
    var min = 3;
  
    var d = [];
  
    while(d.length < len) {
      var randomnumber = randomInt(min, max);
      var found = false;
      for(var i=0; i<d.length; i++) {
        if(!ensureDifference(d, randomnumber, min)) {
          found = true;
          break;
        }
      }
      if(!found) d[d.length] = randomnumber;
    }
    return d;
  }
  
  function ensureDifference(A, c, dist) {
    var result = true;
    for(var i=0; i<A.length; i++) {
       if( c > (A[i] - dist) && c < (A[i] + dist) ) {
         result = false;
       }
    }
    return result;
  }

  function data() {
    return d;
  }

  return {
    data: data,
    generate: generate,
    criteria: criteria
  };
});
