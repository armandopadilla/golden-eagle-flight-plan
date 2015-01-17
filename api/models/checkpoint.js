module.exports  = {
		
	connection: "localDB",
	tableName : "checkpoints",
	
	attributes : {
		
		id: {
			type: "integer",
			autoincrement : true,
			primaryKey : true
		},
	
		name: {
			type: "string",
			required: true,
			unique: true
		},
		
		runway : {
			model: "runway"
		},
		
		stage : {
			model: "stage"
		}
		
			
	}
		
}