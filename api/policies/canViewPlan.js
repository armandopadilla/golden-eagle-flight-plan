module.exports = function(req, res, next){

  var userType = req.session.userType,
    flightplanId = req.param("fid"),
    userFlightPlanId = req.session.flightplan.id,
    loggedInUserId = req.session.userId,
    ownerId = req.param("oid");

  //Check if the user is admin, advisor
  if(userType === "administrator" || userType === "advisor"){
    return next();
  }
  else{

    //Check if the logged in user is the owner AND the logged in user's flight plan is the
    //one being pulle up.
    if(loggedInUserId == ownerId && flightplanId == userFlightPlanId){
      return next();
    }

    return res.json({"status": "OK", "message" : "Unauthorized Request."}, 401);
  }

}
