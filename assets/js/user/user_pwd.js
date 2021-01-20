$(function(){
    var form = layui.form;
    form.verify({
        // 定义密码规则
        // 密码
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          //新密码
          samePwd:function(value){
              if(value === $("[name=oldPwd]").val()){
                  return '新密码和旧密码不能相同'
              }
          },
          rePwd:function(value){
              if(value !== $("[name=newPwd]").val()){
                  return '俩次密码不一致'
              }
          }

    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('修改密码失败')

                }
                layui.layer.msg('修改密码成功');
                $('.layui-form')[0].reset();
            }
        })
    })
})