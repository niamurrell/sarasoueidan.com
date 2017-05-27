---
type = "article"
date: 2016-04-30T00:00:00Z
draft: true
tags:
- svg
title: 'SVG Tip: Convert a &lt;polygon&gt; or &lt;polyline&gt; to &lt;path&gt; in
  Seconds'
url: /2016/04/30/svg-tip-convert-polygon-or-polyline-to-path-in-seconds/
---

I came across this neat trick while desperatly Googling for a way to quickly convert a `<polygon>` element to a `<path>` element while working on an SVG handed over to me by a client, without needing to ask the designer to do it in Illustrator, and without me having to fire up Illustrator to do it. If it can be done in code and done fast, then that’d be my perfect way to do it.

The SVG was made up of a few `<path>` elements to be animated using the popular line-drawing effect, excellently explained by Jake Archibald in [this article](https://jakearchibald.com/2013/animated-line-drawing-svg/). To animate an SVG path in JS, you need to get the path length, and that can be done using the `getTotalLength()` method available for `path`s in SVG.

Among the paths was one that wasn't animating, so upon inspecting the code, I realized the path was actually a `<polygon>`, so I Googled for a quick way to convert it to a `<path>` and came across [Matthew Jackson](http://twitter.com/matthewbeta) article sharing this trick. The trick works for both `<polygon>` and `<polyline>`:

1. Change the element name from `polygon` to `path`.
2. Replace the `points` attribute with a `d` attribute. Keep the same value. Then,
3. Add an `M` to the `d` value, right before the first point coordinate.

So, for my SVG, this:

<pre class="brush:html">
<polygon fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="181.5,613.5 222.6,247 808.8,116.1 778.6,562.8"/>
</pre>

became this:

<pre class="brush:html">
<polygon fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M181.5,613.5 222.6,247 808.8,116.1 778.6,562.8"/>
</pre>

In my case, the path needed to be closed, so I ended up adding a fourth step: Add `z` to the end of the `d` value to close the path.

<pre class="brush:html">
<polygon fill="none" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M181.5,613.5 222.6,247 808.8,116.1 778.6,562.8z"/>
</pre>

Using `path` instead of other basic shapes allows us to use methods like `getTotalLength` and `getPointAtLength()`, which are currently only available for `path` elements. Amelia Bellamy-Royds [pointed out](https://twitter.com/AmeliasBrain/status/726482226393788416) that these methods will be available to *all* SVG shapes in SVG2—once implemented, which is superb!

<p class="size-2x">Check out <a href="http://matthew-jackson.com/notes/converting-an-svg-polyline-to-a-path/">Matthew’s article</a> for the original source, which traces back to <a href="https://gist.github.com/andytlr/9283541">this gist</a> by Andy Taylor. Jake Albaugh created <a href="ttp://codepen.io/jakealbaugh/pen/GZwgzV/">a converter</a> on Codepen that you can copy-paste your code into, if you want something <em>even</em> faster.</p>



