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
            $(this).children().attr('class', 'read');
            $(this).children().text('...');

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
        var flag = true;
        var result = 0;
        if (click_enable) {
            for (var key in state) {
                if (state[key]) flag = false;
            }
            if (flag) {
                for (var i = 1; i < 6; i++) {
                    result += parseInt($('#bubble' + i).text());
                }
                $(this).children().text(result);

                for (var key in state) {
                    state[key] = true;
                }
                changeEnable();
            }
        }
    });
    $('#at-plus-container').mouseleave(function () {
        if (requireArray.length > 0) {
            for (var i = 0; i < requireArray.length; i++) {
                if (requireArray[i]) requireArray[i].abort();
            }
        }
        $('span').text('');
        $('span').attr('class', 'unread');
        for (var key in state) {
            state[key] = true;
        }
        changeEnable();
    });

    function mySuccess(data, children) {
        children.text(data);
    };

    function changeEnable() {
        for (var key in state) {
            if (state[key]) $('#' + key).attr('class', 'enable');
        }
        click_enable = true;
    }

    function changeDisable() {
        for (var key in state) {
            $('#' + key).attr('class', 'disable');
        }
    }
});