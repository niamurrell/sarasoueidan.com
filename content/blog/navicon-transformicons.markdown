---
date: 2013-10-20T00:00:00Z
title: 'Navicon Transformicons: Animated Navigation Icons with CSS Transforms'
subtitle: ""
demo: "navicon-transformicons"
repo: "navicon-transformicons"
---

<p class="size-2x note">The following is a collaboration post between <a href="http://bennettfeely.com/">Bennett Feely</a> and I. After seeing Bennett's impressive animated navigation icon transformations (or "Navicon Transformicons") <a href="http://codepen.io/bennettfeely/pen/twbyA">pens</a> <a href="http://codepen.io/bennettfeely/pen/eClzu">on Codepen</a>, I asked him if he would like to write a tutorial on how he did them as a guest post on my blog. He kindly approved. And as he doesn't have a lot of free time to work the article, we decided to collaborate on it. We'll be covering a few of the icons he created in his pen, and a couple more.</p>

<p>If you were to ask me what my most favorite CSS property is I might just answer the transition property. It has proven to be a perfect use case for progressive enhancement and it’s adoption has made countless websites feel smoother.  By the way, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties">a heck of a lot of properties</a> are also transitionable. </p>

<p>While the prefixed transition property has been supported by the major browsers for a long time now (web speaking), there was quite a dilemma with browsers and their ability to transition and animate pseudo-elements (<code>:before</code> and <code>:after</code>). While Firefox has been doing things right since version 4.0, it wasn’t until March of this year when Chrome finally <a href="http://css-tricks.com/pseudo-element-animationstransitions-bug-fixed-in-webkit/">fixed things</a>. Now, even IE10 supports transitions and animations on pseudo-elements.</p>

<p>So what shall we call these transforming CSS icons? How about transformicons?</p>

<p class="note warning">
              These code snippets are intended to work only in <a href="http://caniuse.com/#feat=transforms2d">browsers that support</a> the properties used.
            </p>

<p class="note">
              We will only cover the styles/transforms in SCSS, and add some explanation in the form of comments for those of you who aren't very familiar with SCSS. You'll find the complete compiled CSS code in the source code on Github.<br/> As the Javascript is very simple (just toggling a class name)  we won't be going over it, and you'll also find it in the downloadable source code on Github.
            </p>

<h2 class="deeplink" id="demo-1">Three-line to arrow (arrow left and arrow up)</h2>

<figure>
	<img src="../../images/lines-to-arrows.png" alt="Three-lines to Arrows Transformations">
</figure>

<h3 class="deeplink" id="demo-1-markup">The Markup</h3>

<p>The three-line menu icon, aka navicon, aka hamburger icon can be accomplished quite a few different ways, but in this case we will use a wrapper element and a child with two psuedo elements to form the three lines. The markup really isn’t heavy.</p>

<pre class="brush:html;">
              &lt;button class="lines-button arrow arrow-left" type="button" role="button" aria-label="Toggle Navigation"&gt;
                &lt;span class="lines"&gt;&lt;/span&gt;
              &lt;/button&gt;
            </pre>

<h3 class="deeplink" id="demo-1-scss">The SCSS</h3>

<p>First we’ll set up the wrapper around the actual navicon to trigger the transition. <code>$button-size</code> is the width of the lines of the navicon, not the entire target area.</p>

<pre class="brush:scss;">
              $button-size : 3.5rem; 
              $transition: .3s; // increase this to see the transformations in slow-motion

              .lines-button {
                display: inline-block;
                padding: $button-size/2 $button-size/4;
                transition: .3s;
                cursor: pointer;
                user-select: none;
                border-radius: $button-size/7;
              
                &:hover {
                  opacity: 1;
                }
              
                &:active {
                  transition: 0;
                  background: rgba(0,0,0,.1);
                }
              }
            </pre>

<p>And now a mixin that we will use to make a single line.</p>

<pre class="brush:scss">
              @mixin line {
                display: inline-block;
                width: $button-size;
                height: $button-size/7;
                background: $color;
                border-radius: $button-size/14; 
                transition: $transition;
              }
            </pre>

<p>We are using the mixin in the <code>.lines</code> element and its absolutely positioned pseudo elements to create the navicon. </p>

<pre class="brush:scss">
              .lines {
                
                //create middle line
                @include line;
                position: relative; 

                /*create the upper and lower lines as pseudo-elements of the middle line*/
                &:before, &:after {
                
                 @include line;
                  position: absolute;
                    left:0;
                  content: '';
                  transform-origin: $button-size/14 center;
                }
                &:before { top: $button-size/4; }
                &:after { top: -$button-size/4; }
              }
            </pre>

<p>We need to line up the transform origin of the pseudo elements (upper and lower lines) carefully if we want everything to line up perfectly.</p>

