var SUDOKU = ( function(){
	
	/**
	BR1 The board is comprised of a 9×9 matrix, divided into 9 sub sections
	BR2 Each square can have a number from 1 to 9
	BR3 Numbers must be unique per row
	BR4 Numbers must be unique per column
	BR5 Numbers must be unique per section
	**/
	
	var self = {};
	
	var N = 9;
	var rows =[];
	var columns = [];
	var sections = [];
	
	var onSuccesMove = {};
	var onFailureMove = {};
	var onCompleted = {};
	
	var success = {message: "success" , value : ""};
	
	var columnValidationError = {  code : 0,  message :"columnValidationError" , value : "" };
	var rowValidationError = {  code : 1 , message :"rowValidationError" , value : "" };
	var sectionValidationError = { code : 2 ,message : "sectionValidationError" , value : ""};
	var invalidNumber = {code : 3,  message : "invalidNumber" , value:""};
	
	var checkRow = function ( row, value ){
		var rowValue = rows[row][value];
		if ( rowValue){
			return false;
		}else{
			return true;
		}
		
	};
	
	var checkColumn = function( column, value ){
		var columnValue = columns[column][value];
		if ( columnValue){
			return false;
		}else{
			return true;
		}
	}
	
	var checkSection = function( section , value ){
		var sectionValue = sections[section][value];
		if ( sectionValue){
			return false;
		}else{
			return true;
		}
		
	}
	
	var validateLimits  = function ( value ){
		
		if ( value > 0  && value <= 9 ){
			return true;
		}else{
			return false;
		}
	}
	
	
	self.init = function ( config ) {
		
		console.log('sudokulib init');
		onSuccesMove = config.succesfulMove ;
		onfailureMove = config.failureMove ;
		onCompleted = config.completed;
		
		for ( var i = 0 ; i <= N ; i++){
			rows[i] = [];
			columns[i] = [];
			sections[i] = [];
		}
		
	};
	
	self.setMove  = function ( section , row  ,column,  value ){

		if ( !validateLimits(section )){
			
			invalidNumber.value = section;
			onfailureMove(invalidNumber);
			return ;
			
			
		}else if ( !validateLimits(column) ){
			
			invalidNumber.value = column;
			onfailureMove(invalidNumber);
			return ;
			
			
		}else if ( !validateLimits(row)){
			
			invalidNumber.value = row;
			onfailureMove(invalidNumber);
			return ;
			
		}
		
		var validRow  = checkRow(  row , value  );
		if ( validRow ){
			//rows[row][value] = true;
		}else{
			rowValidationError.value = value;
			rowValidationError.section = section;
			rowValidationError.column = column;
			rowValidationError.row = row;
			onfailureMove(rowValidationError);
			return;
		}
		
		var validColumn = checkColumn( column, value);
		if ( validColumn ){
			//columns[column][value] =  true;
		}else{
			columnValidationError.value = value;
			columnValidationError.section = section;
			columnValidationError.column = column;
			columnValidationError.row = row;
			onfailureMove(columnValidationError);
			return;
		}
		
		var validSection =  checkSection(section , value  );
		if ( validSection ){
			//sections[section][value] = true;
		}else{
			sectionValidationError.value = value;
			sectionValidationError.section = section;
			sectionValidationError.column = column;
			sectionValidationError.row = row;
			onfailureMove(sectionValidationError);	
			return;
		}
		
		if ( validRow && validColumn && validSection ){
			
			rows[row][value] = true;
			columns[column][value] =  true;
			sections[section][value] = true;
			
			success.value= value;
			success.section = section;
			success.column = column;
			success.row = row;
			
			onSuccesMove( success );
			
		}
		
		return;
	};
	
	return self;
}());