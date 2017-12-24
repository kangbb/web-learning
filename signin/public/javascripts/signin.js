$(function () {
    $('input').blur(function (){
        if(validator.isFieldValid(this.id, $(this).val())){
            $(this).parent().find('.err').text('');
        }else{
            $(this).parent().find('.err').text(validator.getErrorMessage(this.id));
        }
    });

    $('input.button').click(function () {
        if(this.value === '清除'){
            $('.err').text('');
            $('input:not(.button)').val('');
            return false;
        }else{
            $('input:not(.button)').blur()
            if(!(validator.isRegisterValid())) return false;
        }
    });
});