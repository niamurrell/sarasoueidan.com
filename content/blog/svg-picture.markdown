---
type: "article"
date: 2015-02-15T00:00:00Z
title: Better SVG Fallback and Art Direction With The &lt;picture&gt; Element
subtitle: ""
---

<p class="size-2x">Besides using an SVG as a background image in CSS, you can serve SVG foreground images in HTML using  one of several embedding techniques, each of which has its advantages and use cases. Unless you’re in need of interactivity or external styling, <code>&lt;img&gt;</code> is the standard way for loading an SVG image, but it has one disadvantage: you currently need JavaScript to provide fallback and/or change the image source for art direction. In this post, I’ll talk about a better way to do that, using the <code>&lt;picture&gt;</code> element.</p>

This is not a primer to using `<picture>`. There are a lot of great resources in the wild that contain everything you need to know about the `<picture>` element, so if you’re not familiar with it, refer to the last section of the article for a list of resources to learn all about it. That being said, the article does not require any special or strong `<picture>` skills, as the examples are mostly self-explanatory as you will see.

<p class="note">
  This article is also <a href="http://css-live.ru/articles/obespechenie-luchshej-rezervnoj-podderzhki-svg-i-upravlenie-oformleniem-s-pomoshhyu-elementa-picture.html">available in Russian</a>.
</p>

<h2 class="deeplink" id="the-current-img">The Current <code>&lt;img&gt;</code></h2> 

Before getting into why `<picture>` is a great option for SVG, let's lay down (an overview of) the limitations and disadvantages of using `<img>` for responsive SVG work.

