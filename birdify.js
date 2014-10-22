function Birdify(ctx){
	ctx.addClass("birdified");
	ctx.addClass("with-paren");
	ctx.addClass(Birdify.selectFlightPath());
}

Birdify.birdifyText=function(ctx){
	ctx.addClass("birdified");
	ctx.addClass("with-text");
	ctx.addClass(Birdify.selectFlightPath());
}

Birdify.roundRobin=1;
Birdify.numPaths=6;

Birdify.selectFlightPath=function(){
	var selected = Birdify.roundRobin;
	Birdify.roundRobin++;
	if (Birdify.roundRobin > Birdify.numPaths){
		Birdify.roundRobin = 1;
	}
	return "flightpath-" + selected;
}

Birdify.swapElements=true;
Birdify.wrapParenReplacer = '<span class="bird-candidate-paren"><span class="left wing">$1</span>$2<span class="right wing">$3</span></span>';
Birdify.wrapTextReplacer = '<span class="bird-candidate-text"><span class="left wing">$1</span>$2<span class="right wing">$3</span></span>';

Birdify.wrapBirdTextRecursive = function(ctx){
	ctx.contents().filter(function() {return this.nodeType != Node.TEXT_NODE })
		.each(function(){ Birdify.wrapBirdTextRecursive($(this));});
	ctx.contents().filter(function() {return this.nodeType == Node.TEXT_NODE })
		.each(function(){
			$(this).replaceWith($(this).text()
				.replace(/([{\[\(])([^\{^\[^\(^\}^\]^\)]?)([}\]\)])/g, Birdify.wrapParenReplacer)
				.replace(/([A-Za-z0-9]{5,8})([\.+@&\*=])([A-Za-z0-9]{5,8})/g, Birdify.wrapTextReplacer)
				.replace(/([A-Za-z0-9]{3,4})([\.+@&\*=])([A-Za-z0-9]{3,4})/g, Birdify.wrapTextReplacer));
		});
}

Birdify.activateBirds = function(ctx){
	ctx.find('.bird-candidate-text').each(function(){
		$(this).removeClass("bird-candidate-text");
		Birdify.birdifyText($(this));
	});
	ctx.find('.bird-candidate-paren').each(function(){
		$(this).removeClass("bird-candidate-paren");
		Birdify($(this));
	});
}

function scanAndBirdify(selector){
	var workingSpace = $(selector);
	Birdify.wrapBirdTextRecursive(workingSpace);
	Birdify.activateBirds(workingSpace);
}