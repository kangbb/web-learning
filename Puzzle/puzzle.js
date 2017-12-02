var start = false;
var is_win=false;
var empty_block = 16;
var number = 0;
var name;
var blocks = new Array();
var order = new Array();

window.onload = function(){
	var step = document.getElementById("step");
	var play = document.getElementById("play");
	insert(); //insert 15 bolks
	play.addEventListener('click', disorder);
}

function insert(){
	var puzzle;
	var box = document.getElementById("position");
	for(var i = 1; i < 16; i++) {
		puzzle = document.createElement('button');
		puzzle.className = "block" + i;
		puzzle.id = "puzzle" +  i;
		puzzle.addEventListener('click', move);
		box.appendChild(puzzle);
		blocks.push(puzzle);
	}
}
/*移动*/
function move(event){
	if(!start) return;
    /*blank block on the left of the picture*/
	if(empty_block % 4  != 0 && this.className == "block" + (empty_block + 1)){
		empty_block++;
		this.className = "block" + (empty_block - 1);
		number++;
		step.value = number;

	}
    /*blank block on the right of the picture*/
	else if(empty_block % 4!= 1 && this.className == "block" + (empty_block - 1)){
		empty_block--;
		this.className = "block" + (empty_block + 1);
		number++;
		step.value = number;
	}
	/*blank block under the picture*/
	else if(this.className == "block" + (empty_block - 4)){
		empty_block -= 4;
		this.className ="block" + (empty_block + 4);
		number++;
		step.value = number;
	}
	/*blank block above the picture*/
	else if(this.className == "block" + (empty_block + 4)){
		empty_block += 4;
		this.className ="block" + (empty_block - 4);
		step.value = number;
	}

	document.getElementById("state").textContent = "Continue...";
	win();
}


/*a disorder algorithm*/
function shuffle(arr) {
    var i, j, temp;
    for(i = arr.length - 2; i > 0; i--){
        j = Math.floor((Math.random())*(i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
function check_random_isValid(arr) {
    var count = 0;
    for (var i = 0; i < 16; i++) {
        for (var j = i+1; j < 16; j++) {
            if (arr[j] < arr[i]) {
                count++;
            }
        }
    }
    return count%2===0;
}
/*disorder the picture*/
function disorder(){
	start = true;
	is_win = false;
	number = 0;
	step.value = number;

    document.getElementById("state").textContent = "";

	/*recover the picture before disordering*/
    for(var i = 1; i < 16; i++){
        document.getElementById("puzzle"+i).className = "block" + i;
    }
    /*product a array*/
    for(var i = 0; i < 16; i++){
        order[i] = i + 1;
    }
    while(1){
        if(check_random_isValid(shuffle(order))){
            break;
        }
    }
    /*disorder picture*/
    for(var i = 1; i < 16; i++){
        document.getElementsByClassName("block"+i)[0].className = "block"+order[i-1];
    }
    empty_block = 16;
}

function showResult(){
    alert("you win,the number of step is "+ number);
}

function win(){
	for(var i = 1; i < 16; i++){
		if(blocks[i-1].className != "block" + i)
			return false;
	}
	setTimeout(showResult, 10);
	start = false;
	is_win = true;
    document.getElementById("state").textContent = "";
}
