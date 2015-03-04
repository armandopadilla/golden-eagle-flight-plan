module.exports = function(req, res, next){

  var userType = req.session.userType,
      checkpointId = req.param("id"),
      userId = req.session.userId;

  //Check if the user is admin, advisor
  if(userType === "administrator" || userType === "advisor"){
    return next();
  }
  else{

    //Final check.  Check if the user is the owner.  If not then error out.
    checkpoint.find({"id" : checkpointId, "account_id": userId}).then(function(results){


      if(results.length == 0){
        return res.json({"status": "OK", "message" : "Unauthorized Request."}, 401);
      }

      return next();

    });

  }

}
