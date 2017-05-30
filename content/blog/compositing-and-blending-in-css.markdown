---
type: "article"
description: "Compositing and Blending in CSS — article by Sara Soueidan"
date: 2015-01-27T00:00:00Z
title: Compositing And Blending In CSS
subtitle: ""
---

If you're a designer, then you've probably already come across blending effects some time or the other. Blending is one of the most frequently used effects in graphic and print design. You can add texture to text by blending it with its textured backdrop, create an illusion of *merged* images by blending these images together, and create a wide range of colorful effects that would not be possible without that fine level of color blending control. 

<figure>
<img src="../../images/blending-examples.png" />
<figcaption>Examples of typographic and image effects created using CSS blend modes. See following sections for live demos.</figcaption>
</figure>

Graphics editors such as Photoshop or Illustrator come with a set of blending *modes*. **Blend modes** allow you to specify *how* you want your elements to blend together, thus changing the colors of the area where these elements intersect. Each mode uses a specific color formula to mix the colors of the *source* and the *destination*. 

Different modes give different end results. Before we talk about the different blend modes, and since we mentioned the **source** and **destination** elements, let's have a quick look at the concept of compositing, and how it is related to blending in CSS.

<h2 class="deeplink" id="compositing">What Is Compositing?</h2> 

Compositing is the combining of a graphic element with its *backdrop*.

A <strong>backdrop</strong> is <strong>the content behind the element</strong> and is what the element is composited with. 

![Backdrop Visual Illustration](../../images/backdrop.png)

Compositing defines how what you want to draw will be blended with what is already drawn on the canvas. The <strong>source</strong> is what you want to draw, and the <strong>destination</strong> is what is already drawn (the backdrop).

So, if you have two elements, and these elements overlap, you can think of the element on top as being the source, and the parts of the element behind that lie beneath it, will be the destination.

Using different composite operations (there are 16 operations), you can specify which parts of the two overlapping elements will be drawn, and which will not. 

<br>

![Porter Duff Compositing Operations Visual](../../images/porter-duff.png)

<br>

