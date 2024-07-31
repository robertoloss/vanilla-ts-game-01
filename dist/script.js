import { checkPlayerCollisionsVertical, checkPlayerCollisionsHorizontal } from "./logic/collisions/player.js";
import { player } from "./logic/types.js";
import { initializeControls } from "./logic/controls.js";
import { TILE_SIZE } from "./logic/types.js";
var gameScreen = document.getElementById('game-screen');
// 15 width by 10 heights
var gameMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
player.position.left = TILE_SIZE * 2;
player.position.top = (gameMap.length - 3) * TILE_SIZE;
var tilesArray = [];
var tilesHashMap = {};
initializeControls(player);
//function movePlayer(axis: 'vertical' | 'horizontal', increase: number) {
//	player.speed[axis] += increase;
//	console.log(player.speed)
//	renderPlayer();
//}
gameMap.forEach(function (row, y) {
    row.forEach(function (square, x) {
        if (square === 1) {
            var tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            tileDiv.style.position = 'absolute';
            tileDiv.style.top = "".concat(TILE_SIZE * y, "px");
            tileDiv.style.left = "".concat(TILE_SIZE * x, "px");
            tileDiv.style.width = "".concat(TILE_SIZE, "px");
            tileDiv.style.height = "".concat(TILE_SIZE, "px");
            var tile = {
                position: {
                    x: x,
                    y: y
                },
                div: tileDiv
            };
            tilesArray.push(tile);
            var strCoord = JSON.stringify([y, x]);
            tilesHashMap[strCoord] = tile;
        }
    });
});
//console.log(tilesHashMap)
var playerDiv = document.getElementById('player');
function renderPlayer() {
    if (!(playerDiv === null || playerDiv === void 0 ? void 0 : playerDiv.style.top)) {
        playerDiv = document.createElement('div');
        playerDiv.id = 'player';
        playerDiv.style.position = 'absolute';
        playerDiv.style.top = '0px'; //`${player.position.top}px`;
        playerDiv.style.left = '0px'; //`${player.position.left}px`;
        playerDiv.style.width = "".concat(TILE_SIZE, "px");
        playerDiv.style.height = "".concat(TILE_SIZE, "px");
        playerDiv.style.display = 'flex';
        playerDiv.style.backgroundColor = 'red';
        playerDiv.style.willChange = 'transform';
        gameScreen === null || gameScreen === void 0 ? void 0 : gameScreen.appendChild(playerDiv);
    }
    else {
        playerDiv.style.transform = "translate(".concat(player.position.left, "px, ").concat(player.position.top, "px)");
    }
}
var debug = document.getElementById('debug');
if (gameScreen) {
    gameScreen.innerHTML = '';
    if (debug) {
        gameScreen.appendChild(debug);
        debug.style.position = 'absolute';
        debug.style.zIndex = '100';
    }
    tilesArray.forEach(function (tile) { return gameScreen.appendChild(tile.div); });
    renderPlayer();
}
var showDebug = true;
function animate() {
    if (debug && showDebug)
        debug.innerHTML = "\n\t\tplayer.move.right: <span class=\"highlighted-text\">".concat(player.move.right, "</span><br>\n\t\tplayer.move.left: <span class=\"highlighted-text\">").concat(player.move.left, "</span><br>\n\t\tplayer.position.left: <span class=\"highlighted-text\">").concat(player.position.left, "</span><br>\n\t\tplayer.position.top: <span class=\"highlighted-text\">").concat(player.position.top, "</span><br>\n\t");
    var collistionVertical = checkPlayerCollisionsVertical({ player: player, tilesHashMap: tilesHashMap });
    if (!collistionVertical)
        player.position.top += player.speed.vertical;
    var collisionHorizontal = checkPlayerCollisionsHorizontal({ player: player, tilesHashMap: tilesHashMap });
    if (!collisionHorizontal)
        player.position.left += player.speed.horizontal;
    renderPlayer();
    if (player.speed.vertical < 20) {
        player.speed.vertical += 0.5;
    }
    if (player.move.right)
        player.speed.horizontal = 5;
    if (player.move.left)
        player.speed.horizontal = -5;
    if (!player.move.left && !player.move.right)
        player.speed.horizontal = 0;
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
