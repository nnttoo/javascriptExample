
var gulp = require('gulp');
var concat = require('gulp-concat'); 
var {babel} = require('@rollup/plugin-babel');  
let cleanCSS = require('gulp-clean-css');   
const rollup = require('rollup');   
const html = require('rollup-plugin-html');

var { terser } = require("rollup-plugin-terser"); 

var srcfolder = './';
var compilefolder = '../public/webadmin/style/';

const stripCode = require('rollup-plugin-strip-code');
 
 
var replace = require('@rollup/plugin-replace');

const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs =  require('@rollup/plugin-commonjs');

//import nodeResolve from 'rollup-plugin-node-resolve';

var lagicoding = false; // ubah ini saat compile selesai coding
var stripcode = false;
 
if(process.env.LAGICODING){
  lagicoding = true;
  console.log("ini lagi coding")
} 
var babelConfig = {  
  exclude: "node_modules/**" ,  
  babelHelpers : "bundled",
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

            ATAU GUNAKAN satu file yang berisi import tersebut, compile dan masukan di src script

            LIHAT srcAsyncHelper
            
        */
        "corejs": 3,
        "targets": {
          "chrome": "35", // webview kitkat
        }
      },
      
    ],"@babel/preset-react"] 
}

function myRollup(name){ 
    var plugins = [
      nodeResolve({
        browser: true,
        dedupe: ['react', 'react-dom'],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
     commonjs(),
     babel(babelConfig)
    ];

    // if( stripcode){
    //   plugins.push(stripCode({
    //     start_comment: 'START.TESTS_ONLY',
    //     end_comment: 'END.TESTS_ONLY'
    //   }));
    // }

    plugins.push(html({
        include: '**/*.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          minifyJS: true
        }
    }));


    if(!lagicoding){  
      plugins.push( terser() ); 
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
  
 

gulp.task('main',function(){
  return myRollup('reactbuild');
}); 

gulp.task('maincss',function(){
  return  gulp.src( [
    // '../srcBrowser/toast/toast.css', 
    // srcfolder + 'maincss/*.css' ,
    // srcfolder + 'login/css/*.css',
    // srcfolder + 'dashboard/css/*.css',
    // srcfolder + 'menudriver/css/*.css',
    // srcfolder + 'createdriver/css/*.css',
    // srcfolder + 'viewmodule/css/*.css',
    // srcfolder + 'menuListTR/css/*.css',
    // srcfolder + 'tokoPengajuan/css/*.css',
    // srcfolder + 'tokoOnline/css/*.css',
    // srcfolder + 'tokoEdit/css/*.css',
    // srcfolder + 'pantaupesanan/css/*.css',
  ])
  .pipe(cleanCSS({compatibility: 'ie8'}))  
  .pipe(concat('maincss.min.css'))
  .pipe(gulp.dest(compilefolder));
});

  
 

gulp.task('all', gulp.series(
  'main', 
  //'maincss'

));

 

