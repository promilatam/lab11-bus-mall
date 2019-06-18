'use strict';

// Globals
var panelSectionTag = document.getElementById('panelOfChoices');
var leftImageTag = document.getElementById('leftPanel');
var centerImageTag = document.getElementById('centerPanel');
var rightImageTag = document.getElementById('rightPanel');
var totalClicks = 0;
var allowedClicks = 25;

// Variables to store the marketing objects already on the page....
var leftImageOnPage = null;
var centerImageOnPage = null;
var rightImageOnPage = null;

//store previous values, so these choices won't appear in a row
var previousLeft = null;
var previousRight = null;
var previousCenter = null;

//constructor
var MarketingItem = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;
  MarketingItem.allImages.push(this);
};

//hold all marketing items after being constructed
MarketingItem.allImages = [];

//BEGIN HTML WRITE CODE
// Referencing the container for the DOM
function domReferenceParent(parent){
  var node = document.getElementById(parent);
  return node;
}

// build a new element to put on the page
function buildElement(element){
  var node = document.createElement(element);
  return node;
}

// give element some text
function assignElementText(text, element){
  element.textContent = text;
}

// append child to page
function appendChildtoParent(parent, child){
  parent.appendChild(child);
}

//build an element, assign it text, and append to page
function htmlTextHack(element, text, parentID){
  var node = domReferenceParent(parentID);
  var current = buildElement(element);
  assignElementText(text, current);
  appendChildtoParent(node, current);
}

// build an element without text, append.
function htmlNodeAdd(element, parentID){
  var node = domReferenceParent(parentID);
  var current = buildElement(element);
  appendChildtoParent(node, current);
}

var displayResults = function () {
  //header description
  htmlTextHack('li', 'name, clicks, shown', 'clickData');

  //iterate over objects
  for (var i = 0; i < MarketingItem.allImages.length ; i++ ) {
    var name = MarketingItem.allImages[i].name;
    var clicks = MarketingItem.allImages[i].clicks;
    var shown = MarketingItem.allImages[i].timesShown;

    var output = name + ', ' + clicks + ', ' + shown;

    htmlTextHack('li', output, 'clickData');
  }
  //grab name, shown, clicked,

  //create li and output


};



//END HTML WRITE CODE

//render three new images from the url
var renderNewImage = function (leftIndex, centerIndex, rightIndex){
  leftImageTag.src = MarketingItem.allImages[leftIndex].url;
  centerImageTag.src = MarketingItem.allImages[centerIndex].url;
  rightImageTag.src = MarketingItem.allImages[rightIndex].url;
};

//from MDN, inclusive range with uniform distribution
var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//check values against previous values in last panel.
var checkPrevious = function (leftIndex, centerIndex, rightIndex) {
  var repeat = true;
  //if any values are repeated, return true
  if (leftIndex === previousLeft || leftIndex === previousCenter || leftIndex === previousRight) {return repeat;}
  if (centerIndex === previousLeft || centerIndex === previousCenter || centerIndex === previousRight) {return repeat;}
  if (rightIndex === previousLeft || rightIndex === previousCenter || rightIndex === previousRight) {return repeat;}
  //if values are unique, return false.
  return false;
};

var pickItemFromArray = function(){
  do {
    //don't forget about that horrible off by one error!
    var leftIndex = getRandomInt(0, MarketingItem.allImages.length-1);
    var centerIndex = getRandomInt(0, MarketingItem.allImages.length-1);
    var rightIndex = getRandomInt(0, MarketingItem.allImages.length-1);

    

    //channge this
    var repeat = checkPrevious(leftIndex, centerIndex, rightIndex );
    console.log('i\'m  in the do of pickItemFromArray and i\'m still alive');
    //continue until left, right, and center are not the same.
  } while (leftIndex === rightIndex || centerIndex === leftIndex || centerIndex === rightIndex || repeat);

  //assign current index positions into temp holders
  previousLeft = leftIndex;
  previousCenter = centerIndex;
  previousRight = rightIndex;

  //set index values and render
  leftImageOnPage = MarketingItem.allImages[leftIndex];
  centerImageOnPage = MarketingItem.allImages[centerIndex];
  rightImageOnPage = MarketingItem.allImages[rightIndex];
  renderNewImage(leftIndex, centerIndex, rightIndex);
};

var handleClickOnMarketing = function(event){
  //do allowedClicks times, set in global above.
  if(totalClicks < allowedClicks){
    //target a smaller bit of code.
    var thingWeClickedOn = event.target;
    var id = thingWeClickedOn.id;

    if(id === 'leftPanel' || id === 'centerPanel' || id === 'rightPanel'){

      if(id === 'leftPanel'){
        leftImageOnPage.clicks++;
      }

      if(id === 'centerPanel'){
        centerImageOnPage.clicks++;
      }

      if(id === 'rightPanel'){
        rightImageOnPage.clicks++;
      }

      //update times shown
      leftImageOnPage.timesShown++;
      centerImageOnPage.timesShown++;
      rightImageOnPage.timesShown++;

      //choose new merchendise
      pickItemFromArray();
    }
  }//end total clicks check

  // increment amount of clicks
  totalClicks++;
  //when they reach total max clicks, remove the event listener
  if(totalClicks === allowedClicks){
    panelSectionTag.removeEventListener('click', handleClickOnMarketing);

    //TODO: add a innerhtml to empty string here to reset.
    //call our function to display results here
    displayResults();
  }
};

//add event listener
panelSectionTag.addEventListener('click', handleClickOnMarketing);

// Create Image objects
new MarketingItem('bag', './img/bag.jpg');
new MarketingItem('banana', './img/banana.jpg');
new MarketingItem('bathroom', './img/bathroom.jpg');
new MarketingItem('boots', './img/boots.jpg');
new MarketingItem('breakfast', './img/breakfast.jpg');
new MarketingItem('bubblegum', './img/bubblegum.jpg');
new MarketingItem('chair', './img/chair.jpg');
new MarketingItem('cthulhu', './img/cthulhu.jpg');
new MarketingItem('dog-duck', './img/dog-duck.jpg');
new MarketingItem('dragon', './img/dragon.jpg');
new MarketingItem('pen', './img/pen.jpg');
new MarketingItem('pet-sweep', './img/pet-sweep.jpg');
new MarketingItem('scissors', './img/scissors.jpg');
new MarketingItem('shark', './img/shark.jpg');
new MarketingItem('sweep', './img/sweep.png');
new MarketingItem('tauntaun', './img/tauntaun.jpg');
new MarketingItem('unicorn', './img/unicorn.jpg');
new MarketingItem('usb', './img/usb.gif');
new MarketingItem('water-can', './img/water-can.jpg');
new MarketingItem('wine-glass', './img/wine-glass.jpg');

//initial call to populate panels
pickItemFromArray();
