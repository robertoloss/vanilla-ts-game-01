import { Player } from "../types.js"
import { TILE_SIZE } from "../types.js"

type Props = {
	player: Player,
	tilesHashMap: {
			[key: string]: {
		position: {
			x: number,
			y: number
		},
		div: HTMLDivElement 
	}
}

}


function getTile(y:number, x: number) {
	return [Math.floor(y/TILE_SIZE), Math.floor(x/TILE_SIZE)]
}
function str(arr: number[]) {
	return JSON.stringify(arr)
}

export function checkPlayerCollisionsVertical({ player, tilesHashMap }: Props) {
	const pTop = player.position.top
	const pBottom = player.position.top + TILE_SIZE
	const pLeft = player.position.left
	const pRight = player.position.left + TILE_SIZE

	const vSpeed = player.speed.vertical

	const topLeft = getTile(pTop + vSpeed, pLeft)
	const topRight = getTile(pTop + vSpeed, pRight)
	const bottomLeft = getTile(pBottom + vSpeed, pLeft)
	const bottomRight = getTile(pBottom + vSpeed, pRight)

	const collision = {
		top: false,
		bottom: false,
	}

	function checkTile(arr: number[]) {
		return tilesHashMap[str(arr)] != undefined
	}

	if (vSpeed < 0) collision.top = checkTile(topLeft) || checkTile(topRight) 
	if (vSpeed > 0) collision.bottom = checkTile(bottomLeft) || checkTile(bottomRight) 
	
	if (collision.top || collision.bottom) {
		player.speed.vertical = 0;
		if (collision.top) {
			player.position.top = (topLeft[0] * TILE_SIZE) + TILE_SIZE
			console.log("top collision: ", topLeft, topRight)
		}
		else {
			player.position.top = (bottomLeft[0] * TILE_SIZE) - (TILE_SIZE + 0.5) 
			//console.log("bottom collision: ", bottomLeft, bottomRight, player.speed.vertical)
		}
	} 
	return collision.top || collision.bottom

}

export function checkPlayerCollisionsHorizontal({ player, tilesHashMap }: Props) {
	const pTop = player.position.top
	const pBottom = player.position.top + TILE_SIZE
	const pLeft = player.position.left
	const pRight = player.position.left + TILE_SIZE

	const hSpeed = player.speed.horizontal

	const leftTop = getTile(pTop, pLeft + hSpeed)
	const leftBottom = getTile(pBottom, pLeft + hSpeed)
	const rightTop = getTile(pTop, pRight + hSpeed)
	const rightBottom = getTile(pBottom, pRight + hSpeed)

	const collision = {
		left: false,
		right: false
	}

	function checkTile(arr: number[]) {
		return tilesHashMap[str(arr)] != undefined
	}

	if (hSpeed < 0) collision.left = checkTile(leftTop) || checkTile(leftBottom) 
	if (hSpeed > 0) collision.right = checkTile(rightTop) || checkTile(rightBottom) 
	
	if (collision.left || collision.right) {
		player.speed.horizontal = 0;
		if (collision.left) {
			player.position.left = (leftTop[1] * TILE_SIZE) + TILE_SIZE
			console.log("left collision: ", leftTop, leftBottom)
		}
		else {
			player.position.left = rightBottom[1] * TILE_SIZE - (TILE_SIZE + 0.5)
			console.log("right collision: ", rightTop, rightBottom, player.position.left)
		}
	}
	return collision.left || collision.right

}
