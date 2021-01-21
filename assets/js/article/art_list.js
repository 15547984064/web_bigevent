$(function () {
    // 美化定时器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    //补零
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    // 获取文章ajax
    var layer = layui.layer
    initTable()
    initCate()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                //使用模版引擎渲染页面
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                 // 调用渲染分页的方法
                 renderPage(res.total)
            }
        })
    }
    var form = layui.form;
    // 获取文章列表ajax
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('获取分类数据失败！')
              }
              // 调用模板引擎渲染分类的可选项
              var htmlStr = template('tpl-cate', res)
              $('[name=cate_id]').html(htmlStr)
              // 通过 layui 重新渲染表单区域的UI结构
              form.render()
            }
          })
    }
    // 4.筛选功能
    $('#form-search').on('submit',function(e){
        e.preventDefault();
        // 获取？
        var state = $("[name=state]").val();
        var cate_id = $("[name=cate_id]").val();
        // 赋值
        q.state = state;
        q.cate_id = cate_id;
        //初始化文章列表
        initTable();
    })
    // 5.渲染分页
    var laypage = layui.laypage
    function renderPage(total){
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: total //数据总数，从服务端得到
            ,limit:q.pagesize,//每页几条
            curr:q.pagenum,//
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],

            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                //首次不执行
                if(!first){
                  //do something
                  initTable()
                }
              }
          });
       
    }
    // 6.通过代理，为按钮绑定删除
    $('tbody').on('click','.btn-delete',function(){

        //获取当前文章的id
        var id =$(this).attr("data-id")
        // 询问用户是否删除
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                  if (res.status !== 0) {
                    return layer.msg('删除文章失败！')
                  }
                  layer.msg('删除文章成功！')
                  
                  if($('.btn-delete').length === 1 && q.pagenum >= 2)
                  q.pagenum--;
                  initTable()
                  
                }
              })
            
            layer.close(index);
          });
    })

})