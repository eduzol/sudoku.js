var VIEW = ( function(){

	
	var self = {};
	var oldValue = '';
	
	var onSuccess  = function (result){
		console.log('success ' , result);
	};
	
	var setViewValue = function (section , row, column , value ){
		if (!value){
			value = "&nbsp;";
		}
		var node = $("<span contenteditable='true'>" + value +"</span>");  
		$(".grid td[data-column='"+column+"'][data-row='"+row+"'][data-section='"+section+"']").empty().append(node);

	};
	
	var onFailure = function (result){
		/* Manipulate DOM */
		var errorCode = result.code ;
		
		switch ( errorCode ){
				/* column validation error */ 
		case 0 :
				var line =$(".grid td[data-column='"+result.column+"']"); 
				line.toggleClass("error");
				setViewValue(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("error"); }, 1500);
				break;

				/* row validation error */ 
		case 1 :
				var line = $(".grid td[data-row='"+result.row+"']");
				line.toggleClass("error");
				setViewValue(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("error"); }, 1500);
				break;
				/* section validation error  */ 
		case 2 :
				var line = $(".grid td[data-section='"+result.section+"']");
				line.toggleClass("error");
				setViewValue(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("error"); }, 1500);
				break;
		}
		
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
		oldValue = value;
		var newValue= String.fromCharCode(charCode);
		
		if ( value  && isNumeric ){
			console.log('enters if ');
			$(this).children('span').text('');
		}
		/*
		console.log("cell was clicked, section  " +section+ " row " + row
				    + " column " + column + " value " + newValue + " oldValue " + oldValue  ,  cell );
		*/
		SUDOKU.setMove( section ,  row, column,  newValue);
	
		
	};
	/* TODO AUTOMATE THIS*/
	var addDefaultValues =  function(){
	
		SUDOKU.setMove( 1 ,  1, 1,  5);
		setViewValue(1 , 1, 1 , 5 );
		
		SUDOKU.setMove( 1 ,  1, 2,  3);
		setViewValue(1 , 1, 2 , 3 );

		SUDOKU.setMove( 1 ,  2, 1,  6);
		setViewValue(1 , 2, 1 , 6 );
		
		SUDOKU.setMove( 1 ,  3, 2,  9);
		setViewValue(1 , 3, 2 ,9 );
		
		SUDOKU.setMove( 1 , 3, 3,  8);
		setViewValue(1 , 3, 3 ,8 );
		
		SUDOKU.setMove( 4 , 4, 1,  8);
		setViewValue(4 , 4, 1 ,8 );
		
		SUDOKU.setMove( 4 , 5, 1,  4);
		setViewValue(4 , 5, 1 ,4 );
		
		SUDOKU.setMove( 4 , 6, 1,  7);
		setViewValue(4 , 6, 1 ,7 );
		
		SUDOKU.setMove( 7 , 7, 2,  6);
		setViewValue(7 , 7, 2 ,6 );
		
		SUDOKU.setMove( 2 ,1, 5,  7);
		setViewValue(2 , 1, 5 , 7);
		
		SUDOKU.setMove( 2 ,2, 4,  1);
		setViewValue(2 , 2, 4 , 1);
		
		SUDOKU.setMove( 2 ,2, 5,  9);
		setViewValue(2 , 2, 5 , 9);
		
		SUDOKU.setMove( 2 ,2, 6,  5);
		setViewValue(2 , 2, 6 , 5);
		
		SUDOKU.setMove( 3 ,3, 8,  6);
		setViewValue(3 , 3, 8 , 6);
		
		SUDOKU.setMove( 5 ,4, 5,  6);
		setViewValue(5 , 4, 5 , 6);

		SUDOKU.setMove( 5 ,5, 4,  8);
		setViewValue(5 , 5, 4 , 8);
		
		SUDOKU.setMove( 5 ,5, 6, 3);
		setViewValue(5 , 5, 6 , 3);
		
		SUDOKU.setMove(5 ,6, 5,  2);
		setViewValue(5 , 6, 5 , 2);
		
		
		SUDOKU.setMove(6 ,4, 9, 3);
		setViewValue(6 , 4, 9 , 3);
		
		SUDOKU.setMove(6 ,5, 9,  1);
		setViewValue(6 , 5, 9 , 1);
		
		SUDOKU.setMove(6 ,6, 9, 6);
		setViewValue(6 , 6, 9 , 6);
		

		SUDOKU.setMove(8 ,8, 4, 4);
		setViewValue(8 , 8, 4 , 4);

		SUDOKU.setMove(8 ,8,5,1);
		setViewValue(8 , 8,5 ,1 );

		SUDOKU.setMove(8 ,8, 6, 9);
		setViewValue(8 , 8, 6 ,9);

		SUDOKU.setMove(8 ,9, 5, 8);
		setViewValue(8 , 9, 5 , 8);
		
		
		SUDOKU.setMove(9 , 7, 7, 2);
		setViewValue(9 , 7, 7 , 2);

		SUDOKU.setMove(9 ,7,8,8);
		setViewValue(9 , 7,8 ,8 );

		SUDOKU.setMove(9 ,8, 9, 5);
		setViewValue(9 , 8, 9 ,5);

		SUDOKU.setMove(9 ,9, 8, 7);
		setViewValue(9 , 9, 8 , 7);

		SUDOKU.setMove(9 ,9, 9, 9);
		setViewValue(9 , 9, 9 , 9);

		
		
	};
	
	self.init = function(){
	
		SUDOKU.init({
			succesfulMove : onSuccess ,
			failureMove : onFailure  , 
			completed : onSuccess
		});
	
		$('.grid td').click(cellclicked);
		$('.grid td').keypress(keypressed);
		
		addDefaultValues();
	};
	
	$( document ).ready(function() {
		self.init();
	});
	
	return self;
	
})();