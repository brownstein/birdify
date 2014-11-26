birdify.github.io
=================

Birdify is a CSS ruleset and JS utility for making text flap.

For the impatient:
 1): Include birdify.css and birdify.js in your page
 2): Call Birdify(target jQuery selector).fly();
 3): Watch your text flap

Experienced SASS/SCSS users will probably want to simply include _birdify_mixins in their project, construct bird classes of their own, and apply them as-necessary. Birdified spans will begin flight as soon as the relevant class is applied (defined as .birdify in the default CSS generated from birdify_default.scss).

Example usage:

Markup:
<span class="birdified with-paren">
  <span class="left wing">{</span>
  <span class="right wing">}</span>
</span>