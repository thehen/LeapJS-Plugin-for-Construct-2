// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Leap = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.Leap.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	window.leapRuntime = null;
	window.leapInst = null;
	window.hands = { data:{} };
	window.fingers = { data:{} };
	window.fingerPos = [];
	window.leapFrame = null;
	window.lastHandID = 0;
	window.lastFingerID = 0;

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		leapRuntime = this.runtime;
		leapInst = this;

		// Creates our Leap Controller
	    var controller = new Leap.Controller();

	    // Plugins
	    controller.use('handEntry');
	    controller.use('fingerEntry');
	    controller.use('screenPosition', {
		    scale: this.properties[0],
		    verticalOffset: this.properties[1]
		})

		controller.on('handFound',
			function(hand){
				lastHandID = hand.id;
				leapRuntime.trigger(cr.plugins_.Leap.prototype.cnds.OnHandEnter, leapInst);
			}
		)

		controller.on('handLost',			
			function(hand){
				lastHandID = hand.id;
				leapRuntime.trigger(cr.plugins_.Leap.prototype.cnds.OnHandExit, leapInst);
			}
		)

		controller.on('fingerFound',
			function(finger){
				lastFingerID = finger.id;
				leapRuntime.trigger(cr.plugins_.Leap.prototype.cnds.OnFingerEnter, leapInst);
			}
		)

		controller.on('fingerLost',
			function(finger){
				lastFingerID = finger.id;
				leapRuntime.trigger(cr.plugins_.Leap.prototype.cnds.OnFingerExit, leapInst);
			}
		)

		// Tells the controller what to do every time it sees a frame
		controller.on( 'frame' , function(frame){

			leapFrame = frame;
			hands.count = frame.hands.length;

			// Loop through all of the hands that the frame sees
			for( var i=0; i < hands.count; i++ ){
				
				// For each hand we define it
				var hand = frame.hands[i];

		        // and get its position, so that it can be passed through
		        // for drawing the connections
		        var handPos = hand.screenPosition();

		        var canvas = leapRuntime.canvas;
		        var layout = leapRuntime.running_layout;

		        var widthDivider;
		        var heightDivider;

		        if (canvas.width/leapRuntime.aspect_scale >= layout.width) {
		        	widthDivider = leapRuntime.aspect_scale;
		        	heightDivider = leapRuntime.aspect_scale;
		        } else {
		        	widthDivider = canvas.width / layout.width;
		        	heightDivider = canvas.height / layout.height;
		        }

				hands.data[hand.id] = { 
					posX: 		( handPos[0] / widthDivider ) - ( canvas.offsetLeft / widthDivider ),
					posY: 		( handPos[1] / heightDivider ) - ( canvas.offsetTop / heightDivider ),
					rotX: 		hand._rotation[2] * 90,
					rotY: 		hand._rotation[1] * 90,
					rotZ: 		hand._rotation[0] * 90,
					velX: 		hand.palmVelocity[0],
					velY: 		hand.palmVelocity[1],
				}

		        // Loop through all the fingers of the hand we are on
		        for( var j = 0; j < hand.fingers.length; j++ ){

					var finger = hand.fingers[j];
					var fingerPos = finger.screenPosition();

					fingers.data[finger.id] = { 
						posX: 		( fingerPos[0] / widthDivider ) - ( canvas.offsetLeft / widthDivider ),
						posY: 		( fingerPos[1] / heightDivider ) - ( canvas.offsetTop / heightDivider ),
						velX: 		finger.tipVelocity[0],
						velY: 		finger.tipVelocity[1]
					}
		        }

			}
	    });

	    // Get frames rolling by connecting the controller
	    controller.connect();

	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": [
				// Each property entry can use the following values:
				// "name" (required): name of the property (must be unique within this section)
				// "value" (required): a boolean, number or string for the value
				// "html" (optional, default false): set to true to interpret the name and value
				//									 as HTML strings rather than simple plain text
				// "readonly" (optional, default false): set to true to disable editing the property
				
				// Example:
				// {"name": "My property", "value": this.myValue}
			]
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	Cnds.prototype.OnHandEnter = function ( handID )
	{
		return true;
	};

	Cnds.prototype.OnHandExit = function ( handID )
	{
		return true;
	};

	Cnds.prototype.OnFingerEnter = function ( handID )
	{
		return true;
	};

	Cnds.prototype.OnFingerExit = function ( handID )
	{
		return true;
	};

	// ... other conditions here ...
	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// the example action
	Acts.prototype.MyAction = function (myparam)
	{
		// alert the message
		alert(myparam);
	};
	
	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	Exps.prototype.HandCount = function (ret)
	{
		if (hands.count)
			ret.set_int(hands.count);
		else
			ret.set_int(0);
	};

	Exps.prototype.LastHandID = function (ret)
	{
		ret.set_float(lastHandID);
	};

	Exps.prototype.HandX = function (ret)
	{	
		if (hands.data[0])
			ret.set_float(hands.data[0].posX);
		else
			ret.set_float(0);
	};

	Exps.prototype.HandY = function (ret)
	{
		if (hands.data[0])
			ret.set_float(hands.data[0].posY);
		else
			ret.set_float(0);
	};

	Exps.prototype.HandXAt = function (ret, index)
	{	
		index = Math.floor(index);
		if (index >= 0 && index <= Object.keys(hands.data).length)
			ret.set_float(hands.data[index].posX);
		else
			ret.set_float(0);
	};	

	Exps.prototype.HandYAt = function (ret, index)
	{
		index = Math.floor(index);
		if (index >= 0 && index <= Object.keys(hands.data).length)
			ret.set_float(hands.data[index].posY);
		else
			ret.set_float(0);
	};	

	Exps.prototype.HandXForID = function (ret, id)
	{
		if (hands.data[id]) {
			ret.set_float(hands.data[id].posX);
		} else {
			ret.set_float(0);
		}
	};

	Exps.prototype.HandYForID = function (ret, id)
	{
		if (hands.data[id]) {
			ret.set_float(hands.data[id].posY);
		} else {
			ret.set_float(0);
		}
	};

	Exps.prototype.FingerX = function (ret)
	{	
		if (fingers.data[0])
			ret.set_float(fingers.data[0].posX);
		else
			ret.set_float(0);
	};

	Exps.prototype.FingerY = function (ret)
	{	
		if (fingers.data[0])
			ret.set_float(fingers.data[0].posY);
		else
			ret.set_float(0);
	};

	Exps.prototype.FingerXAt = function (ret, index)
	{	
		index = Math.floor(index);
		if (index >= 0 && index <= Object.keys(fingers.data).length)
			ret.set_float(fingers.data[index].posX);
		else
			ret.set_float(0);
	};	

	Exps.prototype.FingerYAt = function (ret, index)
	{
		index = Math.floor(index);
		if (index >= 0 && index <= Object.keys(fingers.data).length)
			ret.set_float(fingers.data[index].posY);
		else
			ret.set_float(0);
	};	

	Exps.prototype.FingerXForID = function (ret, id)
	{
		if (fingers.data[id]) {
			ret.set_float(fingers.data[id].posX);
		} else {
			ret.set_float(0);
		}
	};

	Exps.prototype.FingerYForID = function (ret, id)
	{
		if (fingers.data[id]) {
			ret.set_float(fingers.data[id].posY);
		} else {
			ret.set_float(0);
		}
	};

	Exps.prototype.LastFingerID = function (ret)
	{
		ret.set_float(lastFingerID);
	};

	pluginProto.exps = new Exps();

}());