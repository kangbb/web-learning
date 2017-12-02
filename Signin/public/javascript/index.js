window.onload = function () {
    var usr = document.getElementById("username");
    var id = document.getElementById("id");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var usrErr = document.getElementById("usrErr");
    var idErr = document.getElementById("idErr");
    var phoneErr = document.getElementById("phoneErr");
    var emailErr = document.getElementById("emailErr");
    var button = document.getElementById("function_button");
    var reg;
    /*获取用户j信息数据*/
    $.ajax({
        url: "/public/data/data.json"
    }).then(function(data) {
        if(data != ""){
            data =  $.parseJSON(data);
        }else{
            data = {};
        }

        usr.onblur = function () {
            if(usr.value.length < 6){
                usrErr.textContent = "*用户名不能少于6位"
            }else{
                reg = /^[^a-zA-z].*/
                if(reg.test(usr.value)){
                    usrErr.textContent = "*用户名必须以英文字符开头";
                }
                reg = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/
                if(!reg.test(usr.value)){
                    usrErr.textContent = "*用户名只能包含英文字母、数字、下划线";
                    return;
                }
                for(var item in data){
                    if(data[item]["username"] == usr.value){
                        usrErr.textContent = "*该用户名已经注册";
                        return;
                    }
                }
                usrErr.textContent = "";
            }
        }

        id.onblur = function () {
            if(id.value.length < 8){
                idErr.textContent = "*学号不能少于8位";
                return;
            }
            reg = /^[1-9][0-9]{7}$/
            if(!reg.test(id.value)){
                idErr.textContent = "*学号不能包含非数字字符且不能以0开头";
                return;
            }

            for(var item in data){
                if(data[item]["id"] == id.value){
                    idErr.textContent = "*该学号已经注册";
                    return;
                }
            }

            idErr.textContent = "";
        }

        phone.onblur = function () {
            if(phone.value.length < 11){
                phoneErr.textContent = "*电话不能少于11位";
                return;
            }
            reg = /^[1-9][0-9]{10}$/
            if(!reg.test(phone.value)){
                phoneErr.textContent = "*电话不能包含非数字字符且不能以0开头";
                return;
            }
            for(var item in data){
                if(data[item]["phone"] == phone.value){
                    phoneErr.textContent = "*该电话已经注册";
                    return;
                }
            }
            phoneErr.textContent = "";
        }

        email.onblur = function () {
            reg = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/
            if(!reg.test(email.value)){
                emailErr.textContent = "*邮箱名称只能包含字母、下划线、短横线";
                return;
            }
            for(var item in data){
                if(data[item]["email"] == email.value){
                    emailErr.textContent = "*该邮箱已经注册";
                    return;
                }
            }
            emailErr.textContent = "";
        }
    });

   button.children[0].onclick = function () {
       document.getElementById("myform").reset();
       usrErr.textContent = "";
       idErr.textContent = "";
       phoneErr.textContent = "";
       emailErr.textContent = "";
   }

    button.children[1].onclick = function () {
       if(usr.value == "" && usrErr.textContent == ""){
           usrErr.textContent = "*用户名不能为空";
       }
        if(id.value == "" && idErr.textContent == ""){
            idErr.textContent = "*学号不能为空";
        }
        if(phone.value == "" && phoneErr.textContent == ""){
            phoneErr.textContent = "*电话不能为空";
        }
        if(email.value == "" && emailErr.textContent == ""){
            emailErr.textContent = "*邮箱不能为空";
        }
        if(usrErr.textContent != "" || idErr.textContent != "" ||
            phoneErr.textContent != "" || emailErr.textContent != ""){
           return false;
        }
        document.getElementById("myform").submit();
    }
}