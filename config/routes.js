module.exports.routes = {

  'get /' : 'IndexController.index',
  'get /login' : 'IndexController.login',
  'post /auth' : 'IndexController.auth',
  'get /home' : 'IndexController.home',
  'get /logout' : 'IndexController.logout',
  'get /departments/:id/flightplans' : 'DepartmentsController.flightplans',
  'post /user/save' : 'UserController.save',
  'get /departments/:id/flightplan' : 'DepartmentsController.flightplan'

};
