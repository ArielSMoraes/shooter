function FactoryParticle (){}

FactoryParticle.prototype.createShoot = function (x,y,type, playerRef)
{
	switch (type)
	{
		case "fire":
		playerRef.particle.push(new FireShoot(x,y));
		break;
		
		case "basic" :
		playerRef.particle.push(new BasicShoot(x,y));
		break;
				
		case "multiple" :
		playerRef.particle.push(new MultipleShoot(x,y,0));
		playerRef.particle.push(new MultipleShoot(x,y,2));
		playerRef.particle.push(new MultipleShoot(x,y,-2));
		break;
	}
}
