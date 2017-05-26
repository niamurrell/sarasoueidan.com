---
date: 2014-07-03T00:00:00Z
title: Structuring, Grouping, and Referencing in SVG — The <code>&lt;g&gt;</code>,
  <code>&lt;use&gt;</code>, <code>&lt;defs&gt;</code> and <code>&lt;symbol&gt;</code>
  Elements
subtitle: ""
---

<p class="size-2x">SVG comes with its own ways for structuring a document by means of certain SVG elements that allow us to define, group, and reference objects within the document. These elements make reusing elements easy, while maintaining clean and readable code. In this article we'll go over these elements, highlighting the difference between them and the advantages of each one.</p>

<h2 class="deeplink" id="the-g-element">Grouping with the <code>&lt;g&gt;</code> element</h2> 

The 'g' in `<g>` stands for 'group'. The group element is used for logically grouping together sets of related graphical elements. In terms of graphics editors, such as Adobe Illustrator, the `<g>` element serves a similar functionality as the *Group Objects* function. You can also think of a group as being similar to the concept of a *layer* in a graphics editor, since a layer is also a grouping of elements.

<blockquote class="pull-quote">
	The group element is used for logically grouping together sets of related graphical elements.
</blockquote>

The `<g>` element groups all of its descendants into one group. It usually has an `id` attribute to give that group a name. Any styles you apply to the `<g>` element will also be applied to all of its descendants. This makes it easy to add styles, transformations, interactivity, and even animations to entire groups of objects. 

For example, the following is an SVG bird. The bird is made up of several shapes such as circles and paths. 

<figure>
	<img src="../../images/grouping-bird.svg" alt="">
</figure>

If you wanted to move the entire bird from one place to another in Illustrator, you will also want to group the elements together so that you wouldn't have to select each and every one of them every time you wanted to do so. 

<figure>
	<img src="../../images/grouping-in-illustrator.png" alt="">
</figure>

Grouping in SVG using the `<g>` element works the same way. In this example we've grouped the elements of the body together, the elements of the head together, and then we grouped the two groups into one group with an `id` of `bird`.

<pre class="brush:html">
&lt;svg width="1144.12px" height="400px" viewBox="0 0 572.06 200"&gt;
	&lt;style&gt;
		svg{background-color:white;}
		#wing{fill:#81CCAA;}
		#body{fill:#B8E4C2;}
		#pupil{fill:#1F2600;}
		#beak{fill:#F69C0D;}
		.eye-ball{fill:#F6FDC4;}
	&lt;/style&gt;
	&lt;g id="bird"&gt;
		&lt;g id="body"&gt;
			&lt;path d="M48.42,78.11c0-17.45,14.14-31.58,31.59-31.58s31.59,14.14,31.59,31.58c0,17.44-14.14,31.59-31.59,31.59
			S48.42,95.56,48.42,78.11"/&gt;
			&lt;path d="M109.19,69.88c0,0-8.5-27.33-42.51-18.53c-34.02,8.81-20.65,91.11,45.25,84.73
			c40.39-3.65,48.59-24.6,48.59-24.6S124.68,106.02,109.19,69.88"/&gt;
			&lt;path id="wing" d="M105.78,75.09c4.56,0,8.84,1.13,12.62,3.11c0,0,0.01-0.01,0.01-0.01l36.23,12.38c0,0-13.78,30.81-41.96,38.09
			c-1.51,0.39-2.82,0.59-3.99,0.62c-0.96,0.1-1.92,0.16-2.9,0.16c-15.01,0-27.17-12.17-27.17-27.17
			C78.61,87.26,90.78,75.09,105.78,75.09"/&gt;
		&lt;/g&gt;
		&lt;g id="head"&gt;
			&lt;path id="beak" d="M50.43,68.52c0,0-8.81,2.58-10.93,4.86l9.12,9.87C48.61,83.24,48.76,74.28,50.43,68.52"/&gt;
			&lt;path class="eye-ball" d="M60.53,71.68c0-6.33,5.13-11.46,11.46-11.46c6.33,0,11.46,5.13,11.46,11.46c0,6.33-5.13,11.46-11.46,11.46
				C65.66,83.14,60.53,78.01,60.53,71.68"/&gt;
			&lt;path id="pupil" d="M64.45,71.68c0-4.16,3.38-7.53,7.54-7.53c4.16,0,7.53,3.37,7.53,7.53c0,4.16-3.37,7.53-7.53,7.53
				C67.82,79.22,64.45,75.84,64.45,71.68"/&gt;
			&lt;path class="eye-ball" d="M72.39,74.39c0-2.73,2.22-4.95,4.95-4.95c2.73,0,4.95,2.21,4.95,4.95c0,2.74-2.22,4.95-4.95,4.95
				C74.6,79.34,72.39,77.13,72.39,74.39"/&gt;
		&lt;/g&gt;
	&lt;/g&gt;
&lt;/svg&gt;
</pre>

If you were to change the fill color of the `#body` group, the fill color of all the elements inside the group will change to the color you specify. This is very convenient.

Grouping elements is very useful, not just for organizational and structural purposes. It's particularly useful for when you want to add interactivity or transformations to an SVG graphic that is made up of several items. You can associate those items together in a group and then define transformations to move, scale, or rotate all the items together so that their spatial relations to one another are maintained.

If you wanted to scale the entire bird up and make it twice its size, you will be able to do it with one line of CSS if all the elements are grouped together.

<pre class="brush:css">
#bird {
	transform: scale(2);
}
</pre>

