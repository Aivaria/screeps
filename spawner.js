var spawner = {
    run: function (roles, counts) {

        for(var role in roles)
        {
            if(counts[roles[role]].limit>0)
            {
                var spawnVal = spawner.spawn(counts[roles[role]].module, {role: roles[role], sourceId: '5836b6748b8b9619519eeb72'});
                if(spawnVal!=-4 && spawnVal!=-6) {
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
        return newName;
    }
};
module.exports = spawner;