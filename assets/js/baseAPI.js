// 测试环境
var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 开发环境
// var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 生产环境
// var bsaeURl = 'http://api-breakingnews-web.itheima.net';
// 不需要入口函数
$.ajaxPrefilter(function(paeams){
    paeams.url = bsaeURl + paeams.url;
// alert(paeams.url);
})