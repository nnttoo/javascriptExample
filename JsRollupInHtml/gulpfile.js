
var gulp = require('gulp');

var concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');  
 

const rollup = require('rollup');  
var { uglify } = require('rollup-plugin-uglify'); 
var babel = require('rollup-plugin-babel');  
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs =  require('@rollup/plugin-commonjs'); 


const gulp_uglify_ES = require('gulp-uglifyes'); 
const fs = require("fs")

var srcfolder = './';
var compilefolder = './result/';
 


var lagicoding = false; // ubah ini saat compile selesai coding
 
// if(process.env.LAGICODING){
//   lagicoding = true;
//   console.log("ini lagi coding")
// }

var babelConfig = {  
  exclude: "node_modules/**" ,
  "presets": [
    [ "@babel/preset-env", 
      {
        "modules": false,
        "spec": true,
        "forceAllTransforms": false,
        "useBuiltIns": "entry",
         /**
            jika menggunakan useBuiltIns entry
            maka gunakan 
            import "core-js";
            import "regenerator-runtime/runtime";
            satu kali dalam salah file yang akan di compile
            
        */
        "corejs": 3,
        "targets": {
          "chrome": "35", // webview kitkat
        }
      }
    ]] 
}

function rollupToString(){

}

function myRollup(name){ 
    var plugins = [
      commonjs(),
      nodeResolve()
    ];
    if(!lagicoding){ 
      plugins.push(babel(babelConfig) );  
      plugins.push( uglify() );  
    }
    return rollup.rollup({
        input: srcfolder+'/' + name + '.js',
        plugins:  plugins,
        external : ["firebase/app" ], 
      }).then(bundle => {
        return bundle.generate({
          file: compilefolder + name+'.min.js',
          format: 'iife',
          name: name,
          sourcemap: false,
          globals : {"firebase/app" : "firebase"},       
        }).then(function(output){  
          var code = output.output[0].code
            var template = fs.readFileSync("./result/index.template.html")
            var n = template.toString().replace("MYJAVASCRIPT",code)

            fs.writeFileSync("./result/index.html",n)  

        })
      })
}


function myCss(folder,name){
    return gulp.src( srcfolder + folder+'/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))  
        .pipe(concat(name+'.min.css'))
       
}
  
function rollupNodejs(){ 
    return gulp.src('./source/server/**/*.js')
    .pipe(gulp_uglify_ES())
    .pipe(gulp.dest('./dist/'));
}

 

gulp.task('main',function(){
  var name = 'mainapp';
  return myRollup(name)
//   .then(async function(){
//     function readFile(fpath){
//       return new Promise(function(resolve,reject){
//         fs.readFile(fpath,function(err,data){
//           resolve(data.toString());
//         })
//       })
//     }

//     var htmltxt = await readFile("result/index.template.html");
//     var jstxt = await readFile(compilefolder + name+'.min.js');
    
//     var nhtml = htmltxt.replace("MYJAVASCRIPT",jstxt);
//     fs.writeFileSync("result/index.html",nhtml)


// });;
});


gulp.task('maincss',function(){
  return  gulp.src( [
    srcfolder + './*.css',  
  ])
  .pipe(cleanCSS({compatibility: 'ie8'}))  
  .pipe(concat('maincss.min.css'))
  .pipe(gulp.dest(compilefolder))
  .on('end',function(data){
     var code = fs.readFileSync(compilefolder + 'maincss.min.css')
     console.log(code.toString());
  })
  //.pipe(gulp.dest(compilefolder));
});

  
 

gulp.task('all', gulp.series(
  //'main',  
  'maincss'
));

 

