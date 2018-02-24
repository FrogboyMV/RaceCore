//=============================================================================
// Frogboy RMMV Plugin
// FROG_RaceCore.js
//=============================================================================

var Imported = Imported || {};
Imported.FROG_Races = true;

var FROG = FROG || {};
FROG.Races = FROG.Races || {};

/*:
 * @plugindesc v1.0 Adds Races to RPG Maker MV
 * @author Frogboy
 *
 * @help
 * Adds Races to RPG Maker MV v1.0
 * Author Frogboy
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV doesn’t have official support for races like other games such
 * as Dungeons & Dragons and Pathfinder RPG.  Well, I’m here to fix that. Races
 * have been a part of RPGs since the beginning and a good solid core is needed
 * to not only create this feature but to extend its capabilities in the
 * future.
 *
 * ============================================================================
 * How to Use
 * ============================================================================
 *
 * This plugin doesn’t really do all that much on its own.  It allows you to
 * define and describe the different races that you’ll use in your game but all
 * of the extra functionality like stat adjustments and special abilities will
 * be added as extension plugins so that you can pick and choose what you want
 * in your game and what you don’t.
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
 * This plugin can be used in commercial or non-commercial projects.  You also 
 * have my permission to write and share plugins that add to or extend the 
 * functionality of this plugin.
 *
 * Credit Frogboy in your work.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.0 - Initial release
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
var $dataRaces = [];

(function() {
	FROG.Races.prm = PluginManager.parameters('FROG_RaceCore');
	FROG.Races.races = (FROG.Races.prm['Races']) ? JSON.parse(FROG.Races.prm['Races']) : [];
	FROG.Races.saveRacesObject = (FROG.Races.prm['Save Races Object'] === "true");

	/* ---------------------------------------------------------------*\
								Data Manager
	\* -------------------------------------------------------------- */

    FROG.Races.DataManager_IsDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!FROG.Races.DataManager_IsDatabaseLoaded.call(this)) return false;

		// Construct $dataRaces object
		$dataRaces = [];
        $dataRaces.push(null);
        for (var i in FROG.Races.races) {
            var robj = JSON.parse(FROG.Races.races[i]);
			var obj = {
				name: (robj["Name"]) ? robj["Name"].trim() : "Unnamed Race",
				info: {
					general: FROG.Races.formatNote(robj["General"]),
					physical: FROG.Races.formatNote(robj["Physical Description"]),
					society: FROG.Races.formatNote(robj["Society"]),
					religion: FROG.Races.formatNote(robj["Alignment and Religion"]),
					adventurers: FROG.Races.formatNote(robj["Adventurers"])
				}
			};

            $dataRaces.push(obj);
        }

		return true;
	}

	// Save File
    FROG.Races.DataManager_MakeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function() {
        var contents = FROG.Races.DataManager_MakeSaveContents.call(this);
		if (FROG.Races.saveRacesObject === true) {
			contents.races = $dataRaces;
		}
	    return contents;
	}

	// Load File
	FROG.Races.DataManager_ExtractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
        FROG.Races.DataManager_ExtractSaveContents.call(this, contents);
		if (FROG.Races.saveRacesObject === true) {
	    	$dataRaces = contents.races;
		}
	}

	FROG.Races.formatNote = function (note) {
		var r = "";
		if (note) {
			r = note.replace(/\\n/g, String.fromCharCode(10)).slice(1, -1);
		}
		return r;
	}
	/* ---------------------------------------------------------------*\
							Game Actor
	\* -------------------------------------------------------------- */

	FROG.Races.Game_Actor_InitMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		FROG.Races.Game_Actor_InitMembers.call(this);

		this._race = {
			id: 0
		}
	}

	// Returns an actor's race id
	Game_Actor.prototype.raceId = function () {
		return (this._race && this._race.id) ? this._race.id : 0;
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
				r = $dataRaces[actor.raceId()];
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

	/** Get an actor's race name
	 * @param {number} actorId - The ID of an actor (required)
	 * @returns {string} Returns an actor's race name
	 */
	FROG.Races.getName = function (actorId) {
		var r = "";
		if (isNaN(actorId) === false && actorId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor && actor._race && actor.raceId()) {
				r = $dataRaces[actor.raceId()].name;
			}
		}
		return r;
	}

	/** Get an actor's General race info
	 * @param {number} actorId - The ID of an actor (required)
	 * @returns {string} Returns an actor's race name
	 */
	FROG.Races.getGeneral = function (actorId) {
		var r = "";
		if (isNaN(actorId) === false && actorId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor && actor._race && actor.raceId()) {
				r = $dataRaces[actor.raceId()].info.general;
			}
		}
		return r;
	}

	/** Get an actor's Physical race info
	 * @param {number} actorId - The ID of an actor (required)
	 * @returns {string} Returns an actor's race name
	 */
	FROG.Races.getPhysical = function (actorId) {
		var r = "";
		if (isNaN(actorId) === false && actorId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor && actor._race && actor.raceId()) {
				r = $dataRaces[actor.raceId()].info.physical;
			}
		}
		return r;
	}

	/** Get an actor's Society race info
	 * @param {number} actorId - The ID of an actor (required)
	 * @returns {string} Returns an actor's race name
	 */
	FROG.Races.getSociety = function (actorId) {
		var r = "";
		if (isNaN(actorId) === false && actorId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor && actor._race && actor.raceId()) {
				r = $dataRaces[actor.raceId()].info.society;
			}
		}
		return r;
	}

	/** Get an actor's Religion race info
	 * @param {number} actorId - The ID of an actor (required)
	 * @returns {string} Returns an actor's race name
	 */
	FROG.Races.getReligion = function (actorId) {
		var r = "";
		if (isNaN(actorId) === false && actorId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor && actor._race && actor.raceId()) {
				r = $dataRaces[actor.raceId()].info.religion;
			}
		}
		return r;
	}

	/** Get an actor's Adventurers race info
	 * @param {number} actorId - The ID of an actor (required)
	 * @returns {string} Returns an actor's race name
	 */
	FROG.Races.getAdventurers = function (actorId) {
		var r = "";
		if (isNaN(actorId) === false && actorId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor && actor._race && actor.raceId()) {
				r = $dataRaces[actor.raceId()].info.adventurers;
			}
		}
		return r;
	}

	/** Set an actor's race
	 * @param {number} actorId - The ID of an actor (required)
	 * @param {number} race - The Race ID that you want to set (required)
	 * @returns {string} Returns true if it worked, false if it didn't
	 */
	FROG.Races.setRace = function (actorId, raceId) {
		var bOk = false;
		if (isNaN(actorId) === false && actorId > 0 && raceId > 0) {
			var actor = $gameActors.actor(actorId);
			if (actor) {
				actor._race = {
					id: parseInt(raceId)
				}
				bOk = true;
			}
		}
		return bOk;
	}

	/* ---------------------------------------------------------------*\
							Plugin Commands
	\* -------------------------------------------------------------- */

	/** Formats plugin parameters so that you can use variables in place of hard-coded values
	 * @param {string} arg - A plugin parameter (required)
	 * @returns {string} Returns the argument back but will convert any v[id] to the stored variable value
	 */
	FROG.Races.formatArg = function (arg) {
		if (arg && arg.substr(0, 2) == "v[") {
			var varId = parseInt(arg.replace("v[", "").replace("]", ""));
			if (!isNaN(varId)) {
				return $gameVariables.value(varId);
			}
		}
		return arg;
	}

	// Add new plugin commands
	FROG.Races.Game_Interpreter_PluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	    FROG.Races.Game_Interpreter_PluginCommand.call(this, command, args);
		var fr = FROG.Races;

		// arg[0] = actorId, arg[1] = raceId
	    if (command.trim().toUpperCase() === 'SETRACE' && args[0] && args[1]) {
			var a0 = fr.formatArg(args[0]);
			var a1 = fr.formatArg(args[1]);
			FROG.Races.setRace(a0, a1);
		}

		// args: 0 = type (ID or NAME), 1 = actorId, 2 = variableId to store the race info
		if (command.trim().toUpperCase() === 'GETRACE' && args[0] && args[1] && args[2]) {
			var a0 = fr.formatArg(args[0]);
			var a1 = fr.formatArg(args[1]);
			var a2 = fr.formatArg(args[2]);

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
})();
