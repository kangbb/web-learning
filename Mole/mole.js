window.onload = function () {
    var start = false;
    var gametime = 30;
    var left_time = gametime;
    var tmp_time;
    var final_score;
    var random_mole;

    var time = document.getElementById('time');
    var score = document.getElementById('score');

    var state = document.getElementById('state');
    var game_area = document.getElementById('GameArea')

    var mole_list = new Array();
    
    time.value = 0;
    score.value = 0;

    /*create the mole needed*/
    for(var i = 60; i > 0; i--){
        var radio = document.createElement('button');
        radio.type = 'button';
        radio.className = 'mole_style';
        game_area.appendChild(radio);
        mole_list.push(radio);
    };

    function start_game() {
        /*get the position which mole appear*/
        random_mole = random_mole_appear();
        /*set a new style to describe mole*/
        mole_list[random_mole].className = "mole_appear";
        /*count time*/
        start_time_count();
        start = true;
        final_score = 0;
        score.value = final_score;
        state.value = 'Playing';

        /*judge the score*/
        for (var i = mole_list.length - 1; i >= 0; i--){
            mole_list[i].onclick = function () {
                var the_mole_clicked = mole_list.indexOf(this);
                if (the_mole_clicked == random_mole){
                    final_score++;
                    score.value = final_score;

                    /*state change*/
                    mole_list[random_mole].className = 'mole_style';
                    random_mole = random_mole_appear();
                    mole_list[random_mole].className = 'mole_appear';
                }else{
                    if(start == true && final_score != 0){
                        final_score--;
                        score.value = final_score;
                    }
                }
            }
        }
    }
    function gameover() {
        start = false;
        document.getElementById('state').textContent = 'Game Over';
        document.getElementById('s_e_game').textContent = 'Restart';

        /*time reset*/
        clearInterval(tmp_time);
        time.value = '0';
        left_time = gametime;

        /*state reset*/
        state.value = 'Game Over';

        /*score reset*/
        setTimeout(showResult,10);

        /*mole reset*/
        mole_list[random_mole].className = 'mole_style';
    }


    function  start_time_count() {
        tmp_time = setInterval(time_count, 1000);
    }

    function time_count() {
        time.value = left_time;
        if(left_time == 0){
            gameover();
        }
        left_time--;
    }

    function random_mole_appear() {
        var tmp_mole = parseInt(Math.random() * 60);
        return tmp_mole;
    }

    function showResult() {
        alert("Game Over!\nYour final score is " + final_score);
        score.value = '0';
    }

    document.getElementById('s_e_game').onclick = function () {
        if(start == false){
            start_game();
        }else{
            gameover();
        }
    }
}
