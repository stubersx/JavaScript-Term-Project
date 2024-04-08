/* set variables */
let gamePiece;
let gameObstacles = [];
let gameScore;
let gameBackground;
let gameOver;

/* add components */
function startGame(){
    gameArea.start();
    gamePiece =  new component(122, 55, "media/helicopter.png", 10, 220, "image");
    gameScore =  new component("28px", "serif", "white", 575, 50, "text");
    gameBackground = new component(1276, 500, "media/sky.jpg", 0, 0, "background");
    gameOver =  new component("40px", "serif", "red", 262, 255, "text");
}

/* set game area */
let gameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 750;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[4]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        /* Controller Keys */
        window.addEventListener("keydown", function(e){
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener("keyup", function(e){
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
        clearInterval(this.interval);
    }
}

/* set components */
function component(width, height, color, x, y, type){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.type = type;
    this.update = function(){
        let ctx = gameArea.context;
        ctx.fillStyle = color;
        if(this.type == "image" || this.type == "background")
        {
            this.image = new Image();
            this.image.src = color;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

            /* Background Option2: Moving
            if(this.type == "background")
                ctx.drawImage(this.image, (this.x + this.width), this.y, this.width, this.height);
            */

        }
        else if(this.type == "text")
        {
            ctx.font = this.width + " " +  this.height;
            ctx.fillText(this.text, this.x, this.y);
        }
        else
            ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.check = function(obs){
        if(this.y > (obs.y + obs.height) || (this.y + this.height) < obs.y ||
            this.x > (obs.x + obs.width) || (this.x + this.width) < obs.x)
            return false;
        else
            return true;
    }
}

/* move components */
function updateGameArea(){
    for(let i = 0; i < gameObstacles.length; i++)
    {
        if(gamePiece.check(gameObstacles[i]))
        {
            gameArea.stop();
            gameOver.text = "GAME OVER";
            gameOver.update();
            return;
        }
    }
    gameArea.clear();

    /* Controller Keys */
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
    if(gameArea.keys && gameArea.keys[37])
        gamePiece.speedX = -5;
    if(gameArea.keys && gameArea.keys[38])
        gamePiece.speedY = -5;
    if(gameArea.keys && gameArea.keys[39])
        gamePiece.speedX = 5;
    if(gameArea.keys && gameArea.keys[40])
        gamePiece.speedY = 5;

    /* Background Option2: Moving
    gameBackground.x -= 1;
    if(gameBackground.x == -(gameBackground.width))
        gameBackground.x = 0;
    */

    gameBackground.update();
    let x, height, minHeight, maxHeight, gap, minGap, maxGap;
    gameArea.frameNo += 1;
    if(gameArea.frameNo == 1 || everyInterval(100))
    {
        x = gameArea.canvas.width;
        minHeight = 50;
        maxHeight = 300;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 65;
        maxGap = 300;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        gameObstacles.push(new component(25, height, "black", x, 0));
        gameObstacles.push(new component(25, x - height - gap, "black", x, height + gap));
    }
    for(let i = 0; i < gameObstacles.length; i++)
    {
        gameObstacles[i].x -= 5;
        gameObstacles[i].update();
    }
    gameScore.text = "SCORE: " + gameArea.frameNo;
    gameScore.update();
    gamePiece.newPos();
    gamePiece.update();
}

/* obstacle interval */
function everyInterval(n){
    if((gameArea.frameNo / n) % 1 == 0)
        return true;
    else
        return false;
}

/* Controller Option2: Buttons
function moveUp(){
    gamePiece.speedY -= 1;
}
function moveDown(){
    gamePiece.speedY += 1;
}
function moveLeft(){
    gamePiece.speedX -= 1;
}
function moveRight(){
    gamePiece.speedX += 1;
}
function clearMove(){
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
}
*/
