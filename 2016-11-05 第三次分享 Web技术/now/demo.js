

//AMD方式定义模块
//Angular 
define(['dep1','dep2'],function(dep1,dep2){
    
     //内部只能使用制定的模块 
     return function(){}; 
});


//CMD
//按需载入

define(function(require,exports,module){
    //此处如果需要某XX模块，可以引入 
    var xx=require('XX'); 
});