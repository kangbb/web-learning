$(function () {
    //执行robot程序
    $('.apb').click(robotHandle);

    //所有操作重置
    $('#at-plus-container').mouseleave(function (){
        $('.apb').unbind('click').bind('click', robotHandle);
        $('li').removeClass('disable').addClass('enable');
        $('li').children().removeClass('read').addClass('unread');
        $('#info-bar').children().text('');
        $('#info-bar').removeClass('main_enable').addClass('main_disable');
        $('#order').text('');
    });

    function robotHandle() {
        var array = Array.from({length:5}, (v, k) => k);
        var Function = new Array(aRandomHandle, bRandomHandle, cRandomHandle, dRandomHandle, eRandomHandle);
        var name = new Array('mask', 'hist', 'message', 'setting', 'sign');
        var key = new Array('A', 'B', 'C', 'D', 'E');
        shuffle(array);
        $('#order').text(array.map(v => key[v]));
        Initial(array.map(v => name[v]))
            .then(Function[array[0]])
            .then(Function[array[1]])
            .then(Function[array[2]])
            .then(Function[array[3]])
            .then(Function[array[4]])
            .then(getResult)
            .catch(function (err) {
                console.log(err);
            });
    }
    function Initial(value) {
        $('.apb').unbind('click');
        return Promise.resolve({result:0, name: value});
    }
    function aRandomHandle(value) {
        changeDisable($('#mask'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#mask'), value.name);
                var tmp =  setValue(data, $('#mask'), value.result) ;
                return tmp ? Promise.resolve({result:tmp, name: value.name}) : Promise.reject('end');
            });
    }
    function bRandomHandle(value) {
        changeDisable($('#hist'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#hist'), value.name);
                var tmp = setValue(data, $('#hist'), value.result);
                return tmp ? Promise.resolve({result:tmp, name: value.name}) : Promise.reject('end');
            });
    }
    function cRandomHandle(value) {
        changeDisable($('#message'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#message'), value.name);
                var tmp = setValue(data, $('#message'), value.result);
                return tmp ? Promise.resolve({result:tmp, name: value.name}) : Promise.reject('end');
            });
    }
    function dRandomHandle(value) {
        changeDisable($('#setting'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#setting'), value.name);
                var tmp = setValue(data, $('#setting'), value.result);
                return tmp ? Promise.resolve({result:tmp, name: value.name}) : Promise.reject('end');
            });
    }
    function eRandomHandle(value) {
        changeDisable($('#sign'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#sign'), value.name);
                var tmp = setValue(data, $('#sign'), value.result);
                return tmp ? Promise.resolve({result:tmp, name: value.name}) : Promise.reject('end');
            });
    }
    function getResult(value) {
        console.log('result:compute');
        console.log($('#info-bar').attr('class'));
        if($('#info-bar').hasClass('main_enable')){
            $('#info-bar').children().text(value.result);
            //重置
            $('.apb').bind('click', robotHandle);
            $('li').removeClass('disable').addClass('enable');
            $('#info-bar').removeClass('main_enable').addClass('main_disable');
        }
    }
    function changeDisable(value) {
        $('li').attr('class', 'disable');
        value.children().removeClass('unread').addClass('read').text('...');
    }
    function changeEnable(element, name) {
        var index = name.findIndex((v, k) => name[k] == element.attr('id'));
        if(index == 4){
            console.log(true);
            $('#info-bar').removeClass('main_disable').addClass('main_enable');
        }else{
            for(var i = index+1; i < 5; i++){
                $('#'+name[i]).removeClass('disable').addClass('enable')
            }
        }
    }
    function setValue(data, element, result) {
        if(element.hasClass('disable')){
            element.children().text(data);
            return result+parseInt(data);
        }else {
            return null
        }
    }
    /*a disorder algorithm*/
    function shuffle(arr) {
        var i, j, temp;
        for(i = arr.length - 1; i > 0; i--){
            j = Math.floor((Math.random())*(i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }
});