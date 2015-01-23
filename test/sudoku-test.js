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
 * SUDOKU.setMove( section , column , row  , value );
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
	 
	var onSucess1 = function( result ){
		console.log("onSuccess1 Test Result = "+ result.message + " value " + result.value  );
		assert.ok(false , "onSuccess called");
	};
	
	var onFailure1 = function( result ){
		console.log("onFailure1 Test Result = "+ result.message + " value " + result.value  );
		assert.ok(true, 'onFailure called');
	};
	
	var onCompleted1 = function( result){
		console.log("onCompleted1 Test Result = "+ result.message + " value " + result.value  );
		assert.ok(false, 'onCompleted called');
	};
	
	SUDOKU.init({
		succesfulMove : onSucess1 ,
		failureMove : onFailure1  , 
		completed : onCompleted1 
	});
	SUDOKU.setMove( 1 , 1, 2, 3);
	
	
	
});
