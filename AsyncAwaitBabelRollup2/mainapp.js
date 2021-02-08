
class MainApp{
    test(){
        function Test(){
            return new Promise(function(resolve,reject){
                setTimeout(function(){
                    resolve("ya wis dadi aja deh")
                },1000)
            })
        }

        async function TestAsync(){
           var text = await Test() 
 
            console.log(text);
        }

        TestAsync();
    };
};

export {
    MainApp
} 