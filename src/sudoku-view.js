var VIEW = ( function(){

	
	var self = {};
	var oldValue = '';
	
	var onSuccess  = function (result){
		/*console.log('success ' , result);*/
	};
	
	
	var disableEditable = function ( section , row , column ){
		$(".grid td[data-column='"+column+"'][data-row='"+row+"'][data-section='"+section+"'] span")
			.attr('contenteditable','false');
		$(".grid td[data-column='"+column+"'][data-row='"+row+"'][data-section='"+section+"']").toggleClass('notEditable');
		
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
		var line = {};
		switch ( errorCode ){
				/* column validation error */ 
		case 0 :
				line =$(".grid td[data-column='"+result.column+"']"); 
				line.toggleClass("invalid");
				setViewValue(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("invalid"); }, 1500);
				break;

				/* row validation error */ 
		case 1 :
				line = $(".grid td[data-row='"+result.row+"']");
				line.toggleClass("invalid");
				setViewValue(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("invalid"); }, 1500);
				break;
				/* section validation error  */ 
		case 2 :
				line = $(".grid td[data-section='"+result.section+"']");
				line.toggleClass("invalid");
				setViewValue(result.section , result.row, result.column , oldValue );
				setTimeout(function(){ line.toggleClass("invalid"); }, 1500);
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
		value = parseInt( $(this).children('span').text()) ;
		var isNumeric  = $.isNumeric( value );
		oldValue = value;
		var newValue= String.fromCharCode(charCode);
		
		if ( value  && isNumeric ){
			$(this).children('span').text('');
		}
		
		SUDOKU.setMove( section ,  row, column,  newValue);
	
		
	};
	/* TODO AUTOMATE THIS*/
	var addDefaultValues =  function(){
	
		SUDOKU.setMove( 1 ,  1, 1,  5);
		setViewValue(1 , 1, 1 , 5 );
		disableEditable(1,1,1);
		
		SUDOKU.setMove( 1 ,  1, 2,  3);
		setViewValue(1 , 1, 2 , 3 );
		disableEditable(1,1,2);
		
		SUDOKU.setMove( 1 ,  2, 1,  6);
		setViewValue(1 , 2, 1 , 6 );
		disableEditable(1,2,1);
		
		SUDOKU.setMove( 1 ,  3, 2,  9);
		setViewValue(1 , 3, 2 ,9 );
		disableEditable(1,3,2);
		
		SUDOKU.setMove( 1 , 3, 3,  8);
		setViewValue(1 , 3, 3 ,8 );
		disableEditable(1,3,3);
		
		
		SUDOKU.setMove( 4 , 4, 1,  8);
		setViewValue(4 , 4, 1 ,8 );
		disableEditable(4,4,1);
		
		
		SUDOKU.setMove( 4 , 5, 1,  4);
		setViewValue(4 , 5, 1 ,4 );
		disableEditable(4,5,1);
		
		
		SUDOKU.setMove( 4 , 6, 1,  7);
		setViewValue(4 , 6, 1 ,7 );
		disableEditable(4,6,1);
		
		
		SUDOKU.setMove( 7 , 7, 2,  6);
		setViewValue(7 , 7, 2 ,6 );
		disableEditable(7,7,2);
		
		
		SUDOKU.setMove( 2 ,1, 5,  7);
		setViewValue(2 , 1, 5 , 7);
		disableEditable(2,1,5);
		
		
		SUDOKU.setMove( 2 ,2, 4,  1);
		setViewValue(2 , 2, 4 , 1);
		disableEditable(2,2,4);
		
		
		SUDOKU.setMove( 2 ,2, 5,  9);
		setViewValue(2 , 2, 5 , 9);
		disableEditable(2,2,5);
		
		SUDOKU.setMove( 2 ,2, 6,  5);
		setViewValue(2 , 2, 6 , 5);
		disableEditable(2,2,6);
		
		SUDOKU.setMove( 3 ,3, 8,  6);
		setViewValue(3 , 3, 8 , 6);
		disableEditable(3,3,8);
		
		SUDOKU.setMove( 5 ,4, 5,  6);
		setViewValue(5 , 4, 5 , 6);
		disableEditable(5,4,5);
		
		SUDOKU.setMove( 5 ,5, 4,  8);
		setViewValue(5 , 5, 4 , 8);
		disableEditable(5,5,4);
		
		
		SUDOKU.setMove( 5 ,5, 6, 3);
		setViewValue(5 , 5, 6 , 3);
		disableEditable(5,5,6);
		
		SUDOKU.setMove(5 ,6, 5,  2);
		setViewValue(5 , 6, 5 , 2);
		disableEditable(5,6,5);
		
		SUDOKU.setMove(6 ,4, 9, 3);
		setViewValue(6 , 4, 9 , 3);
		disableEditable(6,4,9);
		
		SUDOKU.setMove(6 ,5, 9,  1);
		setViewValue(6 , 5, 9 , 1);
		disableEditable(6,5,9);
		
		SUDOKU.setMove(6 ,6, 9, 6);
		setViewValue(6 , 6, 9 , 6);
		disableEditable(6,6,9);

		SUDOKU.setMove(8 ,8, 4, 4);
		setViewValue(8 , 8, 4 , 4);
		disableEditable(8,8,4);
		
		SUDOKU.setMove(8 ,8,5,1);
		setViewValue(8 , 8,5 ,1 );
		disableEditable(8,8,5);
		
		SUDOKU.setMove(8 ,8, 6, 9);
		setViewValue(8 , 8, 6 ,9);
		disableEditable(8,8,6);
		
		SUDOKU.setMove(8 ,9, 5, 8);
		setViewValue(8 , 9, 5 , 8);
		disableEditable(8,9,5);
		
		SUDOKU.setMove(9 , 7, 7, 2);
		setViewValue(9 , 7, 7 , 2);
		disableEditable(9,7,7);
		
		SUDOKU.setMove(9 ,7,8,8);
		setViewValue(9 , 7,8 ,8 );
		disableEditable(9,7,8);
		
		SUDOKU.setMove(9 ,8, 9, 5);
		setViewValue(9 , 8, 9 ,5);
		disableEditable(9,8,9);
		
		SUDOKU.setMove(9 ,9, 8, 7);
		setViewValue(9 , 9, 8 , 7);
		disableEditable(9,9,8);
		
		SUDOKU.setMove(9 ,9, 9, 9);
		setViewValue(9 , 9, 9 , 9);
		disableEditable(9,9,9);
		
		
	};
	
	
	var generateTemplateValues  = function (){
		
		var row  = 0;
		var section = 0 ;
		var column = 1;
		var elements = [];
		var sectionAux = 1;
		var renderTr = false;
		for (  i = 0 ; i < 81 ; i++ ){
			
			renderTr = false;
			var element = {};

			if ( i % 3 === 0 ) {
				section++;
			}

			if ( i % 9  === 0){
				column = 1;
				row++;
				section = sectionAux;
			}

			if ( i % 27 === 0  && i !== 0 ){
				sectionAux += 3;
				section = sectionAux;
			}

			if ( (i+1) % 9 === 0  && (i+1) !== 0 ){
				renderTr = true;
			}

			element.endtr = renderTr;
			element.index = i+1;
			element.row = row;
			element.column = column;
			element.section = section;
			elements.push(element);
			column++;
			

		}

		return elements;
	};
	
	var renderTemplate = function ( elements  ) {
		
		var template = $('#template').html();
		var rendered = Mustache.render(template, {elements: elements});
		$('#target').html(rendered);

	};
	
	self.init = function(){
	
		SUDOKU.init({
			succesfulMove : onSuccess ,
			failureMove : onFailure  , 
			completed : onSuccess
		});
		
		var elements = generateTemplateValues();
		renderTemplate(elements);
		$('.grid td').click(cellclicked);
		$('.grid td').keypress(keypressed);
		addDefaultValues();
		
	};
	
	$( document ).ready(function() {
		self.init();
	});
	
	return self;
	
})();