var roleTower = {

    /** @param {Creep} tower **/
    run: function(tower) {
        var creepsInRoom = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(creepsInRoom!==null) {
            tower.attack(creepsInRoom);
        }
        else
        {
            creepsInRoom = tower.pos.findClosestByRange(FIND_MY_CREEPS,
                {
                filter: function (object) {return (object.hits < object.hitsMax)
                }
            });
            if(creepsInRoom !== null) {
                tower.heal(creepsInRoom);
            }
            else
            {
                if(tower.energy>600) {
                    var toRepair =null;
                    toRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (object) {
                        return (object.hits < object.hitsMax*0.95 && object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART);
                    }
                    });
                    if(toRepair === null)
                    {
                       toRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function (object) {
                            return (object.hits < object.hitsMax*0.95);
                            }
                        });
                    }
                    tower.repair(toRepair);
                }
            }
        }

    }
};

module.exports = roleTower;