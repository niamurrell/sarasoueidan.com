---
type: "article"
description: "Clipping in CSS and SVG — article by Sara Soueidan"
date: 2014-07-08T00:00:00Z
title: Clipping in CSS and SVG — The <code>clip-path</code> Property and <code>&lt;clipPath&gt;</code>
  Element
subtitle: ""
---

<p class="size-2x">CSS and SVG have a lot in common. A lot of the features that we have in CSS today were imported from SVG. One of these features is the <em><strong>Clipping</strong></em> operation. Both CSS and SVG allow us to "clip" elements into custom non-rectangular shapes. In this article we will go over the clipping techniques in both CSS and SVG, covering everything you need to know to get started.</p>

<p class="note warning">
	Please note that the demos in this article may not work in your browser. You should check <a href="https://github.com/awgreenblatt/css-graphics">this compatibility table</a> out for more information.<strong> You don't <em>need</em> to view the live demos to follow up with the article.</strong> Not all clipping features are implemented and some features may be buggy. The purpose of this article is to go over how clipping works in CSS and SVG, and serves as a reference for when these features are fully implemented.  I'm  also not including any vendor prefixes in the code samples here, but they are included in the live demos.
</p>

<h2 class="deeplink" id="clipping">What is clipping?</h2>

Clipping is a graphical operation that allows you to fully or partially hide portions of an element. <strong>The clipped element can be any container or graphics element.</strong> The portions of the element that are shown or hidden are determined by a *clipping path*.

<figure>
	<img src="../../images/clipping-illustration.svg" alt="">
</figure>

A <strong>clipping path</strong> defines a region where everything on the "inside" of this region is allowed to show through but everything on the outside is "clipped out" and does not appear on the canvas. This region is known as the *clipping region*. Any parts of the element that lie outside of a clipping region are not drawn. This includes any content, background, borders, text decoration, outline and visible scrolling mechanism of the element to which the clipping path is applied, and those of its descendants.

<blockquote class="pull-quote">
    The clipped element can be any container or graphics element.
</blockquote>

