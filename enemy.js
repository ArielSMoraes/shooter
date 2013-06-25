Enemy = function (x, y)
{	
	this.x = x;
	this.y = y;
	this.width = 30;
	this.height = 22;
	this.hasteX = 1;
	this.hasteY = 1;
	this.valueScore = 10;
	
	this.image = new Image();
	this.image.src = "images/invaders1.gif";
}

Enemy.prototype.draw = function (context)
{
	context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}

Enemy.prototype.moveDown = function (interval, enemyRef)
{
	setInterval(function(){
		enemyRef.y = enemyRef.y + enemyRef.hasteY;
	},
	interval
	);
}

Enemy.prototype.moveHorizontal = function (interval, enemyRef, minWidth, maxWidth)
{
	var add = true;
	setInterval(function(){
		if(enemyRef.x < minWidth)
		{
			add = true;
		}
		else if (enemyRef.x > maxWidth)
		{
			add = false;
		}
		if(add)
		{
			enemyRef.x = enemyRef.x + enemyRef.hasteX;
		}
		else
		{
			enemyRef.x = enemyRef.x - enemyRef.hasteX;
		}
	},
	interval
	);
}

Enemy.prototype.randomPos = function(sceneRef)
{
	var x = randomNum(0, (sceneRef.width - this.width));
	this.x = x;
}