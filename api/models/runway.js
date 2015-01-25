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
			unique : true,
			size : 200
		}
			
	}
		
}