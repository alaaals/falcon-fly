let coin;
let fire;
let knife;
let rock;
let c1;
let c2;
let c3;
let c4;
let o1;
let o11;
let o2;
let o22;
let o3;
let o33;
let player_x =350;
let player_y = 400;
let score=0;
let healthbar=7;
let background1;
let front;
let b_right;
let b_left;
let left = 68;
let right = 65;
let b_size = 130;
let p1 = -736;
let p2 = 0; 
let game_song;
let heart;
let screen_speed;
let obj_speed;
let bar;
let hit = 15;
let screen= 0;// start screen, end screen (1 for start, 2 play, 3 for end)
let difficulty;
let sp;
let button;
let dropdown;
let diff;
let end_button;
let eagle;
let sky;
let eagle_end;
let highscore;
let s_coin;
let s_obj;


function preload(){

	//game background
	background1 = loadImage("images/sky_game.jpeg");

	//object external graphics
	front = loadImage("images/front.png");
	b_right = loadImage("images/right2.png");
	b_left = loadImage("images/left2.png");
	heart = loadImage("images/heart1.png");
	coin =  loadImage("images/coin.png");
	fire = loadImage("images/fire.png");
	knife = loadImage("images/knife1.png");
	rock = loadImage("images/rock.png");

	//start game background
	eagle = loadImage("images/eagle1.png")
	sky = loadImage("images/start.jpeg")


	//end game background
	eagle_end = loadImage("images/sad.png");


	//sounds
	s_coin = loadSound("sounds/coin_sound.mp3");
	s_obj = loadSound("sounds/oof.mp3");
	//game_song = loadSound("sounds/game1.pm3");
	//game_song = loadSound("sounds/game.pm3");





}

function setup(){
	let cnv = createCanvas(700,600);

	cnv.parent('#canvas_container');

		button = createButton('Start game');
  	button.position(530,630);

  	button.mousePressed(playGame);

  	end_button = createButton('Start Again');
  	end_button.position(530,630);
  	
  	end_button.mousePressed(startGame);

  	screen=0;
  	score=0;


	highscore = window.localStorage.getItem('high_score');

	if(highscore == null){

		window.localStorage.setItem('high_score',0);

		highscore=0;


	}

	else{
		highscore = int(highscore);
	}



}



function draw(){


	if(screen==0){
		startGame();

	}

	else if(screen==1){
		playGame();
		//game_song.play();
		
	}

	else if(screen==2){
		endgame();
	}


	dropdown = document.querySelector('#diff_dropdown');
	diff= dropdown.value;






	

}

function startGame(){

	screen=0;
	score=0


	background(0,138,216);

	image(sky,0,0,700,600)

	image(eagle, 0,0,700,600);
	

	button.position(530,630);
	end_button.position(100000,100000);



	fill(150,75,0);
	rect(260,70,150,50,10,20);

	fill(255);
	textSize(20);
	text("Eagle Dodge", 270,100);

	fill(0);
  text("Please choose a difficulty level: ", 300,595);


 	fill(255);
  rect(260,170,155,50,20);
  fill(0);
  noStroke();
  text("High Score: "+highscore,270,200);

  


	if(diff=='easy'){
		sp = 2;


	}

	else if(diff=='medium'){
		sp = 4;

	}

	else if (diff=='hard'){
		sp= 5;
	}



	c1= new Coin(50,50,sp);
	c2= new Coin(100,10,sp);
	c3= new Coin(400,10,sp);
	c4= new Coin(500,15,sp);


	o1 = new Obstacle(random(10,600),-10,sp, knife,30,50);
	o11 = new Obstacle(random(20,600),-50,sp, knife,30,50);
	o2 = new Obstacle(random(20,600),-65,sp, fire,35,35);
	o22 = new Obstacle(random(20,600),-5,sp, fire,35,35);
	o3 = new Obstacle(random(20,600),-20,sp, rock,40,40);
	o33 = new Obstacle(random(20,600),-40,sp, rock,40,40);
	


}



