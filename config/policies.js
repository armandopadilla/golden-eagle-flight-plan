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
	  '*': 'isLoggedIn',
    add: ['isLoggedIn', 'isAdmin'],
    save: ['isLoggedIn', 'isAdmin'],
    setasofficial: ['isLoggedIn', 'isAdmin'],
    view: ['isLoggedIn', 'isAdmin']
  },

  StageController: {
	  '*': 'isLoggedIn',
	  manage: 'isAdmin',
	  add: 'isAdmin',
	  save: 'isAdmin',
	  edit: 'isAdmin',
	  save_edit: 'isAdmin',
	  delete: 'isAdmin'
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
	  delete: 'isAdmin',
    checkoff: ['isLoggedIn', 'canCheckUnCheck']
  },

  DepartmentsController: {
	  flightplans: ['isLoggedIn', 'isAdmin'],
	  manage: 'isAdmin'

  },

  UserController: {
	  '*': 'isLoggedIn',
    flightplan: ['isLoggedIn', 'canViewPlan']
  }


};
