var VIEW = ( function(){

	
	var self = {};
	var oldValue = '';
	
	var onSuccess  = function (result){
		console.log('success ' , result);
	};
	
	var restore = function (section , row, column , value ){
		console.log('OLD value  ' + value  );
		if (!value){
			value = "&nbsp;";
		}
		console.log('value ' + value );
		var node = $("<span contenteditable='true'>" + value +"</span>");  
		$(".grid td[data-column='"+column+"'][data-row='"+row+"'][data-section='"+section+"']").empty().append(node);

	};
	
	var onFailure = function (result){
		/* Manipulate DOM */
		console.log('failure ' , result);
		var errorCode = result.code ;
		
		switch ( errorCode ){
		/* column validation error */ 
		case 0 :
				$(".grid td[data-column='"+result.column+"']").attr("bgcolor", "yellow");
				restore(result.section , result.row, result.column , oldValue );
				setTimeout(function(){$(".grid td[data-column='"+result.column+"']").attr("bgcolor", "white"); }, 1500);
				break;

				/* row validation error */ 
		case 1 :
				$(".grid td[data-row='"+result.row+"']").attr("bgcolor", "yellow");
				restore(result.section , result.row, result.column , oldValue );
				setTimeout(function(){$(".grid td[data-row='"+result.row+"']").attr("bgcolor", "white"); }, 1500);
				break;
		
		case 2 :
				$(".grid td[data-section='"+result.section+"']").attr("bgcolor", "yellow");
				restore(result.section , result.row, result.column , oldValue );
				setTimeout(function(){$(".grid td[data-section='"+result.section+"']").attr("bgcolor", "white"); }, 1500);
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
		
		//validate value 
		console.log("cell was clicked, section  " +section+ " row " + row
				    + " column " + column + " value " + newValue + " oldValue " + oldValue  ,  cell );
	
		SUDOKU.setMove( section ,  column,row, newValue);
	
		
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