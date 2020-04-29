#!/usr/bin/env node
console.log('ddd')

const chalk = require('chalk')
const ora = require('ora')

const cmd = require('commander')
const iq = require('inquirer')

// 定义版本号
cmd.version('1.0.0', '-v --version')

// 定义选项
cmd.option('-test', 'this is test')

// 定义交互
cmd.command('init <dist>').action(res => {
  iq.prompt([
    {
      type: 'input',
      name: 'dist',
      message: '请输入目标文件夹名称',
      default: 'dist'
    }
  ]).then(res => {
    console.log(res)
    require('./bin/download.js')(res.dist)
  })
})

// 在定义指令完成后，解析命令行输入的参数（需要放在最后面）
cmd.parse(process.argv)