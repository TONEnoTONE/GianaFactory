define(function(){
	return [
		//WALKING MIRROR
		{
			song : "Walking Mirror",
			sample : "WalkingMirror.mp3",
			stars : [
				{
					x : 64.45, 
					y : 13.81, 
					size : 1.1
				},
				{
					x : 66.44, 
					y : 16.04,
					size : 0.74
				},
				{
					x : 69.4, 
					y : 14.3,
					size : 0.74
				},
				{
					x : 70.8, 
					y : 17.91,
					size : 0.74
				},
				{
					x : 72.88, 
					y : 16.04,
					size : 0.74
				},
			],
			edges : [
				[0, 1],
				[0, 2],
				[1, 2],
				[2, 3],
				[2, 4],
				[3, 4]
			]
		},
		//LEMON MOON
		{
			song : "Lemon Moon",
			sample : "WalkingMirror.mp3",
			stars : [
				{
					x : 0, 
					y : 0,
					size: 1.1
				},
				{
					x : 2, 
					y : 0,
					size: 1.1
				},
				{
					x : 4, 
					y : 0,
					size: 1.1
				},
				{
					x : 6, 
					y : 0,
					size: 1.1
				},
			],
			edges : [
			]
		}
	];
});