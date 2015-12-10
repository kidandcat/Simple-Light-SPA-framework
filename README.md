# Simple&Light-SPA-framework

<br>
- The backend is NodeJS ExpressJS SocketIO, a php backend will be available soon.
<br>
<br>
- The main layer structure (views/index.jade) is made using CardinalCSS.
<br>
<br>
- There is already a html template done using CardinalCSS.
<br>
<br>
- To change the server port, go to the last lines of 'app.js', default port 3000.
<br>
<br>
- Each folder in 'snippets' folder is a page, to render this page call the ``render`` method of UImanager:

    ``` UImanager.render('pagenameIsTheFoldername') ```
<br>
<br>
- To make a new page, make a new folder inside 'snippets', and there you can make several .js and .css files
  with any name, and any of those you want:
  
    * header.html
    * main.html
    * leftMenu.html
    * rightMenu.html
    * footer.html
    
  If you don't make header.html for example, then the header.html of the last page rendered will prevail.
    
<br>
<br>
- Pages are load after the main structure (views/index.jade) so you can't call UImanager.render before you 
  have received that page, so listen for the 'page' event and wait for receiving all files of that page.
  
          var count = 0;
          
          UImanager.on('page', function(e){
            if(e.page == 'index'){
              count++;
              if(count == 5){
                UImanager.render('index');
              }
            }
            console.log('new page: ');
            console.log(e.page);
            console.log(e.type);
            console.log(e);
          });
          
          /* UImanager.render('mariano') */
          /* UImanager.render('deux') */
