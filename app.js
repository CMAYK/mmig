var style = null;
var theme = null;
var twist = null;
var day = true;
var item1 = "";
var item2 = "";
var item3 = "";
var styles = ["SMB", "SMB2", "SMAS", "SML2", "SMB3", "SMA4", "SMW", "YI", "NSMB"];
var themes = ["Ground", "Underground", "Underwater", "Desert", "Snow", "Sky", "Forest", "Ghost House", "Space", "Airship", "Castle", "Mountain", "Athletic", "InsideAirship"];
var common = ["Banzai Bills", "Bloopers", "Bob-ombs", "Boos", "Boom Boom", "Bowser", "Bullet Bills", "Buzzy Beetles", "Chain Chomps", "Cheep Cheeps", "Dry Bones", "Pirahna Plants", "Fish Bones", "Goombas", "Hammer Bros", "Koopa Troopas", "Lakitu", "Lava Bubbles", "Magikoopas", "Monty Moles", "Munchers", "Sledge Bros", "Goombrats", "Spinies", "Stretches", "Thwomps", "Goombuds", "Wigglers", "Precision Platforming", "Bowser Jr.", "On/Off blocks", "Rocky Wrenches", "Poisonous Mushrooms", "Ice Bros", "Boomerang Bros", "Fire Bros"];
var twists = ["make it vertical", "add a boss battle", "design a puzzle", "use more than 1 sub-stage", "make it a speedrun", "use all 16 pixel-art slots", "make it non-linear", "use the 'always run' ability flag", "use the 'no jump' ability flag", "have a true ending", "focus on a powerup", "use the 'spin-jump' ability flag"];

function reset() {
  if (!$('#styleLock').prop('checked')) style = null;
  if (!$('#themeLock').prop('checked')) theme = null;
  if (!$('#timeLock').prop('checked')) day = true;
  if (!$('#enemiesLock').prop('checked')) {
    item1 = null;
    item2 = null;
    item3 = null;
  }
}

function genStyle() {
  reset();
  if(!$('#styleLock').prop('checked')) {
    style = styles[Math.floor(Math.random() * styles.length)];    
  }
  if(twist == "require spin-jumps") {
    var styles_movement = ["SMW", "NSMB", "3DW"];
    style = styles_movement[Math.floor(Math.random() * styles_movement.length)];
  }
}

function genAll() {

  $('#generated').css('opacity', '0');
  $('.lds-roller').css('display', 'inline-block');

  genStyle();
  /* Theme */
  if (!$('#themeLock').prop('checked')) {
    theme = themes[Math.floor(Math.random() * themes.length)];
  }

  /* Enemies/Gimmicks */
  if (!$('#enemiesLock').prop('checked')) {
    var list = common;

    var chosen = 0;
    var used = [null, null, null];
    while (chosen < 3) {
       var nextIndex = Math.floor(Math.random() * list.length);
       var usedYet = false;
       for (var k = 0; k < used.length; k++) {
         if(used[k] == nextIndex) usedYet = true;
       }
       if (!usedYet) {
         used[chosen] = nextIndex;
         chosen++;
       }
    }

    var htmlInsert = "";

    for (var i = 0; i < used.length; i++) {
      if (i == 0) item1 = list[used[i]];
      if (i == 1) item2 = list[used[i]];
      if (i == 2) item3 = list[used[i]];
      htmlInsert += list[used[i]];
      if(i != 2) htmlInsert += " & ";
    }

  }

  if (!$('#twistLock').prop('checked')) {
    var tempTwists = twists;
    var tempTwist = tempTwists[Math.floor(Math.random() * tempTwists.length)];
    twist = tempTwist;
  }

// TOODO add delay 800 & 1000 from 0
  var delay = 800 + Math.random() * 1000;

  setTimeout(function(){
    $('#generated').css('opacity', '1');
    $('.lds-roller').css('display', 'none');
    update(htmlInsert, tempTwist);
  }, delay);
}

function update(enemies, twist) {
  if(!$('#styleLock').prop('checked')) $('#style').html('<img src=\"images/styles/' + style + '.png\" class=\"style\" alt=\"' + style + '\" title=\"' + style + '\">');
  if(!$('#themeLock').prop('checked')) $('#theme').html('<img src=\"images/themes/' + theme + '.png\" class=\"theme\" alt=\"' + theme + '\" title=\"' + theme + '\">');
  if (day) {
    $('#time').html("day");
  }
  else $('#time').html("night");
  if (!$('#enemiesLock').prop('checked')) $('#else').html(enemies);
  if (!$('#twistLock').prop('checked')) $('#twist').html(twist);
}
