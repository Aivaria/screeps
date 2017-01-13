var roleMiner = {

    // Game.getObjectById('2f14d2682be9b195dc609b1c').pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER)}});
    run: function (creep) {
        if (creep.memory.upgrading) {
            var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER) &&
                structure.energy < structure.energyCapacity;}
        });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else
            {
                require('role.builder').run(creep);
            }
        }
        else {
            var source = Game.getObjectById(creep.memory.sourceId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};
module.exports = roleMiner;