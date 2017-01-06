var spawner = {
    run: function (roles, counts) {

        var sourceId = '018cee2eefb3d3efaf389448';
        for (var role in roles) {
            if (counts[roles[role]].limit > 0) {
                if (counts[roles[role]].sourcelimits !== undefined) {

                    for (var sourcelimits in counts[roles[role]].sourcelimits) {
                        if (counts[roles[role]].sourcelimits[sourcelimits].limit > 0) {
                            sourceId = counts[roles[role]].sourcelimits[sourcelimits].key;
                        }
                    }
                }
                var spawnVal = spawner.spawn(counts[roles[role]].module, {role: roles[role], sourceId: sourceId});
                if (spawnVal != -4 && spawnVal != -6) {
                    return true;
                }
                return false;
            }
        }
        return false;
    },
    spawn: function (module, memory) {
        var newName = Game.spawns.Spawn1.createCreep(module, undefined, memory);
        console.log('Spawning new ' + memory.role + ' ' + newName);
        return 'k';
    }
};
module.exports = spawner;