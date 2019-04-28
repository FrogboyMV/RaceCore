//=============================================================================
// Frogboy RMMV Plugin
// FROG_RaceCore.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_Races = true;

var FROG = FROG || {};
FROG.Races = FROG.Races || {};

/*:
 * @plugindesc v2.0 Adds Races to RPG Maker MV
 * @author Frogboy
 *
 * @help
 * Adds Races to RPG Maker MV v2.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV doesn’t have official support for races like other games such 
 * as Dungeons & Dragons and Pathfinder RPG.  Well, I’m here to fix that.  
 * Races have been a part of RPGs since the beginning and a good solid core is
 * needed to not only create this feature but to extend its capabilities in the
 * future.  Version 2.0 adds some nice functionality to the plugin that allows 
 * it to be useful on its own while still working with the other plugins I made 
 * to extend functionality.  A Class template can be assigned to each race to 
 * customize your actors with stat adjustments, Traits and bonus Skills.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * Just install the plugin and fill in the plugin parameters.  If you also
 * install Yanfly’s Core Engine and Status Menu Core, you’ll more easily be 
 * able to see the adjustments to stats, elemental resistances and weaknesses 
 * and all of the extra attributes each character has.
 *
 * Parameters
 *
 * This is a plugin for races so, of course, you’ll need a parameter to define
 * them for your game.  At the moment, the name is really all you need to
 * define.  I have plans to incorporate the rest of the information in one or
 * more other plugins but I can’t say for sure when those will be completed.
 *
 * Races
 *    Name - The name of a race.
 *    Class Id - Class template this race inherits.  These work a lot like 
 *        assigning a second Class to an Actor.  They gain all of the Traits
 *        assigned and gain Skills at the indicated level.  Parameters like
 *        Attack, Defense etc can also add to the Actor but you have to define
 *        a baseline number to represent a zero adjustment.  This was done so
 *        that you can define penalties as well as bonuses to your racial stats.
 *    General - General description about this race.  This will be used as sort
 *        of an intro blurb.
 *    Physical Description - Physical description about this race.  This should
 *        describe the physical characteristics of a typical member of this
 *        race.
 *    Society - Information about how this race typically interacts with other
 *        races.
 *    Alignment and Religion - Moral and religious information of the typical
 *        member of this race.  This describes which gods or religions this
 *        race typically follows and what they general alignment usually is.
 *        Individual members of this race obviously can vary from the norm.
 *    Adventurers - Information about how and why members of this race become
 *        adventurers.
 *
 * Actor Config
 *    Description - Description so you know what this entry is. Recommended
 *       but not required.
 *    Actor Id - Actor that these properties apply to.
 *    Initial Race - Name of the race that this actor starts as.
 *
 * Param Baseline - Baseline value that equals zero change to stats.  Some 
 * races are stronger than others.  Some are weaker.  Some are faster.  The 
 * default value is set to 100.  What this means is that any param value that 
 * equals 100 will make no racial adjustment for that stat.  A value of 120 
 * defined from levels 1-99 would always grant a static +20 bonus to the 
 * corresponding stat.  A value of 80 defined from levels 1-99 would always 
 * grant a static -20 penalty to the corresponding stat.  You can also define 
 * a curve that slopes up or down for a gradually increasing bonus or penalty 
 * as the Actor advances in level.  The plugin code is just subtracting the 
 * number you provide here from the race’s Class template’s defined params to 
 * generate a bonus or penalty.
 *
 * Adjust Parameters - This is just a quick on/off switch for racial parameter 
 * adjustments. Working with RPG Maker’s Class parameter curves can be annoying
 * and cumbersome.  Often times, it’s just much easier to grant races Traits 
 * that work in percentages.  Assigning a Half-Giant a racial Trait to Attack
 * of 125% and a racial Trait to Speed of 75% is just plain easier and might be 
 * exactly what you want.  I wanted to give you an easy way to just shut this
 * off if you aren’t using it so that you don’t have to mess with the params if 
 * you’re not using this feature.
 *
 * Save Races Object - Setting this to true allows you to modify the $dataRaces
 * object, which contains all of the information within the plugin parameters,
 * when the player saves the game.  By default, this object is built from the
 * plugin parameters when a new game is started or a saved game is loaded. This
 * is usually what you’ll want.  If, for some reason, you need need to alter
 * this data in-game and have those changes persist until the end of the game,
 * you’ll need to turn this option on.
 *
 * ============================================================================
 * Script and Plugin Commands
 * ============================================================================
 *
 * These commands will allow you to assign races to actors and to retrieve
 * information about the actor’s race.
 *
 * Script Commands to get and set a race
 *    FROG.Races.getRace(actorId);
 *    FROG.Races.getId(actorId);
 *    FROG.Races.getName(actorId);
 *    FROG.Races.getGeneral(actorId);
 *    FROG.Races.getSociety(actorId);
 *    FROG.Races.getReligion(actorId);
 *    FROG.Races.getAdventurers(actorId);
 *    FROG.Races.setRace(actorId, raceId);
 *
 * Plugin Commands to get and set a race (Don't include the brackets)
 * The Type is piece of information that you want to retrieve.  This can be
 * ID, NAME, GENERAL, SOCIETY, RELIGION or ADVENTURERS
 *    GETRACE [type] [actorId] [variableId]
 *    SETRACE [actorId] [raceId]
 *
 * Examples
 *
 * Get the Race ID of Actor 1 and store it in variable 5
 * GETRACE ID 1 5
 *
 * Get the Race name of Actor 4 and store it in variable 12
 * GETRACE NAME 4 12
 *
 * Store the Actor’s ID in variable 6 and then store the race name in variable
 * 7.  All parameters can utilize the v[x] variable reference notation.
 * GETRACE NAME v[6] 7
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * This plugin can be used in commercial or non-commercial projects.  If you
 * are a plugin developer, feel free to write add-ons for this if you want
 * to extend its functionality.
 *
 * Credit Frogboy in your work.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0.0 - Initial release
 * Version 2.0.0 - Added Class templates and allow Actors to start with a race.
 *
 * ============================================================================
 *
 * @param Settings
 *
 * @param Races
 * @parent Settings
 * @type struct<raceStruct>[]
 * @desc Define races to use in your game.
 * @default ["{\"Name\":\"Human\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Celestial\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Demonic\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Dwarf\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Elf\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Half-dragon\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Half-elf\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Half-orc\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Halfling\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}","{\"Name\":\"Gnome\",\"General\":\"\",\"Physical Description\":\"\",\"Society\":\"\",\"Alignment and Religion\":\"\",\"Adventurers\":\"\"}"]
 *
 * @param Actor Config
 * @parent Settings
 * @type struct<actorConfigStruct>[]
 * @desc Define races that your actors are initialized with.
 * @default []
 *
 * @param Param Baseline
 * @parent Settings
 * @type number
 * @desc Baseline value that equals 0 change to stats
 * @default 100
 * @min 1
 * @max 999
 *
 * @param Adjust Parameters
 * @parent Settings
 * @type boolean
 * @desc Use Param Baseline to adjust params by race.
 * @default false
 * @on Yes
 * @off No
 *
 * @param Save Races Object
 * @parent Settings
 * @type boolean
 * @desc Changes to $dataRaces can be changed in-game and are persisted.
 * @default false
 * @on Yes
 * @off No
 */
