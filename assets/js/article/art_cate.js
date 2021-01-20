$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 2.
    var layer = layui.layer
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '添加文章分类'
            , content: $('#dialog-add').html()
        });

    })
    // 3.
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer, msg(res.message);

                }
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })
    // 4.显示
    var indexEdit = null;
    var form = layui.form
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '260px'],
            title: '修改文章分类'
            , content: $('#dialog-edit').html()
        });
        var Id = $(this).attr("data-id");
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('失败！')
                }
                form.val('form-edit', res.data)
            }
        })

    })
    // 5.修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer, msg(res.message);

                }
                initArtCateList()
                layer.msg('新增分类更新成功！')
                layer.close(indexEdit)
            }
        })
    })
    // 6.删除
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr("data-id");
        //弹出框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    } 
                    initArtCateList()
                    layer.msg('删除分类成功！')
                    layer.close(index)
                   
                }
            })
    

            layer.close(index);
        });
    })
})