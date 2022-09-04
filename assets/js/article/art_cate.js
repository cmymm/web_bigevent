$(function(){
    var form =layui.form
    //获取文章的分类的列表
    initArtCatelist()
    function initArtCatelist(){
$.ajax({
    method:'GET',
    url:'/my/article/cates',
    success:function(res){
    //  console.log(res)   
    var htmlStr= template('tpl-table',res)
    $('tbody').html(htmlStr)
    }
})
    }
    //添加类别点击事件
    var indexAdd=null
    $('#btnAddCate').on('click',function(){
        indexAdd=layui.layer.open({
            type:1,
            area:['550px','250px'],
            title:'添加文章类别',
            content:$('#dialog-table').html(),

        })

    })
    //通过代理来绑定submit事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if(res.status!==0){
                    return layui.layer.msg('新增分类失败')
                }
                 console.log('sda')
                  initArtCatelist()
                  layui.layer.msg('新增分类成功')
                  //根据索引关闭弹出层
                  layui.layer.close(indexAdd)
            }
        })

    })
    var indexEdit=null
    $('tbody').on('click','.btn-edit',function(){
        indexEdit=layui.layer.open({
            type:1,
            area:['550px','250px'],
            title:'修改文章类别',
            content:$('#dialog-edit').html(),

        })
        var id=$(this).attr('data-id')
        //获取对应的分类数据
        console.log(id);
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                console.log(res);
                form.val('form-edit',res.data)
            }

        })

    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                   return layui.layer.msg('更新数据失败')
                }
                layui.layer.msg('更新数据成功')
                layui.layer.close(indexEdit)
                initArtCatelist()

            }
        })
    })
    $('tbody').on('click','.btn-delete',function(){
        var id=$(this).attr('data-id')
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){            
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                  if(res.status!==0){
                      return layui.layer.msg('删除失败')
                  }
                  layui.layer.msg('删除成功')
                  layui.layer.close(index)
                  initArtCatelist() 
                }
            })

    })
})
})