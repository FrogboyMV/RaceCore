# Race Core v1.0

## Introduction

RPG Maker MV doesn’t have official support for races like other games such as Dungeons & Dragons and Pathfinder RPG.  Well, I’m here to fix that.  Races have been a part of RPGs since the beginning and a good solid core is needed to not only create this feature but to extend its capabilities in the future.


## How to Use

This plugin doesn’t really do all that much on its own.  It allows you to define and describe the different races that you’ll use in your game but all of the extra functionality like stat adjustments and special abilities will be added as extension plugins so that you can pick and choose what you want in your game and what you don’t.


## Parameters

This is a plugin for races so, of course, you’ll need a parameter to define them for your game.  At the moment, the name is really all you need to define.  I have plans to incorporate the rest of the information in one or more other plugins but I can’t say for sure when those will be completed.

**Races** 
* **Name** - The name of a race.
* **General** - General description about this race.  This will be used as sort of an intro blurb.
Physical Description - Physical description about this race.  This should describe the physical characteristics of a typical member of this race.
* **Society** - Information about how this race typically interacts with other races.
* **Alignment and Religion** - Moral and religious information of the typical member of this race.  This describes which gods or religions this race typically follows and what they general alignment usually is.  Individual members of this race obviously can vary from the norm.
* **Adventurers** - Information about how and why members of this race become adventurers.

**Save Races Object** - Setting this to true allows you to modify the $dataRaces object, which contains all of the information within the plugin parameters, when the player saves the game.  By default, this object is built from the plugin parameters when a new game is started or a saved game is loaded.  This is usually what you’ll want.  If, for some reason, you need need to alter this data in-game and have those changes persist until the end of the game, you’ll need to turn this option on.


## Script and Plugin Commands

These commands will allow you to assign races to actors and to retrieve information about the actor’s race.

*Script Commands to get and set a race*
* FROG.Races.getRace(actorId);
* FROG.Races.getId(actorId);
* FROG.Races.getName(actorId);
* FROG.Races.getGeneral(actorId);
* FROG.Races.getSociety(actorId);
* FROG.Races.getReligion(actorId);
* FROG.Races.getAdventurers(actorId);
* FROG.Races.setRace(actorId, raceId);

*Plugin Commands to get and set a race (Don't include the brackets)*
The Type is piece of information that you want to retrieve.  This can be ID, NAME, GENERAL, SOCIETY, RELIGION or ADVENTURERS
* GETRACE [type] [actorId] [variableId]
* SETRACE [actorId] [race]

Examples

Get the Race ID of Actor 1 and store it in variable 5
* GETRACE ID 1 5

Get the Race name of Actor 4 and store it in variable 12
* GETRACE NAME 4 12

Store the Actor’s ID in variable 6 and then store the race name in variable 7.  All parameters can utilize the v[x] variable reference notation.
* GETRACE NAME v[6] 7


## Terms of Use

This plugin can be used in commercial or non-commercial projects.  You also have my permission to write and share plugins that add to or extend the functionality of this plugin.

Credit Frogboy in your work.


## Changelog

Version 1.0 - Initial release
