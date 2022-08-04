const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;

gulp.task('css', function(done){
  console.log('minifying css...');
  gulp.src('./assets/sass/**/*.scss')
  .pipe(sass())
  .pipe(cssnano())
  .pipe(gulp.dest('./assets.css'));

   gulp.src('./assets/**/*.css')
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done();
});


gulp.task('js', function(done){
  console.log('minifying js...');
   gulp.src('./assets/**/*.js')
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
      cwd: 'public',
      merge: true
  }))
  .pipe(gulp.dest('./public/assets'));
  done()
});

gulp.task('build', gulp.series('css', 'js'), function(done){
  console.log('Building assets');
  done();
});