# Simple&Light-SPA-framework

This is a single page application/structure, it uses the unique view in 'views' folder 
to make the main html structure, then the app download from the server asynchronously all the 
views html, css and js, images will be implemented too. You can render any view right after
it has been downloaded, you don't need to wait for the rest of views.

The creation of a view is as simple as make a folder in 'snippets', the name of the folder
will be the name of the view at the time of rendering it ``(UImanager.render('viewName'))``,
inside that folder you can create .html files, which contents will override the divs which ids
coincide with the .html files names. The names of the .js and .css files doesn't matter. 
Look in 'public' folder for examples.

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



#License


    Copyright 2016 Jairo Caro-Accino Viciana
    
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
      http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.