$ajaxPrefilter(function(options){
    console.log(optios.url);
    options.url='http://api-breakingnews-web.itheima.net'+options.url
})