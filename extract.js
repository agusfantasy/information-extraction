$(function(){
	$('.enamex').each(function(){
		$(this).click(function(){
			$('textarea')
				.selection('insert', {text: '<ENAMEX TYPE="'+$(this).attr('id')+'">', mode:'before'})
				.selection('insert', {text: '</ENAMEX>', mode:'after'});
		});
	});
});