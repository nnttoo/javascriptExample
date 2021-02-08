
## Membuat React dengan Rollup ##

Caranya pertama build react builder, di sana import React dan ReactDOM
yang kemudian dijadikan sebagai global variable dengan

```js
window.React = React;
window.ReactDOM = ReactDOM;
```

cara mengkompilenya jalankan perintah ini di terminal

```sh
    npm run buildReactBuilder
```

ini akan membuat proses Transpile jauh lebih cepat dari pada mengimport React dan ReactDom di setiap project yang kita kerjakan.

sementara itu project yang kita kerjakan adalah di folder webAdminReact di situlah file yang akan kita obrak abrik (coding)
untuk mentranspile projek jalankan perintah ini 

```sh
    npm run buildWebAdminReact
```
atau lihat aja di package.json (gak usah manja)

setelah kita build maka masukan reactbuild.min.js yang merupakan hasil dari ReactBuild di dalam file html, kemudian diikuti dengan script src untuk project kita
```html

        <script src="./reactbuild.min.js"></script>
        <script src="./webadmin.min.js"></script>

```