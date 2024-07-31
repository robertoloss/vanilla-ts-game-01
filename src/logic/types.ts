

export const TILE_SIZE: number =48 

export const player = {
	position: {
    top: 448,
    left: 112,
	},
	speed: {
		vertical: 0,
		horizontal: 0
	},
	translate: {
		top: 0,
		left: 0
	},
	move: {
		left: false,
		right: false
	}
};
export type Player = typeof player
