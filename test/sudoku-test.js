/*
 * 
 * SUDOKU.init ({
 * 	
 *   successfulMove : function() ,
 *   failureMove : function() , 
 *   completed : function(), 
 *   
 * });
 * 
 * SUDOKU.setMove( section , row  , column, value );
 *  
 */

QUnit.test( "succesful move", function( assert ) {
 
	var onSucess = function( result ){
		console.log("onSuccess Test Result = "+ result.message + " value " + result.value  );
		assert.ok(true , "onSuccess called");
	};
	
	var onFailure = function( result ){
		console.log("onFailure Test Result = "+ result.message + " value " + result.value  );
		assert.ok(false, 'onFailure called');
	};
	
	var onCompleted = function( result){
		console.log("onCompleted Test Result = "+ result.message + " value " + result.value  );
		assert.ok(false, 'onCompleted called');
	};
	
	SUDOKU.init({
		succesfulMove : onSucess ,
		failureMove : onFailure  , 
		completed : onCompleted 
	});
	
	SUDOKU.setMove( 1 , 1, 1, 3);
	
});


QUnit.test( "unsuccesful move", function( assert ) {
	 
	var succesCounter = 0;
	var onSucess = function( result ){
		if ( succesCounter > 0 ){
			console.log("onSuccess1 Test Result = "+ result.message + " value " + result.value  );
			assert.ok(false , "onSuccess called");	
		}
		succesCounter++;
	};
	
	var onFailure = function( result ){
		console.log("onFailure1 Test Result = "+ result.message + " value " + result.value  );
		assert.ok(true, 'onFailure called');
	};
	
	var onCompleted = function( result){
		console.log("onCompleted1 Test Result = "+ result.message + " value " + result.value  );
		assert.ok(false, 'onCompleted called');
	};
	
	SUDOKU.init({
		succesfulMove : onSucess ,
		failureMove : onFailure  , 
		completed : onCompleted 
	});
	SUDOKU.setMove( 1 , 1, 1, 3);
	SUDOKU.setMove( 1 , 2, 1, 3);
	
	
	
});

QUnit.test( "idempotence test", function( assert ) {
	 
	var successCounter = 0;
	var onSucess = function( result ){
		if ( successCounter > 0 ){	
			console.log("onSuccess1 Test Result = "+ result.message + " value " + result.value  );
			assert.ok(false , "onSuccess called");
		}
		successCounter++;
	};
	
	var onFailure = function( result ){
		
		if ( result.code === 0 )
		{
			console.log('Column validation error '+ result.message + " value " + result.value );
			assert.ok(true, 'Column validation Error');
			
		}else{
			
			console.log('validation error '+ result.message + " value " + result.value );
			assert.ok(false, 'Not a column validation error');
		}
		
		
	};
	
	var onCompleted = function( result){
		console.log("onCompleted1 Test Result = "+ result.message + " value " + result.value  );
		assert.ok(false, 'onCompleted called');
	};
	
	SUDOKU.init({
		succesfulMove : onSucess ,
		failureMove : onFailure  , 
		completed : onCompleted 
	});
	
	
	
	SUDOKU.setMove( 1 ,2, 2, 3);
	
	SUDOKU.setMove( 1 ,1, 2, 3);
	
	SUDOKU.setMove( 1 ,1, 2, 3);
	
	
});
