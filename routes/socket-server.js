var nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
var watch = require('node-watch');

var elements = {};


function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}


getDirectories('./snippets/').forEach(function(e) {
  var page = e;
  e = './snippets/' + e + '/';
  var files = fs.readdirSync(e);
  elements[e] = {};
  for (var i in files) {
    console.log('Reading snippet: '.grey + files[i].cyan);
    elements[e][files[i]] = {
      page: page,
      data: fs.readFileSync(e + files[i], 'utf8')
    };
  }
});

console.log('All snippets loaded!'.magenta);





var watcher = watch('./snippets', function() {
  console.log("changed");
  getDirectories('./snippets/').forEach(function(e) {
    var page = e;
    e = './snippets/' + e + '/';
    var files = fs.readdirSync(e);
    elements[e] = {};
    for (var i in files) {
      console.log('Reading snippet: '.grey + files[i].cyan);
      elements[e][files[i]] = {
        page: page,
        data: fs.readFileSync(e + files[i], 'utf8')
      };
    }
  });
  console.log('All snippets reloaded!'.magenta);
});




//EMAIL
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'itachijkv@gmail.com',
    pass: '3corazoness.'
  }
});
//EMAIL

module.exports.listen = function(io, console) {


  // **********    socket connected
  io.sockets.on('connection', function(socket) {
    console.log(' Socket connected'.blue);

    lazyLoad(socket);
  });



  function lazyLoad(socket) {
    for (var o in elements) {
      for (var i in elements[o]) {
        if (i.indexOf('.html') > -1) {
          socket.emit('element', {
            type: 'html',
            page: elements[o][i].page,
            id: i.split(".html")[0],
            data: elements[o][i].data
          });
        } else if (i.indexOf('.css') > -1) {
          socket.emit('element', {
            type: 'css',
            page: elements[o][i].page,
            id: i.split(".css")[0],
            data: elements[o][i].data
          });
        } else if (i.indexOf('.js') > -1) {
          socket.emit('element', {
            type: 'js',
            page: elements[o][i].page,
            id: i.split(".js")[0],
            data: elements[o][i].data
          });
        }
      }
    }
  }

  return io;
};
