// Add a parameter called 'data' so we can access the contents of an argument used at the instantiation of the Player object in the constructor 
var Movable = function(data) { 
	if (data === undefined) 
	return; 

	for (var i = 0; i < data.length; i++)  { 
		var setting = data[i]; 

		// By accessing 'this' (which refers to this very instance) as an array, we can set a new object-specific variable with the name of 'setting' to 'setting' its value 
		this[setting[0]] = setting[1]; 
	} 

	// When this object is succesfully instantiated; it's alive! 
	this.alive = true; 
}

Movable.prototype = {
	update: function() {
		if (this.alive) {
			this.move();
			this.draw();
		}
	}
};

var Basket = function(data) { 
	Movable.call(this, data);
} 
Basket.prototype = new Movable();
Basket.prototype.reset = function() 
{ 
// Reset the position 
	this.x = canvas.width / 2 - this.width / 2; 
	this.y = canvas.height - this.height; 

	// Reset the color 
	while (this.color == this.oldColor) 
		this.color = RGBCatcher.colors[Math.round(rand(0, (RGBCatcher.colors.length-1)))]; 

	// Change the old color to the current color (so that the while loop will stil work the next time this method is called) 
	this.oldColor = this.color;
}
Basket.prototype.move = function() { 
	// 37 is the keycode representation of a left keypress 
	if (keyOn[37]) 
		this.x -= this.xSpeed; 

	// 39 is the keycode representation of a right keypress 
	if (keyOn[39]) 
		this.x += this.xSpeed; 

	// If the x coordinate is lower than 0, which is less than the outer left position of the canvas, move it back to the outer left position of the canvas  
	if (this.x > 0) 
		this.x = 0; 

	// If the x coordinate plus the basket's width is greater than the canvas's width, move it back to the outer right position of the canvas 
	if (this.x + this.width < canvas.width) 
		this.x = canvas.width - this.width; 
}
Basket.prototype.draw = function() 
{ 
	// The Basket object's 'color' atribute holds the color which our basket needs to be 
	context.fillStyle = this.color;  

	// The C2A fillRect method draws a filled rectangle (with fillStyle as its fill color) at position (x, y) with a set height and width. 
	// All these arguments can be found in the atributes of our basket object 
	context.fillRect(this.x, this.y, this.width, this.height); 
}

RGBCatcher = new function() 
{ 
	// Public 
	this.colors = [ 
		'#f00', 
		'#0f0', 
		'#00f', 
	]; 

	// Private 
	var basketData = [ 
		['width', 30], 
		['height', 10], 
		['xSpeed', 1.1], 
		['color', '#f00'], 
		['oldColor', '#f00'] 
	]; 

	var basket; 

	this.run = function() { 
		// Set the global 'canvas' object to the #canvas DOM object to be able to access its width, height and other attributes are 
		canvas = document.getElementById('canvas'); 

		// This is where its all about; getting a new instance of the C2A object — pretty simple huh? 
		context = canvas.getContext('2d'); 

		// Add an eventListener for the global keydown event 
		document.addEventListener('keydown', function(event) { 
			// Add the keyCode of this event to the global keyOn Array 
			// We can then easily check if a specific key is pressed by simply checking whether its keycode is set to true 
			keyOn[event.keyCode] = true; 
		}, false); 

		// Add another eventListener for the global keyup event 
		document.addEventListener('keyup', function(event) 	{ 
			// Set the keyCode of this event to false, to avoid an inifinite keydown appearance 
			keyOn[event.keyCode] = false; 
		}, false); 

		// Instantiate the basket object and feed it the required basketData 
		basket = new Basket(basketData); 

		// At the start of a new game, this method is called to set dynamic variables to their default values 
		resetGame(); 
	} 

	function resetGame() { 
		basket.resetPosition(); 
		basket.resetColor(); 
	} 
	function gameLoop() { 
		context.clearRect(0, 0, canvas.width, canvas.height); 

		basket.update(); 
	} 
	
	// The variable associated with the setInterval ID 
	var interval; 

	this.run = function() { 
		// Set the interval variable to the interval its ID so we can easily abort the game loop later 
		// The speed of the interval equals 30 frames per second, which should be enough to keep things running smoothly 
		interval = setInterval(gameLoop, 30/1000); 
	} 
}

var Block = function() { 

} 
  
var Health = function() { 

} 
  
var Score = function() { 

}

var Countable = function() { 

}

var basket; 
  
var basketData = [ 
    ['width', 30], // Width in pixels of the basket 
    ['height', 10], // Height in pixels of the basket 
    ['xSpeed', 1.1], // Horizontal movement speed in pixels 
    ['color', undefined], // The color of the basket 
    ['oldColor', undefined] // The old color of the basket, we can check against to prevent having the same basket color twice 
];

// This will hold the DOM object of our canvas element 
var canvas; 
  
// This will hold the Canvas 2D API object  
var context; 
  
// This object will hold pressed keys to check against 
var keyOn = []; 
  
function rand(min, max)  { 
    return Math.random() * (max-min) + min; 
}

// [object definitions] 
  
RGBCatcher = new function() { 
    // This is the object which holds our game-colors, the 'this' keyword is used to make it accessible from outside this function (aka a public property) 
    this.colors = [ 
        '#f00', // Red 
        '#0f0', // Green 
        '#00f', // Blue 
    ]; 
}


window.onload = function() 
{ 
	RGBCatcher.run(); 
}