
$(function () {

    //点击“去注册账号” 的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击""去登陆的链接"
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 用户登录验证
    var form = layui.form
    form.verify({
        // 密码校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //校验俩次密码是否一致
        repwd: function (value) {
            //通过形参拿到的是确认密码框的内容
            //还要拿到密码框中的内容
            //然后进行一次等于判断
            //如果判断失败，则提示用户
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '俩次密码不一致'
            }

        }
    })
    // 注册
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            data, function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //   console.log('cg');
                layer.msg('注册成功，请登录！')
                //   模拟人的点击行为
                $('#link_login').click()
                // 重置form
                $('#form_reg')[0].reset();

            })
    })

    // 登录
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault(),
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('登陆失败！')
                    }
                    layer.msg('登录成功！')
                    localStorage.setItem('token', res.token)
                    //  跳转
                    location.href = '/index.html'
                }
            })
    })
})