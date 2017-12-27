$(function () {
    var num = 0;
    var result = 0;
    var requireArray = new Array();
    //执行robot程序
    $('.apb').click(robotHandle);

    //所有操作重置
    $('#at-plus-container').mouseleave(function (){
        changeEnable();
        for(var i = requireArray.length - 1; i >= 0; i--){
            if(requireArray[i]) requireArray[i].abort();
            requireArray.pop();
        }
        num = 0;
        result = 0;
        $('li').children().removeClass('read').addClass('unread');
        $('#info-bar').children().text('');
    });

    function robotHandle() {
        RandomHandle().then(getResult);
    }
    async function RandomHandle(){
        //设置为Disable
        changeDisable();

        requireArray.push($.get('/random', aRandomHandle));
        requireArray.push($.get('/random', bRandomHandle));
        requireArray.push($.get('/random', cRandomHandle));
        requireArray.push($.get('/random', dRandomHandle));
        requireArray.push($.get('/random', eRandomHandle));
    }
    function aRandomHandle(data){
        Handle($('#mask'),data);
    }
    function bRandomHandle(data){
        Handle($('#hist'), data);
    }
    function cRandomHandle(data){
        Handle($('#message'), data);
    }
    function dRandomHandle(data){
        Handle($('#setting'), data);
    }
    function eRandomHandle(data){
        Handle($('#sign'), data);
    }
    function getResult() {
        if($('#info-bar').hasClass('main_enable')){
            $('#info-bar').children().text(result);

            changeEnable();
        }
    }
    function Handle(value, data) {
        if(value.hasClass('disable')) {
            value.children().text(data);
            num++;
            console.log('num' + num);
            result += parseInt(data);

            if (num >= 5) {
                $('#info-bar').children().text(result);
            }
        }
    }
    function  changeDisable() {
        $('li').removeClass('enable').addClass('disable');
        $('li').children().removeClass('unread').addClass('read').text('...');
        $('.apb').unbind('click');
    }
    function changeEnable() {
        $('li').removeClass('disable').addClass('enable');
        $('#info-bar').removeClass('main_enable').addClass('main_disable');
        $('.apb').bind('click', robotHandle);
    }
});