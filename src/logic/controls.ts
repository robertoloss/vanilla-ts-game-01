import { Player } from "./types";

export function initializeControls(player: Player) {
	window.addEventListener('keydown', listenerKeyDown);
	function listenerKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
				break;
			case 'ArrowDown':
				break;
			case 'ArrowLeft':
				player.move.left = true
				player.move.last = 'left'
				break;
			case 'ArrowRight':
				player.move.right = true
				player.move.last = 'right'
				break;
			case 'x':
				player.speed.vertical = -8;
				break;
			default:
				true
		}
	}
	window.addEventListener('keyup', listenerKeyUp);
	function listenerKeyUp(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
				break;
			case 'ArrowDown':
				break;
			case 'ArrowLeft':
				player.move.left = false
				player.move.last = 'none'
				break;
			case 'ArrowRight':
				player.move.right = false
				player.move.last = 'none'
				break;
			case 'x':
				break;
			default:
				true
		}
	}
}
