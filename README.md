birdify.github.io
=================

Birdify is a CSS ruleset and JS utility for making text flap.

For the impatient:
- Include birdify.css, birdify.js, and jQuery in your page
- Call Birdify(target jQuery selector).fly();
- Watch your text flap

You don't even really need the javascript component though - its just a shortcut for wrapping text using the default CSS. You can just as easily apply the .birdified and wing classes yourself!

Experienced SASS/SCSS users will probably want to simply include _birdify_mixins in their project, construct bird classes of their own, and apply them as-necessary. Birdified spans will begin flight as soon as the relevant class is applied (defined as .birdify in the default CSS generated from birdify_default.scss). You'll need to compile with Compass, because some of the mixins need it's trig functions.

The following will give you a parenthesis that flaps off the right side of the screen:

Markup:
```
<span class="birdified with-paren flightpath-1">
  <span class="left wing">{</span>
  <span class="right wing">}</span>
</span>
```

SCSS:
```
@import "birdify_mixins.scss"; // import Birdify

.birdified {
  display: inline-block;
  .wing{
	display: inline-block;
  }
}

.birdified.with-paren {
  @include flapWings(0.3s, false, true);
}

.birdified .fligthpath-1 {
  @include followFlightPath("birdPath-1", 1.5s);
}

@include buildFlightPath("birdPath-1", 
  2px, 10px, 10px, 10px, 500px,- 5px, 16);

```

Happy birding!