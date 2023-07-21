// Problems = del new version i.e 7.0.0 doesnot have sync so use npm i del@4.1.1

// assets == assets (in my case)


const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify-es').default;



gulp.task('css', function (done) {
  console.log('Minifying CSS...');
  // minifying CSS (SCSS) files
  // run command `gulp css` in the terminal
  // ** stands for any folder & * stands for any file
  gulp
    .src('./assets/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

  // renaming CSS files using gulp-rev
  // and storing them in './public/assets'
  // and also, creating a manifest.json file
  import('gulp-rev').then((rev) => {
    gulp
      .src('./assets/**/*.css')
      .pipe(rev.default())
      .pipe(gulp.dest('./public/assets'))
      .pipe(
        rev.default.manifest({
          cwd: 'public',
          merge: true
        })
      )
      .pipe(gulp.dest('./public/assets'));
    done(); // callback function
  });
});


gulp.task('js', function (done) {
  console.log('Minifying JS...');
  // minifying js files
  // ** stands for any folder & * stands for any file
  gulp
    .src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./assets.js'));

  // renaming JS files using gulp-rev
  // and storing them in './public/assets'
  // and also, creating a manifest.json file
  import('gulp-rev').then((rev) => {
    gulp
      .src('./assets/**/*.js')
      .pipe(rev.default())
      .pipe(gulp.dest('./public/assets'))
      .pipe(
        rev.default.manifest({
          cwd: 'public',
          merge: true
        })
      )
      .pipe(gulp.dest('./public/assets'));
    done(); // callback function
  });
});

gulp.task('images', function (done) {
  console.log('Compressing images...');
  import('gulp-imagemin').then((imagemin) => {
    import('gulp-rev').then((rev) => {
      gulp
        .src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
        .pipe(imagemin.default())
        .pipe(rev.default())
        .pipe(gulp.dest('./public/assets'))
        .pipe(
          rev.default.manifest({
            cwd: 'public',
            merge: true
          })
        )
        .pipe(gulp.dest('./public/assets'));
      done();
    });
  });
});


gulp.task('clean:assets', function (done) {
  import('del').then((del) => {
    del.default.sync('./public/assets');
    done();
  });
});

gulp.task(
  'build',
  gulp.series('clean:assets', 'css', 'js', 'images'),
  function (done) {
    console.log('Building assets...');
    done();
  }
);


