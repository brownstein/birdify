

function Birdify(ctx, mode){
	if (this.constructor === Window){
		return new Birdify(ctx, mode);
	}
	if (ctx.constructor.name !== Function){
		ctx = $(ctx);
	}

	this.ctx  = ctx;
	this.mode = mode;
	
	// wrap everything
	Birdify._wrapBirdTextRecursive(ctx, mode);
	this.birds = ctx.find(".bird-candidate");
}

Birdify.modes = {
	"parentheses":1,
	"text":2
};

Birdify.prototype.fly = function(span, delay){
	Birdify._activateBirds(this.birds, span, delay);
}

Birdify.prototype.reset = function(){
	Birdify._deactivateBirds(this.birds);
}

Birdify._roundRobin=1;
Birdify._numPaths=6;

Birdify._selectFlightPath=function(){
	var selected = Birdify._roundRobin;
	Birdify._roundRobin++;
	if (Birdify._roundRobin > Birdify._numPaths){
		Birdify._roundRobin = 1;
	}
	return "flightpath-" + selected;
}

Birdify._wrapParenReplacer = '<span class="bird-candidate bird-candidate-paren"><span class="left wing">$1</span>$2<span class="right wing">$3</span></span>';
Birdify._wrapTextReplacer = '<span class="bird-candidate bird-candidate-text"><span class="left wing">$1</span>$2<span class="right wing">$3</span></span>';

Birdify._wrapBirdTextRecursive = function(ctx, mode){
	if (mode === undefined){
		mode = 1;
	}
	ctx.contents().filter(function() { return this.nodeType != Node.TEXT_NODE; })
		.each(function(){ Birdify._wrapBirdTextRecursive($(this), mode);});
	ctx.contents().filter(function() { return this.nodeType == Node.TEXT_NODE; })
		.each(function(){
			var text = $(this).text();
			if (mode & 1){
				text = text.replace(/([{\[\(])([^\{^\[^\(^\}^\]^\)]?)([}\]\)])/g, Birdify._wrapParenReplacer);
			}
			if (mode & 2){
				text = text.replace(/([A-Za-z0-9]{5,8})([\.+@&\*=])([A-Za-z0-9]{5,8})/g, Birdify._wrapTextReplacer)
						   .replace(/([A-Za-z0-9]{3,4})([\.+@&\*=])([A-Za-z0-9]{3,4})/g, Birdify._wrapTextReplacer);
			}
			$(this).replaceWith(text);
		});
	return ctx;
}

Birdify._transitionToActive = function(bird){

	bird.removeClass("bird-candidate")
	bird.addClass("birdified");

	if (bird.hasClass("bird-candidate-paren")){
		bird.removeClass("bird-candidate-paren");
		bird.addClass("with-paren");
	} else if (bird.hasClass("bird-candidate-text")){
		bird.removeClass("bird-candidate-text");
		bird.addClass("with-text");
	}

	if (bird.attr('hasPath') === undefined){
		bird.attr('hasPath', true);
		bird.addClass(Birdify._selectFlightPath());
	}

	return;
}

Birdify._transitionToInactive = function(bird){

	bird.addClass("bird-candidate")
	bird.removeClass("birdified");

	if (bird.hasClass("with-paren")){
		bird.addClass("bird-candidate-paren");
		bird.removeClass("with-paren");
	} else if (bird.hasClass("with-text")){
		bird.addClass("bird-candidate-text");
		ctx.removeClass("with-text");
	}

	if (bird.attr('hasPath') === undefined){
		bird.attr('hasPath', true);
		bird.addClass(Birdify._selectFlightPath());
	}

	return;
}


Birdify._activateBirds = function(ctx, span, delay){
	if (delay === undefined){
		delay = 0;
	}
	if (span === undefined){
		span = 0;
	}
	ctx.each(function(){
		var bird = $(this);
		if (span + delay == 0){
			Birdify._transitionToActive(bird);
		} else {
			var bird_delay = Math.floor(Math.random() * span) + delay;
			setTimeout(function(){
				Birdify._transitionToActive(bird);
			}, bird_delay);
		}
	});
}

Birdify._deactivateBirds = function(ctx){
	ctx.each(function(){
		var bird = $(this);
		Birdify._transitionToInactive(bird);
	});
}



