var werewolf, squareSize, score, speed, updateDelay, direction, new_direction, addNew, cursors, scoreTextValue, 
textStyle_Key, textStyle_Value, meatArr, silverArr;

var Game = {
    preload: function(){
        game.load.spritesheet('werewolf', './assets/images/werewolf.png', 46, 46); //46 by 46 is the perfect size
        game.load.spritesheet('meat', './assets/images/food.png', 16, 17); //load meat sprite
        game.load.spritesheet('silver', './assets/images/silver.png', 37, 35); //load silver sprite
    },

    create: function(){
        //setup physics for wall collision
        game.physics.startSystem(Phaser.Physics.ARCADE);

        werewolf = [];
        meatArr = [];
        silverArr = [];
        squareSize = 46;
        score = 0;
        speed = 0;
        updateDelay = 0;
        direction = 'right';
        new_direction = null;
        addNew = false; //not sure if I need this

        cursors = game.input.keyboard.createCursorKeys();

        game.stage.backgroundColor = '#061f27';

        //add werewolf sprite from spritesheet. Werewolf direction determines which sprite is used.
        werewolf = game.add.sprite(150, 150, 'werewolf');
        werewolf.animations.add('left', [0], 10, true);
        werewolf.animations.add('right', [2], 10, true);
        werewolf.animations.add('down', [1], 10, true);
        werewolf.animations.add('up', [3], 10, true);

        //check if werewolf is colliding with the world bounds
        game.physics.enable(werewolf, Phaser.Physics.ARCADE);
        werewolf.body.collideWorldBounds = true;
        werewolf.checkWorldBounds = true;
        werewolf.events.onOutOfBounds.add(function(){
            console.log('out of bounds');
        });
        

        for(var i=0; i<10; i++){
            this.generateSilver();
        }

        for(var i=0; i<10; i++){
            this.generateMeat();
        }

        //styling for text at the top of the game
        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        // Score.
        game.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(90, 18, score.toString(), textStyle_Value);

    },

    update: function(){
        if(cursors.right.isDown){
            new_direction = 'right';
        } else if(cursors.left.isDown){
            new_direction = 'left';
        } else if(cursors.up.isDown){
            new_direction = 'up';
        } else if(cursors.down.isDown){
            new_direction = 'down';
        }

        speed = 2;
        // keep speed constant at 2

        updateDelay++;

        if(updateDelay % (8-speed) == 0){
            //console.log('werewolf', werewolf, 'isarray?', Array.isArray(werewolf), 'isobject?', typeof werewolf);
            // var firstCell = werewolf,
                
            //     lastCell = werewolf;
            //     oldLastCellx = lastCell.x,
            //     oldLastCelly = lastCell.y;

            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }

            if(direction == 'right'){
                werewolf.x = werewolf.x + 15;
                werewolf.y = werewolf.y;
                // lastCell.x = firstCell.x + 45;
                // lastCell.y = firstCell.y;
                werewolf.animations.play('right');
            } else if(direction == 'left'){
                werewolf.x = werewolf.x - 15;
                werewolf.y = werewolf.y;
                // lastCell.x = firstCell.x - 45;
                // lastCell.y = firstCell.y;
                werewolf.animations.play('left');
            } else if(direction == 'up'){
                werewolf.x = werewolf.x;
                werewolf.y = werewolf.y - 15;
                werewolf.animations.play('up');
            } else if(direction == 'down'){
                werewolf.x = werewolf.x;
                werewolf.y = werewolf.y + 15;
                // lastCell.x = firstCell.x;
                // lastCell.y = firstCell.y - 15;
                werewolf.animations.play('down');
            }

            var thisObj = this;
            meatArr.forEach(function(meatPiece){
                thisObj.meatCollision(meatPiece);
            }); //for each meatPiece, check to see if the werewolf's location is the same as the meatPiece

            //this.wallCollision(werewolf);
            //place the last cell in front of the stack
            // werewolf.push(lastCell);
            // firstCell = lastCell;
        }

    },

    generateSilver: function(){
        var randomX = Math.floor(Math.random() * 14) * squareSize,
            randomY = Math.floor(Math.random() * 12) * squareSize;
        
        var silver = game.add.sprite(randomX, randomY, 'silver');
        silver.frame = 7;
        silverArr.push(silver);
    },

    generateMeat: function(){
        var randomX = Math.floor(Math.random() * 14) * squareSize,
            randomY = Math.floor(Math.random() * 12) * squareSize;
        
        var meat = game.add.sprite(randomX, randomY, 'meat');
        meat.frame = 140;
        meatArr.push(meat);
    },

    meatCollision: function(food){
        if(werewolf.x >= food.x-25 && werewolf.x <= food.x+25 && werewolf.y >= food.y-25 && werewolf.y <= food.y+25){
            // because the x, y coordinates of the meat and werewolf never line up perfectly, give a range of overlapping variables
            food.destroy();
            score++;
            scoreTextValue.text = score.toString();
        }
    },

    // wallCollision: function(character){
    //     if(character.x >= 720 || character.x <= 0 || character.y >= 600 || character.y <= 0){
    //         console.log('hit a wall');
    //     }
    // }
}