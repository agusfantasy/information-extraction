var iframeWindow = document.getElementById('extraction-editor').contentWindow;

function getSelection(){
	return iframeWindow.getSelection();	
}

function shortCutInit() {
	var options = {
		'target' : iframeWindow
	}

	shortcut.add("Ctrl+P", function() {
		$('#selection-container #PERSON').click();
	}, options);

	shortcut.add("Ctrl+O", function() {
		$('#selection-container #ORGANIZATION').click();
	}, options);

	shortcut.add("Ctrl+L", function() {
		$('#selection-container #LOCATION').click();
	}, options);

	shortcut.add("Ctrl+D", function() {
		$('#selection-container #DATE').click();
	}, options);

	shortcut.add("Ctrl+T", function() {
		$('#selection-container #TIME').click();
	}, options);
}

window.onload=shortCutInit;

function setIcon(type){
	var t;
	if (type == 'person') { t = '<span class="glyphicon glyphicon-user"></span>' }
	else if (type == 'organization') { t = '<span class="glyphicon glyphicon-briefcase"></span>'}
	else if (type == 'location') { t = '<span class="glyphicon glyphicon-globe"></span>' }
 	else if (type == 'date') { t = '<span class="glyphicon glyphicon-calendar"></span>' }
	else if (type == 'time') { t = '<span class="glyphicon glyphicon-time"></span>' }

	return t;
}

function setTag(selection, element, type){

	if (selection.toString().length > 0) {
	    var re = new RegExp(selection.toString().trim() ,"gi");

	    var openTag = '<span class="'+type.toLowerCase()+'"> ' + setIcon(type.toLowerCase()) + ' <'+element+' TYPE="'+type+'">',
			closeTag = '</'+element+'></span>';

		var iframeBody = $('iframe#extraction-editor').contents().find('body');	
		var text = iframeBody.html();

	    iframeBody.html(text.replace(re, openTag+selection+closeTag));

	} else {
		alert('Please provide text !');
	}
}

$(document).ready(function(){

	var iframe = $('iframe#extraction-editor').contents();
	
	var head = '<meta charset="utf-8">';
		head += '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
		head += '<meta name="viewport" content="width=device-width, initial-scale=1">';
		head += '<link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">';
		head += '<link type="text/css" rel="stylesheet" href="asset/style.css">';
	
	iframe.find('head').html(head);

	$('#transform').click(function(){
		var input = $('textarea#input').val();
		iframe.find('body').html(input);
	});	

	$('.btn-select-tag .btn').each(function(){
		$(this).click(function(){
			setTag(getSelection().toString(), $(this).data('element'),  $(this).attr('id'));
		});
	});
});