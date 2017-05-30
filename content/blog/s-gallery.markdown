---
type: "article"
description: "S Gallery: A Responsive jQuery Gallery Plugin with CSS3 Animations — article by Sara Soueidan"
date: 2013-07-12T00:00:00Z
title: 'S Gallery: A Responsive jQuery Gallery Plugin with CSS3 Animations'
subtitle: ""
demo: "s-gallery"
repo: "s-gallery"
---

<p class="size-2x">Today I'm going to share with you a gallery plugin I built (yeah, like the world needs another gallery plugin, right?) after having stumbled upon <a href="http://store.sony.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=10551&storeId=10151&langId=-1&productId=8198552921666556433#gallery" title="Sony's Product Gallery Page">SONY's products gallery</a> while I was browsing their website a while ago. </p>

<p>Their products' image gallery is a simple one, but two things grabbed my attention about the gallery: </p>

<ol style="padding-left:50px">
<li>It's made with Flash when it can totally be created with HTML, CSS3 and Javascript.</li>
<li>It has a neat feature: exiting the slideshow mode back to the grid view mode, the last image which was active in the slideshow mode "returns back" to its position in the grid view, thus the user knows where they have stopped and what images are left in the gallery that they haven't maybe browsed. This is a neat feature which serves as a brain cue and thus is a nice and positive UX-aware touch.</li>
</ol>

<p>Not to mention that the gallery is accessible by keyboard and you can navigate through the images via keyboard shortcuts, and enter into fullscreen mode with only the gallery being in fullscreen, therefore removing all distractions so that you can focus only on the products gallery.</p>

<p class="note warning">The plugin uses <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Using_full_screen_mode">HTML5's FullScreen API</a>, and relies heavily on CSS3 animations transforms, so it will work only in <a href="http://caniuse.com/#search=animations">browsers that support</a> <a href="http://caniuse.com/#search=transforms">these features</a>.</p>

<h2 class="deeplink" id="markup">The Markup</h2>

<p>The markup needed for the plugin is simple: two unordered lists, the first one for the small versions of the images, and the second one for the big versions, wrapped in a container which I'll be giving an id of <code> #gallery-container</code>.</p>

<p><b>The small images should be scaled versions of the big images, i.e they should all have the same aspect ratio for best results.</b></p>

<p>One more thing is needed in the markup: the controls bar. The controls are used to (duh) control the slideshow and navigate through the images..</p>

<pre class="brush:html;">
            &lt;div id="gallery-container"&gt;
              &lt;ul class="items--small"&gt;
                &lt;li class="item"&gt;&lt;a href="#"&gt;&lt;img src="images/small-1.png" alt="" /&gt;&lt;/a&gt;&lt;/li&gt;
                &lt;li class="item"&gt;&lt;a href="#"&gt;&lt;img src="images/small-2.png" alt="" /&gt;&lt;/a&gt;&lt;/li&gt;
                &lt;!--.....--&gt;
              &lt;/ul&gt;
              &lt;ul class="items--big"&gt;
                &lt;li class="item--big"&gt;
                  &lt;a href="#"&gt;
                    &lt;figure&gt;
                      &lt;img src="images/big-1.jpg" alt="" /&gt;
                      &lt;figcaption class="img-caption"&gt;
                        Caption
                      &lt;/figcaption&gt;
                    &lt;/figure&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
                &lt;li class="item--big"&gt;
                  &lt;a href="#"&gt;
                    &lt;figure&gt;
                      &lt;img src="images/big-2.jpg" alt="" /&gt;
                      &lt;figcaption class="img-caption"&gt;
                        Caption
                      &lt;/figcaption&gt;
                    &lt;/figure&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
                &lt;!--...--&gt;
              &lt;/ul&gt;
              &lt;div class="controls"&gt;
                &lt;span class="control icon-arrow-left" data-direction="previous"&gt;&lt;/span&gt; 
                &lt;span class="control icon-arrow-right" data-direction="next"&gt;&lt;/span&gt; 
                &lt;span class="grid icon-grid"&gt;&lt;/span&gt;
                &lt;span class="fs-toggle icon-fullscreen"&gt;&lt;/span&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            </pre>

<p>The class names are only CSS hooks, so you can change them, but make sure you change them in the stylesheet as well if you do.</p>

<p>The control buttons use an image sprite for the icons, which will be included among the plugin assets.</p>

<p>And that's all you need in the markup.</p>

<h2 class="deeplink" id="dependencies">Dependencies</h2>

<p>The plugin has two dependencies: the stylesheet for the gallery and jQuery. Also, if you decide to use the same icons for the gallery controls as the ones I'm using, don't forget to include them in your directory as well.</p>

<p>Link to the stylesheet in the head of your page (or import the stylesheet to your main stylesheet and concatenate them if you use Sass and Compass).</p>

<pre class="brush:html;">
    &lt;link rel="stylesheet" href="path-to-stylesheets/styles.css" /&gt;
</pre>

<p>Link to jQuery from a CDN and the plugin script at the bottom of the page right before the ending <code>body</code> tag:</p>

<pre class="brush:html;">
    &lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script src="path-to-your-js-scripts/scripts.js"&gt;&lt;/script&gt;
</pre>

<p>In order to optimize this gallery for touch, I added <a href="http://eightmedia.github.io/hammer.js/">hammer.js</a> into a javascript file called plugins.js, which also includes <a href="https://github.com/sindresorhus/screenfull.js">Screenfull.js</a> by <a href="https://twitter.com/sindresorhus">Sindre Sorhus</a>, which is a "Simple wrapper for cross-browser usage of the JavaScript Fullscreen API". </p>

<p>You have an option to add full-screen support to your gallery, which you can specify in the options when you call the plugin by setting the value for the option to <code>true</code> (more on this next).</p>

<p>Link to the script before you link to the plugin script: </p>

<pre class="brush:html;">
    &lt;script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script src="path-to-your-js-scripts/plugins.js"&gt;&lt;/script&gt;
    &lt;script src="path-to-your-js-scripts/scripts.js"&gt;&lt;/script&gt;
</pre>

<h2 class="deeplink" id="using-the-plugin">Using the Plugin</h2>

<p>Calling the plugin is very straightforward. The fullScreenEnabled option is set to <code>false</code> by default, you can enable it to add full-screen support by setting it to true:</p>

<pre class="brush: js;">
              $(document).ready(function(){
                $('#gallery-container').sGallery({
                  fullScreenEnabled: true //default is false
                });
              });
            </pre>

<p>And that's it. I hope you like this plugin and find it useful!</p>

