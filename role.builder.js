var helper = require('helper');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // this.getPath(creep);

        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            console.log('search');
            creep.memory.working = true;
            this.getPath(creep);
        }

        if (creep.memory.working) {

            if(creep.memory.moving==true)
            {
                if(creep.memory.object==undefined || creep.memory.range<=1)
                {
                    creep.memory.moving=false;
                }
                creep.memory.range = creep.memory.range -1;
                creep.moveByPath(creep.memory.path);
            }
            else
            {
                switch (creep.memory.lastfind)
                {
                    case 'construction':
                        var result = creep.build(Game.getObjectById(creep.memory.object));
                        if(result!=OK)
                        {
                            this.getPath(creep);
                        }
                        break;
                    case 'repair':
                        var result = creep.repair(Game.getObjectById(creep.memory.object));
                        if(Game.getObjectById(creep.memory.object).hits > Game.getObjectById(creep.memory.object).hitsMax*0.95)
                        {
                            this.getPath(creep);
                        }
                        if(result!=OK)
                        {
                            this.getPath(creep);
                        }
                        break;
                    case 'controller':
                        var result = creep.upgradeController(creep.room.controller);
                        if(result!=OK)
                        {
                            this.getPath(creep);
                        }
                        break;
                }
            }
        }
        else {
            var source = Game.getObjectById(creep.memory.sourceId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },
    getPath: function (creep) {
    creep.memory.moving = true;
        result = helper.getTarget(creep, 'construction');
        if (result === false) {
            result = helper.getTarget(creep, 'repair');
            if (result === false) {
                result = helper.getTarget(creep, 'controller');
                if (result === false) {
                    console.log('error');
                }
            }
        }
    }
};

module.exports = roleHarvester;