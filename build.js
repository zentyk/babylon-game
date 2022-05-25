const fs = require('fs');
const pug = require('pug');
const sass = require('sass');
const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./src/app.ts'],
    bundle: true,
    sourcemap : true,
    target : 'es2015',
    //minify : true,
    outfile: './dist/app.js',
    tsconfig: './tsconfig.json'
}).catch(() => process.exit(1));

sass.compileAsync("./src/app.scss",{
    sourceMap: true,
    outputStyle: 'compressed'
}).then(result => {
    fs.writeFileSync('./dist/app.css', result.css);
}).catch(err => {
    console.log(err);
    process.exit(1);
})

pug.renderFile('./src/index.pug', {}, (err, html) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    fs.writeFileSync('./dist/index.html', html);
});