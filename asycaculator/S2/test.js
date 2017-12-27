$(function () {
    //执行robot程序
    $('.apb').click(robotHandle);

    //所有操作重置
    $('#at-plus-container').mouseleave(function (){
        changeEnable();

        $('li').children().removeClass('read').addClass('unread');
        $('#info-bar').children().text('');
    });

    function robotHandle() {
        RandomHandle().then(getResult);
    }
    async function RandomHandle(){
        //设置为Disable
        $('.apb').unbind('click');

        $('#mask').removeClass('enable').addClass('disable');
        $('#mask').children().removeClass('unread').addClass('read').text('...');
        try{
            var A = await $.get('/random').then(aRandomHandle);
            var B = await $.get('/random').then(bRandomHandle);
            var C = await $.get('/random').then(cRandomHandle);
            var D = await $.get('/random').then(dRandomHandle);
            var E = await $.get('/random').then(eRandomHandle);
        }catch (err){
            console.log('end');
        }


        return parseInt(A) + parseInt(B) + parseInt(C) + parseInt(D) + parseInt(E);
    }
    function aRandomHandle(data){
        ControlSpan($('#mask'), $('#hist'));
        return Handle($('#mask'),data);
    }
    function bRandomHandle(data){
        ControlSpan($('#hist'), $('#message'));
        return Handle($('#hist'), data);
    }
    function cRandomHandle(data){
        ControlSpan($('#message'), $('#setting'));
        return Handle($('#message'), data);
    }
    function dRandomHandle(data){
        ControlSpan($('#setting'), $('#sign'));
        return Handle($('#setting'), data);
    }
    function eRandomHandle(data){
        $('#info-bar').removeClass('main_disable').addClass('main_enable');
        return Handle($('#sign'), data);
    }
    function getResult(data) {
        if($('#info-bar').hasClass('main_enable') && data){
            $('#info-bar').children().text(data);

            changeEnable();
        }
    }
    function ControlSpan(last, next) {
        if(last.hasClass('disable')){
            next.removeClass('enable').addClass('disable');
            next.children().removeClass('unread').addClass('read').text('...');
        }
    }
    function Handle(value, data) {
        if(value.hasClass('disable')){
            value.children().text(data);
            return data;
        }else{
            throw new Error('end');
        }
    }
    function changeEnable() {
        $('li').removeClass('disable').addClass('enable');
        $('#info-bar').removeClass('main_enable').addClass('main_disable');
        $('.apb').bind('click', robotHandle);
    }
});