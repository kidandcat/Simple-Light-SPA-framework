var UImanager = (function () {
    var ret = {};
    var pages = {};
    var listeners = {};
    pages.index = [];



    // * * * TRANSPORT LAYER * * *
    // METHOD connect receive next json:
    // config.tech(php|socketIO)
    // config.phpMethod(GET|POST) optional, default GET
    // config.url(url) optional for socketIO
    // config.sendData->
    //    socketIO{event: eventName ,json optional} |
    //    php{url: name=value&name=value}
    //
    //
    // SERVER must send a json object with:
    // {
    //    type: 'html|css|js',
    //    page: 'pageName',
    //    id: elementID, the html element id for inner the HTML (html only)
    //    data: string
    // }
    //  PHP for php to stop asking the server for pages, send the next json,
    //  then the cient will stop doing calls to the server:
    // {
    //    end: true
    // }
    ret.connect = function (config) {
        if (config.tech === 'php') {
            php(config);
        } else if (config.tech === 'socketIO') {
            socketIO(config);
        } else {
            console.log(' *UImanager* connect technology not specified, not choosing default.');
        }
    };


    // * Socket.IO *
    function socketIO(config) {
        var socket = io.connect(config.url || null);
        socket.on('connect', function () {
            socket.emit(config.sendData.event, config.sendData.json || {});
        });
        socket.on('element', function (data) {
            (typeof pages[data.page] !== 'object') ? pages[data.page] = [] : true;
            pages[data.page].push(data);
            ret.emit('page', {
                page: data.page,
                type: data.type
            });
        });
    }


    // * php *
    function php(config) {
        var phpInterval = setInterval(function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var data = JSON.parse(http_request.responseText);
                    if (!data.end) {
                        (typeof pages[data.page] !== 'object') ? pages[data.page] = [] : true;
                        pages[data.page].push(data);
                        ret.emit('page', {
                            page: data.page,
                            type: data.type
                        });
                    } else {
                        clearInterval(phpInterval);
                    }
                }
            };
            xhttp.open(config.phpMethod || 'GET', (config.phpMethod === 'POST') ? url : url + '?' + config.sendData.url, true);
            xhttp.send(config.sendData.url);
        }, 500);
    }


    // * * * RENDER LAYER * * *

    ret.render = function (pag) {
        try {
            var toDelete = document.getElementsByClassName('UImanagerPage');
            while(toDelete.length > 0){
                toDelete[0].parentNode.removeChild(toDelete[0]);
            };
        } catch (e) {
            console.log(e);
        }
        pages[pag].forEach(function (e) {
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




    // * * * EVENTS LAYER * * *

    ret.emit = function (evt, args) {
        if (listeners.hasOwnProperty(evt)) {
            listeners[evt].forEach(function (func) {
                func(args || []);
            });
        }
    };


    ret.on = function (evt, func) {
        (typeof listeners[evt] !== 'object') ? listeners[evt] = [] : true;
        listeners[evt].push(func);
    };

    ret.removeListener = function (evt) {
        delete listeners[evt];
    };

    return ret;
})();
