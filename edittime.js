function GetPluginSettings()
{
	return {
		"name":			"Leap Motion",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"Leap",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Adds Leap Motion support",
		"author":		"Henry Hoffman",
		"help url":		"",
		"category":		"Input",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		'flags':		pf_singleglobal,		// exists project-wide, e.g. mouse, keyboard.  'type' must be 'object'.
		'dependency':   'leap.min.js;leap-plugins-0.1.1.min.js;leap-fingerEntry.js'
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name
				
// example				
//AddNumberParam("Number", "Enter a number to test if positive.");


AddCondition( 0, 	cf_trigger, 	"On any hand enter frame", 		"Hands", 	"On any hand enter frame", 		"Triggered when any hand enters the frame.", 	"OnHandEnter");
AddCondition( 1, 	cf_trigger, 	"On any hand exit frame", 		"Hands", 	"On any hand exit frame", 		"Triggered when any hand exits the frame.", 	"OnHandExit");
AddCondition( 2, 	cf_trigger, 	"On any finger enter frame", 	"Fingers", 	"On any finger enter frame",	"Triggered when any finger enters the frame.", 	"OnFingerEnter");
AddCondition( 3, 	cf_trigger, 	"On any finger exit frame", 	"Fingers", 	"On any finger exit frame", 	"Triggered when any finger exits the frame.", 	"OnFingerExit");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
//AddStringParam("Message", "Enter a string to alert.");
//AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example



AddExpression(	0, 	ef_deprecated, 		"Hand X position", 							"Hand", 	"HandX", 		"Get the primary hand X position.");
AddExpression(	1, 	ef_deprecated, 		"Hand Y position", 							"Hand", 	"HandY", 		"Get the primary hand Y position.");
AddExpression(	2, 	ef_deprecated, 		"Hand Z position", 							"Hand", 	"HandZ", 		"Get the primary hand Z position.");

AddNumberParam(	"Index", "Zero-based index of the hand to get.");
AddExpression(	3, 	ef_deprecated, 		"Hand X position at zero-based index", 		"Hand", 	"HandXAt", 		"Get a hand X co-ordinate from a zero-based index of the touch.");

AddNumberParam( "Index", "Zero-based index of the hand to get.");
AddExpression(	4, 	ef_deprecated, 		"Hand Y position at zero-based index", 		"Hand", 	"HandYAt", 		"Get a hand Y co-ordinate from a zero-based index of the touch.");

AddNumberParam( "Index", "Zero-based index of the hand to get.");
AddExpression(	5, 	ef_deprecated, 		"Hand Z position at zero-based index", 		"Hand", 	"HandZAt", 		"Get a hand Z co-ordinate from a zero-based index of the touch.");

AddExpression(	6, 	ef_return_number, 	"Number of current hands", 					"Hand", 	"HandCount", 	"Get the number of current hands.");

AddExpression(	7, 	ef_return_number, 	"Last hand ID", 							"Hand", 	"LastHandID", 	"Get the unique ID of the last hand to enter or exit the frame.");

AddNumberParam("ID", "Unique identifier of the hand to get.");
AddExpression(	8, 	ef_return_number, 	"Hand X position at ID", 					"Hand", 	"HandXForID", 	"Get the primary hand X position at an ID.");

AddNumberParam("ID", "Unique identifier of the hand to get.");
AddExpression(	9, 	ef_return_number, 	"Hand Y  at ID", 							"Hand", 	"HandYForID", 	"Get the primary hand Y position at an ID.");

AddNumberParam("ID", "Unique identifier of the hand to get.");
AddExpression(	10, ef_deprecated, 		"Hand Z position at ID", 					"Hand", 	"HandZForID", 	"Get the primary hand Z position at an ID.");

AddExpression(	11, ef_return_number, 	"Number of current fingers", 				"Fingers", 	"FingerCount", 	"Get the number of current fingers.");

AddExpression(	12, ef_deprecated, 		"Finger X position", 						"Fingers", 	"FingerX", 		"Get the primary finger X position.");
AddExpression(	13, ef_deprecated, 		"Finger Y position", 						"Fingers", 	"FingerY", 		"Get the primary finger Y position.");
AddExpression(	14, ef_deprecated, 		"Finger Z position", 						"Fingers", 	"FingerZ", 		"Get the primary finger Z position.");

AddNumberParam(	"Index", "Zero-based index of the finger to get.");
AddExpression(	15, ef_deprecated, 		"Finger X position at zero-based index", 	"Fingers", 	"FingerXAt", 	"Get a finger X co-ordinate from a zero-based index of the touch.");

AddNumberParam( "Index", "Zero-based index of the finger to get.");
AddExpression(	16, ef_deprecated, 		"Finger Y position at zero-based index", 	"Fingers", 	"FingerYAt", 	"Get a finger Y co-ordinate from a zero-based index of the touch.");

AddNumberParam( "Index", "Zero-based index of the finger to get.");
AddExpression(	17, ef_deprecated, 		"Finger Z position at zero-based index", 	"Fingers", 	"FingerZAt", 	"Get a finger Z co-ordinate from a zero-based index of the touch.");

AddExpression(	18, ef_return_number, 	"Last finger ID", 							"Fingers", 	"LastFingerID", "Get the unique ID of the last finger to enter or exit the frame.");

AddNumberParam("ID", "Unique identifier of the finger to get.");
AddExpression(	19, ef_return_number, 	"Finger X position at ID", 					"Fingers", 	"FingerXForID", "Get the primary finger X position at an ID.");

AddNumberParam("ID", "Unique identifier of the finger to get.");
AddExpression(	20, ef_return_number, 	"Finger Y  at ID", 							"Fingers", 	"FingerYForID", "Get the primary finger Y position at an ID.");

AddNumberParam("ID", "Unique identifier of the finger to get.");
AddExpression(	21, ef_deprecated, 		"Finger Z position at ID", 					"Fingers", 	"FingerZForID", "Get the primary finger Z position at an ID.");


////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	new cr.Property(ept_float, 	"Stage scale",		0.8,		"The scale of the stage"),
	new cr.Property(ept_float, 	"Vertical Offset",	600,		"The vertical offset of the Y axis")
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}