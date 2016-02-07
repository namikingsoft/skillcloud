gulp = require('gulp')
shell = require('gulp-shell')
config = require('../config').deploy

message = 'Site updated at ' + new Date().toLocaleString()

gulp.task 'deploy', shell.task [
  "git add --all"
  "git commit -m '#{message}'"
  "git push #{config.git.remote} #{config.git.branch}"
],
  cwd: 'public'

gulp.task 'deploy:init', shell.task [
  "git init"
  "git remote add #{config.git.remote} #{config.git.url}"
  "git branch master #{config.git.remote}"
],
  cwd: 'public'

gulp.task 'deploy:clone', shell.task [
  "rm -rf public"
  "git clone -b #{config.git.branch} #{config.git.url} public"
]
