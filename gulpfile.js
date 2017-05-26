var gulp = require('gulp'),
	notify = require('gulp-notify'),
// Requires the gulp-sass plugin
    sass = require('gulp-sass'),
    // runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'), // todo: SVGO usage inside imagemin https://github.com/sindresorhus/gulp-imagemin
    cache = require('gulp-cache') ,// to not optimize images that have been already optimized

    babel = require('gulp-babel'); // todo: set up babel when I set up js tasks


// `default` because when you have a task named default, 
// you can run it simply by typing the gulp command, which saves some keystrokes.
gulp.task('default', ['watch', 'sass', 'images']); 

// not doing any live reloading in gulp because hugo server takes care of all of this
// hugo server will reflect any changes in the files in the public folder
// whether they are html or css or whatever
// ANY change in public, will be reflected live

gulp.task('sass', function(){
  return gulp.src('static/sass/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('static/css/'))
});

gulp.task('images', function(){
  return gulp.src('static/images/**/*.+(png|jpg|jpeg|gif)', {base: 'static/images'})
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
  		optimizationLevel: 3,
      	interlaced: true,
      	progressive: true
     // svgoPlugins: [{removeViewBox: false}],
    })))
  .pipe(gulp.dest('public/images'))
  // .pipe(notify({ message: 'Images task complete' }))
});

gulp.task('watch', function (){
  gulp.watch('static/sass/*.scss', ['sass']); // watch when sass file changes and run sass task
  gulp.watch('static/images/**/*.+(png|jpg|jpeg|gif)', ['images']);
})


