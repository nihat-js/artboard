const gulp = require('gulp')
const autoPrefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");

const paths = {
    styles: {
        src: "./src/scss/**/*.scss",
        dist: "./dist/css"
    },
    img: {
        src: "./src/img/*.*",
        dist: "./dist/img"
    },
    js: {
        src: "./src/js/**/*.js",
        dist: "./dist/js/"
    }
}


gulp.task('compileSass', () => {
    return gulp.src('./src/scss/all.scss')
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(rename("styles.min.css"))
        .pipe( cleanCSS() )
        .pipe(gulp.dest(paths.styles.dist))
})

gulp.task('compileJS', () => {
    return gulp.src(paths.js.src)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dist))
})


gulp.task('minifyImages',()=>{
    return gulp.src(paths.img.src)
    .pipe( imagemin() )
    .pipe(gulp.dest(paths.img.dist))
})

gulp.task('clean',()=>{
    return gulp.src('./dist',{allowEmpty : true} )
    .pipe(clean());
})

gulp.task('dev', () => {
    gulp.watch([paths.styles.src,paths.js.src], gulp.series('compileSass','compileJS'))
})



gulp.task('build', gulp.series('clean','minifyImages','compileJS','compileSass') )