/*~struct~raceStruct:
 * @param Name
 * @type string
 * @desc The name of a Race that exists in your world.
 *
 * @param Class Id
 * @type class
 * @desc Class template this race inherits.
 * @default 0
 *
 * @param General
 * @type note
 * @desc General description about this race.
 *
 * @param Physical Description
 * @type note
 * @desc Physical description about this race.
 *
 * @param Society
 * @type note
 * @desc Information about how this race typically interacts with other races.
 *
 * @param Alignment and Religion
 * @type note
 * @desc Moral and religious information of the typical member of this race.
 *
 * @param Adventurers
 * @type note
 * @desc Information about how and why members of this race become adventurers.
 */
/*~struct~actorConfigStruct:
 * @param Description
 * @type text
 * @desc Description so you know what this entry is. Recommended but not required.
 *
 * @param Actor Id
 * @type actor
 * @desc Actor that these properties apply to.
 * @default 0
 *
 * @param Initial Race
 * @type text
 * @desc Name of the race that this actor starts as.
 * @default
 */

var $dataRaces = {};
FROG.Core.jsonParams(PluginManager.parameters('FROG_RaceCore'), $dataRaces);
$dataRaces.races = $dataRaces.races || [];
$dataRaces.actorConfig = $dataRaces.actorConfig || [];
$dataRaces.races.unshift(null);
$dataRaces.statBaseline = $dataRaces.statBaseline || 100;


/* ---------------------------------------------------------------*\
							Data Manager
\* -------------------------------------------------------------- */

