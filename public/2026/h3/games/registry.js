(function createDailyCogGameRegistry(global) {
  const games = [];
  const gamesById = new Map();
  const ageGroups = ['child', 'teen', 'adult', 'senior'];

  global.DailyCogGames = Object.freeze({
    register(game) {
      if (!game || !game.id || !ageGroups.includes(game.age) || typeof game.round !== 'function') {
        throw new Error('올바르지 않은 Daily Cog 게임 모듈입니다.');
      }
      if (gamesById.has(game.id)) throw new Error(`중복된 게임 ID입니다: ${game.id}`);
      const registered = Object.freeze({...game});
      games.push(registered);
      gamesById.set(registered.id, registered);
      return registered;
    },
    get(id) {
      return gamesById.get(id) || null;
    },
    all() {
      return [...games];
    },
    grouped() {
      const grouped = Object.fromEntries(ageGroups.map(age => [age, []]));
      games.forEach(game => grouped[game.age].push(game));
      return grouped;
    }
  });
})(window);