Grouping makes interactivity, in particular, more convenient. You can attach mouse events to the entire bird and have it respond to the events as a whole group, instead of having to apply the same interactions and/or transformations to every element in that group.

The `<g>` element has one more important and great feature: it can have its own `<title>` and `<desc>` tags that help make it more accessible to screen readers, and overall make the code more readable to humans as well. For example:

<pre class="brush:html">
&lt;g id="bird"&gt;
	&lt;title&gt;Bird&lt;/title&gt;
	&lt;desc&gt;An image of a cute little green bird with an orange beak.&lt;/desc&gt;
	&lt;!-- ... --&gt;
&lt;/g&gt;
</pre>

<h2 class="deeplink" id="the-use-element"> Reusing elements with the <code>&lt;use&gt;</code> element</h2>

Often times, there are elements that are repeated in a graphic. If you're working in Illustrator and you want to repeat an element somewhere in the graphic, you would copy the element and then paste it and use it wherever it is you want to use it. Copying and then pasting an existing element is more convenient than having to recreate that element from scratch.

The `<use>` element lets you reuse existing elements, giving you a similar functionality to the copy-paste functionality in a graphics editor. It can be used to reuse a single element, or a group of element defined with the `<g>` element.

<blockquote class="pull-quote">
	The <code>&lt;use&gt;</code> element lets you reuse existing elements, giving you a similar functionality to the copy-paste functionality in a graphics editor.
</blockquote>

The `<use>` element takes `x`, `y`, `height`, and `width` attributes, and it references other content using the `xlink:href` attribute. So if you have defined a group somewhere with a given `id`, and you want to reuse it somewhere else, you give its URI in an `xlink:href`
attribute, and specify the `x` and `y` location where the group's `(0, 0)` point should be moved to. 

For example, if we were to create another bird in our SVG canvas, we could reuse the existing bird like so:

<pre class="brush:html">
&lt;use x="100" y="100" xlink:href="#bird" /&gt;
</pre>

Note that you can reference any SVG element inside the `xlink:href` attribute, even if that element is in an external file. The referenced element or group does not have to exist in the same file. This is great for organizing files (for example you could have a file for reusable components) and for caching the used files. If the bird in our example were created in a seperate file called `animals.svg` for example, we could have referenced it like so:

<pre class="brush:html">
&lt;use x="100" y="100" xlink:href="path/to/animals.svg#bird" /&gt;
</pre>

However, referencing external SVG in `<use>` doesn't work in most versions of IE (up to IE 11). I recommend you read [this article](http://css-tricks.com/svg-use-external-source/) by Chris Coyier for details and fallback mechanisms.

Now, those of you with a sharp bird's eye (pun not intended), may have noticed that I said that the `x` and `y` attributes of `<use>` specify the location where the group's upper left corner should be **moved to**. Moving an element means that you're starting from its current position and then changing it to another one. Had I said "should be positioned at", it would have implied that the element will be positioned according to the coordinate system in use on the entire canvas, right?

As it turns out, the `x` and `y` coordinates are **a shorthand for translating an element using the `transform` attribute**. More specifically, the above `<use>` use is equivalent to:

<pre class="brush:html">
&lt;use xlink:href="#bird" transform="translate(100, 100)" /&gt;
</pre> 

<figure>
	<img src="../../images/bird-reuse.jpg" alt="">
</figure>

This fact means that **the position of the new reused element is relative to the position of the original element that we're reusing**. This isn't always optimal and can have some drawbacks. 

<blockquote class="pull-quote">
	The <code>x</code> and <code>y</code> coordinates are a shorthand for translating an element using the <code>transform</code> attribute.
</blockquote>

Another drawback of the `<use>` element is that the "copies" of the original element will have the exact same styles as the original element. Whenever you apply any style or transformation changes to the `#bird` group in the above example, all the copies of the bird will get the same styles and transformations.

You can `use` an element and apply an independent transformation to it. For example, the following line will reuse the bird, but it will make it half its original size using a scale transformation:

<pre class="brush:html">
&lt;use x="100" y="100" xlink:href="#bird" transform="scale(0.5)" /&gt;
</pre>

