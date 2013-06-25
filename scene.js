Scene = function (contextRef, canvas)
{
	this.height = document.getElementById("canvas").height;
	this.width = document.getElementById("canvas").width;
	
	this.backgroundImg = new Image();
	this.backgroundImg.src = 'images/spaceBG.png';
	
	this.x = 0;
	
	this.speedEnemyXMin = 0.5;
	this.speedEnemyXMax = 0.9;
	
	this.speedEnemyYMin = 0.5;
	this.speedEnemyYMax = 3;
	
	this.enemyCreateDelay = 500;
}

Scene.prototype.setPattern = function (context)
{
	this.pattern = context.createPattern(this.backgroundImg, 'repeat');
	this.y = (this.backgroundImg.height - canvas.height);
}

Scene.prototype.drawScene = function (context, canvas)
{
	this.y--;
	if(this.y == 0)
	{
		this.y = this.backgroundImg.height - canvas.height;
	}
	
	context.drawImage(this.backgroundImg, this.x, this.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
	
}

Scene.prototype.drawFps = function (context, fps)
{
	context.font = '12px Arial';
	context.fillStyle = 'red';
	context.fillText('FPS: ' + fps, 0, 10);
}

Scene.prototype.drawScore = function (context, PlayerRef)
{
	context.font = 'bold 18px Arial';
	context.fillStyle = 'green';
	context.fillText('Pontos: ' + PlayerRef.score, 0, 40);
}

Scene.prototype.colisionDeath = function(player, enemy)
{
	for (i = 0; i < player.hitBox.length; i++)
	{
		if (this.checkColision(player.hitBox[i], enemy))
		{
			return true;
		}
	}
}

Scene.prototype.colisionShot = function(playerRef, enemyRef, enemyArray, index)
{
	for (var i = 0; i < playerRef.particle.length; i++)
	{
		if (typeof playerRef.particle[i] != 'undefined' )
		{
			if(this.checkColision(playerRef.particle[i], enemyRef))
			{
				playerRef.particle[i].draw(context);
				playerRef.particle.splice(i,1);
				enemyArray.splice(index, 1);
				playerRef.addScore(enemyRef.valueScore);
				this.changesScore(playerRef, enemyArray);
				return true;
			}
		}
	}
	return false;
}

Scene.prototype.colisionScene = function(playerRef)
{
	var endScene = false;
	for (var i = 0; i < playerRef.particle.length; i++)
	{
		if (typeof playerRef.particle[i] != 'undefined' )
		{
			playerRef.particle[i].draw(context);
			endScene = playerRef.particle[i].move();
			//tiro no fim da tela
			if(endScene)
			{
				playerRef.particle.splice(i,1);
				i--;
			}
		}
	}
}

Scene.prototype.enemyEndScene = function(enemyRef, enemyArray, sceneRef, index)
{
	if(enemyRef.y >= sceneRef.height)
	{
		enemyArray.splice(index,1);
		return true;
	}
	return false;
}

Scene.prototype.randomEnemy = function(enemysRef)
{
	var frenquenciaMovimento = 20;
	sceneRef = this;
	sceneRef.intervalEnemy = setInterval(function(){
		var newEnemy = new Enemy(0, 0);
		newEnemy.randomPos(sceneRef);
		newEnemy.hasteX = randomNum(sceneRef.speedEnemyXMin,sceneRef.speedEnemyXMax);
		newEnemy.hasteY = randomNum(sceneRef.speedEnemyYMin,sceneRef.speedEnemyYMax);
		newEnemy.moveDown(frenquenciaMovimento, newEnemy);
		newEnemy.moveHorizontal(frenquenciaMovimento, newEnemy, randomNum(0, sceneRef.width/2), randomNum(sceneRef.width/2, sceneRef.width) );
		enemysRef.push(newEnemy);
	},
	sceneRef.enemyCreateDelay
	);
}

Scene.prototype.changesScore = function(playerRef, enemyArray)
{
	switch(playerRef.score)
	{
		case 30:
		clearInterval (this.intervalEnemy);
		this.enemyCreateDelay = 200;
		this.randomEnemy(enemyArray);
		playerRef.shootingTime = 300;

		break;

		case 90:
		clearInterval (this.intervalEnemy);
		this.enemyCreateDelay = 150;
		this.randomEnemy(enemyArray);
		playerRef.shootingTime = 200;
		break;

		case 180:
		clearInterval (this.intervalEnemy);
		this.enemyCreateDelay = 100;
		this.randomEnemy(enemyArray);
		playerRef.shootingTime = 150;
		playerRef.typeShoot = "fire";
		break;

		case 400:
		clearInterval (this.intervalEnemy);
		this.enemyCreateDelay = 80;
		this.randomEnemy(enemyArray);
		playerRef.shootingTime = 100;
		break;

		case 800:
		clearInterval (this.intervalEnemy);
		this.enemyCreateDelay = 40;
		this.randomEnemy(enemyArray);
		playerRef.shootingTime = 80;
		playerRef.typeShoot = "multiple";
		break;

		case 1600:
		clearInterval (this.intervalEnemy);
		this.enemyCreateDelay = 10;
		this.randomEnemy(enemyArray);
		playerRef.shootingTime = 50;
		break;
	}
}

Scene.prototype.checkColision = function (objA, objB)
{
//COLISION
	var leftA = 0;
	var leftB = 0;
	var rightA =0;
	var rightB = 0;
	var topA = 0;
	var topB = 0;
	var bottomA = 0;
	var bottomB = 0;
	
	//pega a posição que começa o objeto como sua esquerda, e sua direita é a posição que começa + a sua largura
	leftA = objA.x;
	rightA = objA.x + objA.width;
	topA = objA.y;
	bottomA = objA.y + objA.height;
	
	leftB = objB.x;
	rightB = objB.x + objB.width;
	topB = objB.y;
	bottomB = objB.y + objB.height;
	
	//verifica se algum lado do A esta dentro do B, no fim ao menos 2 lados do retangulo tem de estar dentro
	//no caso, A pode estar na mesma altura de B, mas para colidir seu lado esquerdo, ou direito devem estar dentro de B.
	//então se algum dos lados, estiver distante do outro retangulo, não é preciso mais verificar.
	if( bottomA <= topB ) { return false; }
	if( topA >= bottomB ) { return false; }
	if( rightA <= leftB ) { return false; }
	if( leftA >= rightB ) { return false; }
	
	return true;
//COLISION - END
}