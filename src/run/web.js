const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const child_process = require('child_process')

/**
 * Start web service
 * @param {Object} options
 */
function runWeb(options) {
  if (!checkWebEnv(process.cwd())) {
    console.log()
    console.log(chalk.red('  Not available web environment !'))
    console.log()
    console.log(`  You should run ${chalk.blue('weexpack init')} first`)
    return
  }

  console.log()
  console.log(` => ${chalk.blue.bold('Starting web service')}`)

  install()
  startServer()
}

/**
 * Check web environment
 * @param {Strng} cwd
 */
function checkWebEnv(cwd) {
  return fs.existsSync(path.join(cwd, 'package.json'))
      && fs.existsSync(path.join(cwd, 'web'))
}

/**
 * Install npm dependencies
 */
function install() {
  console.log(` => ${chalk.blue.bold('npm install')}`)

  child_process.execSync(`cnpm install`)
}

/**
 * Start a web server
 */
function startServer() {
  console.log(` => ${chalk.blue.bold('start server')}`)

  child_process.execSync('npm run build')
  child_process.execSync('npm run serve &', {
    stdio: [process.stdin, process.stdout, process.stderr]
  })

  console.log()
  console.log(` => ${chalk.green('server is running')}`)
  console.log(`    see ${chalk.cyan('http://localhost:8080/web/index.html')}`)

  // open url in browser
  try {
    child_process.execSync(`open http://localhost:8080/web/index.html`)
  } catch(e) {}
}

module.exports = runWeb
