var gulp           = require('gulp'),
        gutil          = require('gulp-util' ),
        sass           = require('gulp-sass'),
        browserSync    = require('browser-sync'),
        concat         = require('gulp-concat'),
        uglify         = require('gulp-uglify'),
        cleanCSS       = require('gulp-clean-css'),
        rename         = require('gulp-rename'),
        del            = require('del'),
        imagemin       = require('gulp-imagemin'),
        cache          = require('gulp-cache'),
        autoprefixer   = require('gulp-autoprefixer'),
        ftp            = require('vinyl-ftp'),
        notify         = require("gulp-notify"),
        rsync          = require('gulp-rsync');

gulp.task('sass', function(){ 
    return gulp.src('app/sass/**/*.sass') 
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) 
        .pipe(gulp.dest('app/css')) 
        .pipe(browserSync.reload({stream: true})) 
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app/'
        },
        notify: false 
    });
});


gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']); 
    gulp.watch('**/*.html', browserSync.reload);
});


gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);