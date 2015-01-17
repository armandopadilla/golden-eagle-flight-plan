module.exports = {
		
		
	/**
	 * Landing page where we display the basic grid
	 * 
	 */
	index: function(req, res){
		
		runway.find({}, function(err, r){
			
			stage.find({}, function(err, s){
				
				//Create the row
				checkpoint.find({}, function(err, c){
					
					var response = {"runway" : r,
						    "stage" : [],
						    "checkpoints" : c};
			
					res.render('index/index', response);
					
				});
					
				
			});
			
			
		});
		
	}
		
}