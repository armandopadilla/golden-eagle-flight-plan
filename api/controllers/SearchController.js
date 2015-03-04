var validator = require("validator");

module.exports = {

	lookup: function(req, res){

		var term = req.param("term");

		var searchObj = {};
		//Check if the term has all numbers
		if(validator.isNumeric(term)){
			searchObj = { "type": {"!": ["administrator", "advisor"]}, "cin" : {'like': term+'%'}};
		}
		//Check if the term has a "@" in it.
		else if(term.indexOf("@") > 0){
			searchObj = {"type": {"!": ["administrator", "advisor"]}, "email_address" : {'like': term+'%'}};
		}
		//Lastly - search by email, first name, last name
		else {
			searchObj = { "type": {"!": ["administrator", "advisor"]}, or: [{"email_address": {'like': term+'%'}},
			                   {"first_name" : {'like': term+'%'}},
			                   {"last_name" : {'like': term+'%'}}] };
		}

		user.find().where(searchObj).exec(function(err, resp){

			if(err){
				console.log(err);
			}
			res.json(resp, 200);
		});
	}


}
