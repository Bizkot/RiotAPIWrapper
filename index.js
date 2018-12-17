const profileIcon = require('./DataDragonAPI/Image&DataURLs/profileIcon');
const championSplashArt = require('./DataDragonAPI/Image&DataURLs/championSplashArt');
const championLoadingScreenArt = require('./DataDragonAPI/Image&DataURLs/championLoadingScreenArt');
const championSquare = require('./DataDragonAPI/Image&DataURLs/championSquare');
const passiveAbility = require('./DataDragonAPI/Image&DataURLs/passiveAbility');
const championAbility = require('./DataDragonAPI/Image&DataURLs/championAbility');
const summonerSpell = require('./DataDragonAPI/Image&DataURLs/summonerSpell');
const item = require('./DataDragonAPI/Image&DataURLs/item');
const sprite = require('./DataDragonAPI/Image&DataURLs/sprite');

profileIcon.run(22); // OK
profileIcon.run(35); // KO
profileIcon.run(588); // OK

championSplashArt.run('Aatrox', 0); // OK
championSplashArt.run('Aatrox', 1); // OK
championSplashArt.run('Aatrox', 14); // KO

championLoadingScreenArt.run('Aatrox', 0); // OK
championLoadingScreenArt.run('Aatrox', 1); // OK
championLoadingScreenArt.run('Aatrox', 14); // KO

championSquare.run('Aatrox'); // OK
championSquare.run('aatrox'); // KO

passiveAbility.run('Aatrox_Passive.AatroxUpdate'); // OK
passiveAbility.run('Aatrox_P'); // KO

championAbility.run('AatroxQ'); // OK
championAbility.run('Aatrox_Q'); // KO

summonerSpell.run('SummonerFlash'); // OK
summonerSpell.run('SummonerDot'); // OK
summonerSpell.run('SummonerIgnite'); // KO

item.run(1001); // OK
item.run(100); // KO

sprite.run('spell0'); // OK
sprite.run('spell100'); // KO
