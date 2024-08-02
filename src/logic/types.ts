

export const TILE_SIZE: number =48 

export const player : {
position: {
    top: number,
    left: number,
	},
	speed: {
		vertical: number,
		horizontal: number
	},
	translate: {
		top: number,
		left: number
	},
	move: {
		last: 'none' | 'left' | 'right',
		left: boolean,
		right: boolean
	}
} = {
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
		last: 'none',
		left: false,
		right: false
	}
};
export type Player = typeof player
