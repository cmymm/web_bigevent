$(function(){
    var form = layui.form
    
    
    
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称吗长度必须在1～6个字符之间！'
            }
        } 
                })
          
initUserInfo()
//初始化用户信息
function initUserInfo(){
    $.ajax({
        method:'GET',
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        success: function (res) {
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res.data);
           form.val('formUserInfo',res.data)
        }
    });
}
//重置表单数据
$('#btnReset').on('click',function(e){
    console.log('asd')
    // e.preventDefault()
    $('.layui-form')[0].reset()
    form.val('formUserInfo',res.data.username)
    // initUserInfo()


})
//监听表单的提交事件
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('更新用户信息失败！')
            }
            layui.layer.msg('更新成功')
            // 调用父页面中的方法，重新渲染用户的头像和用户的信息
             window.parent.getUserInfo()
        }

    })

})
})
