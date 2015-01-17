module.exports = {
	
	
	getRows : function(runway, stage){

		var records = [];
		for(var i=0; i<runway.length; i++){
			
			for(var j=0; j< stage.length; j++){
			
				var row = [stage[i].name];
				
				checkpoint.find({"runway" : runway[i].id, "stage" :stage[i].id}, function(err, c){
					
					for(var k=0; k<c.length; k++){
						
						console.log(c[k].name);
						
						row.push(c[k].name);
						
					}
					
				});
				
				
			}
			
		}
		
		return records;
		
	}
	
}