These composite operations are known as <strong>Porter Duff compositing operations</strong>. These operations specify what portions of the source and destination will be drawn, and blend modes specify how how the colors from the graphic element (source) and the backdrop (destination) interact. The illustrations in the above image are from the Compositing and Blending spec.
In HTML5 Canvas context, these oprations are specified using the <code>globalCompositeOperation</code> property, and can be used to clip backgrounds to specific shapes, such as text, thus creating the effect of texture-filled text in Canvas. I have written about this process in [this article](http://tympanus.net/codrops/2013/12/02/techniques-for-creating-textured-text/) over at Codrops.

Together, Porter Duff Compositing and blending form the overall compositing operation for intersecting elements. According to the specification, “typically, the blending step is performed first, followed by the Porter-Duff compositing step. In the blending step, the resultant color from the mix of the element and the the backdrop is calculated. The graphic element’s color is replaced with this resultant color. The graphic element is then composited with the backdrop using the specified compositing operator.”

Therefore, the way two intersecting or overlapping elements are handled is by blending their colors based on a blend mode, and then drawing only the parts specified by the composite operation. 

<hr>

In CSS, we have no way to specify a composite operation. The default composite operation used is `source-over`. Both the source and the destination elements remain, and the area where they intersect is blended using the blend mode specified.

<hr>

Before the [Compositing and Blending specification](http://www.w3.org/TR/compositing-1/) was introduced, CSS allowed one type of composite operations: simple alpha compositing. This is what the `opacity` property is for. By changing an element's opacity, the browser makes it translucent so that the colors of its backdrop can show through.

Today, two main properties exist that allow us to blend elements and backround images by specifying one of 16 available blend modes. These two properties are `background-blend-mode` and `mix-blend-mode`. Let's get to know each.


<h2 class="deeplink" id="background-blend-mode">Blending Background Layers: The <code>background-blend-mode</code> Property</h2> 

The `background-blend-mode` property, as its name suggests, is used to specify a blend mode for an element's background layer. A background layer can be an image, or the background color. 

In other words, `background-blend-mode` allows you to blend together an element's background image with the images and/or background color behind it. 

If the element has more than one background image, you can specify multiple blend modes—each blend mode will be used for a background image such that the first blend mode in the list corresponds to the first background image in the list of background images, and so on. 

Then, each background layer is blended with the element’s background layer that is below it and the element’s background color. Which means that, if you have two background images and a background color:

<pre class="brush:css">
background-image: url(first-image.png), url(second-image.png);
background-color: orange;
background-blend-mode: screen, multiply;
</pre>

The `second-image.png` background will blend with the background color using the `multiply` mode, and then the `first-image.png` background will blend with the second image and the background color using the `screen` blend mode. (Reminder: the first background image in the list is the one on top, and the ones following it are beneath it.)

Note that an element's background layers must not blend with the content that is behind the element, instead they must act as if they are rendered into an **isolated group**.

Also note that if the `background` shorthand is used, the `background-blend-mode` property for that element must be reset to its initial value.

<h3 class="deeplink" id="blend-modes">The Blend Modes</h3> 

Okay so we've established that each background layer can get its own blend mode which specifies how it blends with the layers beneath it. But what blend mode options do we have?

**There are 16 blend modes available in CSS**: `normal` (which is the default blend mode and means that no blending is applied), `multiply`, `screen`, `overlay`, `darken`, `lighten`, `color-dodge`, `color-burn`, `hard-light`, `soft-light`, `difference`, `exclusion`, `hue`, `saturation`, `color` and `luminosity`.

Each filter, when applied to an image, for example, will give a different end result—the colors of the image are going to be changed based on the mode you choose.

<dl>
<dt><code>normal</code></dt> 
<dd>This is the default mode which specifies no blending. The blending formula simply selects the source color.
</dd>
<dt><code>multiply</code></dt> 
<dd>The source color is multiplied by the destination color and replaces the destination. The resultant color is always at least as dark as either the source or destination color. <strong>Multiplying any color with black results in black. Multiplying any color with white preserves the original color.</strong>
</dd>
<dt><code>screen</code></dt> 
<dd>Multiplies the complements of the backdrop and source color values, then complements the result. The result color is always at least as light as either of the two constituent colors. <strong>Screening any color with white produces white; screening with black leaves the original color unchanged.</strong> The effect is similar to projecting multiple photographic slides simultaneously onto a single screen.
</dd>
<dt><code>overlay</code></dt> 
<dd>Multiplies or screens the colors, depending on the backdrop color value. Source colors overlay the backdrop while preserving its highlights and shadows. The backdrop color is not replaced but is mixed with the source color to reflect the lightness or darkness of the backdrop.
</dd>
<dt><code>darken</code></dt> 
<dd>Selects the darker of the backdrop and source colors. The backdrop is replaced with the source where the source is darker; otherwise, it is left unchanged.
</dd>
<dt><code>lighten</code></dt> 
<dd>Selects the lighter of the backdrop and source colors. The backdrop is replaced with the source where the source is lighter; otherwise, it is left unchanged.
</dd>
<dt><code>color-dodge</code></dt> 
<dd>Brightens the backdrop color to reflect the source color. Painting with black produces no changes.
</dd>
<dt><code>color-burn</code></dt> 
<dd>Darkens the backdrop color to reflect the source color. Painting with white produces no change.
</dd>
<dt><code>hard-light</code></dt> 
<dd>Multiplies or screens the colors, depending on the source color value. The effect is similar to shining a harsh spotlight on the backdrop.
</dd>
<dt><code>soft-light</code></dt> 
<dd>Darkens or lightens the colors, depending on the source color value. The effect is similar to shining a diffused spotlight on the backdrop.
</dd>
<dt><code>difference</code></dt> 
<dd>Subtracts the darker of the two constituent colors from the lighter color. Painting with white inverts the backdrop color; painting with black produces no change.
</dd>
<dt><code>exclusion</code></dt> 
<dd>Produces an effect similar to that of the Difference mode but lower in contrast. Painting with white <strong>inverts the backdrop color</strong>; painting with black produces no change.
</dd>
<dt><code>hue</code></dt> 
<dd>Creates a color with the hue of the source color and the saturation and luminosity of the backdrop color.
</dd>
<dt><code>saturation</code></dt> 
<dd>Creates a color with the saturation of the source color and the hue and luminosity of the backdrop color. Painting with this mode in an area of the backdrop that is a pure gray (no saturation) produces no change.
</dd>
<dt><code>color</code></dt> 
<dd>Creates a color with the hue and saturation of the source color and the luminosity of the backdrop color. This preserves the gray levels of the backdrop and is useful for coloring monochrome images or tinting color images.
</dd>
<dt><code>luminosity</code></dt> 
<dd>Creates a color with the luminosity of the source color and the hue and saturation of the backdrop color. This produces an inverse effect to that of the Color mode.
This mode is the one you can use to create monchrome "tinted" image effects like the ones you can see in different website headers.
</dl>

The following image shows the result of applying the different blend modes to an image, in the same order mentioned above, starting from the top left corner.

<img src="../../images/background-blend-mode-examples.png" alt="The result of applying 16 blend modes applied to an image.">

For more information about these blend modes, I refer you to [this article](http://www.slrlounge.com/school/photoshop-blend-modes/) on the SLR Lounge blog. It claims to be the ultimate visual guide to blend modes, and does include some nice explanations of the blend modes.

Personally, I think that even with the definition for each mode at hand, it can be really hard (if not impossible) to predict the result of applying these modes to an image. 

Picking a suitable blend mode will be—in most cases—a case of trial and error. If you use Instagram you know that sometimes you just go over each of the available filters, applying them one after the other, till you get the effect you're after. (I know I do that!)
With CSS blend modes, it's practically the same. 

For that reason, I've created a simple interactive demo that you can use to pick the right blend mode for your effects.

<figure>
<img src="../../images/css-blender-demo-screenshot.png" alt="Screenshot of the CSS Blender demo." />
<figcaption>Screenshot of the CSS Blender demo.</figcaption>
</figure>

You can upload an image, and choose a background color to blend it with. The background color of the live preview (thumbnails) will live-update as you make your way around the color picker. **Clicking on a thumbnail will preview the selected blend mode in the larger preview area.**

<a href="http://sarasoueidan.com/demos/css-blender" class="button">Try the blend modes in the demo out.</a>

<br>

Of course, the effects will be visible only in browsers that support the `background-blend-mode` property. **For more information about browser support, refer to [the compatibility table over at CanIUse.com](http://caniuse.com/#feat=css-backgroundblendmode).**


<hr>

In addition to blending a background image with a background color in the interactive demo, you can also blend a piece of text with the element that has this background.

But blending separate elements together requires a property other than the `background-blend-mode` property. Let's have a look at that next.

<h2 class="deeplink" id="mix-blend-mode">Blending An Element With Elements In Its Backdrop: The <code>mix-blend-mode</code> Property</h2> 

As we mentioned earlier, a **backdrop** is **the content behind the element** and is what the element is composited with. 

The content behind the element can be anything—including other elements. And this is where the interesting effects come in. Think fixed headers blending with the content as the page scrolls down, or text blended with an image in the background, or text blending with other text, etc.

Blending elements together is done using the `mix-blend-mode` property. 

The `mix-blend-mode` property is similar to the `background-blend-mode` property, and takes the same blend mode values. So, you can specify any blend mode to get different blending effects.

For example, the text in the following image blends with the image behind it using `mix-blend-mode: difference`, giving the illusion of the water bubbles passing through and in front of the text. The reason this effect is established is the color inversion process of the `difference` mode.

<img src="../../images/mix-blend-mode-example-1.png" alt="Example of text blending with an image." />

The area of the image where it overlaps with the text is the text's backdrop, and that is where the blending happens. You can check the live demo out [here](http://codepen.io/SaraSoueidan/pen/e90334f6ffdbb2a2cdd5604e769054e4?editors=110).

Using `mix-blend-mode`, you can create many creative effects—far more than I could list in this post. One particularly interesting effect you can create is see-through text. Without CSS blend modes, you would need CSS masking and/or background clipping, along with some CSS hackery to create this effect and make it work.

With blend modes, and using the `difference` blend mode again, you can create this effect by—again—leveraging the color inversion process.

The following image shows this effect in action. It is merely a piece of text, positioned on top of an image, and blended with it.

![Example of see-through text effect created using CSS blending.](../../images/see-through-text-mix-blend-mode.png)

That's pretty cool, isn't it? You can check the live demo out [here](http://codepen.io/SaraSoueidan/pen/887433527fac4e926e84b613be483bfc?editors=110).

It is worth noting here that the colors you choose strongly affect the end result. That being said, the interactive demo can make picking the right colors for such an effect easier and faster.

In the interactive demo, you have an option to add editable text to the preview area, and then style that text and blend it with the preview image using `mix-blend-mode`. The following is a screenshot showing an example.

<figure>
<img src="../../images/css-blender-demo-screenshot-with-text.png" alt="Screenshot of the CSS Blender demo." />
<figcaption>Screenshot of the CSS Blender demo, with a piece of text blended into the preview image.</figcaption>
</figure>

<a href="http://sarasoueidan.com/demos/css-blender" class="button">Check the demo out.</a>

<hr>

Since we're talking about blending elements together, it only makes sense that we mention stacking contexts, especially considering that they affect how and what elements can be blended together.

According to the specification, applying a blend mode other than `normal` to the element must establish a new stacking context on that element, forming a _group_. This group must then be blended and composited with the stacking context that contains the element.

Also, an element that has blending applied, must blend with all the underlying content **_of the stacking context that that element belongs to_**. It will not blend with contents outside that context.  

For example, the following image shows the result of mix-blending two images with the `overlay` mode. ([Live demo](http://codepen.io/SaraSoueidan/pen/09efabde7114d37a736525b5ab616bc5?editors=110))

<img src="../../images/mix-blend-mode-example-2.png" alt="Example of text blending with an image." />

The code for the above simple example looks like so:

<pre class="brush:html">
&lt;div class="container"&gt;
  &lt;img src="path/to/destination.png" alt="" /&gt;
  &lt;div class="img-wrapper"&gt;
    &lt;img src="path/to/source.png" alt="" class="source"/&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>

I've wrapped the image on top (the `.source`) in a `div` that I'm going to create a stacking context on. Since the `opacity` property leads to the creation of a new stacking context when given a value other than th default (`1`), I'm going to use that.

<pre class="brush:css">
.img-wrapper {
  opacity: .99;
}
</pre>

(Try it in the [live demo](http://codepen.io/SaraSoueidan/pen/09efabde7114d37a736525b5ab616bc5?editors=110).)

By creating a stacking context, the `.source` image no longer blends with the bottom image, because the latter lies outside the stacking context containing the former.

This is because we have __*isolated*__ the image (and any other contents of the `.img-wrapper` context) from the rest of the elements, and thus they don't blend with their backdrops anymore. 

This brings us to the `isolation` property. But before we move on, note that the `mix-blend-mode` property also applies to SVG elements, and can be used to blend overlapping SVG elements together as well. As a matter of fact, the logo for the CSS Blender demo is a result of applying a `mix-blend-mode` to the three squares that make the demo up. You can see how the areas where these squares overlap have different colors due to the color blending applied.

Browser support for the `mix-blend-mode` property is not as wide as that of the `background-blend-mode` property. For details, refer to [the browser compatibility table over at CanIUse.com](http://caniuse.com/#feat=css-mixblendmode).

<h3 class="deeplink" id="isolation">Isolating Elements: The <code>isolation</code> Property</h3> 

When a property that leads to the creation of a stacking context is applied to an element, that element is said to be **isolated**. The last example in the previous section is an example of this happening.

On the other hand, you can use the `isolation` property to isolate elements.

In SVG, this property defines whether an element is isolated or not. For CSS, setting `isolation` to `isolate` will turn the element into a stacking context, and thus affect whether or not the element's contents can blend with their backdrop lying outside this context. By default, the `isolation` property is set to `auto`—which implies that they are not isolated.

If we were to go back to the previous example with the two blended images, we can prevent the image on top from blending with the image behind it by using the `isolation` property instead of the `opacity` property.

<pre class="brush:css">
.img-wrapper {
  isolation: isolate;
}
</pre>

This has the same effect as using `opacity` in the previous example. If you use this rule instead of `opacity` in the live demo, you will get the same result.

Note that by creating a stacking context on an element, you are isolating the content of that element and preventing them from blending with the backdrop of that element. However, you can still apply a blend mode to the entire context to blend it with its backdrop.

Moreover, If you are using the`background-blend-mode` property, the `isolation` property is not needed since background layers must not blend with the content that is behind the element, instead they must act as if they are rendered into an isolated group (the element itself), as specified in the specification. This is why the `isolation` property will have an effect when used with the `mix-blend-mode` property, but not with the `background-blend-mode` property.


<h2 class="deeplink" id="order-of-operations">Note: Order Of Graphical Operations</h2> 

CSS blending modes, [filters](http://www.w3.org/TR/filter-effects-1/) and [masks](http://www.w3.org/TR/css-masking-1/), can all be applied to the same element. But which effect is applied first?

According to the specification, first any filter effect is applied, then any clipping, masking, blending and compositing.

<h2 class="deeplink" id="final-words">Final Words</h2> 

With all the graphical operations available to us via CSS, we are getting more possibilities for designing in the browsers—this is particularly interesting if you—like me—are not into graphics editors and don't know your way around them well.

The web platform team at Adobe have been doing a tremendous job bringing many of their tools' graphical capabilities to the web. From filters, to blend modes, clipping and masking, and even [CSS Shapes](http://sarasoueidan.com/blog/css-shapes), we are gaining more control over layout and graphics on the web.

Many creative effects can be created using CSS blend modes, and when combined with other technologies, they open a door to endless creative possibilities.

<hr>

I hope you liked this article and found it useful.

Thank you for reading!
