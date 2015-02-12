module.exports  = {
		
	identity : "runway",
	connection: "localDB",
	tableName : "runways",
	
	attributes : {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
	
		name: {
			type: "string",
			required: true,
			size : 200
		},
		
		//A runway belongs to a single flightplan.
		flightplan : {
			model : "flightplan"
		}
			
	}
	
}