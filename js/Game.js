class Game {
  constructor(){
    this.Rank1=loadImage("images/Rank1.png");
    this.Rank2=loadImage("images/Rank2.png");
    this.Rank3=loadImage("images/Rank3.png");
    this.Rank4=loadImage("images/Rank4.png");

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("gold")
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){//&&passed!==true){
      player.distance +=30
      player.update();
    }

    if(player.distance > 3500){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
      if(player.rank==1){
        image(this.Rank1,displayWidth/2,-displayHeight*4);

      }
      if(player.rank==2){
        image(this.Rank2,displayWidth/2,-displayHeight*4);
        
      }
      if(player.rank==3){
        image(this.Rank3,displayWidth/2,-displayHeight*4);
        
      }
      if(player.rank==4){
        image(this.Rank4,displayWidth/2,-displayHeight*4);
        
      }

      //     passed=true
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
}
