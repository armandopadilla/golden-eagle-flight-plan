module.exports = {


		/**
		 * Allows a user to manage their profile.
		 * Only password, email, and major can be modifed
		 */
		manage: function(req, res){

			//init vars
			var userId = req.session.userId;

			//Fetch the user info.
			user.findOne({"id" : userId}).populateAll().then(function(userObj){

				department.find().then(function(respDepartments){

					sails.log.debug(userObj);
					res.render('user/manage', {"user" : userObj, "departments" : respDepartments});

				});

			})

		},


		/**
		 * Save the user updates to their account.
		 */
		save: function(req, res){

			//Fetch data
			var password = req.param("password"),
				major = req.param("major");

			//Validate: Note:  Validation checks are in the model 'user' but the error messages are garbage and waterline doesnt
			//have a way to change the message...terrible. huh.  Maybe a place to contribute to the ORM.
			//Must be between 4 and 16.
			//Cant be empty
			//Must be alpha numeric.
			var pattern = /^[\w\d]+$/;
			if(password !== ""){
				if(password.length < 4 || password.length > 16 || !pattern.test(password)){
					return res.json({"status" : "OK", "transaction_status" : "FAILED", "error": ['Password must be alphanumeric between 4 to 16 characters']}, 200);
				}
			}

			//Construct the update object
			var updateObj = {};
			if(password !== ""){
				updateObj.password = password;
			}
			if(major !== ""){
				updateObj.department = major;
			}


			user.update({"id" : req.session.userId}, updateObj, function(err, rows){

				if(err){
					sails.log.debug(err);
					return res.json({"status" : "OK", "transaction_status" : "FAILED"}, 200);
				}

				//Update the flightplan if necessary
				if(major !== ""){
					department.findOne({"id" : major}, function(err, departmentInfo){

						var flightplanId = departmentInfo.flightplan;
						user.update({"id" : req.session.userId}, {"flightplan" : flightplanId}, function(err, r){

							if(err){
								sails.log.debug(err);
								return res.json({"status" : "OK", "transaction_status" : "FAILED"}, 200);
							}

							res.json({"status" : "OK", "transaction_status" : "SUCCESS"}, 200);

						});

					})
				}

				res.json({"status" : "OK", "transaction_status" : "SUCCESS"}, 200);


			});

		},


    /**
     * Fetch the user's flight plan.
     *
     * @param req
     * @param res
     */
    flightplan: function(req, res){

      var id = req.param("fid");
      var accountId = req.param("oid");

      runway.find({"flightplan" : id}, function(err, r){

        stage.find({"flightplan" : id}, function(err, s){

          //Fetch the checkpoints
          checkpoint.find({"flightplan" : id, "account_id" : accountId}, function(err, c){

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
              "fid" : id};

            res.render('user/view', response);

          });
        });
      });
    }


}
