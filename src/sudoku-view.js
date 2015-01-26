var VIEW = ( function(){

	
	var self = {};
	var oldValue = '';
	
	var onSuccess  = function (result){
		console.log('success ' , result);
	};
	
	var restore = function (section , row, column , value ){
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
				restore(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("error"); }, 1500);
				break;

				/* row validation error */ 
		case 1 :
				var line = $(".grid td[data-row='"+result.row+"']");
				line.toggleClass("error");
				restore(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("error"); }, 1500);
				break;
				/* section validation error  */ 
		case 2 :
				var line = $(".grid td[data-section='"+result.section+"']");
				line.toggleClass("error");
				restore(result.section , result.row, result.column , oldValue );
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
		
		console.log("cell was clicked, section  " +section+ " row " + row
				    + " column " + column + " value " + newValue + " oldValue " + oldValue  ,  cell );
	
		SUDOKU.setMove( section ,  row, column,  newValue);
	
		
	};
	
	self.init = function(){
	
		SUDOKU.init({
			succesfulMove : onSuccess ,
			failureMove : onFailure  , 
			completed : onSuccess
		});
	
		$('.grid td').click(cellclicked);
		$('.grid td').keypress(keypressed);
	};
	
	$( document ).ready(function() {
		self.init();
	});
	
	return self;
	
})();