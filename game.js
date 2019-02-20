// Game mode tracker -- Easy or Hard -- 3 or 6 squares
var squareTracker = 6;
// creating an empty array for colors
var colors = [];
// winning color
var goalColor;

// Selector variables
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
// buttons
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

// calling init() function --- run when the browser first loads
init();

// reset
resetButton.addEventListener("click", function(){
  reset();
});


// functions
/**********************************************
 *                  init()                    *
 * Runs when browser first loads up           *
 * Sets up the initial settings for the game. *
 **********************************************/
function init()
{
    // calling modeSetup() to initialize game mode buttons
    modeSetup();

    // calling squareSetup() to initalize message and color displays
    squareSetup();
    
    // calling reset()
    reset();
}

/*********************************************************************
 *                  modeSetup()                                      *
 * Adds click listeners to both easy and hard mode                   *
 * Figures out how many squares to display based on chosen game mode *
 *********************************************************************/
function modeSetup()
{
    // Game Mode buttons event listeners
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // figure out how many squares to show
            // ternary operation    
            this.textContent === "Easy" ? squareTracker = 3 : squareTracker = 6;
            // calling reset function
            reset();
        });
    }
}

/***********************************************************
 *                  squareSetup()                          *
 * Uses for loop to set up colors display for each squares *
 * Adds "click" event listeners                            *
 * Updates message and color displays as game changes      *
 ***********************************************************/
 function squareSetup()
 {
     // Creating for loop to step through all the colors in the array
     for (var i = 0; i < squares.length; i++) {
         // adding click listeners to square divs
         squares[i].addEventListener("click", function () {
             // getting color of user clicked square
             var clickedColor = this.style.backgroundColor;
             // compare it to goalColor
             if (clickedColor === goalColor) {
                 // Display "CORRECT!!" message in Mini-Menu
                 messageDisplay.textContent = "CORRECT!!";
                 resetButton.textContent = "Play Again?";
                 // calling function changeColors
                 // passing in goalColor as argument
                 changeColors(goalColor);
                 // changing title backgound color to goal color
                 h1.style.backgroundColor = goalColor;
             }
             else {
                 // if wrong color -- drop color from the game
                 this.style.backgroundColor = "#232323";

                 // Display "Try Again" message in Mini-Menu
                 messageDisplay.textContent = "Try Again!";
             }
         });

     }
 }

/************************************************************
 *                     changeColors()                       *
 * Function takes a single argument for colors.             *
 * Creates a For loop and loops through "squares" elements  *
 * Changes the background color of each square to match the *
 * winning color of the game.                               *
 ************************************************************/
function changeColors(color)
{
    // loop through all squares
    for(var i = 0; i < squares.length; i ++){
        // change each color to match goalColor
        squares[i].style.backgroundColor = color;
    }
}

/**************************************************************
 *                          pickColor()                       *
 * Generates a random number based on array length            *
 * Stores number in random variable.                          *
 * Returns element of the array at the index of random number *
 **************************************************************/
function pickColor()
{
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

/************************************************************
 *                   generateRandomColors()                 *
 * Creates an empty array.                                  *
 * Calls function randomColor and pushes it into the array. * 
 * Returns array                                            *
 ************************************************************/
function generateRandomColors(num)
{
    // create empty array
    var arr = [];
    
    // add num random colors to array
    for(var i = 0; i < num; i++){
        // get random color and push into array
        arr.push(randomColor()); 
    }

    //return array
    return arr;
}

/********************************************************
 *                   randomColor()                      *
 * Generates random numbers for each rgb channel.       *
 * Stores the random numbers in variables "r" "g" & "b" *
 * Combines the #s into a large string of the following *
 * format: "rgb(r, g, b)"                               *
 * returns the string                                   *
 ********************************************************/
function randomColor()
{
    // pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    
    // pick a "green" from 0 - 255
    var g = Math.floor(Math.random() * 256);
    
    // pick a "blue" from 0 - 255
    var b =Math.floor(Math.random() * 256);

    // rgb string 
    return "rgb(" + r + ", " + g + ", " + b + ")";
    
}

/*************************************************
 *                   reset()                     *
 * Generates all new colors for squares          *
 * Picks and sets random color from colors array * 
 * Sets it to be winning color                   *
 * Resets message displays                       *
 * Resets title sequence background color        *
 *************************************************/
function reset()
{
    // generate all new colors
    colors = generateRandomColors(squareTracker);
    // pick new random color from array
    goalColor = pickColor();
    // change color display to match goalColor
    colorDisplay.textContent = goalColor;
    resetButton.textContent = "New Colors";
    // reset message display
    messageDisplay.textContent = "";
    // change the colors of the squares
    for (var i = 0; i < squares.length; i++) {
        //checking # of squares
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    // reset title sequence background color
    h1.style.backgroundColor = "darkslategray";
}