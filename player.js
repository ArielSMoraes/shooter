Player = function()
{
	this.faces = {"left" : 0, "center" : 56, "right" : 112};
	
	this.x = 0;
	this.y = 0;
	this.width = 51;
	this.height = 90;
	this.face = this.faces.center;
	this.haste = 5;
	this.score = 0;
	this.canShot = true;
	this.shootingTime = 300;
	this.typeShoot = "basic";
	
	//factory particles
	this.factoryParticle = new FactoryParticle();
	
	this.image = new Image();
	this.image.src = "images/sprite-ship.png";
	
	this.particle = new Array();
	
	this.hitBox = new Array();
	this.setHitBox();
}

Player.prototype.setFace = function(position)
{
	this.face = position;
}

Player.prototype.draw = function(context)
{
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.lineWidth = 1;
    context.strokeStyle = 'pink';
    context.stroke();
	context.closePath();

	context.drawImage(this.image, this.face, 0, this.width, this.height, this.x, this.y, this.width, this.height);
}

Player.prototype.addScore = function(score)
{
	this.score += score;
}

Player.prototype.setHitBox = function()
{
	this.hitBox[0] = new Object();
	this.hitBox[1] = new Object();
	
	this.hitBox[0].x = 0;
	this.hitBox[0].y = 0;
	this.hitBox[0].width = 15;
	this.hitBox[0].height = this.height;
	
	this.hitBox[1].x = 0;
	this.hitBox[1].y = 0;
	this.hitBox[1].width = this.width;
	this.hitBox[1].height = 20;
}

Player.prototype.refreshHitBox0 = function()
{
	this.hitBox[0].x = this.x + 18;
	this.hitBox[0].y = this.y;
}

Player.prototype.refreshHitBox1 = function()
{
	this.hitBox[1].x = this.x;
	this.hitBox[1].y = this.y + 50;
}

Player.prototype.refreshHitBox = function()
{
	this.refreshHitBox0();
	this.refreshHitBox1();
}

/* nivel de implementação */
Player.prototype.drawHitBox = function(context)
{
	this.drawHitBox0(context);
	this.drawHitBox1(context);
}

Player.prototype.drawHitBox0 = function(context)
{
	context.beginPath();
	context.rect(this.hitBox[0].x, this.hitBox[0].y, this.hitBox[0].width, this.hitBox[0].height);
	context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.stroke();
	context.closePath();
}

Player.prototype.drawHitBox1 = function(context)
{
	context.beginPath();
	context.rect(this.hitBox[1].x, this.hitBox[1].y, this.hitBox[1].width, this.hitBox[1].height);
	context.lineWidth = 1;
    context.strokeStyle = 'red';
    context.stroke();
	context.closePath();
}
/* nivel de implementação - FIM */

Player.prototype.actions = function (keysEnabled, scene, playerRef, shootingTime)
{
	if(keysEnabled[39])
	{
		//direita
		this.setFace(this.faces.right);
		this.x = this.x + this.haste;
		if (this.x > (scene.width - this.width))
		{
			this.x = scene.width - this.width;
		}
		this.refreshHitBox();
	}

	if(keysEnabled[37])
	{
		//esquerda
		this.setFace(this.faces.left);
		this.x = this.x - this.haste;
		if (this.x < 0)
		{
			this.x = 0;
		}
		this.refreshHitBox();
	}

	if(keysEnabled[40])
	{
		//baixo
		this.setFace(this.faces.center);
		this.y = this.y + this.haste;
		if (this.y > scene.height - this.height)
		{
			this.y = scene.height - this.height;
		}
		this.refreshHitBox();
	}

	if(keysEnabled[38])
	{
		//cima
		this.setFace(this.faces.center);
		this.y = this.y - this.haste;
		if (this.y < (scene.height / 2) )
		{
			this.y = scene.height / 2;
		}
		this.refreshHitBox();
	}
	
	if(keysEnabled[32] && this.canShot)
	{
		this.factoryParticle.createShoot( (this.x + (this.width/2) ), this.y, this.typeShoot, this );
		this.canShot = false;
		setTimeout(function(){playerRef.canShot = true},this.shootingTime);
	}
}