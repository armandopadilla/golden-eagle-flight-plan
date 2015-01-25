module.exports.routes = {

  'get /' : 'IndexController.index',
  'get /login' : 'IndexController.login',
  'post /auth' : 'IndexController.auth',
  'get /home' : 'IndexController.home',
  'get /logout' : 'IndexController.logout'
	  
};
