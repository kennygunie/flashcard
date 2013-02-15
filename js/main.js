function updateData(dataPath, numberPerRow, sort) {
	$('#content .row-fluid').remove();
	$.getJSON(dataPath, function(json) {
	    //console.log(json[0].cards); // this will show the info it in firebug console
	    if (sort) {
				json[0].cards.sort(function(x,y) { return ((x.front == y.front) ? 0 : ((x.front > y.front) ? 1 : -1 ));   } );
	    }
	    
	    var items = '<div class="row-fluid">';
	    var size = 12/numberPerRow;
	    $.each(json[0].cards, function(i, val) {
	    	items += '<div class="flip-container span' + size + '"><div class="flipper"><div class="front"><div>' + val.front + '</div><div class="hint">' + val.hint + '</div></div><div class="back">'+ val.back + '</div></div></div>';    	
	    	if((i+1)%numberPerRow == 0) {
		    	items += '</div><div class="row-fluid">';
	    	}
	    });
	    items += '</div>';
	    $('header h1').html(json[0].title);
	    $('header p').html(json[0].subject);
	    $('header').after(items);
	});
}

$('.flip-container').bind('touchstart', function(e){
	this.classList.toggle('hover');
});

$('#km').click(function (e) {
	updateData("data/km.json", 4, false);
});

$('#capital').click(function (e) {
	updateData("data/capital.json", 6, true);
});

$('ul.nav > li').click(function (e) {
	e.preventDefault();
	$('ul.nav > li').removeClass('active');
	$(this).addClass('active');                
});