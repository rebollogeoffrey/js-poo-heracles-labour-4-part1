class Arena {
  constructor(hero, monsters, size = 10) {
    this.hero = hero
    this.monsters = monsters
    this.size = size
    this.messageOutOfArena = "Mouvement Not Allowed. Stay in the Arena"
    this.messageMonsterPresence = "Mouvement Not Allowed. Cell already occupied"
    this.messageEmpty = ""
  }

  getDistance(fighter1, fighter2) {
    return Math.sqrt(Math.pow(fighter2.x - fighter1.x, 2) + Math.pow(fighter2.y - fighter1.y, 2)).toFixed(2)
  }

  isTouchable(attacker, defender) {
    return this.getDistance(attacker, defender) <= attacker.getRange()
  }


  // Hero movement managment
  // Gestion du déplacement du héros
  move(direction) {
    /* Your code goes here */

    const heroCoordinates = {
      x: this.hero.x,
      y: this.hero.y
    }

    const wantedCoordinates = {
      x: this.hero.x,
      y: this.hero.y
    }


    if (direction === "N") wantedCoordinates.y = wantedCoordinates.y - 1;
    else if (direction === "E") wantedCoordinates.x = wantedCoordinates.x - 1;
    else if (direction === "S") wantedCoordinates.y = wantedCoordinates.y + 1;
    else if (direction === "W") wantedCoordinates.x = wantedCoordinates.x + 1;

    const isInsideArena = () => {
      if (wantedCoordinates.x < 0 || wantedCoordinates.x > this.size || wantedCoordinates.y < 0 || wantedCoordinates.y > this.size) {
        return false
      } else return true
    }

    console.log('isInsideArena() :>> ', isInsideArena());

    const isMonsterHere = () => {
      const monstersMap = this.monsters.map((monster) => {
        if (wantedCoordinates.x === monster.x && wantedCoordinates.y === monster.y) { return true }
        else {
          return false;
        }
      })
      return monstersMap[0] + monstersMap[1] + monstersMap[2];
    }

    console.log('isMonsterHere() :>> ', isMonsterHere());


    if (isInsideArena()) {
      if (!isMonsterHere()) {
        this.hero.x = wantedCoordinates.x;
        this.hero.y = wantedCoordinates.y;
        document.getElementById('error').innerText = this.messageEmpty;
      } else { document.getElementById('error').innerText = this.messageMonsterPresence; }
    } else { document.getElementById('error').innerText = this.messageOutOfArena; }

    return heroCoordinates;
  }
}
