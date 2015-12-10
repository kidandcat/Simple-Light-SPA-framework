var UImanager = (function() {
  var ret = {};
  var socket = io.connect();
  var pages = {};
  var listeners = {};
  pages.index = [];

  socket.on('element', function(data) {
    (typeof pages[data.page] !== 'object') ? pages[data.page] = []: true;
    pages[data.page].push(data);
    ret.emit('page', {
      page: data.page,
      type: data.type
    });
  });

  ret.render = function(pag) {
    try {
      var toDelete = document.getElementsByClassName('UImanagerPage');
      console.log(toDelete);
      for (var uiui = 0; uiui < toDelete.length; uiui++) {
        toDelete[uiui].parentNode.removeChild(toDelete[uiui]);
      }
    } catch (e) {
      console.log(e);
    }
    pages[pag].forEach(function(e) {
      if (e.type == 'html') {
        document.getElementById(e.id).innerHTML = e.data;
      } else if (e.type == 'css') {
        var css = document.createElement("style");
        css.classList.add('UImanagerPage');
        css.innerHTML = e.data;
        document.getElementsByTagName("head")[0].appendChild(css);
      } else if (e.type == 'js') {
        var js = document.createElement('script');
        js.classList.add('UImanagerPage');
        js.setAttribute("type", "text/javascript");
        js.innerHTML = e.data;
        document.getElementsByTagName("body")[0].appendChild(js);
      }
    });
  };


  ret.emit = function(evt, args) {
    if (listeners.hasOwnProperty(evt)) {
      listeners[evt].forEach(function(func) {
        func(args || []);
      });
    }
  };


  ret.on = function(evt, func) {
    (typeof listeners[evt] !== 'object') ? listeners[evt] = []: true;
    listeners[evt].push(func);
  };

  ret.removeListener = function(evt){
    delete listeners[evt];
  };

  return ret;
})();
