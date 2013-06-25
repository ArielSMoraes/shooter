const faceShot = {"animate1" : 0, "animate2" : 50, "animate3" : 98, "animate4" : 155};

function FireShoot (x,y)
{
	this.height = 45;
	this.width = 12;
		
	this.x = x - (this.width/2);
	this.y = y - this.height;
	
	this.face = faceShot.animate1;
	this.animateShot = 1;
	
	this.haste = 10;
	
	this.image = new Image();
	this.image.src = "images/shot2.png";
}

FireShoot.prototype.draw = function ()
{
	context.drawImage(this.image, 0, this.face, this.width, this.height, this.x, this.y, this.width, this.height);
	if (this.animateShot > 4)
	{
		this.animateShot = 1;
	}
	
	switch (this.animateShot)
	{
		case 1 : 
		this.face = faceShot.animate1;
		break;
		
		case 2 : 
		this.face = faceShot.animate2;
		break;
		
		case 3 : 
		this.face = faceShot.animate3;
		break;
		
		case 4 : 
		this.face = faceShot.animate4;
		break;
	}
	this.animateShot++;
}

FireShoot.prototype.move = function()
{
	this.y = this.y - this.haste;
	if(this.y < 0)
	{
		return true;
	}
}