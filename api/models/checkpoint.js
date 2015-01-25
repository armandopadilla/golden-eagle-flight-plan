module.exports  = {
		
	identify : "checkpoint",
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
			size: 200
			
		},
		
		runway : {
			model: "runway",
			required : true
		},
		
		stage : {
			model: "stage",
			required : true
		},
		
		content : {
			type : "text",
		},
		
		contentType : {
			type: "text",
			enum : ['text', 'file', 'url']
		}
			
	}

	//Need validation - if content is present then content type must also be added in.
		
}