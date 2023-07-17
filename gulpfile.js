// Problems = del new version i.e 7.0.0 doesnot have sync so use npm i del@4.1.1

// assets == assests (in my case)


const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;



gulp.task('css', function (done) {
  console.log('Minifying CSS...');
  // minifying CSS (SCSS) files
  // run command `gulp css` in the terminal
  // ** stands for any folder & * stands for any file
  gulp
    .src('./assests/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assests.css'));

  // renaming CSS files using gulp-rev
  // and storing them in './public/assests'
  // and also, creating a manifest.json file
  import('gulp-rev').then((rev) => {
    gulp
      .src('./assests/**/*.css')
      .pipe(rev.default())
      .pipe(gulp.dest('./public/assests'))
      .pipe(
        rev.default.manifest({
          cwd: 'public',
          merge: true
        })
      )
      .pipe(gulp.dest('./public/assests'));
    done(); // callback function
  });
});


gulp.task('js', function (done) {
  console.log('Minifying JS...');
  // minifying js files
  // ** stands for any folder & * stands for any file
  gulp
    .src('./assests/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assests.js'));

  // renaming JS files using gulp-rev
  // and storing them in './public/assests'
  // and also, creating a manifest.json file
  import('gulp-rev').then((rev) => {
    gulp
      .src('./assests/**/*.js')
      .pipe(rev.default())
      .pipe(gulp.dest('./public/assests'))
      .pipe(
        rev.default.manifest({
          cwd: 'public',
          merge: true
        })
      )
      .pipe(gulp.dest('./public/assests'));
    done(); // callback function
  });
});

gulp.task('images', function (done) {
  console.log('Compressing images...');
  import('gulp-imagemin').then((imagemin) => {
    import('gulp-rev').then((rev) => {
      gulp
        .src('./assests/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin.default())
        .pipe(rev.default())
        .pipe(gulp.dest('./public/assests'))
        .pipe(
          rev.default.manifest({
            cwd: 'public',
            merge: true
          })
        )
        .pipe(gulp.dest('./public/assests'));
      done();
    });
  });
});


gulp.task('clean:assests', function (done) {
  import('del').then((del) => {
    del.default.sync('./public/assests');
    done();
  });
});

gulp.task(
  'build',
  gulp.series('clean:assests', 'css', 'js', 'images'),
  function (done) {
    console.log('Building assests...');
    done();
  }
);


