$(function(){
  $('.reg-box').hide()
  //点击“去注册账号”的链接
  $('#link_reg').on('click',function(){
  $('.login-box').hide()
  $('.reg-box').show()
  })  
  //点击‘起登陆账号的链接’
  $('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
    
  })
  // 从layui中获取form对象
  var form=layui.form
  // 从layui中获取layer对象
  var layer=layui.layer
  //通过form.verif（）函数自定义校验规则
  form.verify({
    pwd:  [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repwd: function(value){
      //密码一致
      var pwd=$('.reg-box [name=password]').val()
      if(pwd!=value)
      return '两次密码不一致'
    }})
    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
      e.preventDefault()
      $.post('http://api-breakingnews-web.itheima.net/api/reguser',
      {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
      function(res){
        if(res.status!=0){
          return layer.msg(res.message)

        }
        layer.msg('注册成功！请登录')
        //模拟人的点击行为
        $('#link_login').click()
      })
    })

    $('#form_login').on('submit',function(e){
      e.preventDefault()
     $.ajax({
       url:'http://api-breakingnews-web.itheima.net/api/login',
       method:'POST',
       data:$(this).serialize(),
       success:function(res){
         if(status!=0){
           return layer.msg('登录失败')
         }
         layer.msg('登录成功！')
         //存储token到localStorage
        localStorage.setItem('token',res.token)
         //跳转到后台主页
        location.href='/index.html'
       }

     })
    })
  })
