
var gulp = require('gulp');

var concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');  
 

const rollup = require('rollup');  
var { uglify } = require('rollup-plugin-uglify'); 
var babel = require('rollup-plugin-babel');  
const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs =  require('@rollup/plugin-commonjs');


const gulp_uglify_ES = require('gulp-uglifyes'); 

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

function myRollup(name){ 
    var plugins = [];
    if(!lagicoding){
      
      plugins = [
        commonjs(),
        nodeResolve(),
        babel(babelConfig),        
      ]; 
      plugins.push( uglify() );  
    }
    return rollup.rollup({
        input: srcfolder+'/' + name + '.js',
        plugins:  plugins,
        external : ["firebase/app" ], 
      }).then(bundle => {
        return bundle.write({
          file: compilefolder + name+'.min.js',
          format: 'iife',
          name: name,
          sourcemap: false,
          globals : {"firebase/app" : "firebase"},       
        });
      }); 
}


function myCss(folder,name){
    return gulp.src( srcfolder + folder+'/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))  
        .pipe(concat(name+'.min.css'))
        .pipe(gulp.dest(compilefolder));
}
  
function rollupNodejs(){ 
    return gulp.src('./source/server/**/*.js')
    .pipe(gulp_uglify_ES())
    .pipe(gulp.dest('./dist/'));
}

 

gulp.task('main',function(){
  return myRollup('mainapp');
});

gulp.task('babelhelper',function(){ 
   // sekali buil hanya untuk menggenerate core.js
  lagicoding = false; 
  return myRollup('babelhelper');
});

gulp.task('maincss',function(){
  return  gulp.src( [
    srcfolder + 'maincss/*.css', 
    '../toast/toast.css',
    '../mapmodul/maincss/*.css'
  ])
  .pipe(cleanCSS({compatibility: 'ie8'}))  
  .pipe(concat('maincss.min.css'))
  .pipe(gulp.dest(compilefolder));
});

  
 

gulp.task('all', gulp.series(
  'main',  
));

 

