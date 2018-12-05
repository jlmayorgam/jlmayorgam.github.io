var galeria={
	preload: function() {
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;         // Escala la imagen al reducir el tamaño de la ventana
		var j;
		var key1,key2;
		for(j=1;j<=size;j++){
			key1="fondo"+j;
			key2= "imagenes/"+k+j+".jpg";
			juego.load.image(key1, key2);
						}
		juego.load.image("button", "imagenes/arrow.png");
		juego.load.image("buttonx", "imagenes/close-button.png");
		}, 
	create: function(){
		
		juego.stage.backgroundColor = '#000000'; //le da un color de fondo al canvas
		juego.world.setBounds(0, 0, width, height); //crea limites para centrar imagen con world.center
		
		fondojuego = juego.add.image(juego.world.centerX , juego.world.centerY, ("fondo"+i)); //situa la imagen 
		
		ratio= fondojuego.height/fondojuego.width; //relacion de ancho y alto de la imagen 
		this.resize(ratio); // escala la imagen 
		
		//fondojuego.visible=false;
		
		// crea, situa y redimensiona al  botón que cambia a la siguiente imagen 		
		boton1 = juego.add.button(width, height/2, "button", next, this);
		boton1.anchor.setTo(1,0.5);
		boton1.scale.setTo(width*0.1/boton1.width);	
		
		// crea, situa y redimensiona al botón que cambia a la anterior imagen 
		boton2 = juego.add.button(0, height/2, "button", prev, this);
		boton2.anchor.setTo(1,0.5);
		boton2.scale.setTo(-width*0.1/boton2.width , width*0.1/boton2.width);
		
		// crea, situa y redimensiona al botón que cierra el estado
		boton3 = juego.add.button(width, 0, "buttonx", close, this);
		boton3.anchor.setTo(1,0);
		boton3.scale.setTo(width*0.1/boton3.width);			
		
		
		}
		, 
resize: function(ratio){ //funcion que redimensiona la imagen para que se vea de una forma apropiada 
		
		if(ratio<1){
			fondojuego.width= 0.8*width;
			fondojuego.height=ratio*0.8*width;
			fondojuego.anchor.setTo(0.5);
		}else{
			fondojuego.height=0.8*height;	
			fondojuego.width= 0.8*height/ratio;
			fondojuego.anchor.setTo(0.5);
		}
	}
	

}
function next(){ // cambia a la siguiente imagen 
	
	if(i<size){
		i=i+1;	//pasa al siguiente numero de imagen 	
	    keys = "fondo" + i;	 // representa el codifgo de la siguiente 			
		fondojuego.loadTexture(keys);	//cambia la imagen 
		ratio= fondojuego.height/fondojuego.width;	// para mantener la proporcion al redimensionar
		this.resize(ratio); //redimensiona la imagen 
	}else{
		i=0; //resetea el conteo al llegar a la ultima imagen 
		next(); //envia a la primera imagen de nuevo. 
		}
		
	}
function prev(){
	if(i>1){
		i=i-1;	 //pasa al anterior nuemero de imagen 	
	    keys = "fondo" + i;	// representa el "código" de la anterior imagen  
		fondojuego.loadTexture(keys); //cambia la imagen 	
		ratio= fondojuego.height/fondojuego.width;	//para mantener la proporcion al redimensionar
		this.resize(ratio);	//redimensiona la imagen 
	}else{
		i=size+1; //resetea el conteo al llegar a la primer imagen 
		prev(); //envia a la última imagen
		}
		
	}
function close(){
		juego.state.start("activo"); // abre el estado principal, cierra el actual. 
	}
juego.state.add("galeria", galeria);

	