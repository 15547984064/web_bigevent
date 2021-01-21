// 测试环境
var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 开发环境
// var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 生产环境
// var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 不需要入口函数
$.ajaxPrefilter(function(paeams){
    // 需求一添加路径前桑
    paeams.url = bsaeURl + paeams.url;
// alert(paeams.url);
// 需求2给有权限路径添加头信息
if(paeams.url.indexOf("/my/") !== -1){
    paeams.headers = {
        Authorization: localStorage.getItem("token") || ""
    }
}
// 不论成功还是失败，最终都会调用 complete 回调函数
paeams.complete = function(res) {
    // console.log('执行了 complete 回调：')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})