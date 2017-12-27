$(function () {
    var requireArray = new Array();
    var state = {
        "mask": true,
        "hist": true,
        "message": true,
        "setting": true,
        "sign": true
    };
    var click_enable = true;

    $('li').click(function () {
        if (state[this.id] && click_enable) {
            $(this).children().removeClass('unread').addClass('read').text('...');

            state[this.id] = false;
            click_enable = false;
            changeDisable();

            var children = $(this).children();
            //获取随机数
            var aj = $.ajax({
                type: "GET",
                url: "/random",
                cache: false,
                success: function (data) {
                    mySuccess(data, children);
                    changeEnable();
                }
            });
            requireArray.push(aj);
        }
    });
    $('#info-bar').click(function () {
        var result = 0;
        if (click_enable && $(this).hasClass('main_enable')) {
            for (var i = 1; i < 6; i++) {
                result += parseInt($('#bubble' + i).text());
            }
            $('#info-bar').children().text(result);

            for (var key in state) {
                state[key] = true;
            }
            $('#info-bar').removeClass('main_enable').addClass('main_disable');
            changeEnable();
        }
    });
    $('#at-plus-container').mouseleave(function () {
        if (requireArray.length > 0) {
            for (var i = requireArray.length - 1; i >= 0; i--) {
                if (requireArray[i]) requireArray[i].abort();
                requireArray.pop();
            }
        }

        $('span').removeClass('read').addClass('unread').text('');
        for (var key in state) {
            state[key] = true;
        }
        $('#info-bar').removeClass('main_enable').addClass('main_disable').children().text('');
        changeEnable();
    });

    function mySuccess(data, children) {
        children.text(data);
    };

    function changeEnable() {
        var flag = true;
        for (var key in state) {
            if (state[key]) {
                $('#' + key).removeClass('disable').addClass('enable');
                flag = false
            }
        }
        if(flag){
            $('#info-bar').removeClass('main_disable').addClass('main_enable');
        }
        click_enable = true;
    }

    function changeDisable() {
        for (var key in state) {
            $('#' + key).removeClass('enable').addClass('disable');
        }
    }
});