

export const levelMap: (number | undefined)[][] = [
// 0,0,3,4,5,6,7,8,0,0,3,4,5,6,7,8,0,0,3,4,5,6,7,8,0,0,3,4,5,6,7,8,0,0,3,4,5,6,7,8,0,0,3,4,5,6,7,8
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , ,0, , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , ,0, , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , ,0, , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , ,0,0, , , , , , , , , ,0,0, , , , , , ,0, , , , , , , ,0,0, , , , , , , , , , , , ,0,0,0],
	[0, , , , ,0,0, , , , , , , , , , , , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, , , ,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , ,0,0, , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , ,0,0,0, , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , ,0, , , , , , , , ,0,0, , , , , ,0,0, , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , ,0,0,0, , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , ,0, , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0],
	[0,0,0,0,0,0,0,0,0,0, , , ,0,0,0,0,0,0,0,0,0,0, , , ,0,0,0,0,0,0,0,0,0,0,0,0,0, , , ,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0, , , ,0,0,0,0,0,0,0,0,0,0, , , ,0,0,0,0,0,0,0,0,0,0,0,0,0, , , ,0,0,0,0,0,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , ,0,0,0,0,0, , , , , , ,0,0, , , , , ,0,0,0,0,0, , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , ,0,0,0,0,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,0,0, , , , , , , , , , , , , , ,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]
