var gulp = require("gulp");
var babel = require("gulp-babel");
var shell = require("gulp-shell");
var spawn = require('child_process').spawn;
var eslint = require('gulp-eslint');
var server;


gulp.task("lint-js", function(cb){
    return gulp.src("src/**/*.js")
        .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task("babel-js", function(cb){
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});
gulp.task("watch-js", function(){
    return gulp.watch("src/**/*.js", gulp.series(gulp.task("lint-js"), gulp.task("babel-js"), gulp.task("www")));
});


gulp.task("watch-jade", function(){
    return gulp.watch("src/**/*.jade", gulp.series(gulp.task("copy-jade"), gulp.task("www")));
});
gulp.task("copy-jade", function(){
    return gulp.src("src/**/*.jade")
        .pipe(gulp.dest("dist"));
});


gulp.task("www", function(){
    if (server){
        server.kill("SIGKILL");
    }
    server = spawn('node',['./bin/www']);
});

gulp.task("build", gulp.series("lint-js", "babel-js", "copy-jade"), function(cb){
    cb();
});


gulp.task("dev", gulp.series(gulp.task("build"), gulp.parallel("watch-js", "watch-jade", "www")), function (cb) {
  // return gulp.src("src/**/*.js")
  //   .pipe(babel())
  //   .pipe(gulp.dest("dist"));
});






