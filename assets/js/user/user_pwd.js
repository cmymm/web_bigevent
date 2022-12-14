$(function(){
    var form=layui.form
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samePwd:function(value){
              if(value === $('[name=oldPwd]').val()){
                  return '新旧密码不能相同'
              }
          },
          rePwd:function(value){
              if(value!==$('[name=newPwd]').val()){
                  return '两次密码不一致'
              }
          }
    })
    $('.layui-form').on ('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'http://api-breakingnews-web.itheima.net/my/updatepwd',
            data: $(this).serialize(),
            headers:{
                Authorization:localStorage.getItem('token')||''
            },
            success:function(res){
                if(res.status!==0){
                    console.log(res);
                    return layui.layer.msg('更新失败')
                }
                //   console.log(res.data)
                  layui.layer.msg('更新成功')
                  $('.layui-form')[0].reset()
            }

        })
    })
    
})