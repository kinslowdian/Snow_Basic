var trace = function(msg){ console.log(msg); };

var viewer;

var display;
var sky;
var lib;

var max;

var flakeARR;

var Flake = function()
{

}

Flake.prototype.build = function(n)
{
	// SOURCE & NAME
	this.html = getAsset("snow");
	this.instanceName = 'flake_' + n;
	this.arrayRef = n;

	// BASIC
	this.dimensions = Math.round(Math.random() * (12 - 1) + 1);
	this.weight = Math.round(Math.random() * (100 - 4) + 4) / 100;

	// X & Y
	this.positioning 		= {};
	this.positioning.x 	= Math.round(Math.random() * viewer.w);
	this.positioning.y = Math.round(Math.random() * ((viewer.h - 10) - 10) + 10);

	this.duration = Math.round(Math.random() * (12000 - 4000) + 4000);
};

Flake.prototype.reference = function ()
{
	this.snowMain		= document.querySelector('.' + this.instanceName);

	this.snowOuter 	= this.snowMain.querySelector(".snow-container");
	this.snowInner 	= this.snowMain.querySelector(".snow-container .snow");
};

Flake.prototype.birth = function()
{

	this.snowMain.style.width 		= this.dimensions + 'px';
	this.snowMain.style.transform = 'translate(' + this.positioning.x + 'px, ' + this.positioning.y + 'px)';

	this.snowOuter.style.animationDuration = this.duration + 'ms';

	this.snowInner.style.width 		= this.dimensions + 'px';
	this.snowInner.style.height 	= this.dimensions + 'px';
};

function basicSnow_init(event)
{
	viewer = {};
	viewer.w = screen.width;
	viewer.h = screen.height;

	display = document.querySelector("#display");
	sky 		= display.querySelector(".sky");
	lib 		= document.querySelector(".lib");

	basicSnow_create();
}

function basicSnow_create()
{
	var particleHTML = "";

	max = 300;

	flakeARR = new Array();

	for(var i = 0; i < max; i++)
	{
		var snow = new Flake();

		snow.build(i);

		particleHTML += snow.html;

		flakeARR.push(snow);
	}

	sky.innerHTML = particleHTML;

	for(var j = 0; j < flakeARR.length; j++)
	{
		var snowGet = sky.children[j];

		snowGet.classList.add(flakeARR[j].instanceName);

		flakeARR[j].reference();
		flakeARR[j].birth();
	}
}

function getAsset(str)
{
	var html = "";

	html = lib.querySelector('.lib-' + str).innerHTML;

	return html;
}
