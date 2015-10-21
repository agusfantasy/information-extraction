Information Extraction Tools for NLP
=======================
Tools for information extraction based on Message Understanding Conferences 6 (MUC-6).
Plase read this http://www.cs.nyu.edu/cs/faculty/grishman/muc6.html,
and Named Entity Recognition http://www.cs.nyu.edu/cs/faculty/grishman/NEtask20.book_3.html


Depedency
---
Jquery and Bootstrap

Usage
---

```html
<!--in head tag -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<!--in body tag before </body> -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="lib/shortcut.js"></script>
<script src="jquery.select.extraction.js"></script>
<script>
	$(function(){
		$("#transform").click(function(){
			$("#editor-container").extraction({
				content: $('textarea#input').val(),
				data : [
					{'element': 'ENAMEX', 'type': 'PERSON', 'text': 'Steve Jobs'},
					{'element': 'ENAMEX', 'type': 'ORGANIZATION', 'text': 'Apple'}
				]
			});
		});
	})
</script>
```


