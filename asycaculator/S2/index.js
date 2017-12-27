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
    });

    function robotHandle() {
        Initial()
            .then(aRandomHandle)
            .then(bRandomHandle)
            .then(cRandomHandle)
            .then(dRandomHandle)
            .then(eRandomHandle)
            .then(getResult)
            .catch(function (err) {
                console.log(err);
            });
    }
    function Initial() {
        $('.apb').unbind('click');
        return Promise.resolve(0);
    }
    function aRandomHandle(result) {
        changeDisable($('#mask'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#mask'));
                var tmp =  setValue(data, $('#mask'), result) ;
                return tmp ? Promise.resolve(tmp) : Promise.reject('end');
            });
    }
    function bRandomHandle(result) {
        changeDisable($('#hist'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#hist'));
                var tmp = setValue(data, $('#hist'), result);
                return tmp ? Promise.resolve(tmp) : Promise.reject('end');
            });
    }
    function cRandomHandle(result) {
        changeDisable($('#message'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#message'));
                var tmp = setValue(data, $('#message'), result);
                return tmp ? Promise.resolve(tmp) : Promise.reject('end');
            });
    }
    function dRandomHandle(result) {
        changeDisable($('#setting'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#setting'));
                var tmp = setValue(data, $('#setting'), result);
                return tmp ? Promise.resolve(tmp) : Promise.reject('end');
            });
    }
    function eRandomHandle(result) {
        changeDisable($('#sign'));
        return $.get('/random')
            .then(function (data) {
                changeEnable($('#sign'));
                $('#info-bar').removeClass('main_disable').addClass('main_enable');
                var tmp = setValue(data, $('#sign'), result);
                return tmp ? Promise.resolve(tmp) : Promise.reject('end');
            });
    }
    function getResult(value) {
        if($('#info-bar').hasClass('main_enable')){
            $('#info-bar').children().text(value);
            //重置
            $('.apb').bind('click', robotHandle);
            $('li').removeClass('disable').addClass('enable');
            $('#info-bar').removeClass('main_enable').addClass('main_disable');
        }
    }
    function changeDisable(value) {
        value.removeClass('enable').addClass('disable');
        value.nextAll().removeClass('enable').addClass('disable');
        value.children().removeClass('unread').addClass('read').text('...');
    }
    function changeEnable(value) {
        value.nextAll().removeClass('disable').addClass('enable');
    }
    function setValue(data, value, result) {
        if(value.hasClass('disable')){
            value.children().text(data);
            return result+parseInt(data);
        }else {
            return null
        }
    }
});