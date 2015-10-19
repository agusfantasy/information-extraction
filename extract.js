function setTag(element, type){
    var text = $('textarea#text').val();

	var selection = $('#selected-extra').val();

    var re = new RegExp(selection ,"gi");

    var openTag = '<'+element+' TYPE="'+type+'">',
		closeTag = '</'+element+'>';

    $('textarea#text').val(text.replace(re, openTag+selection+closeTag));
	
	$('.popover').hide();
	$('#selected-extra').val('');
}

$(document).ready(function(){
	$('body').append('<input type="hidden" id="selected-extra">');

	$('#transform').click(function(){
		$('#text').html($('textarea#input').val());
	});

	$('textarea#text').click(function(){

		var coords = [];

		$(this).mousedown(function(e){
	        coords.push({'x': e.pageX, 'y': e.pageY});
	        console.log(coords);
		});

		$(this).mouseup(function(e){

    		coords.push({'x': e.pageX, 'y': e.pageY});
    		console.log(coords);

    		var left = 0, top = 0, popClass = 'bottom';

    		left = ((coords[0].x + coords[1].x)/2) - 138;
			top = coords[0].y + 10;

    		if (left < 200){
    			left = coords[0].x;
    			top =  coords[0].y - 78;
    			popClass = 'right';
    		}

			$('.popover').css({
	    		'position': 'absolute',
	    		'left': left + 'px',
	    		'top': top + 'px'
	    	});

	    	if (popClass == 'bottom') {
	    		$('.popover').removeClass('right').addClass('bottom');
	    	} else {
	    		$('.popover').removeClass('bottom').addClass('right');
	    	}

			var selection = window.getSelection().toString(); 
			$('#selected-extra').val(selection.trim());

			if (selection.length > 1) {
				$('.popover').show(function(){			
					coords = [];
				});
			}	
			
    	});	

	}).keyup(function(e){
		var selection = window.getSelection();
		$('#selected-extra').val(selection.toString());	
	});


	$('.btn-select-bottom .btn').each(function(){
		$(this).click(function(){
			setTag($(this).data('element'),  $(this).attr('id'));
		});
	});

	$('.popover-content .btn').each(function(index){
		$(this).click(function(){	
			var id = $(this).attr('id');
			var type = id.substring(4);

			$('#'+type.toUpperCase()).click();
		});
		
	});

	$('#btn-close').click(function(){
		$('.popover').hide();
	});
});