Normally, if you load an SVG using an `<img>` tag, you can provide fallback and change the source of the image on different viewport sizes using feature detection and media queries in JavaScript. My choice for both would be to use [Modernizr](http://modernizr.com/) for both; that is, unless you're only serving one image, in which case adding Modernizr might be overwork, and something like this:

<pre class="brush:html">
&lt;img src="logo.svg" onerror="this.src=logo-fallback.png;this.onerror=null;" /&gt;
</pre>

..would be simpler and faster.

Using Modernizr, you can detect browser support for SVG, and provide an alternative image `src` for when SVG is not supported. The alternative image URL can be stored in a custom data attribute. This approach is particularly useful for when you have multiple images on the page whose `src` you need to switch.

<pre class="brush:html">
&lt;img src="logo.svg" data-fallback="logo.png" /&gt;
</pre>

Using Modernizr, you can detect whether or not the browser supports SVG and then take necessary steps to provide the fallback based on the test result:

<pre class="brush:js">
if (!Modernizr.svg) {
  // fetch fallback and replace img src with it
}
</pre>

You can also use Modernizr's media query detection to change the img src on based on viewport width for when you want to do art direction and not load the same big SVG on smaller screens:

<pre class="brush:js">
if (Modernizr.mq('(max-width: 640px)')) {
  // replace image source with the smaller SVG source
}
</pre>

You don't need to store any URLs in data attributes in this case if you are following a specific naming convention for your images. For example, if your images are named `view-small.svg`, `view-big.svg`, you can just replace the `view-*` part with the appropriate one in the JavaScript and be done with it.

Now, if you want to provide a PNG or JPEG fallback for your SVG _and_ also provide different sizes of that fallback image to match the viewport size, Modernizr will also do, but it will get slightly more complicated. And the most important part is: you need JavaScript to do it.

With the `<picture>` element, we can do all that and more, without JavaScript. Well, kind of. Read on.

<h2 class="deeplink" id="the-bigger-picture">The Bigger <code>&lt;picture&gt;</code></h2> 

The `<picture>` element provides us with a better JavaScript-less way to change the image we are serving based on different media queries _and_ a for providing fallback for non-supporting browsers (or browsers that can't load the SVG for any reason).

<h3 class="deeplink" id="loading-and-providing-fallback">Loading An SVG and Providing Fallback For Non-Supporting Browsers</h3> 

Let’s start with fallback first. Providing fallback for browsers that can’t load the SVG is as simple as wrapping your `<img>` fallback in a `<picture>` element, and referencing your SVG in a `<source>` element:

<pre class="brush:html">
&lt;picture&gt;
    &lt;source type="image/svg+xml" srcset="path/to/image.svg"&gt;
    &lt;img src="path/to/fallback.png" alt="Image description"&gt;
&lt;/picture&gt;
</pre>

The `<picture>` element is just a wrapper for the elements used to load the image(s) you want and for the fallback provided with the `<img>` element. The `<img>` element is _required_ for `<picture>` to work and is used to provide backwards compatibility for browsers that don’t support `<picture>` or, like our case here, browsers that can’t load or don't support the the image(s) [type] you load in the `<source>` element.

The `<source>` element is where we specify the image(s) we want. We’re specifying the type of the image we want (SVG) in the `type` attribute, and providing the URL to that image in the `srcset` attribute.
And that's all there really is to it; this is how simple it is to provide fallback for an SVG image using `<picture>`—no JavaScript is needed.

You can take this even further and provide multiple fallback images that take screen resolution into account; to do that you can specify those images using the `srcset` attribute on the `<img>`. For example:

<pre class="brush:html">
&lt;picture&gt;
    &lt;source type="image/svg+xml" srcset="path/to/logo.svg"&gt;
    &lt;img src="path/to/logo-1x.png" srcset="path/to/logo-2x.png 2x, path/to/logo-3x.png 3x" alt="Logo description"&gt;
&lt;/picture&gt;
</pre>

The browser can then choose the image it finds appropriate based on the screen resolution. This is useful for when you are serving the same image size (for example, a one-size logo) but want to provide 2x and 3x versions for higher resolutions.

But if you want you can take it even _further_. With the help of the `sizes` attribute, you can use media queries on the `<img>` to change the fallback image size on different screen sizes, providing a bigger image for bigger screens and a smaller one for small screens.

<pre class="brush:html">
&lt;picture&gt;
    &lt;source type="image/svg+xml" srcset="path/to/banner.svg"&gt;
    &lt;img
      sizes="(min-width: 640px) 80vw, 100vw"
      srcset="banner-300.jpg 300w,
              banner-400.jpg 400w,
              banner-700.jpg 700w,
              banner-1200.jpg 1200w,
              banner-1600.jpg 1600w,
              banner-2000.jpg 2000w"
      src="banner-default-fallback.jpg"
      alt="Banner description"&gt;
&lt;/picture&gt;
</pre>

What we've done here is we told the browser in the `sizes` attribute what size our image will occupy on the page. In this case, if the width of the viewport is 640px or more, the image will be 80% the width of the viewport, and 100% the width otherwise.

Then, in the `srcset` attribute, we provided the browser with a list of images—they are all the same image, but in different sizes. Based on the sizes specified in `sizes`, the browser will pick the best fit among these images and display it.

If a browser does not support `srcset` on `<img>`, it will simply display the fallback specified in the `src` attribute. For a detailed explanation of how this works, refer to [this article](http://alistapart.com/article/responsive-images-in-practice) over at A List Apart.


<h3 class="deeplink" id="art-direction">Art Direction: Loading a Different SVG on Different Screen Sizes</h3> 

The `<source>` element we use to specify the image(s) we want comes with another attribute: `media`. This attribute provides us with the same flexibility we have for changing background images in CSS using CSS media queries, by allowing us to pair image sources with layout conditions (the media queries) right in the source code.

Since we're serving an SVG image, we don't need to serve multiple versions of the image for different screen resolutions because of the infinitely scalable nature of SVG which makes it look great on any resolution. (Yay!)

But if we have an SVG that we're serving on desktop—for example, a wide header image, this image could be hundreds of kilobytes in size. Serving the same big image for small screens might not be the best idea if you look at it from a performance angle. Moreover, maybe you just _don't want_ to serve the same image on smaller sizes, but a "cropped" version of that image. I recently worked on a client project that required just that. Not only did my client want different images on smaller sizes, but the full composition was more than 100KB in size, which is obviously too much to serve on mobile devices, so we served cropped versions of that image.

In such a case, you can specify different SVGs to load on different media conditions using the `media` attribute on the `<source>`. In the `media` attribute, you specify the media conditions similar to how you do it in CSS media queries.

<pre class="brush:html">
&lt;picture&gt;
    &lt;source
        media="(max-width: 640px)"
        srcset="header--small.svg"
        type="image/svg+xml"&gt;
    &lt;source
        media="(max-width: 1024px)"
        srcset="header--medium.svg"
        type="image/svg+xml"&gt;
    &lt;source
        srcset="header--full.svg"
        type="image/svg+xml"&gt;

    &lt;img src="header--default-fallback.jpg" alt="Header description.."&gt;
&lt;/picture&gt;

</pre>

Of course, you can specify different fallback images for different resolutions and sizes, similar to what we did in the previous section. For the sake of brevity, I'm going to skip that step in this section, but you get the picture. (See what I did there?)

You can also specify multiple sizes of each SVG image and let the browser pick the one it finds best, like we did for the fallback image before. However, due to the scalable nature of SVG, this might not be necessary.

As a matter of fact, the options the `<picture>` element comes with cover practically any scenario. [This article](https://dev.opera.com/articles/responsive-images/) on the dev.opera blog covers a lot of these use cases with practical examples and snippets to help you get started.

<hr>

So, you see, with the `<picture>` element, we no longer need to use JavaScript to provide fallback and/or change the image based on different media conditions. Well, kind of…

<h2 class="deeplink" id="browser-support-and-polyfilling">Browser Support and Polyfilling</h2> 

At the time of writing of this article, browser support for `<picture>` isn't at its best, but it is getting better. A lot of smart people are working on `<picture>` implementation across browsers. Keep an eye on [the compatibility table over at CanIUse.com](http://caniuse.com/#feat=picture) to stay up-to-date on browser support in the future.

In the meantime, and until browser support becomes more decent, you can use a JavaScript polyfill for non-supporting browsers. So yes, we do need JavaScript at the moment, but the code you write will be future-proof and all you need to do in the future when support gets better is to remove the polyfill, and your code will work without it as expected. Using `<img>` you'd need to do much more, or, at least, just keep using Javacript.

The [Picturefill](http://scottjehl.github.io/picturefill/) polyfill by the folks at the Filament Group is the current de facto for cross-browser `<picture>` support today. The polyfill homepage contains extensive documentation on how to use the polyfill and tips on using `<picture>` in general along with general patterns.

Using the polyfill is as simple as including the script in your page's `head`:

<pre class="brush:html">
&lt;script src="picturefill.js" async&gt;&lt;/script&gt;
</pre>

The `async` attribute tells the browser that it can load picturefill asynchronously, without waiting for it to finish before loading the rest of the document. According to the Picturefill documentation, If you add this attribute, you'll need to add a line of script before the script tag as well to allow older browsers to recognize `picture` elements if it encounters them in the page before Picturefill has finished loading.

<pre class="brush:html">
&lt;script&gt;
    // Picture element HTML5 shiv
    document.createElement( "picture" );
&lt;/script&gt;
&lt;script src="picturefill.js" async&gt;&lt;/script&gt;
</pre>

If you are [familiar with HTML5 Shiv](http://www.paulirish.com/2011/the-history-of-the-html5-shiv/), then you already know what this line is needed for. As a matter of fact, if you are already including a recent version of the HTML5 Shiv (sometimes packaged with Modernizr), you may not need this line as it is included there as well.

<h3 class="deeplink" id="fixing-ie9">Fixing IE9</h3> 

> While most versions of IE (even older ones!) are supported [by Picturefill] well, IE9 has a little conflict to work around. To support IE9, you will need to wrap a `video` element wrapper around the `source` elements in your `picture` tag. You can do this using conditional comments.
— [Picturefill homepage](http://scottjehl.github.io/picturefill/)

As the documentation says, the polyfill provides support for `<picture>` across browsers, but IE9 requires that you wrap your `source` elements in a `video` tag. And since this fix is only required for IE9, you can place it in IE9-targeting conditional comments:

<pre class="brush:html">
&lt;picture&gt;
&lt;!--[if IE 9]&gt;&lt;video style="display: none;"&gt;&lt;![endif]--&gt;
    &lt;source srcset=".." type=".." &gt;
    &lt;source srcset=".." type=".." &gt;
    &lt;source srcset=".." type=".." &gt;
&lt;!--[if IE 9]&gt;&lt;/video&gt;&lt;![endif]--&gt;
    &lt;img src=".." alt=".." /&gt;
&lt;/picture&gt;
</pre>

<h2 class="deeplink" id="foreground-svg-images">Foreground SVG Images with Interactivity and Styleability</h2> 

As mentioned at the beginning of the article, the `<img>` element, and naturally the `<picture>` element, only allow you to load a static SVG image, or an SVG with animations defined internally. If you need to load a foreground image and you want that image to be interactive and styleable, you can use one of four available ways: `<object>`, `<iframe>`, `<embed>` and inline `<svg>`.

Both the `<iframe>` and `<object>` come with a default fallback mechanism.

<pre class="brush:html">
&lt;object data="image.svg" type="image/svg+xml"&gt;
    &lt;!-- fallback here --&gt;
&lt;/object&gt;

&lt;iframe src="image.svg"&gt;
    &lt;!-- fallback here --&gt;
&lt;/iframe&gt;
</pre>

An inline `<svg>` requires a different approach to provide fallbacks; one such approach uses the `<foreignObject>` element. You can read all about it [here](http://www.kaizou.org/2009/03/inline-svg-fallback/). Chris has also written about providing fallback for SVG [here](http://css-tricks.com/svg-fallbacks/#the-fallbacks).

<h2 class="deeplink" id="final-words">Final Words</h2> 

While using `<picture>` currently does require adding a JavaScript polyfill, using standard HTML5 markup and getting the flexibility of switching images using native elements is extremely powerful, and plugging the polyfill in is as easy as 1. download it, 2. add script to page, 3. you're done. It's absolutely worth it if you are doing art direction or providing fallback for multiple foreground SVG images.

`<picture>` is more likely to become the standard way for art-directing SVG and providing `img` fallback in the future, so why start using it today? Both `img` way and the new `picture` require some JavaScript—for now, but the latter is definitely cleaner and more future-proof. Yes, `img` is also future-proof, but at some point, you get to ditch the polyfill and keep your code unchanged if you use `picture`, while `img` will either require you to keep using JavaScript _or_ refactor your markup to make the switch to JavaScript-less `picture`.

Whether you decide to start using `<picture>` for SVG today or not, it is definitely worth getting to know better and using it for serving other responsive image formats. So here is a list of recommended articles to get you up and running:

### Recommended Reading on `<picture>`

- [Introducing the `<picture>` element](http://www.html5rocks.com/en/tutorials/responsive/picture-element/)
- [Native Responsive Images](https://dev.opera.com/articles/native-responsive-images/)
- [Responsive Images in Practice](http://alistapart.com/article/responsive-images-in-practice)
- [Responsive Images: Use Cases and Documented Code Snippets to Get You Started](https://dev.opera.com/articles/responsive-images/)
- [Responsive Images For Designers: The HTML5 picture element](http://demosthenes.info/blog/936/Responsive-Images-For-Designers-The-HTML5-picture-element)
