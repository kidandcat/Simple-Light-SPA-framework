UImanager.connect({
  tech: 'socketIO',
  sendData: {
    event: 'pages'
  }
});

UImanager.on('page', function(e){
  if(e.page == 'index'){
    UImanager.render('index');
  }
  console.log('new page: ');
  console.log(e.page);
  console.log(e.type);
  console.log(e);
});

/* UImanager.render('mariano') */
/* UImanager.render('deux') */
