$(function(){
    getUserInfo();

    var layer = layui.layer
    // 点击按钮，实现退出
    $("#btnLogout").on('click',function(){
        layer.confirm('是否确认退出？',{
            icon:3,
            title:'提示'

        },function(index){
            // 1.清空本地
            localStorage.removeItem('token')
            // 2.重新跳转
            location.href = '/login.html'
            // 关闭弹出框
            layer.close(index)
        })
    })

})
//获取用户的基本信息
//必须是全局函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem("token") || ""
        // },
        success:function(res){
            // console.log(res);
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}
function  renderAvatar(user){
       // 欢迎文本
    var name  = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp,&nbsp;" + name)
    // 2.渲染头像
    if(user.user_pic !== null){
        //有头像
        $(".layui-nav-img").show().attr("src",user.user_pic)
        $(".text-avatar").hide();
    }else{
        // 没有头像
        $(".layui-nav-img").hide();
        // 转换成大写
        var text  = name[0].toUpperCase()
        $(".text-avatar").show().html(text);
    }


}