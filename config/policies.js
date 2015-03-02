/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {


  FlightplanController: {
	  '*': 'isLoggedIn'
  },

  StageController: {
	  '*': 'isLoggedIn',
	  manage: 'isLoggedIn',
	  add: 'isLoggedIn',
	  save: 'isLoggedIn',
	  edit: 'isLoggedIn',
	  save_edit: 'isLoggedIn',
	  delete: 'isLoggedIn'
  },

  RunwayController: {
	  '*': 'isLoggedIn',
	  manage: 'isAdmin',
	  add: 'isAdmin',
	  delete: 'isAdmin',
	  save_edit: 'isAdmin',
	  edit: 'isAdmin',
	  save: 'isAdmin'
  },

  CheckpointController: {
	  '*': 'isLoggedIn',
	  add: 'isAdmin',
	  save: 'isAdmin',
	  edit: 'isAdmin',
	  save_edit: 'isAdmin',
	  delete: 'isAdmin'
  },

  DepartmentsController: {
	  flightplans: 'isLoggedIn',
	  manage: 'isAdmin'
  },

  UserController: {
	  '*': 'isLoggedIn'
  }


};