<p>I created a simple pen to show where the transform origin goes and how the pseudo-elements are transformed.<code>:before</code> is red, <code>:after</code> is blue, and <code>.lines</code> is green.</p>

<p>Check the pen out <a href="http://codepen.io/bennettfeely/pen/mhwDt">here</a>.</p>

<p>And here's a simple image to show the transform origins and how the pseudo-elements should align.</p>

<figure>
	<img src="../../images/transform-origin.png" alt="Image showing the transform origins of the pseudo-elements">
</figure>

<p>When we hover over the three-line menu button in it’s original state, we’ll have it expand a little.</p>

<pre class="brush:scss">
              .lines-button:hover {
                opacity: 1;
                  
                .lines {
                  &:before { top: $button-size/3.5; }
                  &:after { top: -$button-size/3.5; }
                }
              }
            </pre>

<p>Finally, let’s transform this three-line menu into a left arrow icon. For this demo, when the <code>.lines-button</code> wrapper clicked, we will add a <code>.close</code> class to it. The arrow looks better when it is scaled down a bit so we will do so using <code>scale3d()</code> rather than just <code>scale()</code>, which will trigger hardware acceleration and should make things run a bit smoother.</p>

<pre class="brush:scss">
              .lines-button.arrow.close {
                transform: scale3d(.8,.8,.8);
              }

              .lines-button.arrow.close .lines{
                  &:before,
                  &:after {
                    top: 0;
                    width: $button-size/1.8;
                  }
                
                  &:before { transform: rotate3d(0,0,1,40deg); }
                  &:after { transform: rotate3d(0,0,1,-40deg); }
              }
            </pre>

<p>For the <code>:before</code> and <code>:after</code> lines, we will shorten them a bit and overlay them all on top of each other. Finally, we rotate them 40° in opposite directions to each other. We have made an arrow!</p>

<p>For the <strong>second navicon transformation into an arrow pointing upwards</strong>, the markup remains the same, we’ll just add a class of <code>.arrow-up</code> to the button. </p>

<pre class="brush:html">
              &lt;button class="lines-button arrow arrow-up" type="button" role="button" aria-label="Toggle Navigation"&gt;
                &lt;span class="lines"&gt;&lt;/span&gt;
              &lt;/button&gt;
            </pre>

<p>This icon will get the exact same styles and transformations as the previous one, but we'll rotate the icon in it's <code>.close</code> state by 90 degrees so the arrow points upwards.</p>

<pre class="brush:scss">
              .lines-button.arrow-up.close {
                transform: scale3d(.8,.8,.8) rotate3d(0,0,1,90deg); // Rotate around the z-axis
              }
            </pre>

<h2 class="deeplink" id="demo-2">Three-line to &#8212;</h2>

<figure>
	<img src="../../images/lines-to-minus.png" alt="Three-lines to Minus Transformation">
</figure>

<p>The markup for this one is, of course, the same as the markup in the previous section. The button in this example gets a <code>.minus</code> class, which defines the styles that will be applied to it.</p>

<h3 class="deeplink" id="demo-2-scss">The SCSS</h3>

<p>To style this icon we’ll apply the same styles as above too down until the hover state. But where this icon will differ from the previous one is in the styles applied to it when it’s clicked, i.e in the <code>.close</code> state. This icon will transform into a “&#8212;” (like a minus sign), which can resemble a “collapse menu” icon, or “show less”, if you’re using it for a mobile navigation.  The pseudo-elements (top and bottom lines) won’t be rotated so we’ll reset the transforms to none, and we’ll keep the width of the icon instead of shrinking it, and then we'll just overlay them on top of the <code>.lines</code> element to form one single line instead of three.</p>

<pre class="brush:scss">
              .lines-button.minus.close .lines{
                  &:before, &:after{
                    transform: none;
                    width: $button-size;
                    top:0;
                  }
              } 
            </pre>

<h2 class="deeplink" id="demo-3">Three-line to &#10005; (#1)</h2>

<figure>
	<img src="../../images/lines-to-x.png" alt="Three-lines to x Transformation">
</figure>

<p>This icon will start out the exact same way the previous ones have. The markup structure is the same as the previous three-lines icons, with the same hover state expanding effect. For this transformation, the icon will get a <code>.x</code> class (resembles a transformation to an x shape).</p>

<p>When the button is clicked, an <code>.close</code> class is added to it just like in the previous examples. But this is where the new transformation will be defined.</p>

<h3 class="deeplink" id="demo-3-scss">The SCSS</h3>

<p>In order to transform the three lines into an &#10005; shape, we're going to change the icon's background into a transparent one (the middle line will disappear), and the upper and lower lines (the pseudo-elements) will be rotated by 45 degrees in opposite directions and overlayed to create the shape.</p>