// Save File
FROG.Races.DataManager_MakeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	var contents = FROG.Races.DataManager_MakeSaveContents.call(this);
	if ($dataRaces.saveRacesObject === true) {
		contents.races = $dataRaces;
	}
	return contents;
}

// Load File
FROG.Races.DataManager_ExtractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	FROG.Races.DataManager_ExtractSaveContents.call(this, contents);
	if ($dataRaces.saveRacesObject === true) {
		$dataRaces = contents.races;
	}
}

/* ---------------------------------------------------------------*\
						Game Actor
\* -------------------------------------------------------------- */

FROG.Races.Game_Actor_Setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
	FROG.Races.Game_Actor_Setup.call(this, actorId);
	this.setupActorRace(true, 0);
}

// Adjust static paramters based on an actor's race/class template
if ($dataRaces.adjustParameters) {
	FROG.Races.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
	Game_Actor.prototype.paramPlus = function (paramId) {
		var value = FROG.Races.Game_Actor_paramPlus.call(this, paramId);
		var classTemplate = $dataClasses[this._race && this._race.classId || 0];
		
		if (classTemplate) {
			value += (classTemplate.params[paramId][this._level] - $dataRaces.paramBaseline);
		}

		return value;
	}
}

// Called everytime the engine checks for traits which is prety much all the time.
FROG.Races.Game_Actor_allTraits = Game_Actor.prototype.allTraits;
Game_Actor.prototype.allTraits = function() {
	FROG.Races.traits = FROG.Races.Game_Actor_allTraits.call(this);
	if (this._race && this._race.staticTraits) {
		FROG.Races.traits = FROG.Races.traits.concat(this._race.staticTraits);
	}
	return FROG.Races.traits;
}

// Gain skills from race template on level up
FROG.Races.Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
	FROG.Races.traits = FROG.Races.Game_Actor_levelUp.call(this);
	this.learnRaceSkills();
}

// Setup Actor Race object
Game_Actor.prototype.setupActorRace = function (isInit, raceId) {
	var self = this;
	var race = {};
	var classTemplate = {};
	var traits = [];
	raceId = raceId || 0;

	var actorConfig = $dataRaces.actorConfig.find(function (config) {
		return config.actorId === self.actorId() && config.initialRace;
	});

	if (actorConfig) {
		if (isInit) {
			raceId = $dataRaces.races.findIndex(function (race) {
				return race && race.name.toLowerCase() == actorConfig.initialRace.toLowerCase();
			});
		}

		race = $dataRaces.races[raceId] || {};
		classTemplate = $dataClasses[race.classId || 0] || {};
		traits = classTemplate.traits || [];
	}

	this.forgetRaceSkills();

	// Assign race
	this._race = {
		id: raceId,
		classId: race.classId || 0,
		staticTraits: traits,
		traits: []
	}

	this.learnRaceSkills();
    this.recoverAll();
}

// Gain or lose skills from race template
Game_Actor.prototype.adjustRaceSkills = function (mode) {
	var classTemplate = $dataClasses[this._race && this._race.classId || 0];

	if (classTemplate) {
		classTemplate.learnings.forEach(function (learning) {
        	if (learning.level <= this._level) {
				(mode == "forget")
					? this.forgetSkill(learning.skillId)
					: this.learnSkill(learning.skillId);
        	}
    	}, this);
	}
}

// Lose race skill
Game_Actor.prototype.forgetRaceSkills = function() {
	this.adjustRaceSkills("forget");
}

// Gain race skill
Game_Actor.prototype.learnRaceSkills = function() {
	this.adjustRaceSkills("learn");
}

// Returns an actor's race id
Game_Actor.prototype.raceId = function () {
	return this._race && ~~this._race.id;
}

/* ---------------------------------------------------------------*\
						Script Calls
\* -------------------------------------------------------------- */

/** Get an actor's race object
 * @param {number} actorId - The ID of an actor (required)
 * @returns {object} Returns an actor's race object
 */
FROG.Races.getRace = function (actorId) {
	var r = null;
	if (isNaN(actorId) === false && actorId > 0) {
		var actor = $gameActors.actor(actorId);
		if (actor && actor._race && actor.raceId()) {
			r = $dataRaces.races[actor.raceId()];
		}
	}
	return r;
}

/** Get an actor's race id
 * @param {number} actorId - The ID of an actor (required)
 * @returns {number} Returns an actor's race id
 */
