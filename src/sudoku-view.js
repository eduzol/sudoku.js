var VIEW = ( function(){

	
	var self = {};
	
	var onSuccess  = function (result){
		/* Manipulate DOM  */
		console.log('success ' , result);
		
	};
	
	var onFailure = function (result){
		/* Manipulate DOM */
		console.log('failure ' , result);
		
		
	};
	
	var cellclicked = function(){
		$(this).children('span').focus();
	};
	
	var keypressed = function (event ){

		var charCode = event.charCode;
		var process = false ;
		var value = $(this).children('span').text();
		
		if ( charCode >= 49 && charCode <= 57){
			process = true;
		}
		
		if ( !process){
			  event.preventDefault();
			  return;
		}
				
		var cell = $(this);
		var section = cell.attr('data-section');
		var row = cell.attr('data-row') ;
		var column = cell.attr('data-column') ;
		var value = parseInt( $(this).children('span').text()) ;
		var isNumeric  = $.isNumeric( value );
		var oldValue = value;
		var newValue= String.fromCharCode(charCode);
		
		if ( value  && isNumeric ){
			console.log('enters if ');
			$(this).children('span').empty();
		}
		
		//validate value 
		console.log("cell was clicked, section  " +section+ " row " + row
				    + " column " + column + " value " + newValue + " oldValue " + oldValue  ,  cell );
	
		SUDOKU.setMove( section ,  column,row, newValue);
		
		
	};
	
	self.init = function(){
	
		console.log('sudoku view  init ');
		SUDOKU.init({
			succesfulMove : onSuccess ,
			failureMove : onFailure  , 
			completed : onSuccess
		});
	
		
		$('.grid td').click(cellclicked);
		
		$('.grid td').keypress(keypressed);
	};
	
	$( document ).ready(function() {
		console.log('init ');
		self.init();
	});
	
	
	return self;
	
})();