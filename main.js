var roles = ['harvester', 'upgrader', 'miner', 'builder'];
var roleConfig = {
    'harvester': {'limit': 3, 'module': [WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], 'sourcelimits': [
        {'source': '5836b6748b8b9619519eeb72', 'limit':5},
    ]}, 
    'upgrader': {'limit': 1, 'module': [WORK,WORK, CARRY,CARRY, MOVE, MOVE]},
    'builder': {'limit': 0, 'module': [WORK, CARRY, MOVE, MOVE]},
    'miner': {
        'limit': 0, 'module': [WORK, WORK, WORK, WORK, CARRY,CARRY, MOVE], 'sourcelimits': [
            {'source': '5836b6748b8b9619519eeb72', 'limit':1 },
            {'source': '5836b6748b8b9619519eeb71', 'limit':1 }
        ]
    },
    'tower':{},

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
                for(var source in counts[role].sourcelimits)
                {
                    if(counts[role].sourcelimits[source].limit>0 && counts[role].sourcelimits[source].source==Game.creeps[name].memory.sourceId)
                    {
                        counts[role].sourcelimits[source].limit=counts[role].sourcelimits[source].limit-1;

                    }
                }
                if(counts[role].sourcelimits[counts[role].sourceId]>0)
                {
                    counts[role].sourcelimits[counts[role].sourceId]=counts[role].sourcelimits[counts[role].sourceId]-1;
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
    var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
    for(var tower in towers)
    {
        roleHandler['tower'].run(towers[tower]);
    }

    spawnSleep--;
    if (spawnSleep == 0) {
        runCount=spawner.run(roles, counts);
        spawnSleep = 5;
    }
};