A clipping path is conceptually equivalent to a custom viewport for the element it applies to. It influences what parts of the element are rendered on the screen, but it does *not* affect the element's inherent geometry&mdash;the element will affect the flow around it as it normally would, and every other element on the page will still see and treat the element as if it were still rectangular, even if it's clipped to a non-rectangular shape. If you want to change the way the content around the element flows and have it respond to the defined shape of the clip path, you can use the [CSS Shapes](http://www.w3.org/TR/css-shapes/) properties. If you want to learn more about how to do that, you can check [the](http://alistapart.com/article/css-shapes-101) [articles](http://sarasoueidan.com/blog/css-shapes/) I wrote about this topic.

<h2 class="deeplink" id="clip-path">Clipping in CSS &ndash; The <code>clip-path</code> Property</h2>

The `clip-path` property is part of the CSS [Masking Module](http://www.w3.org/TR/2014/WD-css-masking-1-20140213/). The clipping operation has been a part of SVG since 2000, and has moved into the CSS Masking module so that it now allows clipping HTML elements as well as SVG elements.

The `clip-path` property is used to specify a clipping path that is to be applied to an element.  Using `clip-path`, you can apply an SVG `<clipPath>` to an element by referencing that path in the property value. You can also define a clipping path using one of the <strong>[basic shapes](http://dev.w3.org/csswg/css-shapes-2/#ltbasic-shapegt)</strong> defined in the CSS Shapes module. These shapes can be created using <strong>shape functions</strong>. The shape functions available are `polygon()`, `circle()`, `inset()` (used to define inset rectangles), and `ellipse()`.

Applying a clipping path to an element using the `clip-path` property is very simple and straightforward:

<pre class="brush:css">
/* Referencing an SVG clipPath */
.element {
	clip-path: url(#svgClipPathID);
}

/* Using a CSS basic shape function */
.element {
	clip-path: polygon(...); /* or one of the other shape functions */
}
</pre>

For example, if we were to define a polygonal clipping path using the `polygon()` function, and then apply it to an image, the code would look like the following:

<pre class="brush:css">
img {
	clip-path: polygon(626px 463px,765px 236px,687px 31px,271px 100px,70px 10px,49px 250px,133px 406px,374px 462px,529px 393px);
}
</pre>

The result of applying the above line of CSS to an image would look like the following:

<figure>
	<img src="../../images/clipping-example-1.png" alt="">
</figure>

<a href="{{ site.url }}/demos/css-svg-clipping/html-img-clipped-with-css/index.html" class="button">View Live Demo</a>

The basic shape functions allow us to create a limited number of shapes; the most complex of these shapes is a polygon. If you want to use a more complex shape that looks like more than just a group of connected straight lines, you can use the SVG `<clipPath>` element. As the name `<clipPath>` implies, you can clip to any arbitrary path. This means that you can use the `<path>` element to create any arbitrary path and use that as a clipping path.

In our second example, we're going to define and use an SVG `clipPath`. The code for the clip path looks like the following:

<pre class="brush:html;">
&lt;svg height="0" width="0"&gt;
	&lt;defs&gt;
		&lt;clipPath id="svgPath"&gt;
			&lt;path fill="#FFFFFF" stroke="#000000" stroke-width="1.5794" stroke-miterlimit="10" d="M215,100.3c97.8-32.6,90.5-71.9,336-77.6
        c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,20.1
        c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z"/&gt;
		&lt;/clipPath&gt;
	&lt;/defs&gt;
&lt;/svg&gt;
</pre>

And this is how the clipping path looks like; it is just a simple path with no fill and a black stroke.

<figure>
	<img src="../../images/the-svg-clippath.png" alt="">
</figure>

We'll be talking more about SVG `<clipPath>` in the next section. But for now, we're just going to reference it and apply it to the image we have.

<pre class="brush:css">
img {
	clip-path: url(#svgPath);
}
</pre>

And the result would look like the following:

<figure>
	<img src="../../images/clipping-example-2.png" alt="">
</figure>

<a href="{{ site.url }}/demos/css-svg-clipping/html-img-clipped-with-css-svg-clippath/index.html" class="button">View Live Demo</a>

Indeed, the `<clipPath>` element can contain any number of basic shapes (`<rect>`, `<circle>`, etc.), `<path>` elements, or even `<text>` elements.

If you specify a piece of `<text>` inside a `<clipPath>`, that text will be used as a clipping path. Whatever's under the text will be visible "through" it, and anything outside the text area will not be rendered.

Note here that you can clip *anything* to the text. This opens a door for a lot of possibilities and effects. You can use animated images (such as GIFs) or even videos, and then clip them to some text of your choice. The sky is the limit here.

The following is an example of a piece of text used as a clipping path.

<pre class="brush:html">
&lt;svg height="0" width="0"&gt;
	&lt;defs&gt;
		&lt;clipPath id="svgTextPath"&gt;
			&lt;text x="0" y="300" textLength="800px" lengthAdjust="spacing" font-family="Vollkorn" font-size="230px" font-weight="700" font-style="italic"&gt; Blossom &lt;/text&gt;
		&lt;/clipPath&gt;
	&lt;/defs&gt;
&lt;/svg&gt;
</pre>

The cool thing about SVG `<text>` is that it can be displayed using a custom font, just like HTML text can. In this example I'm using the [Vollkorn font](http://www.google.com/fonts/specimen/Vollkorn) from Google Web Fonts. I've set the width of the text to be the same as the width of the image, using the `textLength` attribute, and positioned the text using the `x` and `y` coordinates. Note here that the `x` and `y` coordinates determine the position of the bottom left corner of the text (where the bottom stands for the baseline of the text).

The result of applying the above text clip path to the image looks like so:

<figure>
	<img src="../../images/clipping-example-3.png" alt="">
</figure>

<a href="{{ site.url }}/demos/css-svg-clipping/html-img-clipped-with-css-svg-clippath-text/index.html" class="button">View Live Demo</a>

And as we mentioned, you can also use multiple basic shapes inside `<clipPath>`. We'll dig into `<clipPath>` and its contents in the next section, so, for now, we'll keep it simple. In this example I'm using multiple `<circle>`s, each with a different size and position.

<pre class="brush:html">
&lt;svg height="0" width="0"&gt;
    &lt;defs&gt;
        &lt;clipPath id="svgPath"&gt;
            &lt;circle stroke="#000000" stroke-miterlimit="10" cx="50" cy="50" r="40" /&gt;
            &lt;circle stroke="#000000" stroke-miterlimit="10" cx="193.949" cy="235" r="74.576"/&gt;
            &lt;circle stroke="#000000" stroke-miterlimit="10" cx="426.576" cy="108.305" r="47.034"/&gt;
            &lt;circle stroke="#000000" stroke-miterlimit="10" cx="346.915" cy="255.763" r="43.644"/&gt;
            &lt;circle stroke="#000000" stroke-miterlimit="10" cx="255.39" cy="82.882" r="35.17"/&gt;
            &lt;!-- more circles... --&gt;
        &lt;/clipPath&gt;
    &lt;/defs&gt;
&lt;/svg&gt;
</pre>

The image will show through these circles combined, but will not be rendered outside them.

<figure>
	<img src="../../images/clipping-example-4.png" alt="">
</figure>

<a href="{{ site.url }}/demos/css-svg-clipping/html-img-clipped-with-css-svg-clippath-multiple-shapes/index.html" class="button">View Live Demo</a>

As we mentioned at the beginning of this article, you can apply clip paths using the `clip-path` property to SVG elements too. In all of the above examples, the clipping paths were applied to an HTML `<img>`. In the following example, a clipping path is applied to the root `<svg>` element. The same cherry blossoms image we used above is now part of the SVG, referenced using the `<image>` element.

The `<image>` element in SVG is used to include a graphic that can be either an entire SVG or a raster image. If it's an SVG you're referencing in `<image>`, the `width` and `height` attributes will be used to establish the viewport of that SVG. If you're referencing a raster image (which is what we're doing here), the image will be scaled to fit in the specified `width` and `height`. So I made sure the aspect ratio of the `width` and `height` attribute match the aspect ratio of the image I'm using, to prevent it from being distorted.

When you create an `<svg>` document, you establish its viewport by specifying the width
and height of the `<svg>` element. Anything drawn outside the limits of the viewport will be clipped out and will not be displayed. You can establish a new custom viewport of your own with the `<clipPath>` element.

<pre class="brush:html">
&lt;svg height="500" width="800"&gt;
    &lt;image xlink:href="flowers.jpg" x="0" y="0" width="800" height="500"/&gt;
    &lt;defs&gt;
        &lt;clipPath id="theSVGPath"&gt;
            &lt;rect x="0" y="0" stroke="#000000" stroke-miterlimit="10" width="108" height="500"/&gt;
            &lt;rect x="121.5" y="25.5" stroke="#000000" stroke-miterlimit="10" width="55" height="455"/&gt;
            &lt;rect x="192.5" y="9.5" stroke="#000000" stroke-miterlimit="10" width="60" height="484"/&gt;
            &lt;rect x="271.5" y="44.5" stroke="#000000" stroke-miterlimit="10" width="63" height="416"/&gt;
            &lt;rect x="349.5" y="25.5" stroke="#000000" stroke-miterlimit="10" width="208" height="447"/&gt;
            &lt;rect x="574.5" y="44.5" stroke="#000000" stroke-miterlimit="10" width="60" height="446"/&gt;
            &lt;rect x="644.5" y="9.5" stroke="#000000" stroke-miterlimit="10" width="68" height="471"/&gt;
            &lt;rect x="736.5" y="18.5" stroke="#000000" stroke-miterlimit="10" width="49" height="462"/&gt;
        &lt;/clipPath&gt;
    &lt;/defs&gt;
&lt;/svg&gt;
</pre>

Using `clip-path`, we're going to apply the `clipPath` to the `<svg>`:

<pre class="brush:css">
svg {
    clip-path: url(#theSVGPath);
}
</pre>

<figure>
	<img src="../../images/clipping-example-5.png" alt="">
</figure>
<a href="{{ site.url }}/demos/css-svg-clipping/svg-image-clipped-with-css/index.html" class="button">View Live Demo</a>

More examples applying a clipping path to an SVG element in the `<clipPath>` section below.

<h3 class="deeplink" id="reference-box">A Clipping Path's Reference Box</h3>

In addition to the clipping path itself, you can define a <em>reference box</em> in the `clip-path` property when the clipping path applied is a `<basic-shape>`; that is, a clipping path created using one of the basic shape functions. The reference box is hence only specified for CSS shapes used as clip paths, not for SVG `<clipPath>`s. For an SVG `<clipPath>`, the reference box is the border box of an HTML element.

So a reference box is specified for a `<basic-shape>` clip path. If the element being clipped is an HTML element, the reference box can be one of the four basic box model boxes: `margin-box`, `border-box`, `padding-box`, or `content-box`. Each of these is self-explanatory.

If the `<basic-shape>` clip path is applied to an SVG element, the reference box can be set to one of three keyword values:

+ fill-box &ndash; uses the object bounding box as the reference.
+ stroke-box &ndash; uses the stroke bounding box as the reference.
+ view-box &ndash; uses the uses the nearest SVG viewport as the reference box if no `viewBox` is specified. If a `viewBox` is indeed specified, then the coordinate system is established by the origin and dimensions specified by the `viewBox`.

If you set any of the CSS box model boxes as a reference box for an SVG element, the `fill-box` will be used. And if you use one of the SVG reference boxes on an HTML element, the `border-box` will be used.

<pre class="brush:css">
.element {
    clip-path: polygon(...) padding-box;
}
</pre>

If *only* a reference box is specified in the `clip-path` property&mdash;that is, no basic shape is defined&mdash;the browser uses the edges of the specified box, including any corner shaping (e.g. defined by the `border-radius` property), as clipping path.

For example, using the following snippet, the element will be clipped to the rounded corners specified by `border-radius`:

<pre class="brush:css">
.el {
    clip-path: border-box;
    border-radius: 25%;
}
</pre>

<p class="note">Note that at the time of writing of this article, specifying a reference box in the `clip-path` property doesn't work in Webkit because it's not yet implemented.</p>

<h3 class="deeplink" id="clip-path-notes"><code>clip-path</code> Notes: Stacking Contexts, Pointer Events and Animations</h3>

It is important to know that any value other than the default `none` for the `clip-path` property results in the creation of a stacking context on the element the same way the `opacity` property does.

<blockquote class="pull-quote">
    Any value other than the default `none` for the `clip-path` property results in the creation of a stacking context on the element.
</blockquote>

Furthermore, according to the Masking specification, <strong>pointer events must not be dispatched on the clipped-out (non-visible) regions of a shape</strong>. This means that the element should not respond to pointer events outside the remaining visible area.

A clipping path can also be animated. If the clipping path used is an SVG `<clipPath>`, it can be animated by including an animation inside it (See next section for details). If the cipping path is a basic shape created using a basic shape function, it can be animated using CSS animations and transitions. For details on how to animate a shape created using a shape function, check out the [Animating CSS Shapes with CSS Animations and Transitions](http://sarasoueidan.com/blog/animating-css-shapes) article I wrote a while back.

<h2 class="deeplink" id="svg-clippath-element">Clipping in SVG &ndash; The <code>&lt;clipPath&gt;</code> Element</h2>

In SVG, the `clipPath` element is used to define a clipping path to clip elements. If you don't want to use CSS to apply the clipping path to an element, you can do it in SVG using the `clip-path` presentation attribute.

<p class="note">
Have you seen/read my "Styling and Animating Scalable Vector Graphics with CSS" slides? If not, you may want to have a look at them for more information about SVG presentation attributes and CSS properties used to style SVG elements. You can check them out <a href="https://docs.google.com/presentation/d/1Iuvf3saPCJepVJBDNNDSmSsA0_rwtRYehSmmSSLYFVQ/pub?start=false&loop=false&delayms=3000#slide=id.p">here</a>.
</p>

<pre class="brush:html">
&lt;svg&gt;
    &lt;defs&gt;
        &lt;clipPath id="myClippingPath"&gt;
            &lt;!-- ... --&gt;
        &lt;/clipPath&gt;
    &lt;/defs&gt;
    &lt;!-- the element you want to apply the clipPath to can be any SVG element --&gt;
    &lt;g id="my-graphic" clip-path="url(#myClippingPath)"&gt;
        &lt;!-- ... --&gt;
    &lt;/g&gt;
&lt;/svg&gt;
</pre>

<h3 class="deeplink" id="contents-of-clippath">Contents Of a <code>&lt;clipPath&gt;</code></h3>

We mentioned earlier that an SVG `clipPath` can contain any number of basic shapes, arbitrary `<path>`s, and/or `<text>` elements. It can even contain more than that, and this is where it can get interesting.

The `<clipPath>` content can be descriptive (`<title>`, `<desc>`, `<metadata>`). It can also be a shape (`<circle>`, `<ellipse>`, `<line>`, `<path>`, `<polygon>`, `<polyline>`, `<rect>`) or a `<text>`. A `<clipPath>` can also contain a `<use>` element or a `<script>`. Note that `<use>` in `<clipPath>` can only reference the simple SVG shapes mentioned above&mdash;it cannot be used to reference groups inside `<clipPath>`, for example; that simply won't work.

And last but not least, a `<clipPath>` can contain an <strong>animation</strong> using `<animate>`, `<animateColor>`, `<animateMotion>`, `<animateTransform>`, or `<set>`. This opens a door for a lot of creativity, as you can imagine.

To demonstrate, I'm just going to add a simple animation to the demo using multiple `<circle>`s as a clipping path. Every `<circle>` will get an animation. Because I want to keep it simple, I'm just gonna use the same animation on all of the circles. You can create fancier effects using different effects and playing with animation delays, of course. But, since this is a 101 article, I'm gonna stay on the simple side. The code with the animations look like so:

<pre class="brush:html">
&lt;svg height="0" width="0"&gt;
    &lt;defs&gt;
        &lt;clipPath id="svgPath"&gt;
            &lt;circle stroke="#000000" stroke-miterlimit="10" cx="50" cy="50" r="40"&gt;
                        &lt;animate
                            attributeName="r"
                            attributeType="XML"
                            from="0" to="250"
                            begin="0s" dur="3s"
                            fill="freeze"
                            repeatCount="indefinite"/&gt;
                    &lt;/circle&gt;
            &lt;circle stroke="#000000" stroke-miterlimit="10" cx="193.949" cy="235" r="74.576"&gt;
                &lt;animate
                    attributeName="r"
                    attributeType="XML"
                    from="0" to="250"
                    begin="0s" dur="3s"
                    fill="freeze"
                    repeatCount="indefinite"/&gt;
            &lt;/circle&gt;
            &lt;!-- ... --&gt;
        &lt;/clipPath&gt;
    &lt;/defs&gt;
&lt;/svg&gt;
</pre>

The animation specified for each circle will animate the size of the circle&mdash;more specifically, its radius (`r`)&mdash;over the course of three seconds, from `0` to `250` pixels. I've also set the animation to repeat indefinitely.

Click on the following button to view the live demo. But before you do, note that there is a bug (see bug details [here](https://code.google.com/p/chromium/issues/detail?id=391604)), so the demo may not work for you if you're on Chrome or Safari. For now, I recommend using Firefox to see the working live demo, until the bug has been fixed.

<a href="{{ site.url }}/demos/css-svg-clipping/html-img-clipped-with-css-svg-clippath-animated/index.html" class="button">View Animated clipPath Demo Live</a>

Note that the content of a `<clipPath>` also cannot involve groups (`<g>`s). For example, if we were to add a group element to the demo that uses multiple circles as a clipping path, the demo will no longer work&mdash;the clipping path will no longer be applied to the image.

<pre class="brush:html">
&lt;svg height="0" width="0"&gt;
    &lt;defs&gt;
        &lt;clipPath id="svgPath"&gt; &lt;!-- WILL NOT WORK --&gt;
            &lt;g&gt; &lt;!-- WILL NOT WORK --&gt;
                &lt;circle stroke="#000000" stroke-miterlimit="10" cx="193.949" cy="235" r="74.576"/&gt;
                &lt;circle stroke="#000000" stroke-miterlimit="10" cx="426.576" cy="108.305" r="47.034"/&gt;
                &lt;!-- ... --&gt;
            &lt;/g&gt;
        &lt;/clipPath&gt;
    &lt;/defs&gt;
&lt;/svg&gt;
</pre>

<h3 class="deeplink" id="clippathunits">The <code>clipPathUnits</code> Attribute</h3>

The `<clipPath>` element can have several attributes, including `id`, `class`, `transform`s, and [presentation attributes](http://www.w3.org/TR/2011/REC-SVG11-20110816/intro.html#TermPresentationAttribute) like `fill` and `stroke`, among [many others](http://www.w3.org/TR/2011/REC-SVG11-20110816/styling.html#SVGStylingProperties). But the one attribute that stands out, and that is particularly useful, is the `clipPathUnits` attribute.

<blockquote class="pull-quote">
    The <code>clipPathUnits</code> attribute is used to specify a coordinate system for the contents of the <code>&lt;clipPath&gt;</code>.
</blockquote>
The `clipPathUnits` attribute is used to specify a coordinate system for the contents of the `<clipPath>`. It takes one of two values: `objectBoundingBox` or `userSpaceOnUse`. The default value is `userSpaceOnUse`.

<pre class="brush:html">
clipPathUnits = "userSpaceOnUse | objectBoundingBox"
</pre>

<dl>
    <dt>userSpaceOnUse</dt>
    <dd>
        The contents of the <code>clipPath</code> represent values in the current <em><strong>user coordinate system</strong></em> in place at the time when the <code>clipPath</code> element is referenced (i.e., the user coordinate system for the element referencing the <code>clipPath</code> element via the <code>clip-path</code> property).
        <p>
            The current <strong>user coordinate system</strong> (a.k.a <em><strong>local coordinate system</strong></em>) is the coordinate system that is currently active and which is used to define how coordinates and lengths are located and computed. The user coordinate system for an HTML element with an associated CSS box model is different from that of an SVG element with no such box model.
        </p>
        <p>
            For elements that have an associated CSS layout box, the current user coordinate system has its origin at the top left corner of a reference box and one unit equals one CSS pixel. The viewport for resolving percentage values is defined by the width and height of the reference box. I'm sure you're already familiar with this. So if you have a <code>&lt;clipPath&gt;</code> containing a <code>&lt;circle&gt;</code> whose center is positioned at <code>cx = "100"</code> and <code>cy = "100"</code>, the center will be positioned 100 pixels to the left and 100 pixels down inside the boundaries of the reference box.
        </p>
        <p>
            If the element is an SVG element and thus does not have an associated CSS layout box, the current user coordinate system has its origin at the top left corner of the element's <strong>nearest viewport</strong>. In most cases, the nearest viewport is the viewport established by the width and height of the closest <code>&lt;svg&gt;</code> ancestor. If you're not nesting <code>&lt;svg&gt;</code>s, it's simply the viewport you establish on the root <code>&lt;svg&gt;</code>.
        </p>
        <p>
            Note that the coordinate system on an SVG element can be modified using the <code>viewBox</code> attribute, among other attributes which may contribute to changing the coordinate system. However, that's outside the scope of this article. So in this article I'm going to work under the assumption that no <code>viewBox</code> is modified, and hence the browser will use the default coordinate system with the origin at the top left corner, and dimensions equal to the dimensions of the <code>&lt;svg&gt;</code>.
        </p>
    </dd>
    <dt>objectBoundingBox</dt>
    <dd>
        The coordinate system has its origin at the top left corner of the <strong><em>bounding box</em></strong> of the element to which the clipping path applies to and the same width and height of this bounding box. A bounding box is the object bounding box for all SVG elements (it contains only an element's geometric shape) and the border box for HTML elements with an associated box model.
        <p>
            This value is particularly useful for SVG elements because it allows you to apply the clip path to the boundaries of the element itself, not the coordinate system on use. To demonstrate, here is an image showing the result of applying the clip path to an image inside an SVG canvas using <code>userSpaceOnUse</code> versus <code>objectBoundingBox</code>. The grey border represents the border of the <code>&lt;svg&gt;</code> element where the viewport is set. For the image on the right, I've added a grey border around the clipped image just to show the boundaries of the bounding box.
        </p>
        <figure>
            <img src="../../images/clippathunits.png" alt="">
            <figcaption>The result of applying the <code>clipPath</code> to an image inside the SVG canvas using <code>userSpaceOnUse</code> (left) and <code>objectBoundingBox</code> (right). </figcaption>
        </figure>
        <p>
            In the image on the left, the clipping path is positioned in the coordinate system established on the viewport of the SVG. When using <code>objectBoundingBox</code>, the bounding box of the image itself is used as the coordinate system of the clipping path.
        </p>
        <p>
            One important thing to note here is that <strong>when you use the <code>objectBoundingBox</code> value, the coordinates specified for the contents of the <code>&lt;clipPath&gt;</code> must be in the range [0, 1]</strong>&mdash;the coordinate system becomes a unit system, and the coordinates of the shapes inside a <code>clipPath</code> have to be fractions in that range.
        </p>
        <figure>
            <img src="../../images/clippathunits-system.jpg" alt="">
            <figcaption>
                The coordinate system used for the <code>objectBoundingBox</code> value on the right, versus that used for the <code>userSpaceOnuse</code> on the left.
            </figcaption>
        </figure>
        <p>
            For example, if the clip path being applied to an element contains a circle positioned so that its center lies at the center of the clipped element:
        </p>
        <pre class="brush:html">
            &lt;clipPath&gt;
                &lt;circle cx="350" cy="350" r="300" /&gt;
            &lt;/clipPath&gt;
        </pre>
        <p>
            the circle position (and radius) would be expressed in fractions like so:
        </p>
        <pre class="brush:html">
            &lt;clipPath clipPathUnits="objectBoundingBox"&gt;
                &lt;circle cx=".5" cy=".5" r=".45" /&gt;
            &lt;/clipPath&gt;
        </pre>
        <p>
            The fractions are like percentage values in this case.
        </p>
    </dd>
</dl>


<h3 class="deeplink" id="-svg-clippath-notes"><code>&lt;clipPath&gt;</code> Notes</h3>

`clipPath` elements are never rendered directly; their only usage is as something that can be referenced using the `clip-path` property. The `display` property does not apply to the `clipPath` element; thus, `clipPath` elements are not directly rendered even if the `display` property is set to a value other than `none`, and `clipPath` elements are available for referencing even when the `display` property on the `clipPath` element or any of its ancestors is set to `none`.

Remember what we said earlier about pointer events when an HTML element is clipped? The same standard behavior is defined in the SVG Clipping and Masking specification: By default, pointer-events must not be dispatched on the clipped (non-visible) regions of an SVG element. The spec then mentions that <q>later versions of SVG may define new properties to enable fine-grained control over the interactions between hit testing and clipping</q>.

Firefox implements the same non-standard behavior we mentioned before&mdash;areas outside the clipping regions do not respond to pointer events.

Even though Chrome implements the standard behavior for the `clip-path` property on HTML elements, when you apply a `<clipPath>` to an SVG element, the behavior is the same as the one implemented in Firefox&mdash;only the visible areas respond to pointer events. I'm not sure if this is a feature or a bug.

In the following example, an SVG `<clipPath>` is applied to an SVG `<image>`. The clip path is similar to the one we used before, where the image is clipped by a number of rectangles. The image becomes translucent when you hover over it.

<pre class="brush:css">
image {
    clip-path: url(#svgPath);
}
image:hover {
    opacity: .5;
}
</pre>
<a href="{{ site.url }}/demos/css-svg-clipping/svg-img-clipped-pointer-events/index.html" class="button">Try The Demo Out Live</a>

Also, note that an empty clipping path will completely clip away the element that had the `clip-path` property applied.

<h2 class="deeplink" id="final-words">Final Words</h2>

Clipping is one of those graphical operations that allow us to create irregular shapes in an otherwise rectangular web page. Indeed, clipping is a perfect companion to CSS shapes. If you've read any of my [previous](http://alistapart.com/article/css-shapes-101) [articles](http://sarasoueidan.com/blog/css-shapes/) about CSS Shapes, then you already know that the `clip-path` property can be an indispensable companion to CSS Shapes in some use cases. And once CSS Shapes properties can [reference SVG paths](http://dev.w3.org/csswg/css-shapes-2/#referencing-svg-shapes) ([CSS Shapes Module Level 2](http://dev.w3.org/csswg/css-shapes-2/)), in addition to the basic CSS shapes, the combination of Shapes and Clipping will allow us to create visually compelling designs that break the norms of the rectangle.

I hope you found this article useful. Thank you for reading!
