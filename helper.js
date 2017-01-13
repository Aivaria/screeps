module.exports = {
    clean: function () {
        var toReturn = false;
        // Always place this memory cleaning code at the very top of your main loop!
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
                toReturn = true;
            }
        }
        return toReturn;
    },

    getTarget: function (creep, type, ressource) {
        if (creep === undefined || type == undefined) {
            return false;
        }
        var object=null;
        switch (type) {
            case 'spawner': {
                object = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&structure.energy < structure.energyCapacity;
                    }
                });
                if(object===null)
                {
                    return false;
                }
                creep.memory.path = creep.pos.findPathTo(object.pos);
                creep.memory.object =object.id;
                creep.memory.lastfind='spawner';
                creep.memory.range = creep.memory.path.length;
                return true;
                break;
            }
            case 'tower': {
                object = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) &&structure.energy < structure.energyCapacity;
                    }
                });
                if(object===null)
                {
                    return false;
                }
                creep.memory.path = creep.pos.findPathTo(object.pos);
                creep.memory.object =object.id;
                creep.memory.lastfind='tower';
                creep.memory.range = creep.memory.path.length;
                return true;
                break;
            }
            case 'construction': {
                object = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if(object===null)
                {
                    return false;
                }
                creep.memory.path = creep.pos.findPathTo(object.pos);
                creep.memory.object =object.id;
                creep.memory.lastfind='construction';
                creep.memory.range = creep.memory.path.length;
                return true;
                break;
            }
            case 'repair':{
                object = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (object) {
                        if (((object.structureType === STRUCTURE_ROAD || object.structureType === STRUCTURE_STORAGE || object.structureType=== STRUCTURE_CONTAINER ) && object.hits < object.hitsMax *0.95) || (object.structureType === STRUCTURE_WALL || object.structureType === STRUCTURE_RAMPART)  && object.hits<500000) {
                            return true;
                        }
                        return false;
                    }
                });
                if(object===null)
                {
                    return false;
                }
                creep.memory.path = creep.pos.findPathTo(object.pos);
                creep.memory.object =object.id;
                creep.memory.lastfind='repair';
                creep.memory.range = creep.memory.path.length;
                return true;
                break;
            }
            case 'controller':
            {
                var controller = creep.room.controller;
                creep.memory.path = creep.pos.findPathTo(controller);
                creep.memory.object =object;
                creep.memory.lastfind='controller';
                creep.memory.range = creep.memory.path.length;
                return true;
                break;
            }
        }

        return false;
    }
};