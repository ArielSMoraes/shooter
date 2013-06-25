function MultipleShoot (x,y,hasteX)
{
	this.height = 15;
	this.width = 4;
		
	this.x = x - (this.width/2);
	this.y = y - this.height;
	
	this.face = 0;
	this.hasteX = hasteX;
	this.hasteY = 5;
	
	this.image = new Image();
	this.image.src = "images/basic.png";
}

MultipleShoot.prototype.draw = function ()
{
	context.drawImage(this.image, 0.5, this.face, this.width, this.height, this.x, this.y, this.width, this.height);
}

MultipleShoot.prototype.move = function()
{
	this.y = this.y - this.hasteY;
	this.x = this.x + this.hasteX ;
	if(this.y < 0)
	{
		return true;
	}
}