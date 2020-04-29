const fs = require('fs')
module.exports = function(dist) {

  const demopath = './project'
  const targetpath = './' + dist

  const ob = []

  function download () {
    pushArr(demopath)
    console.log(ob)
    ob.forEach(item => {
      let path = item[1].replace(demopath, '')
      console.log(targetpath + path)
      if (item[0] === 'dir') {
        fs.mkdir(targetpath + path, {recursive: true}, function(err){
          console.log(err)
        })
      } else {
        fs.readFile(item[1], (err, data) => {
          fs.writeFile(targetpath + path, data, function() {})
        })
      }
    })
  }

  function pushArr (path) {
    let files = fs.readdirSync(path)

    files.forEach(item => {
      let stat = fs.statSync(path + '/' + item)
      if (stat.isDirectory()) {
        ob.push(['dir', path + '/' + item])
        pushArr(path + '/' + item)
      } else {
        ob.push(['file', path + '/' + item])
      }
    })
  }
  download()
}