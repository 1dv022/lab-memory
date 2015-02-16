window.memory = function(rows, cols, container){
	'use strict';
	

	var app = {

		tiles : [],
		lastIndex : undefined,
		turn1 : null,
		turn2 : null,
		pair : 0,

		init: function () {
			console.log("Started " + rows + "x" + cols + " memory in " + container.id);

			this.tiles = this.getPictureArray(rows, cols);
		
			this.tiles.forEach(function(brick, index){
				var a = document.createElement("a");
				a.setAttribute("href", "#");
				
				var img = document.createElement("img");
				img.setAttribute("src", "images/0.png");
				
				a.appendChild(img);
				container.appendChild(a);

				a.addEventListener("click", function(e){
					e.preventDefault();
					this.turnBrick(a, img, index);
				}.bind(this));

			}.bind(this));

		},

		turnBrick : function(a, img, index){
			
			// If image already clicked
			if(img.getAttribute("src") != "images/0.png") { return; }
			// If two images alerady clicked
			if(this.turn1 && this.turn2){ return; };
			

			img.setAttribute("src", "images/"+this.tiles[index]+".png");
			
			if(!this.turn1){
				//first turned tile
				this.turn1 = img;
				this.lastIndex = index;
				return;
			} 
		
			//second turned tile
			this.turn2 = img;
		

			if(this.tiles[index] == this.tiles[this.lastIndex]){
				this.turn1 = null;
				this.turn2 = null;

				this.pair += 1;

				if(this.pair >= (rows*cols)/2){
					console.log("Du vann!");

				}
			} else {				
				window.setTimeout(function(){
					this.turn1.setAttribute("src", "images/0.png");
					this.turn2.setAttribute("src", "images/0.png")
					this.turn1 = null;
					this.turn2 = null;
				}.bind(this), 1000);
				
			}

		},

		getPictureArray : function(x, y){
			var arr = [];

			for(var i =1; i <= (x*y)/2; ++i){
				arr.push(i);
				arr.push(i);
			}

			arr.sort(function(a,b){
    			return Math.floor(Math.random()*3 - 1);
			});

			return arr;
		}
	}


	app.init();
};

