

// var calculator=require('./calculator.js');
// //console.log(calculator);



// var ret=calculator.add(1,2);
// console.log(ret);






function call(callback){
    var demo=0;
    for(var i=0;i<1000;i++){
       console.log(i);
       demo++;
    }
    callback("哈哈");
}

call(function(ret){
    x=ret;
});

console.log(x);



