var roles = ['harvester', 'upgrader', 'miner', 'builder'];
var roleConfig = {
    'harvester': {'limit': 10, 'module': [WORK,CARRY,MOVE, MOVE], 'sourcelimits': [
        {'limit':5, 'key':'018cee2eefb3d3efaf389448'}, {'limit':3, 'key':'88e34bb49203354dcd94d71b'},
    ]},
    'upgrader': {'limit': 0, 'module': [WORK,WORK, CARRY,CARRY, MOVE, MOVE]},
    'builder': {'limit': 0, 'module': [WORK, CARRY, MOVE, MOVE]},
    'miner': {
        'limit': 0, 'module': [WORK, WORK, WORK, WORK, CARRY,CARRY, MOVE], 'sourcelimits': [
            {'limit':1, 'key':'5836b6748b8b9619519eeb72'}, {'limit':1, 'key':'5836b6748b8b9619519eeb71'},
        ]
    }
};
var roleHandler = [];
var counts = JSON.parse(JSON.stringify(roleConfig));

for (var role in roleConfig) {
    roleHandler[role] = require('role.' + role);
}
var helper = require('helper');
var spawner = require('spawner');
var spawnSleep = 5;
var runCount = true;

module.exports.loop = function () {
    runCount = helper.clean();
    
    if (runCount || true) {
        for (role in roles) {
            counts = JSON.parse(JSON.stringify(roleConfig))
        }
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            var role = creep.memory.role;
            if(counts[role].limit>0)
            {
                counts[role].limit=counts[role].limit-1;
            }
            if(counts[role].sourcelimits!==undefined)
            {
                if(counts[role].sourcelimits[counts[role].sourceId].limit>0)
                {
                    counts[role].sourcelimits[counts[role].sourceId].limit=counts[role].sourcelimits[counts[role].sourceId].limit-1;
                }
            }
        }
        runCount = false;
    }

    for (name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = creep.memory.role;

        if (creep === undefined) {
            creep.suicide();
            continue;
        }
        roleHandler[role].run(creep);


    }

    spawnSleep--;
    if (spawnSleep == 0) {
        runCount=spawner.run(roles, counts);
        spawnSleep = 5;
    }
};