<pre class="brush:scss">
              .lines-button.x.close .lines{

                  /*hide the middle line*/
                  background: transparent;

                  /*overlay the lines by setting both their top values to 0*/
                  &:before, &:after{
                    transform-origin: 50% 50%;
                    top:0;
                    width: $button-size;
                  }

                  // rotate the lines to form the x shape
                  &:before{
                    transform: rotate3d(0,0,1,45deg); 
                  }
                  &:after{
                    transform: rotate3d(0,0,1,-45deg); 
                  }
              }
            </pre>

<p>This transformation is very similar to the arrow transformation, but the key notes which make it different is keeping the width of the lines here instead of shrinking them like we did for the arrows, and keeping the transform origin at the center.</p>

<h2 class="deeplink" id="demo-4">Three-line to &#10005; (#2)</h2>

<figure>
	<img src="../../images/lines-to-x.png" alt="Three-lines to x Transformation">
</figure>

<p>This transformation is inspired by the fifth transformation style from Pedro Campos’s <a href="http://codepen.io/pedrocampos/details/gufrx">pen</a> on Codepen.  We’ll make the markup for this one, of course, the same as the markup for all our buttons, with a specific class, in this case .x2.</p>

<h3 class="deeplink" id="demo-4-scss">The SCSS</h3>

<p>This icon will start out with the same transformation as the three-line-to-minus icon, and when the first transformation is finished, the pseudo-elements will rotate and form the &#10005; shape. We’ll apply the second transformation when the first one is finished, so for that we’ll need to set a delay for the transitions so that they don’t happen simultaneously.</p>

<p>Where this transformation differs from the previous &#10005; effect is the order of transformations and the added delays. For the previous effect we rotated and overlayed simultaneously, while in this case we're going to overlay, and delay the rotation till the overlaying is done, and then we'll rotate.</p>

<pre class="brush:scss">
              .lines-button.x2 .lines{
                  transition: background .3s .6s ease;

                  &:before, &:after{
                    //set transform origin back to center
                    transform-origin: 50% 50%;
                    transition: top .3s .6s ease, transform .3s ease;
                  }
              }
            </pre>

<p>We have added a delay on the transition for the lines so that the transformations happen in a row.</p>

<p>Next, we’ll define the transition delays and transformations for the pseudo-elements. When the button is clicked, the upper and lower lines will first be translated to overlay on top of each other, the middle line’s background will be set to transparent to hide it, because we don’t want it to be there when the x is formed, and then each of two remaining lines  will be rotated by 45deg (and -45deg for the opposite line) to form an &#10005; shape.</p>

<pre class="brush:scss">
              .lines-button.x2.close .lines{

                  transition: background .3s 0s ease;
                  background: transparent;

                  &:before, &:after{
                    transition: top .3s ease, transform .3s .5s ease;      
                    top:0;
                    width: $button-size;
                  }
                  &:before{
                    transform: rotate3d(0,0,1,45deg); 
                  }
                  &:after{
                    transform: rotate3d(0,0,1,-45deg); 
                  }
              }
            </pre>

<p>The trick here that’s different from the previous transformations is just to set the transform origin of the pseudo-elements to be their center, and add the proper transition delays.</p>

<h2 class="deeplink" id="demo-5">Grid to &#10006; (#1)</h2>

<figure>
	<img src="../../images/grid-to-x.png" alt="Grid to x Transformation">
</figure>

<h3 class="deeplink" id="demo-5-markup">The Markup</h3>

<p>Similar to the previous markup, we have a <code>.grid-button</code> wrapping a <code>.grid</code> icon.</p>

<pre class="brush:html">
              &lt;button class="grid-button rearrange" type="button" role="button" aria-label="Toggle Navigation" &gt;
                &lt;span class="grid"&gt;&lt;/span&gt;
              &lt;/button&gt;
            </pre>

<h3 class="deeplink" id="demo-5-scss">The SCSS</h3>

<p>For this icon, instead of using psuedo elements we will instead leverage the power of the mighty <code>box-shadow</code> property. To make the code cleaner and easier to modify, we will create a <code>$base</code> and a <code>$space</code> variables. First we will style the <code>.grid-button</code>, wrapper.</p>

<pre class="brush:scss">
              //variables are used to make the buttons more flexible and easier to customize
              //these variables are replaced with their values in the compiled CSS

              $base : 1rem;
              $space : $base/4;
              $color : #c0392b;

              .grid-button {
                padding: $base*2; //2rem
                cursor: pointer;
                user-select: none;
              }

            </pre>

<p>Now let’s get to the <code>.grid</code> icon itself and the crazy <code>box-shadow</code> property. Think of each comma-separated shadow as a it’s own sort of pseudo- element. It is very important to keep track of the order of each shadow in the box-shadow property or the animation will not look right.</p>

<p>The <code>box-shadow</code> property is nice that when a color is not specified, the property simply inherits whatever the color property may be. In a situation like ours, it’s very helpful with an element with a ton of shadows that are the same color to simply leave out the colors and set it once with the color property.</p>

