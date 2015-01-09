Router.configure({
  layoutTemplate: 'content'
});

Router.map(function() {
  this.route('map', {
    path: '/',
    template:'map',
  });

  this.route('club', {
    path: '/club/adicionar',
    template:'club',
  });
});