module.exports = function(req, res, next){
	
	if(req.session.userId === undefined){
		return res.redirect("/login");
	}
	
	next();
	
}