<pre class="brush:scss">
              .grid-button .grid{
                  width: $base;
                  height: $base;
                  background: $color;
                  color: $color; /* Not in use when the colors are specified below */
                  transition: $transition;
              }

            </pre>

<p>When we click on the button, we add the <code>.close</code> class to <code>.grid-button</code>.</p>

<p>Because we'll be using two techniques to create an &#10006; out of the grid icon, we'll be using two different class names for two two transformations. For the first one we'll use a <code>.rearrange</code> class name, as we'll be rearranging the box shadows.</p>

<p>First we’ll spread the box shadows for the icon to form a grid.</p>

<pre class="brush:scss">
              .grid-button.rearrange .grid{
                  box-shadow:
                    -($base+$space) 0 -($base+$space),
                    0 0 -($base+$space),
                    ($base+$space) (-($base + $space)),
                    -($base+$space) 0,
                    $base+$space 0,
                    -($base+$space) ($base + $space),
                    0 ($base+$space),
                    ($base+$space) ($base + $space);
                
              }
              /* The CSS equivalent to the above box-shadow result is:
              
                box-shadow: 
                  -1.25rem -1.25rem, 
                  0 -1.25rem, 
                  1.25rem -1.25rem, 
                  -1.25rem 0, 
                  1.25rem 0, 
                  -1.25rem 1.25rem, 
                  0 1.25rem, 
                  1.25rem 1.25rem;

              */
            </pre>

<p>And when the icon gets the <code>.close</code> class on click, we’ll rearrange the shadows.</p>

<pre class="brush:scss">
              .grid-button.rearrange.close .grid{ 
                    box-shadow:
                      0 0 -$base,
                      0 0 -$base*2,
                      $base 0,
                      -$base*2 0,
                      $base*2 0,
                      -$base 0,
                      0 $base*2,
                      0 $base;
                    transform: rotate3d(0,0,1,-45deg)  scale3d(.8,.8,.8);
              }

              /* The CSS equivalent to the box-shadow is:

                    box-shadow: 
                      0 -1rem, 
                      0 -2rem, 
                      1rem 0, 
                      -2rem 0, 
                      2rem 0, 
                      -1rem 0, 
                      0 2rem, 
                      0 1rem;

              */
            </pre>

<p>We have removed all the spaces between the individual shadows (removed all the <code>$space</code> variables), and moved the four corner shadows inward and four side shadows outward by rearranging them. Last but not least, we rotate the whole icon by -45° and scale it, all using hardware acceleration to make the animation run smoothly. And with that we've achieved the first effect.</p>

<h2 class="deeplink" id="demo-6">Grid to &#10006; (#2)</h2>

<figure>
	<img src="../../images/grid-to-x-2.png" alt="Grid to x Transformation #2">
</figure>

<p>For the second grid to &#10006; transformation, we’ll be doing something very similar to what we did previously, but instead of rearranging the shadows we’re going to “collapse” four of them into the main element and bring the other four closer by removing the spaces and thus forming an &#10006;. We'll give the button with this effect a class <code>.collapse</code>.</p>

<pre class="brush:scss">
              .grid-button.collapse .grid{
                //the order of box shadows here differs a little from the above one order-wise
                  box-shadow:
                    -($base+$space) 0,
                    -($base+$space) ($base+$space),
                    $base+$space 0,
                    ($base+$space) (-($base+$space)),
                    0 0 -($base+$space),
                    -($base+$space) 0 -($base+$space),
                    0 ($base+$space),
                    ($base+$space) ($base+$space);
              }

              /*The CSS equivalent to the box-shadow specified here is:
                
                  box-shadow: 
                    -1.25rem 0, 
                    -1.25rem 1.25rem, 
                    1.25rem 0, 
                    1.25rem -1.25rem, 
                    0 -1.25rem, 
                    -1.25rem -1.25rem, 
                    0 1.25rem, 
                    1.25rem 1.25rem;

              */
            </pre>

<p>And when the button is clicked the <code>.close</code> class is added, and the shadows “collapse”.</p>

<pre class="brush:scss">
              .grid-button.collapse.close .grid{
                  box-shadow:
                  -$base 0,
                  0 0 transparent,
                  $base 0,
                  0 0 transparent,
                  0 0 -$base,
                  0 0 transparent,
                  0 $base,
                  0 0 transparent;
              }

              /*The CSS equivalent to the box-shadow result is:
                
                  box-shadow: 
                    -1rem 0, 
                    0 0 transparent, 
                    1rem 0, 
                    0 0 transparent, 
                    0 -1rem, 
                    0 0 transparent, 
                    0 1rem, 
                    0 0 transparent;

              */
            </pre>

<p>And we're done! I hope you liked these effects and found the tutorial useful!</p>


