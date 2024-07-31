import { checkPlayerCollisionsVertical, checkPlayerCollisionsHorizontal } from "./logic/collisions/player.js";
import { player } from "./logic/types.js";
import { initializeControls } from "./logic/controls.js";
import { TILE_SIZE } from "./logic/types.js";


const gameScreen = document.getElementById('game-screen');


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
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
player.position.left = TILE_SIZE * 2
player.position.top = (gameMap.length - 3) * TILE_SIZE
type Tile = {
	position: {
		x: number,
		y: number
	},
	div: HTMLDivElement 
}
const tilesArray: Tile[] = []
const tilesHashMap: { [key: string]: Tile } = {}
export type TilesHashMap = typeof tilesHashMap

initializeControls(player)

//function movePlayer(axis: 'vertical' | 'horizontal', increase: number) {
//	player.speed[axis] += increase;
//	console.log(player.speed)
//	renderPlayer();
//}
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
			const tile: Tile = {
				position: { 
					x, 
					y 
				},
				div: tileDiv
			}
			tilesArray.push(tile);
			const strCoord = JSON.stringify([y,x])
			tilesHashMap[strCoord] = tile
		}
	});
});
//console.log(tilesHashMap)
let playerDiv = document.getElementById('player');

function renderPlayer() {
  if (!playerDiv?.style.top) {
    playerDiv = document.createElement('div');
    playerDiv.id = 'player';
    playerDiv.style.position = 'absolute';
    playerDiv.style.top = '0px'//`${player.position.top}px`;
    playerDiv.style.left = '0px'//`${player.position.left}px`;
		playerDiv.style.width = `${TILE_SIZE}px`
		playerDiv.style.height = `${TILE_SIZE}px`
		playerDiv.style.display = 'flex'
		playerDiv.style.backgroundColor = 'red'
		playerDiv.style.willChange = 'transform'
    gameScreen?.appendChild(playerDiv);
  } else {
		playerDiv.style.transform = `translate(${player.position.left}px, ${player.position.top}px)`;
  }
}

const debug = document.getElementById('debug')
if (gameScreen) {
  gameScreen.innerHTML = '';
	if (debug) {
		gameScreen.appendChild(debug)
		debug.style.position = 'absolute'
		debug.style.zIndex = '100'
	}
  tilesArray.forEach(tile => gameScreen.appendChild(tile.div));
  renderPlayer();
}

const showDebug = true

function animate() {
	if (debug && showDebug) debug.innerHTML = `
		player.move.right: <span class="highlighted-text">${player.move.right}</span><br>
		player.move.left: <span class="highlighted-text">${player.move.left}</span><br>
		player.position.left: <span class="highlighted-text">${player.position.left}</span><br>
		player.position.top: <span class="highlighted-text">${player.position.top}</span><br>
	`
	const collistionVertical = checkPlayerCollisionsVertical({ player, tilesHashMap })
  if (!collistionVertical) player.position.top += player.speed.vertical;

	const collisionHorizontal = checkPlayerCollisionsHorizontal({ player, tilesHashMap })
	if (!collisionHorizontal) player.position.left += player.speed.horizontal;

  renderPlayer();

	if (player.speed.vertical < 20) {
		player.speed.vertical += 0.5;
	}

	if (player.move.right) player.speed.horizontal = 5
	if (player.move.left) player.speed.horizontal = -5
	if (!player.move.left && !player.move.right) player.speed.horizontal = 0

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
