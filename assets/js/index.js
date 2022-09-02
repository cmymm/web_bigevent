$(function(){
//调用用户个人信息
getUserInfo()
var layer=layui.layer
$('#btnLogout').on('click',function(){
    //提示用户是否退出
    layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')//
        // localStorage.clear()
        location.href='/login.html'
        layer.close(index)
      });
})

})
//调用用户个人信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3007/my/userinfo',
        //headers请求头配置对象
        headers:{
            Authorization:localStorage.getItem('token')||''
        },
        success:function(res){
            if(res.status!==0){
             return  layui.layer.msg('获取用户信息失败')
                // location.href='./login.html'
            }
            console.log(res);
            //渲染用户的头像
            renderAvatar(res.data)
        },
        complete: function(res){
            console.log(res);
            if(res.responseJSON.status === 1 ){
             
             localStorage.removeItem('token')
             location.href='/login.html'  

            
         }}
    })

}
//渲染用户的头像
function renderAvatar(user){
    var name =user.nickname||user.username
    $('#welcome').html('欢迎&nbsp&nbsp'+name)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }
     else{
        $('.layui-nav-img').hide()
        var first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
     }
}
