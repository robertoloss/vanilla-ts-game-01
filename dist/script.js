import { checkPlayerCollisionsVertical, checkPlayerCollisionsHorizontal } from "./logic/collisions/player.js";
import { player } from "./logic/types.js";
import { initializeControls } from "./logic/controls.js";
import { TILE_SIZE } from "./logic/types.js";
// 15 width by 10 heights
const gameMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const gameMap2 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
player.position.left = TILE_SIZE * 2;
player.position.top = (gameMap.length - 3) * TILE_SIZE;
let tilesArray = [];
let tilesHashMap = {};
initializeControls(player);
const debug = document.getElementById('debug');
function drawMap(gameMap) {
    tilesArray = [];
    tilesHashMap = {};
    gameMap.forEach((row, y) => {
        row.forEach((square, x) => {
            if (square === 1) {
                const tileDiv = document.createElement('div');
                tileDiv.classList.add('tile');
                tileDiv.style.position = 'absolute';
                tileDiv.style.top = `${TILE_SIZE * y}px`;
                tileDiv.style.left = `${TILE_SIZE * x}px`;
                tileDiv.style.width = `${TILE_SIZE}px`;
                tileDiv.style.height = `${TILE_SIZE}px`;
                const tile = {
                    position: {
                        x,
                        y
                    },
                    div: tileDiv
                };
                tilesArray.push(tile);
                const strCoord = JSON.stringify([y, x]);
                tilesHashMap[strCoord] = tile;
            }
        });
    });
    const gameScreen = document.getElementById('game-screen');
    if (gameScreen) {
        gameScreen.innerHTML = '';
        gameScreen.style.width = `${gameMap[0].length * TILE_SIZE}px`;
        gameScreen.style.height = `${gameMap.length * TILE_SIZE}px`;
        gameScreen.style.overflow = 'hidden';
        gameScreen.innerHTML = '';
        if (debug) {
            gameScreen === null || gameScreen === void 0 ? void 0 : gameScreen.appendChild(debug);
            debug.style.position = 'absolute';
            debug.style.zIndex = '100';
        }
        tilesArray.forEach(tile => gameScreen.appendChild(tile.div));
    }
}
drawMap(gameMap);
let currentMap = 1;
let playerDiv = document.getElementById('player');
const gameScreen = document.getElementById('game-screen');
function renderPlayer() {
    if (!(playerDiv === null || playerDiv === void 0 ? void 0 : playerDiv.style.top)) {
        playerDiv = document.createElement('div');
        playerDiv.id = 'player';
        playerDiv.style.position = 'absolute';
        playerDiv.style.top = '0px'; //`${player.position.top}px`;
        playerDiv.style.left = '0px'; //`${player.position.left}px`;
        playerDiv.style.width = `${TILE_SIZE}px`;
        playerDiv.style.height = `${TILE_SIZE}px`;
        playerDiv.style.display = 'flex';
        playerDiv.style.backgroundColor = 'red';
        playerDiv.style.willChange = 'transform';
        playerDiv.style.zIndex = '100';
        gameScreen === null || gameScreen === void 0 ? void 0 : gameScreen.appendChild(playerDiv);
    }
    else {
        playerDiv.style.transform = `translate(${player.position.left}px, ${player.position.top}px)`;
    }
}
renderPlayer();
const showDebug = true;
function animate() {
    const currMapIsOne = currentMap === 1;
    const ppTop527 = player.position.top > 527;
    const ppLefOk = (player.position.left > TILE_SIZE * gameMap[0].length - 20);
    let changeMapToTwo = currMapIsOne && ppTop527 && ppLefOk;
    const currMapIsTwo = currentMap === 2;
    const ppLefOk2 = player.position.left < -TILE_SIZE;
    let changeMapToOne = currMapIsTwo && ppTop527 && ppLefOk2;
    if (showDebug) {
        const debug = document.getElementById('debug');
        if (debug)
            debug.innerHTML = `
			player.move.right: <span class="highlighted-text">${player.move.right}</span><br>
			player.move.left: <span class="highlighted-text">${player.move.left}</span><br>
			player.position.left: <span class="highlighted-text">${player.position.left}</span><br>
			player.position.top: <span class="highlighted-text">${player.position.top}</span><br>
			changeMapToOne: <span class="highlighted-text">${changeMapToTwo}</span><br>
			currentMap === 1: <span class="highlighted-text">${currMapIsOne}</span><br>
			pp top: <span class="highlighted-text">${ppTop527}</span><br>
			pp left: <span class="highlighted-text">${ppLefOk}</span><br>
		`;
    }
    const collistionVertical = checkPlayerCollisionsVertical({ player, tilesHashMap });
    if (!collistionVertical)
        player.position.top += player.speed.vertical;
    const collisionHorizontal = checkPlayerCollisionsHorizontal({ player, tilesHashMap });
    if (!collisionHorizontal)
        player.position.left += player.speed.horizontal;
    renderPlayer();
    if (player.speed.vertical < 20) {
        player.speed.vertical += 0.5;
    }
    if (player.move.right && player.move.left) {
        player.speed.horizontal = player.move.last === 'left' ? -5 : 5;
    }
    else if (player.move.right) {
        player.speed.horizontal = 5;
    }
    else if (player.move.left) {
        player.speed.horizontal = -5;
    }
    else {
        player.speed.horizontal = 0;
        player.move.last = 'none';
    }
    if (changeMapToTwo) {
        changeMapToTwo = false;
        currentMap = 2;
        drawMap(gameMap2);
        tilesArray = [];
        playerDiv = null;
        renderPlayer();
        player.position.left = 0;
    }
    if (changeMapToOne) {
        changeMapToOne = false;
        currentMap = 1;
        drawMap(gameMap);
        tilesArray = [];
        playerDiv = null;
        renderPlayer();
        player.position.left = (gameMap[0].length * TILE_SIZE) - (TILE_SIZE * 2);
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