function playGame(){

	screen = 1;

	dropdown.style.display = "none";

  	button.position(10000,10000);

	background(0);

	imageMode(CORNER);
	
	image(background1,0,p1);
	image(background1,0,p2);

	p1 += 2;
	p2 += 2;

	if(p1 >= 736){
		p1 = p2 - 736;

	}

	if(p2 >= 736){
		p2 = p1 - 736;
	}

	fill(0);

	image(heart, 8, 25, 30,30);



		if(keyIsDown(left)){
			player_x+=5;
			image(b_right, player_x,player_y, b_size,b_size);

		}

		else if(keyIsDown(right)){
			player_x-=5;
			image(b_left, player_x,player_y, b_size,b_size);

		}

		else{
			image(front, player_x,player_y, b_size,b_size);

		}

		if(player_x<=7){
			player_x = 7;
		}

		if(player_x>=575){
			player_x=575;
		}	

		
	health_bar();



	c1.MoveAndDisplay();
	c1.get_collected();


	c2.MoveAndDisplay();
	c2.get_collected();


	c3.MoveAndDisplay();
	c3.get_collected();

	c4.MoveAndDisplay();
	c4.get_collected();


	o1.MoveDisplay();
	o1.detect_impact();

	o11.MoveDisplay();
	o11.detect_impact();

	o2.MoveDisplay();
	o2.detect_impact();

	o22.MoveDisplay();
	o22.detect_impact();

	o3.MoveDisplay();
	o3.detect_impact();

	o33.MoveDisplay();
	o33.detect_impact();

	if(o1.oy>width/2){

		o11.MoveDisplay();
		o11.detect_impact();
			
		}

	if(o2.oy>width/2){
		o22.MoveDisplay();
		o22.detect_impact();


	}

	if(o3.oy>width/2){
		o33.MoveDisplay();
		o33.detect_impact();

	}


	fill(0);
	textSize(30);
	text("Score: "+score, 150, 50);


	if (healthbar < 1){
		screen=2;
	}


	


}


function endgame(){

	screen = 2;

	if(score>highscore){
		highscore=score;
	}

	background(150,75,0);

	image(eagle_end,0,0,600,700);

	fill(255);

	text("You lost!", 512,150);

	text("Play again?",512,195);

	text("Score: "+score, 540,500);

	text("High score: "+highscore, 230,500);



	dropdown.style.display = "block";

	button.position(530,630);
	end_button.position(530,630);
	healthbar=7;
	//text(mouseX+","+mouseY, mouseX, mouseY);


}



function health_bar(){
	fill(0);
  	rect(41,27,99,20);

  
  
  if (healthbar == 7){
    fill('green');
    bar = rect(43,30,95,14);
    
    
  }
  else if(healthbar == 6){
      fill('green');
      bar = rect(43,30,80,14);
  }
  
  else if(healthbar == 5){
      fill('green');
      bar = rect(43,30,65,14);
    
  }
  
  else if(healthbar == 4){
      fill('green');
      bar = rect(43,30,50,14);
  }
  
  else if(healthbar == 3){
      fill('green');
      bar = rect(43,30,35,14);
    
  }
  
  else if(healthbar == 2){
      fill('green');
      bar = rect(43,30,20,14);
    
  }
  
  else if (healthbar == 1){
      fill('green');
      bar = rect(43,30,10,14);
  }
  
  else{
    
        fill('green');
      bar = rect(43,30,2,14);
  }
  
  
  
}


class Coin{

	constructor(x_pos, y_pos, yspeed){
		this.x_pos = x_pos;
		this.y_pos = y_pos;
		this.yspeed = yspeed;



	}

	MoveAndDisplay(){


		fill(255,255,0);

		image(coin, this.x_pos,this.y_pos,30,30);

		this.y_pos += this.yspeed;
		

		if(this.y_pos >width){

			this.y_pos=-10;
			this.x_pos=random(50,550);


		}

	}


	get_collected(){

		if(this.y_pos > player_y && this.y_pos < player_y + b_size-10&& this.x_pos < player_x + b_size && this.x_pos > player_x){
			this.y_pos=1000;
			this.x_pos=1000;
			score++;
			if(score > highscore){
				localStorage.setItem('high_score', score);

			}
			s_coin.play();
			return true;
		}

	}


}


class Obstacle{

	constructor(ox, oy, oyspeed, o_graphic,o_w,o_h){
		this.ox = ox;
		this.oy = oy;
		this.oyspeed= oyspeed;
		this.o_graphic = o_graphic;
		this.o_w=o_w;
		this.o_h=o_h;
		

	}

	MoveDisplay(){
		
		image(this.o_graphic, this.ox, this.oy, this.o_w,this.o_h);



		this.oy += this.oyspeed;


		if(this.oy>width){
			this.oy = -20;
			this.ox = random(20,560);
		}


	}

	detect_impact(){

		if(this.oy > player_y && this.oy < player_y + b_size-10&& this.ox < player_x + b_size && this.ox > player_x){
			this.oy=1000;
			this.ox=1000;
			healthbar -= 1;
			s_obj.play();
		}


	}


}