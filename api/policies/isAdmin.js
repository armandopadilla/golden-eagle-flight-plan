module.exports = function(req, res, next){
		
	if(req.session.userType != 'administrator'){
		return res.redirect("/home");
	}
	
	next();
	
}