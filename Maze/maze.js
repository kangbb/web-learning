var start = false;
var end = false;
var cvs_out = false;
var knock_wall = false;
var wall_order = -1;
window.onload = function () {
    var c = document.getElementById("Maze");
    var ctx = c.getContext("2d");
    c.width = "400";
    c.height = "250";
    ctx.lineWidth = 1;
        /*draw the maze*/
        ctx.beginPath();
        ctx.moveTo(1,1);
        ctx.lineTo(1,170);
        ctx.lineTo(100, 170);
        ctx.lineTo(100, 50);
        ctx.lineTo(300, 50);
        ctx.lineTo(300, 170);
        ctx.lineTo(399, 170);
        ctx.lineTo(399, 1);
        ctx.lineTo(1,1);
        ctx.stroke();
        ctx.fillStyle = "#EEEEEE";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(1,210);
        ctx.lineTo(140, 210);
        ctx.lineTo(140, 90);
        ctx.lineTo(260, 90);
        ctx.lineTo(260, 210);
        ctx.lineTo(399, 210);
        ctx.lineTo(399, 210);
        ctx.lineTo(399,249);
        ctx.lineTo(1, 249);
        ctx.lineTo(1, 210);
        ctx.stroke();
        ctx.fillStyle = "#EEEEEE";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "#7EFF7F";
        ctx.rect(1, 174, 32, 32);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "#8582FF";
        ctx.rect(367, 174, 32, 32);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.font = "bold 30px Courier New";
        ctx.fillStyle = "black";
        ctx.fillText("S", 6, 198);
        ctx.fillText("E", 372, 198);
}

function StartGame(e) {
    var c = document.getElementById("Maze");
    var rect = c.getBoundingClientRect();
    /*get the relative coordinate*/
    var x = (e.clientX - rect.left) * (c.width / rect.width);
    var y = (e.clientY - rect.top) * (c.height / rect.height);

    /*mouse at 'E'*/
    if(x >= 0 && x <= 33 && y >= 174 && y <= 206){
        /*初始化所有值*/
        init();
        document.getElementById("putout").textContent = "";
        start = true;
    }
    /*mouse at 'E'*/
    else if(x >= 367 && x <= 400 && y >= 174 && y <= 206){
        if(start == true && knock_wall == false && cvs_out == false){
            Win();
        }
        else{
            GameOver();
        }
    }
    /*mouse at 'Wall'*/
    //first wall
    else if(x >= 0 && x <= 400 && y >= 0 && y <= 50){
        if(knock_wall == false && start == true){
            ChangeWall(1, 1, 398, 49, "firebrick");
            knock_wall = true;
            GameOver();
            wall_order = 1;
        }
        else if(wall_order != 1 && wall_order != -1){
            CancelKnockerr(wall_order);
        }
    }
    //second wall
    else if( x >= 0 && x <= 101 && y > 50 && y <= 171){
        if(knock_wall == false && start == true){
            ChangeWall(1, 50, 99, 120, "firebrick");
            knock_wall = true;
            GameOver();
            wall_order = 2;
        }
        else if(wall_order != 2 && wall_order != -1){
            CancelKnockerr(wall_order);
        }
    }
    //third wall
    else if( x >= 300 && x <= 400 && y > 50 && y <= 171){
        if(knock_wall == false && start == true){
            ChangeWall(300, 50, 99, 120, "firebrick");
            knock_wall = true;
            GameOver();
            wall_order = 3;
        }
        else if(wall_order != 3 && wall_order != -1){
            CancelKnockerr(wall_order);
        }
    }
    //forth wall
    else if( x >=140 && x <= 260 && y >= 90 && y <= 210){
        if(knock_wall == false && start == true){
            ChangeWall(140, 90, 120, 120, "firebrick");
            knock_wall = true;
            GameOver();
            wall_order = 4;
        }
        else if(wall_order != 4 && wall_order != -1){
            CancelKnockerr(wall_order);
        }
    }
    //fifth wall
    else if(x >= 0 && x <= 400 && y >= 210 && y <= 250){
        if(knock_wall == false && start == true){
            ChangeWall(1, 210, 398, 39, "firebrick");
            knock_wall = true;
            GameOver();
            wall_order = 5;
        }
        else if(wall_order != 5 && wall_order != -1){
            CancelKnockerr(wall_order);
        }
    }
    else{
        if(wall_order != -1){
            CancelKnockerr(wall_order);
        }
    }
}

function Cheat() {
    if(wall_order != -1){
        CancelKnockerr(wall_order);
    }
    if(start == true && wall_order == -1){
        cvs_out = true;
    }
}

function CancelKnockerr(num) {
    switch(num){
        case 1:
            ChangeWall(1, 1, 398, 49, "#EEEEEE");
            break;
        case 2:
            ChangeWall(1, 50, 99, 120, "#EEEEEE");
            break;
        case 3:
            ChangeWall(300, 50, 99, 120, "#EEEEEE");
            break;
        case 4:
            ChangeWall(140, 90, 120, 120, "#EEEEEE");
            break;
        default:
            ChangeWall(1, 210, 398, 39, "#EEEEEE");
            break;
    }
    wall_order = -1;
}

function GameOver() {
    if(knock_wall == true){
        document.getElementById("putout").textContent = "You Lose";
    }
    else if(cvs_out == true){
        document.getElementById("putout").textContent = "Don't cheat, you should start from the 'S' " +
            "and move to the 'E' inside the maze!";
    }
    init();
}

function Win() {
    init();
    document.getElementById("putout").textContent = "You Win";
}

function ChangeWall(x, y, w, h, color) {
    var context = document.getElementById("Maze").getContext("2d");
    context.clearRect(x, y, w, h);
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function init() {
    start = false;
    end = false;
    cvs_out = false;
    knock_wall = false;

    /*墙体初始化*/
    if(wall_order != -1){
        CancelKnockerr(wall_order);
    }
}