However, you **cannot override the styles of the original element (such as fill and strokes) on the copy**. This means that if you want to create multiple birds or multiple icons (if you're working with icons) and you want every icon to have a different color, this won't be possible with the `<use>` element (unless the original element is defined inside a `<defs>` element without these styles applied to it. See next section for more information).

The `<use>` element allows you to reuse an element **that is already rendered on the canvas**. But what if you want to define an element *without* displaying it, and then draw it at specific positions when you need or want to? This is where the `<defs>` element comes in.

<h2 class="deeplink" id="the-defs-element">Reusing Stored elements with the <code>&lt;defs&gt;</code> element</h2> 

The `<defs>` element can be used to **store** content that will not be directly displayed. In other words, the `<defs>` element is used to *define* elements without directly rendering them. This stored hidden content can then be referenced and displayed by other SVG elements,
which makes it ideal for things such as patterns that contain reusable graphics.

<blockquote class="pull-quote">
	The <code>&lt;defs&gt;</code> element is used to <em>define</em> elements without directly rendering them [..] and that element will serve as a <strong>template</strong> for future use.
</blockquote>

So, using `<defs>` we can define an element that we want to use. This element can be anything, ranging from a group of elements like the bird we saw earlier, to a clipping path, mask, or a linear gradient. Basically, anything that we want to define and store away for later use can be defined inside the `<defs>` element, and that element will serve as a **template** for future use, or as a tool that is available for use whenever needed. The template is never rendered, only instances of it are displayed.

The following is an example defining an SVG gradient, and then uses it as a fill color for a simple SVG rectangle:

<pre class="brush:html">
<svg>
	<defs>
		<linearGradient id="gradient">
			<stop offset="0%" style="stop-color: deepPink" />
			<stop offset="100%" style="stop-color: #009966" />
		</linearGradient>
	</defs>

	<rect stroke="#eee" stroke-width="5" fill="url(#gradient)" />
</svg>
</pre>

Defining the linear gradient inside the `<defs>` element like that ensures that the gradient will not be rendered unless it is referenced somewhere it is needed.

In the previous section we mentioned two drawbacks of the `<use>` element:

+ The position of the new element is relative to the position of the original element.
+ The styles of the original element cannot be overridden in the individual copies.

That, in addition to the fact that the re`use`d element will be rendered on the canvas.

All of these drawbacks can be avoided using the `<defs>` element. Not only is the original element not rendered, but when you want to reuse an element inside `<defs>`, the position you specify for each instance will be set relative to the origin of the user coordinate system, not relative to the position of the original element (which makes sense considering the original element is a template that's not even rendered on the canvas).

In this example we have a tree. The tree is made up of a bark and a group of leaves. The leaves are grouped into a group with `id="leaves"`, and then this group is grouped with the bark into the larger `tree` group.

<pre class="brush:html">
&lt;svg width="500.79px" height="200px" viewBox="0 0 500.79 200"&gt;
	&lt;style type="text/css"&gt;
		#leaves{fill:#8CC63F;}
		#bark{fill:#A27729;}
	&lt;/style&gt;
	&lt;g id="tree"&gt;
		&lt;path id="bark" d="M91.33,165.51c0,0,4.18-27.65,1.73-35.82l-18.55-25.03l3.01-2.74l17.45,19.87l1.91-37.6h4.44l1.83,24.53
		l15.26-16.35l3.27,4.36l-16.07,19.34c0,0-2.72,0-1.09,19.34c1.63,19.34,3,29.7,3,29.7L91.33,165.51z"/&gt;
		&lt;g id="leaves"&gt;
			&lt;path class="leaf" d="M96.97,79.07c0,0-14.92,4.34-23.52-14.05c0,0,19.4-7.98,24.37,11.9c0,0-9.68-3.57-13.07-6.73
				C84.75,70.2,91.82,77.99,96.97,79.07z"/&gt;
			&lt;path class="leaf" d="M74.07,100.91c0,0-15.94-1.51-17.2-22.39c0,0,21.62-0.27,18.83,20.66c0,0-7.92-7.1-9.97-11.41
				C65.73,87.77,69.55,97.92,74.07,100.91z"/&gt;
			&lt;!-- ... --&gt;
		&lt;/g&gt;
	&lt;/g&gt;
&lt;/svg&gt;
</pre>

And this is how the tree looks like:

<figure>
	<img src="../../images/defined-tree.jpg" alt="">
</figure>

If we were to wrap the `#tree` group in a `<defs>` element, the tree would no longer be rendered on the canvas.

<pre class="brush:html">
&lt;svg width="500.79px" height="200px" viewBox="0 0 500.79 200"&gt;
	&lt;style type="text/css"&gt;
		#leaves{fill:#8CC63F;}
		#bark{fill:#A27729;}
	&lt;/style&gt;
	&lt;defs&gt;
		&lt;g id="tree"&gt;
			&lt;!-- ... --&gt;
		&lt;/g&gt;
	&lt;/defs&gt;
&lt;/svg&gt;
</pre>

Now the tree serves as a template for use. We can use it using the `<use>` element just like we would `use` any other element. The only difference in this case is that the `x` and `y` attributes are now set relative to the user coordinate system, not relative to the position of the used element.

For example, if we were to create three copies of the tree and position them on the SVG canvas, and assuming in this case that the user coordinate system matches the viewport's height and width with the origin being on the top left corner of the SVG viewport, we'd get the following code with the following result:

<pre class="brush:css">
&lt;use xlink:href="#tree" x="50" y="100" /&gt;
&lt;use xlink:href="#tree" x="200" y="100" /&gt;
&lt;use xlink:href="#tree" x="350" y="100" /&gt;
</pre>

<figure>
	<img src="../../images/tree.svg" alt="">
</figure>

As you can see in the image above, each of the trees was positioned relative to the origin of the coordinate system which in this case is the upper left corner of the SVG. So the upper left corner of each tree is positioned at its own (`x`, `y`) position in the user coordinate system, independent of the other trees and independent of the tree template defined inside `<defs>`. 

When you use `<defs>` to reuse an element, you can apply different styles and fill colors to each individual tree, <strong>as long as these styles are not defined on the original tree template</strong>. If the tree inside `<defs>` has styles applied to it, those styles still won't be overridden by any new ones. So `<defs>` is great for creating minimal templates and then styling the copies as needed. Without `<defs>`, this wouldn't be possible with `<use>` alone.

Note that elements inside the `<defs>` element are prevented from becoming part of the rendering tree just as if the `defs` element were a `g` element and the `display` property were set to `none`. However, that the descendants of a `defs` are always present in the source tree and thus can always be referenced by other elements; thus, the value of the `display` property on the `defs` element or any of its descendants does not prevent those elements from being referenced by other elements, even if it is set to `none`.

<h2 class="deeplink" id="the-symbol-element">Grouping elements with the <code>&lt;symbol&gt;</code> element</h2> 

The `<symbol>` element is similar to the group element `<g>`&mdash;it provides a way to group elements together. However, it differs from the group element in two main things:

+ The `<symbol>` element is not rendered. It is actually similar to `<defs>` in this manner. It is only displayed when it is `use`d.
+ A `<symbol>` element can have its own `viewBox` and `preserveAspectRatio` attributes. This allows it to fit into the viewport it is rendered into any way you want it to, instead of fitting in the default way.

`<symbol>` is then mostly suitable for **defining** reusable elements (or *symbols*). It also serves as a template that is **instantiated** using the `<use>` element. And having `viewBox` and `preserveAspectRatio` attributes, it can scale-to-fit within a rectangular viewport defined by the referencing `<use>` element. Note that `symbol` elements define new viewports whenever they are instanced by a `use` element.

<blockquote class="pull-quote">
	`symbol` elements define new viewports whenever they are instanced by a `use` element.
</blockquote>

This feature is great because it allows you to define elements that are independent of the viewport they're rendered into, hence allowing you to make sure the symbol you're referencing will always display a certain way inside the viewport.

You need to be familiar with the way the `viewBox` works, and the values of the `preserveAspectratio` attribute to make the best use of this feature. Chris Coyier wrote [an article](http://css-tricks.com/svg-symbol-good-choice-icons/) explaining why the `<symbol>` element can be a good choice for icons, and how to use it.

<p class="note">I will also be writing an extensive article about the `viewport`, `viewBox`, and `preserveAspectRatio` attributes that explains how these attributes work together and how they can be used to control and scale graphics in SVG, so stay tuned for that if you're interested.</p>
<div class="update note">
	<strong>UPDATE:</strong> Article is live here: <a href="http://sarasoueidan.com/blog/svg-coordinate-systems">Understanding SVG Coordinate Systems and Transformations (Part 1) &ndash; The viewport, <code>viewBox</code>, and <code>preserveAspectRatio</code></a>
</div>

Note that the `display` property does not apply to the `symbol` element; thus, `symbol` elements are not directly rendered even if the `display` property is set to a value other than `none`, and `symbol` elements are available for referencing even when the `display` property on the `symbol` element or any of its ancestors is set to `none`.

<h2 class="deeplink" id="wrapping-up">Wrapping up</h2> 

All of these elements are container structural elements in SVG that helps make reusing elements easier while keeping the code cleaner and more readable. And each of the elements we went over in this article has its own use cases. Now that you know what each one does and how they differ, you can decide for your own which one to use, depending on your needs. That said, don't forget to [keep your SVGs accessible](https://www.sitepoint.com/tips-accessible-svg/) at all times.

I hope you liked this article and found it useful. Thank you for reading!



