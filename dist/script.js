import { checkPlayerCollisionsVertical, checkPlayerCollisionsHorizontal } from "./logic/collisions/player.js";
import { player } from "./logic/types.js";
import { initializeControls } from "./logic/controls.js";
import { TILE_SIZE } from "./logic/types.js";
import { levelMap } from "./map/map.js";
let GRAVITY = 0.5;
player.position.left = TILE_SIZE * 2;
player.position.top = (16 - 3) * TILE_SIZE;
let tilesArray = [];
let tilesHashMap = {};
initializeControls(player);
const debug = document.getElementById('debug');
let map = {
    origin: {
        x: 0,
        y: 0
    }
};
function createMap(gameMap, map) {
    tilesArray = [];
    tilesHashMap = {};
    const yy = map.origin.y;
    const xx = map.origin.x;
    let [yyy, xxx] = [0, 0];
    for (let y = yy; y < yy + 16; y++) {
        for (let x = xx; x < xx + 16; x++) {
            if (gameMap[y][x] === 0) {
                const tileDiv = document.createElement('div');
                tileDiv.classList.add('tile');
                tileDiv.style.position = 'absolute';
                tileDiv.style.top = `${TILE_SIZE * yyy}px`;
                tileDiv.style.left = `${TILE_SIZE * xxx}px`;
                tileDiv.style.width = `${TILE_SIZE}px`;
                tileDiv.style.height = `${TILE_SIZE}px`;
                const tile = {
                    position: { x, y },
                    div: tileDiv
                };
                tilesArray.push(tile);
                const strCoord = JSON.stringify([yyy, xxx]);
                tilesHashMap[strCoord] = tile;
            }
            xxx += 1;
        }
        xxx = 0;
        yyy += 1;
    }
}
createMap(levelMap, map);
function renderMap(tilesArray) {
    const gameScreen = document.getElementById('game-screen');
    if (gameScreen) {
        gameScreen.innerHTML = '';
        gameScreen.style.width = `${16 * TILE_SIZE}px`;
        gameScreen.style.height = `${16 * TILE_SIZE}px`;
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
renderMap(tilesArray);
let playerDiv = document.getElementById('player');
const gameScreen = document.getElementById('game-screen');
function renderPlayer(recreate) {
    if (!(playerDiv === null || playerDiv === void 0 ? void 0 : playerDiv.style.top) || recreate) {
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
    if (showDebug) {
        const debug = document.getElementById('debug');
        if (debug)
            debug.innerHTML = `
			player.move.right: <span class="highlighted-text">${player.move.right}</span><br>
			player.move.left: <span class="highlighted-text">${player.move.left}</span><br>
			player.position.left: <span class="highlighted-text">${player.position.left}</span><br>
			player.position.top: <span class="highlighted-text">${player.position.top}</span><br>
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
        player.speed.vertical += GRAVITY;
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
    if (player.position.left > (16 * TILE_SIZE)) {
        map.origin.x += 16;
        createMap(levelMap, map);
        renderMap(tilesArray);
        renderPlayer(true);
        player.position.left = 0;
    }
    if (player.position.left < -TILE_SIZE) {
        player.position.left = 15 * TILE_SIZE;
        map.origin.x -= 16;
        createMap(levelMap, map);
        renderMap(tilesArray);
        renderPlayer(true);
    }
    if (player.position.top > (16 * TILE_SIZE)) {
        player.position.top = 0;
        map.origin.y += 16;
        createMap(levelMap, map);
        renderMap(tilesArray);
        renderPlayer(true);
    }
    if (player.position.top < -TILE_SIZE) {
        player.position.top = 16 * TILE_SIZE;
        map.origin.y -= 16;
        createMap(levelMap, map);
        renderMap(tilesArray);
        renderPlayer(true);
    }
    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
