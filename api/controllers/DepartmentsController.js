module.exports = {

	/**
	 * Manage departments.
	 */
	manage : function(req, res){

		//Fetch all the departments
		department.find({}).then(function(resDepts){

			var departments = resDepts || [];

			res.render('departments/manage', {"departments" :  departments});

		})

	},


	flightplans : function(req, res){

		//Initialize vars
		var id = req.param("id");

		flightplan.find({"department" : id, "user" : 0}).then(function(resFlightplans){

			//Fetch all
			var plans = resFlightplans || [];

			res.render('departments/flightplans', {"plans" : plans, "departmentId" : id});

		});

	},


  /**
   * Public view to see departments and their flightplans.
   *
   * @param req
   * @param res
   */
  index: function(req, res){

    //Fetch all the departments
    department.find({}).then(function(resDepts){

      var departments = resDepts || [];

      console.log(departments);
      res.render('departments/index', {"departments" :  departments});

    });

  },

  flightplan : function(req, res){

    //Initialize vars
    var did = req.param("id");
    var fid = req.param("fid");

    runway.find({"flightplan" : fid}, function(err, r){

      stage.find({"flightplan" : fid}, function(err, s){

        //Fetch the checkpoints
        checkpoint.find({"flightplan" : fid, "account_id" : null}, function(err, c){

          //Create a container
          var container = [];
          for(var i=0; i<c.length; i++){


            //initialize the array for the runway and stage
            if(typeof container[c[i].runway] != "object"){
              container[c[i].runway] = [];

            }

            if(typeof container[c[i].runway][c[i].stage] != "object"){
              container[c[i].runway][c[i].stage] = [];
            }

            container[c[i].runway][c[i].stage].push(c[i]);
          }

          var response = {"runway" : r,
            "stage" : s,
            "checkpoints" : container || [],
            "username" : req.session.username,
            "userType" : req.session.userType,
            "major" : req.session.departmentName,
            "fid" : fid};

          res.render('departments/flightplan', response);

        });
      });
    });
  }

}
