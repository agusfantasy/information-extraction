/*!
 * jQuery.select.extraction - jQuery Plugin
 *
 * Copyright (c) Agus Thoiba (@agusfantasy).
 * Under The MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ( $ ) {

	/**
	* Set Shortcut Keyboard inside editor
	* @param {} target (DOM)
	* @param {} elem (DOM)
	*/
	function shortCutInit(target, elem) {
		var optShortcut = {
			'target' : target
		}

		shortcut.add("Ctrl+P", function() {
			elem.find('#PERSON').click();
		}, optShortcut);

		shortcut.add("Ctrl+O", function() {
			elem.find('#ORGANIZATION').click();
		}, optShortcut);

		shortcut.add("Ctrl+L", function() {
			elem.find('#LOCATION').click();
		}, optShortcut);

		shortcut.add("Ctrl+D", function() {
			elem.find('#DATE').click();
		}, optShortcut);

		shortcut.add("Ctrl+T", function() {
			elem.find('#TIME').click();
		}, optShortcut);
	}
 	
 	//Build Html for editor
 	var html = '<div class="btn-select-tag">\
			<div class="btn btn-default" data-element="ENAMEX" id="PERSON" >\
				<span class="glyphicon glyphicon-user"></span> Person\
			</div>\
			<div class="btn btn-default" data-element="ENAMEX" id="ORGANIZATION">\
				<span class="glyphicon glyphicon-briefcase"></span> Organization\
			</div>\
			<div class="btn btn-default enamex" data-element="ENAMEX" id="LOCATION">\
				<span class="glyphicon glyphicon-globe" aria-hidden="true"></span>  Location\
			</div>\
			<div class="btn btn-default" data-element="TIMEX" id="DATE">\
				<span class="glyphicon glyphicon-calendar"></span> Date\
			</div>\
			<div class="btn btn-default" data-element="TIMEX" id="TIME">\
				<span class="glyphicon glyphicon-time"></span> Time\
			</div>\
		</div><br>\
		<p> Ctrl+P = Person, Ctrl+O = Organization, Ctrl+L = Location, Ctrl+D = Date, Ctrl+T = Time </p>\
		<iframe style="width:100%; margin: 0%; padding: 5px; height: 20em; border: 1px solid silver;" src="" id="extraction-editor">\
		</iframe>';

	var style = '.location{background: rgba(0,255,0,0.2)}\
				.organization{background: rgba(0,0,255,0.2);}\
				.person{background: rgba(255,0,0,0.2)}\
				.date{background: rgba(243,228,53,0.5);}\
				.time{background: rgba(243,228,53,0.3);}';

	//append to head in iframe editor
	var head = '<meta charset="utf-8">\
				<meta http-equiv="X-UA-Compatible" content="IE=edge">\
				<meta name="viewport" content="width=device-width, initial-scale=1">\
				<link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">\
				<style>'+style+'</style>'

	/** 
	* Set Tag after selection or get data from exisiting
	* @param Object window.getSelection() / String selection
	* @param String element (Named Entity Recognition)
	* @param String type (Named Entity Recognition)
	*
	* return void
	*/
	function setTag(selection, element, type){

		if (selection.toString().length > 0) {
			var str = selection.toString().trim();
			
			var re; 
			if(str.match(/\(/g) || str.match(/\\/g) || str.match(/\)/g) ){
				re = str;
			} else {
				re = new RegExp(str, "gi");
			}

			console.log(re);
		    var openTag = '<span class="'+type.toLowerCase()+'"> ' + setIcon(type.toLowerCase()) + ' <'+element+' TYPE="'+type+'">',
				closeTag = '</'+element+'></span>';

			var iframeBody = $('iframe#extraction-editor').contents().find('body');
			var text = iframeBody.html();

		    iframeBody.html(text.replace(re, openTag+str+closeTag));	
		} else {
			alert('Please select text !');
		}
	}

	/**
	* Set Icon to tag (use bootstrap)
	* @param String type
	*
	* @return String t
	*/
	function setIcon(type){
		var t;
		if (type == 'person') { t = '<span class="glyphicon glyphicon-user"></span>' }
		else if (type == 'organization') { t = '<span class="glyphicon glyphicon-briefcase"></span>'}
		else if (type == 'location') { t = '<span class="glyphicon glyphicon-globe"></span>' }
	 	else if (type == 'date') { t = '<span class="glyphicon glyphicon-calendar"></span>' }
		else if (type == 'time') { t = '<span class="glyphicon glyphicon-time"></span>' }

		return t;
	}
 	
 	/**
 	* Create Jquery Plugin Extraction
 	*/
    $.fn.extraction = function(options) {

    	var opts = $.extend( {}, $.fn.extraction.defaults, options );

    	//change html extraction container
        this.html(html);

        var elem = $(this);

		var iframe = document.getElementById('extraction-editor');

		var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

		var headBody = '<html style="height:100%">\
			<head>' + head + '</head>\
			<body style="height:100%">' + opts.content + '</body>\
			</html>';
		iframeDoc.write(headBody);
		iframeDoc.close();

		var iframeWindow = iframe.contentWindow;
		
		//Add shortCut Keyboard
		shortCutInit(iframeWindow, elem);

		//get existing data 
		for (var i in opts.data) {
			setTag(opts.data[i].text, opts.data[i].element,  opts.data[i].type);
		}

		//click button after selection text
	    elem.find('.btn-select-tag .btn').each(function(){
			$(this).click(function(){
				setTag(iframeWindow.getSelection(), $(this).data('element'),  $(this).attr('id'));
			});
		});

        return this;
    };

    //Default options Plugin
    $.fn.extraction.defaults = {
    	content: "Please provide text!",
    	data: []
	};
 
}( jQuery ));