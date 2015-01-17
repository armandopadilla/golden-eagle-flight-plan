module.exports = {
		
		
	/**
	 * Landing page where we display the basic grid
	 * 
	 */
	index: function(req, res){
		
		runway.find({}, function(err, r){
			
			stage.find({}, function(err, s){
				
				//Create the row
				records = grid.getRows(r, s);
					
					console.log(records);
					
					var response = {"runway" : r,
								    "stage" : records };
					
					res.render('index/index', response);
					
			
				
			});
			
			
		});
		
	}
		
}