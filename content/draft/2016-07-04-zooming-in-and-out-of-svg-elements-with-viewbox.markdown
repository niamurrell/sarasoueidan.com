---
type = "article"
date: 2016-07-04T00:00:00Z
draft: true
tags:
- svg
- animation
title: Zooming In and Out of SVG Elements Using the SVG viewBox and Bounding Boxes
url: /2016/07/04/zooming-in-and-out-of-svg-elements-with-viewbox/
---

<p class="size-2x">During the last few months, I’ve given <a href="https://sarasoueidan.com/slides/SVG-In-Motion.pdf">an SVG talk focused on SVG animation</a>: prerequisites and different techniques and tools that can be used to create them. And as with many of my talks, it’s time to elaborate on some of the sections of that talk. In particular, we’ll be talking about how the SVG <code>viewBox</code> attribute—my favourite SVG feature, can be used to zoom in and out of SVG content.</p>

The technique used to zoom in and out of content with `viewBox` is surprisingly simple, as you’ll see. And what’s also great about this technique is that it can be used to create other kinds of effects inside an SVG, for which other blog posts will be dedicated in the future.

That said, this technique makes heavy usage of the SVG `viewBox` attribute as well as the concept of an SVG element’s Bounding Box. I'm going to assume that you have at least a basic knowledge of what the `viewBox` attribute is, what it does, and what its values stand for. If you don’t, then I highly recommend you check [this article](https://sarasoueidan.com/blog/svg-coordinate-systems/) out before you continue.

I’ve covered what an SVG element’s bounding box is [in my previous article](https://sarasoueidan.com/blog/mimic-relative-positioning-in-svg/#svg-bounding-box). In short, a bounding box is the SVG alternative to an element’s ‘box model’ which we have in CSS for HTML elements. 

> The bounding box (or "bbox") of an element is the tightest fitting rectangle aligned with the axes of that element's user coordinate system that entirely encloses it and its descendants.

In simpler words, a bounding box is the smallest rectangle that you can draw around an element, that encloses the entire element—all its points and edges.

A group of elements can also have a bounding box which encloses all the elements inside of that group.

<h2 class="deeplink">Bounding Box and <code>viewBox</code> Properties</h2>

When you virtually (or literally) draw a rectangle to wrap an element or group of elements somewhere inside the SVG, that rectangle has a position relative to the SVG canvas, as well as dimensions (width and height). The position is defined by the position of the rectangle’s top left corner—kind of like a coordinate system is defined by the coordinates of its center. The top left corner of the rectangle has `x` and `y` coordinates.

The rectangle also has a width and a height, both of which depend on the dimensions and space occupied by the element or group of elements.

The SVG specification defines a method, namely the `getBBox()` method (the SVG equivalent of `getBoundingClientRect()` method) which allows you to retrieve these properties using a few lines of JavaScript. 

`getBBox()` returns an object which contains the `x`, `y`, `width` and `height` defining the bounding box of the element it is called on.

<pre class="brush:js;">
var svgElement = document.getElementById('el');
bbox = svgElement.getBBox();
 
console.log( bbox.x ) ;
console.log( bbox.y ) ;
console.log( bbox.width ) ;  
console.log( bbox.height ) ;
</pre>

Conveniently, these properties are almost identical to the properties that define an SVG `viewBox` coordinate system. This link between the two is exactly what we’re going to use to zoom into an element or group of elements.

Let’s see how that works.

<h2 class="deeplink">Changing the SVG Viewing Area</h2>

By changing the values of the `viewBox` properties, you can increase and decrease the area of the SVG canvas that’s visible inside of the viewport. <small>(Again, if you’re not familiar with this, please read [this article](https://sarasoueidan.com/blog/svg-coordinate-systems/).)</small>

Changing only the dimensions of the `viewBox` changes the position and size of the elements that are visible inside the SVG viewport.

<figure>
	<img src="{{site.images}}/viewbox-demo.gif" alt="Example of how changing the viewBox dimensions affects the size and position of the contents inside the SVG.">
	<figcaption>
		Changing the viewBox dimensions affects the size and position of the contents inside the SVG. Try it out yourself in the <a href="https://sarasoueidan.com/demos/interactive-svg-coordinate-system/index.html">live demo</a>.
	</figcaption>
</figure>

The position of the elements and their visibility—but not their size—inside the viewport are affected by the value of the `viewBox` origin’s coordinates.

<figure>
	<img src="{{site.images}}/viewbox-demo-2.gif" alt="Example of how changing the viewBox origin's coordinates affects the position and visibility of the contents inside the SVG.">
	<figcaption>
		Changing the viewBox origin coordinates affects the position of the contents inside the SVG. Try it out yourself in the <a href="https://sarasoueidan.com/demos/interactive-svg-coordinate-system/index.html">live demo</a>.
	</figcaption>
</figure>

Here’s the <strong>tldr; of this article:</strong> by assigning the values of an element’s bounding box properties to the properties of the `viewBox`, you move the “viewing area” so that this particular element is the main focus of the viewport. And since the viewBox coordinates are mapped to the coordinates of the viewport, that element is “zoomed in”, and its bounding box properties become the new current coordinate system in use. Anything outside of that coordinate system is cropped out by the edges of the viewport. We establish a new viewing area, the focus of which is the element whose bounding box we used.

Here's a better, visual demonstration: this map is present on my [Speaking page](https://sarasoueidan.com/speaking/) showing the places where I’ve given talks until now. The pink area repesents an area we want to zoom in to. It is a visual representation of the bounding box of the path representing Lebanon, my country. 

<figure>
	<img src="{{site.images}}/viewbox-demo-3.gif" alt="Zooming into Lebanon on a map.">
	<figcaption>
		Clicking on the pink rectangle animates the <code>viewBox</code> by replacing its default property values with those of the rectangle’s properties. Clicking it again animates the <code>viewBox</code> back to its initial state.
	</figcaption>
</figure>

By retrieving the property values of Lebanon’s bounding box and using those values as values for the `viewBox` on the `<svg>`, Lebanon is zoomed in because the new `viewBox` coordinates are mapped into the coordinates of the initial coordinate system of the SVG viewport. This, in turn, creates the effect of having zoomed into that part of the map.

In order to enhance the effect and make it show, the value of the `viewBox` is *animated* into the value retrieved from the element’s bounding box.

Note that the new `viewBox` is centered inside the viewport and some of the elements outside of it are visible inside of the viewport. This is a natural side effect because the new value of the `viewBox`’s height-to-width aspect ratio is not equal to the aspect ratio of the SVG viewport.

<h2 class="deeplink">The Code and Live Demo</h2>