FROG.Races.getId = function (actorId) {
	var r = "";
	if (isNaN(actorId) === false && actorId > 0) {
		var actor = $gameActors.actor(actorId);
		if (actor) {
			r = actor.raceId();
		}
	}
	return r;
}

/** Get a race property
 * @param {number} actorId - The ID of an actor (required)
 * @param {string} prop - The race property name desired (required)
 * @returns {string} Returns an actor's race name
 */
FROG.Races.getProp = function (actorId, prop) {
	if (~~actorId && prop) {
		var actor = $gameActors.actor(actorId);
		if (actor && actor._race && actor.raceId()) {
			return $dataRaces.races[actor.raceId()][prop];
		}
	}
	return "";
}

/** Get an actor's race name
 * @param {number} actorId - The ID of an actor (required)
 * @returns {string} Returns an actor's race name
 */
FROG.Races.getName = function (actorId) {
	return FROG.Races.getProp(actorId, "name");
}

/** Get an actor's General race info
 * @param {number} actorId - The ID of an actor (required)
 * @returns {string} Returns an actor's race name
 */
FROG.Races.getGeneral = function (actorId) {
	return FROG.Races.getProp(actorId, "general");
}

/** Get an actor's Physical race info
 * @param {number} actorId - The ID of an actor (required)
 * @returns {string} Returns an actor's race name
 */
FROG.Races.getPhysical = function (actorId) {
	return FROG.Races.getProp(actorId, "physical");
}

/** Get an actor's Society race info
 * @param {number} actorId - The ID of an actor (required)
 * @returns {string} Returns an actor's race name
 */
FROG.Races.getSociety = function (actorId) {
	return FROG.Races.getProp(actorId, "society");
}

/** Get an actor's Religion race info
 * @param {number} actorId - The ID of an actor (required)
 * @returns {string} Returns an actor's race name
 */
FROG.Races.getReligion = function (actorId) {
	return FROG.Races.getProp(actorId, "religion");
}

/** Get an actor's Adventurers race info
 * @param {number} actorId - The ID of an actor (required)
 * @returns {string} Returns an actor's race name
 */
FROG.Races.getAdventurers = function (actorId) {
	return FROG.Races.getProp(actorId, "adventurers");
}

/** Set an actor's race
 * @param {number} actorId - The ID of an actor (required)
 * @param {number} race - The Race ID that you want to set (required)
 * @returns {string} Returns true if it worked, false if it didn't
 */
FROG.Races.setRace = function (actorId, raceId) {
	var bOk = false;
	if (~~actorId && ~~raceId) {
		var actor = $gameActors.actor(actorId);
		if (actor) {
			actor.setupActorRace(false, ~~raceId);
			/*actor._race = {
				id: ~~raceId
			}*/
			bOk = true;
		}
	}
	return bOk;
}

/* ---------------------------------------------------------------*\
						Plugin Commands
\* -------------------------------------------------------------- */

// Add new plugin commands
FROG.Races.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	FROG.Races.Game_Interpreter_PluginCommand.call(this, command, args);

	// arg[0] = actorId, arg[1] = raceId
	if (command.trim().toUpperCase() === 'SETRACE' && args[0] && args[1]) {
		var a0 = FROG.Core.formatArg(args[0]);
		var a1 = FROG.Core.formatArg(args[1]);
		FROG.Races.setRace(a0, a1);
	}

	// args: 0 = type (ID or NAME), 1 = actorId, 2 = variableId to store the race info
	if (command.trim().toUpperCase() === 'GETRACE' && args[0] && args[1] && args[2]) {
		var a0 = FROG.Core.formatArg(args[0]);
		var a1 = FROG.Core.formatArg(args[1]);
		var a2 = FROG.Core.formatArg(args[2]);

		switch (args[0].toUpperCase()) {
			case "ID":
				$gameVariables.setValue(a2, FROG.Races.getId(a1));
				break;
			case "NAME":
				$gameVariables.setValue(a2, FROG.Races.getName(a1));
				break;
			case "GENERAL":
				$gameVariables.setValue(a2, FROG.Races.getGeneral(a1));
				break;
			case "PHYSICAL":
				$gameVariables.setValue(a2, FROG.Races.getPhysical(a1));
				break;
			case "SOCIETY":
				$gameVariables.setValue(a2, FROG.Races.getSociety(a1));
				break;
			case "RELIGION":
				$gameVariables.setValue(a2, FROG.Races.getReligion(a1));
				break;
			case "ADVENTURERS":
				$gameVariables.setValue(a2, FROG.Races.getAdventurers(a1));
				break;
		}
	}
}
