function updateData(dataPath, sort) {
	$.getJSON(dataPath, function(json) {
	    //console.log(json[0].cards); // this will show the info it in firebug console
	    
	    var cards = json[0].cards;
	    if (sort) {
				cards.sort(function(x,y) { return ((x.front == y.front) ? 0 : ((x.front > y.front) ? 1 : -1 ));   } );
	    }
	    
	    
	    var items = '<div id="flashcards">';
	    var count;
	    $.each(cards, function(i, val) {
	    	items += '<div class="flip-container"><div class="flipper"><div class="front"><div>' + val.front + '</div><div class="hint">' + val.hint + '</div></div><div class="back">'+ val.back + '</div></div></div>';
	    	count = i;	    	
	    });
	    items += '</div>';
	    
	    $('header h1').html(json[0].title);
	    $('#description').html((count+1) + ' cards');
	    
	    $('#content').html(items);
	    
	    $('#flashcards').masonry({
			// options
			itemSelector : '.flip-container',
			gutterWidth : 10,
			isResizable: true,
			isFitWidth: true,
			isAnimated: true
		});
		
	});
}

$(document).ready(function(){
	$('.flip-container').bind('touchstart', function(e){
		this.classList.toggle('hover');
	});
	
	$('ul.nav > li').click(function (e) {
		e.preventDefault();
		$('ul.nav > li').removeClass('active');
		$(this).addClass('active');                
	});
	
	$('#km').click(function (e) {
		updateData("data/km.json", false);
	});
	
	$('#capital').click(function (e) {
		updateData("data/capital.json", true);
	});
	
	$('#java').click(function (e) {
		updateData("data/java.json", false);
	});
	
	$('#cocktail').click(function (e) {
		updateData("data/cocktail.json", false);
	});
});