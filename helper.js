module.exports = {
    clean: function()
    {
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
    }
};