!function(e,t){"use strict";function n(){if(!r.READY){r.event.determineEventTypes();for(var e in r.gestures)r.gestures.hasOwnProperty(e)&&r.detection.register(r.gestures[e]);r.event.onTouch(r.DOCUMENT,r.EVENT_MOVE,r.detection.detect),r.event.onTouch(r.DOCUMENT,r.EVENT_END,r.detection.detect),r.READY=!0}}var r=function(e,t){return new r.Instance(e,t||{})};r.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},r.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,r.HAS_TOUCHEVENTS="ontouchstart"in e,r.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,r.NO_MOUSEEVENTS=r.HAS_TOUCHEVENTS&&navigator.userAgent.match(r.MOBILE_REGEX),r.EVENT_TYPES={},r.DIRECTION_DOWN="down",r.DIRECTION_LEFT="left",r.DIRECTION_UP="up",r.DIRECTION_RIGHT="right",r.POINTER_MOUSE="mouse",r.POINTER_TOUCH="touch",r.POINTER_PEN="pen",r.EVENT_START="start",r.EVENT_MOVE="move",r.EVENT_END="end",r.DOCUMENT=document,r.plugins={},r.READY=!1,r.Instance=function(e,t){var i=this;return n(),this.element=e,this.enabled=!0,this.options=r.utils.extend(r.utils.extend({},r.defaults),t||{}),this.options.stop_browser_behavior&&r.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),r.event.onTouch(e,r.EVENT_START,function(e){i.enabled&&r.detection.startDetect(i,e)}),this},r.Instance.prototype={on:function(e,t){for(var n=e.split(" "),r=0;n.length>r;r++)this.element.addEventListener(n[r],t,!1);return this},off:function(e,t){for(var n=e.split(" "),r=0;n.length>r;r++)this.element.removeEventListener(n[r],t,!1);return this},trigger:function(e,t){var n=r.DOCUMENT.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t;var i=this.element;return r.utils.hasParent(t.target,i)&&(i=t.target),i.dispatchEvent(n),this},enable:function(e){return this.enabled=e,this}};var i=null,o=!1,s=!1;r.event={bindDom:function(e,t,n){for(var r=t.split(" "),i=0;r.length>i;i++)e.addEventListener(r[i],n,!1)},onTouch:function(e,t,n){var a=this;this.bindDom(e,r.EVENT_TYPES[t],function(c){var u=c.type.toLowerCase();if(!u.match(/mouse/)||!s){(u.match(/touch/)||u.match(/pointerdown/)||u.match(/mouse/)&&1===c.which)&&(o=!0),u.match(/touch|pointer/)&&(s=!0);var l=0;o&&(r.HAS_POINTEREVENTS&&t!=r.EVENT_END?l=r.PointerEvent.updatePointer(t,c):u.match(/touch/)?l=c.touches.length:s||(l=u.match(/up/)?0:1),l>0&&t==r.EVENT_END?t=r.EVENT_MOVE:l||(t=r.EVENT_END),l||null===i?i=c:c=i,n.call(r.detection,a.collectEventData(e,t,c)),r.HAS_POINTEREVENTS&&t==r.EVENT_END&&(l=r.PointerEvent.updatePointer(t,c))),l||(i=null,o=!1,s=!1,r.PointerEvent.reset())}})},determineEventTypes:function(){var e;e=r.HAS_POINTEREVENTS?r.PointerEvent.getEvents():r.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],r.EVENT_TYPES[r.EVENT_START]=e[0],r.EVENT_TYPES[r.EVENT_MOVE]=e[1],r.EVENT_TYPES[r.EVENT_END]=e[2]},getTouchList:function(e){return r.HAS_POINTEREVENTS?r.PointerEvent.getTouchList():e.touches?e.touches:[{identifier:1,pageX:e.pageX,pageY:e.pageY,target:e.target}]},collectEventData:function(e,t,n){var i=this.getTouchList(n,t),o=r.POINTER_TOUCH;return(n.type.match(/mouse/)||r.PointerEvent.matchType(r.POINTER_MOUSE,n))&&(o=r.POINTER_MOUSE),{center:r.utils.getCenter(i),timeStamp:(new Date).getTime(),target:n.target,touches:i,eventType:t,pointerType:o,srcEvent:n,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return r.detection.stopDetect()}}}},r.PointerEvent={pointers:{},getTouchList:function(){var e=this,t=[];return Object.keys(e.pointers).sort().forEach(function(n){t.push(e.pointers[n])}),t},updatePointer:function(e,t){return e==r.EVENT_END?this.pointers={}:(t.identifier=t.pointerId,this.pointers[t.pointerId]=t),Object.keys(this.pointers).length},matchType:function(e,t){if(!t.pointerType)return!1;var n={};return n[r.POINTER_MOUSE]=t.pointerType==t.MSPOINTER_TYPE_MOUSE||t.pointerType==r.POINTER_MOUSE,n[r.POINTER_TOUCH]=t.pointerType==t.MSPOINTER_TYPE_TOUCH||t.pointerType==r.POINTER_TOUCH,n[r.POINTER_PEN]=t.pointerType==t.MSPOINTER_TYPE_PEN||t.pointerType==r.POINTER_PEN,n[e]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},r.utils={extend:function(e,n,r){for(var i in n)e[i]!==t&&r||(e[i]=n[i]);return e},hasParent:function(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1},getCenter:function(e){for(var t=[],n=[],r=0,i=e.length;i>r;r++)t.push(e[r].pageX),n.push(e[r].pageY);return{pageX:(Math.min.apply(Math,t)+Math.max.apply(Math,t))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(e,t,n){return{x:Math.abs(t/e)||0,y:Math.abs(n/e)||0}},getAngle:function(e,t){var n=t.pageY-e.pageY,r=t.pageX-e.pageX;return 180*Math.atan2(n,r)/Math.PI},getDirection:function(e,t){var n=Math.abs(e.pageX-t.pageX),i=Math.abs(e.pageY-t.pageY);return n>=i?e.pageX-t.pageX>0?r.DIRECTION_LEFT:r.DIRECTION_RIGHT:e.pageY-t.pageY>0?r.DIRECTION_UP:r.DIRECTION_DOWN},getDistance:function(e,t){var n=t.pageX-e.pageX,r=t.pageY-e.pageY;return Math.sqrt(n*n+r*r)},getScale:function(e,t){return e.length>=2&&t.length>=2?this.getDistance(t[0],t[1])/this.getDistance(e[0],e[1]):1},getRotation:function(e,t){return e.length>=2&&t.length>=2?this.getAngle(t[1],t[0])-this.getAngle(e[1],e[0]):0},isVertical:function(e){return e==r.DIRECTION_UP||e==r.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(e,t){var n,r=["webkit","khtml","moz","ms","o",""];if(t&&e.style){for(var i=0;r.length>i;i++)for(var o in t)t.hasOwnProperty(o)&&(n=o,r[i]&&(n=r[i]+n.substring(0,1).toUpperCase()+n.substring(1)),e.style[n]=t[o]);"none"==t.userSelect&&(e.onselectstart=function(){return!1})}}},r.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(e,t){this.current||(this.stopped=!1,this.current={inst:e,startEvent:r.utils.extend({},t),lastEvent:!1,name:""},this.detect(t))},detect:function(e){if(this.current&&!this.stopped){e=this.extendEventData(e);for(var t=this.current.inst.options,n=0,i=this.gestures.length;i>n;n++){var o=this.gestures[n];if(!this.stopped&&t[o.name]!==!1&&o.handler.call(o,e,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=e),e.eventType==r.EVENT_END&&!e.touches.length-1&&this.stopDetect(),e}},stopDetect:function(){this.previous=r.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(e){var t=this.current.startEvent;if(t&&(e.touches.length!=t.touches.length||e.touches===t.touches)){t.touches=[];for(var n=0,i=e.touches.length;i>n;n++)t.touches.push(r.utils.extend({},e.touches[n]))}var o=e.timeStamp-t.timeStamp,s=e.center.pageX-t.center.pageX,a=e.center.pageY-t.center.pageY,c=r.utils.getVelocity(o,s,a);return r.utils.extend(e,{deltaTime:o,deltaX:s,deltaY:a,velocityX:c.x,velocityY:c.y,distance:r.utils.getDistance(t.center,e.center),angle:r.utils.getAngle(t.center,e.center),direction:r.utils.getDirection(t.center,e.center),scale:r.utils.getScale(t.touches,e.touches),rotation:r.utils.getRotation(t.touches,e.touches),startEvent:t}),e},register:function(e){var n=e.defaults||{};return n[e.name]===t&&(n[e.name]=!0),r.utils.extend(r.defaults,n,!0),e.index=e.index||1e3,this.gestures.push(e),this.gestures.sort(function(e,t){return e.index<t.index?-1:e.index>t.index?1:0}),this.gestures}},r.gestures=r.gestures||{},r.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(e,t){switch(e.eventType){case r.EVENT_START:clearTimeout(this.timer),r.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==r.detection.current.name&&t.trigger("hold",e)},t.options.hold_timeout);break;case r.EVENT_MOVE:e.distance>t.options.hold_threshold&&clearTimeout(this.timer);break;case r.EVENT_END:clearTimeout(this.timer)}}},r.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(e,t){if(e.eventType==r.EVENT_END){var n=r.detection.previous,i=!1;if(e.deltaTime>t.options.tap_max_touchtime||e.distance>t.options.tap_max_distance)return;n&&"tap"==n.name&&e.timeStamp-n.lastEvent.timeStamp<t.options.doubletap_interval&&e.distance<t.options.doubletap_distance&&(t.trigger("doubletap",e),i=!0),(!i||t.options.tap_always)&&(r.detection.current.name="tap",t.trigger(r.detection.current.name,e))}}},r.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(e,t){if(e.eventType==r.EVENT_END){if(t.options.swipe_max_touches>0&&e.touches.length>t.options.swipe_max_touches)return;(e.velocityX>t.options.swipe_velocity||e.velocityY>t.options.swipe_velocity)&&(t.trigger(this.name,e),t.trigger(this.name+e.direction,e))}}},r.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(e,n){if(r.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",e),this.triggered=!1,t;if(!(n.options.drag_max_touches>0&&e.touches.length>n.options.drag_max_touches))switch(e.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:if(e.distance<n.options.drag_min_distance&&r.detection.current.name!=this.name)return;r.detection.current.name=this.name,(r.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=e.distance)&&(e.drag_locked_to_axis=!0);var i=r.detection.current.lastEvent.direction;e.drag_locked_to_axis&&i!==e.direction&&(e.direction=r.utils.isVertical(i)?0>e.deltaY?r.DIRECTION_UP:r.DIRECTION_DOWN:0>e.deltaX?r.DIRECTION_LEFT:r.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",e),this.triggered=!0),n.trigger(this.name,e),n.trigger(this.name+e.direction,e),(n.options.drag_block_vertical&&r.utils.isVertical(e.direction)||n.options.drag_block_horizontal&&!r.utils.isVertical(e.direction))&&e.preventDefault();break;case r.EVENT_END:this.triggered&&n.trigger(this.name+"end",e),this.triggered=!1}}},r.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(e,n){if(r.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",e),this.triggered=!1,t;if(!(2>e.touches.length))switch(n.options.transform_always_block&&e.preventDefault(),e.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:var i=Math.abs(1-e.scale),o=Math.abs(e.rotation);if(n.options.transform_min_scale>i&&n.options.transform_min_rotation>o)return;r.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",e),this.triggered=!0),n.trigger(this.name,e),o>n.options.transform_min_rotation&&n.trigger("rotate",e),i>n.options.transform_min_scale&&(n.trigger("pinch",e),n.trigger("pinch"+(1>e.scale?"in":"out"),e));break;case r.EVENT_END:this.triggered&&n.trigger(this.name+"end",e),this.triggered=!1}}},r.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(e,n){return n.options.prevent_mouseevents&&e.pointerType==r.POINTER_MOUSE?(e.stopDetect(),t):(n.options.prevent_default&&e.preventDefault(),e.eventType==r.EVENT_START&&n.trigger(this.name,e),t)}},r.gestures.Release={name:"release",index:1/0,handler:function(e,t){e.eventType==r.EVENT_END&&t.trigger(this.name,e)}},"object"==typeof module&&"object"==typeof module.exports?module.exports=r:(e.Hammer=r,"function"==typeof e.define&&e.define.amd&&e.define("hammer",[],function(){return r}))}(this),function(e,t){"use strict";var n="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,r=function(){for(var e,n,r=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"]],i=0,o=r.length,s={};o>i;i++)if(e=r[i],e&&e[1]in t){for(i=0,n=e.length;n>i;i++)s[r[0][i]]=e[i];return s}return!1}(),i={request:function(e){var i=r.requestFullscreen;e=e||t.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?e[i]():e[i](n&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){t[r.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},onchange:function(){},onerror:function(){},raw:r};return r?(Object.defineProperties(i,{isFullscreen:{get:function(){return!!t[r.fullscreenElement]}},element:{enumerable:!0,get:function(){return t[r.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!t[r.fullscreenEnabled]}}}),t.addEventListener(r.fullscreenchange,function(e){i.onchange.call(i,e)}),t.addEventListener(r.fullscreenerror,function(e){i.onerror.call(i,e)}),void(e.screenfull=i)):e.screenfull=!1}(window,document);