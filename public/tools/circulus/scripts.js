var svg = document.getElementById('menu'),
    svgns = 'http://www.w3.org/2000/svg',
    xlinkns = 'http://www.w3.org/1999/xlink',
    symbolsContainer = svg.getElementById('symbolsContainer'),
    itemsContainer = svg.getElementById('itemsContainer'),
    trigger = svg.getElementById('trigger'),
    codeContainer = document.getElementById('codeContainer').querySelector('code'),
    source = document.getElementById('demo'),
    smallRadiusContainer = document.getElementById('smallRadiusSliderContainer'),
    smallRadiusControl = document.getElementById('smallRadiusControl'),
    triggerControl = document.getElementById('triggerControl'),
    iconPosControl = document.getElementById('iconPosControl'),
    iconSizeControl = document.getElementById('iconSizeControl'),
    gapControl = document.getElementById('gapControl'),
    circle = svg.querySelector('#trigger circle'),
    downloadButton = document.getElementById('download-button'),
    resetButton = document.getElementById('reset-button'),
    nb = document.getElementById('nb'),
    typePicker = document.getElementsByName('type'),
    stylePicker = document.getElementsByName('style'),
    gapOption = document.getElementById('gaps');

//get initial input values
var nbOfSlices = parseInt(nb.value),
    typeOfCircle = document.querySelector('input[name="type"]:checked').value,
    menuStyle = document.querySelector('input[name="style"]:checked').value,
    gaps = document.getElementById('gaps').checked;

//default menu settings
var menuCenter = {
        x: 250,
        y: 250
    },
    menuRadius = 250,
    menuSmallRadius = 125; //for pie style
var iconPos; //icon position along the alignment line in the middle of the sector
if (menuStyle == "pie") iconPos = 0.75 * menuRadius;
else iconPos = 0.68 * menuRadius;
var iconWidth = 40,
    iconHeight = 40;

//set up new variables
var angle,
    pizzaCoordinates = {},
    pieCoordinates = {},
    gap = 10; //gap must be minimum = nbOfSlices - 1


//update variable values on input update
typePicker[0].onclick = function () {
    typeOfCircle = this.value;
    init();
};

typePicker[1].onclick = function () {
    typeOfCircle = this.value;
    init();
};

stylePicker[0].onclick = function () {
    menuStyle = this.value;
    init();
};
stylePicker[1].onclick = function () {
    menuStyle = this.value;
    init();
};

nb.onchange = function () {
    if (this.value < 3) {
        this.value = 3;
    }
    if (this.value > 12) {
        this.value = 12;
    }
    nbOfSlices = parseInt(this.value);
    codeContainer.textContent = source.innerHTML;
    init();
};

gapOption.onclick = function () {
    gaps = this.checked;
    init();
};

smallRadiusControl.addEventListener('change', smallRadiusControlHandler, false);
smallRadiusControl.addEventListener('input', smallRadiusControlHandler, false);


triggerControl.addEventListener('change', triggerControlHandler, false);
triggerControl.addEventListener('input', triggerControlHandler, false);

iconPosControl.addEventListener('change', iconPosControlHandler, false);
iconPosControl.addEventListener('input', iconPosControlHandler, false);

iconSizeControl.addEventListener('change', iconSizeControlHandler, false);
iconSizeControl.addEventListener('input', iconSizeControlHandler, false);

gapControl.addEventListener('change', gapControlHandler, false);
gapControl.addEventListener('input', gapControlHandler, false);

resetButton.onclick = function(){
    nbOfSlices = 8;
    gaps = false;
    gap = 10;
    gapControl.value = 10;
    circle.setAttribute('r', '30');
    triggerControl.value = 30;
    menuStyle = "pizza";
    typeOfCircle = "fullCircle";
    iconPos = 0.68 * menuRadius;
    iconPosControl.value = 0.68 * menuRadius;
    iconWidth = 40;
    iconHeight = 40;
    iconSizeControl.value = 40;

    nb.value = nbOfSlices;
    typePicker[0].checked = true;
    if(typePicker[1].checked) {
        typePicker[1].checked = false;
        typePicker[1].removeAttribute('checked');
    }


    stylePicker[0].checked = true;
    if(stylePicker[1].checked) {
        stylePicker[1].checked = false;
        stylePicker[1].removeAttribute('checked');
    }

    gapOption.checked = false;
    gapControl.setAttribute('value', '10');
    gapControl.value = 10;

    smallRadiusControl.setAttribute('value', '125');
    smallRadiusControl.value = 125;

    TweenLite.set(svg, {
        rotation: 0,
        transformOrigin: "50% 50%"
    });
    init();
}

//generate the code in the code preview section
function generateCode() {
    codeContainer.textContent = source.innerHTML;
}

function generateFile() {
    //for browsers that support `download`
    var string = "data:image/svg+xml;utf8," + encodeURIComponent(source.innerHTML);
    downloadButton.setAttribute('href', string);
}
    //for IE
downloadButton.addEventListener('click', function (event) {
    var svgString = source.innerHTML;
    if (navigator.msSaveBlob) {
        event.preventDefault();
        navigator.msSaveBlob(
            new Blob([svgString], {
                type: "image/svg+xml"
            }),
            "svg-circular-menu.svg"
        );
    }
});

function getAngle(nbOfSlices) {
    //calculate angle without gaps
    if (typeOfCircle == "semiCircle" && gaps === false) angle = 180 / nbOfSlices;
    else if (typeOfCircle == "fullCircle" && gaps === false) angle = 360 / nbOfSlices;

    //calculate angle with gaps—the angle needs to be smaller to fit the gaps in
    if (typeOfCircle == "semiCircle" && gaps === true) {
        angle = 180 / nbOfSlices - (180 / nbOfSlices / gap);
    } else if (typeOfCircle == "fullCircle" && gaps === true) {
        angle = 360 / nbOfSlices - (360 / nbOfSlices / gap);
    }
}

function getPizzaCoordinates(angleInDegrees, radius, centerCoordinates) {
    var centerX = centerCoordinates.x;
    var centerY = centerCoordinates.y;
    //polar to cartesian coordinates conversion
    var angleInRadians = -angleInDegrees * Math.PI / 180.0;
    var x = centerX + radius * Math.cos(angleInRadians);
    var y = centerY + radius * Math.sin(angleInRadians);
    pizzaCoordinates.x = x;
    pizzaCoordinates.y = y;
}

function getCutCoordinates(angleInDegrees, radius_small, centerCoordinates) {
    var centerX = centerCoordinates.x;
    var centerY = centerCoordinates.y;
    var angleInRadians = -angleInDegrees * Math.PI / 180.0;
    var x2 = centerX + radius_small * Math.cos(angleInRadians);
    var y2 = centerY + radius_small * Math.sin(angleInRadians);
    pieCoordinates.x = x2;
    pieCoordinates.y = y2;
}

function isOdd(num) {
    return num % 2;
}

function rotateItems(centerCoordinates) {

    var items = svg.querySelectorAll('.item');
    var distributedSpace, spacePerItem, rotationValue;

    for (var i = 0; i < items.length; i++) {

        var item = items[i];

        if (gaps === false) {
            rotationValue = -angle * i;
        }
        if (gaps === true && typeOfCircle == "semiCircle") {
            distributedSpace = nbOfSlices * (180 / nbOfSlices / gap);
            spacePerItem = distributedSpace / (nbOfSlices - 1);
            rotationValue = -i * (angle + spacePerItem);
        }
        if (gaps === true && typeOfCircle == "fullCircle") {
            distributedSpace = nbOfSlices * (360 / nbOfSlices / gap);
            spacePerItem = distributedSpace / (nbOfSlices);
            rotationValue = -i * (angle + spacePerItem);
        }
        var box = item.getBBox();
        item.setAttribute('transform', 'rotate(' + rotationValue + ' ' + centerCoordinates.x + ' ' + centerCoordinates.y + ')');
        TweenLite.set(item, {
            rotation: rotationValue,
            transformOrigin: (centerCoordinates.x - box.x) + "px " + (centerCoordinates.y - box.y) + "px"
        });
        item.removeAttribute('style');

    } //end loop

    //rotate entire group so that menu is straight in full mode
    //this is not needed as long as Draggable is an option so the user can adjust it to their liking

    // if(gaps === false && typeOfCircle == "fullCircle" && isOdd(nbOfSlices)){
    // itemsContainer.setAttribute('transform', 'rotate(' + (-90 - angle) + ' ' + centerCoordinates.x + ' ' + centerCoordinates.y+ ')');
    // }
    // else if (gaps === true && typeOfCircle == "fullCircle"){
    //     itemsContainer.setAttribute('transform', 'rotate(' + (90 + angle +  spacePerItem/2) + ' ' + centerCoordinates.x + ' ' + centerCoordinates.y+ ')');
    // }
    // else {
    //     itemsContainer.removeAttribute('transform');
    // }
}

function drawPizzaSectors(centerCoordinates, radius) {

    for (var i = 0; i < nbOfSlices; i++) {
        var anchor = document.createElementNS(svgns, 'a');
        anchor.setAttribute('class', 'item');
        anchor.setAttribute('id', 'item-' + (i + 1));
        anchor.setAttributeNS(xlinkns, 'xlink:href', '');
        anchor.setAttributeNS(xlinkns, 'xlink:title', '');
        anchor.setAttribute('role', 'link');
        anchor.setAttribute('tabindex', '0');
        anchor.setAttributeNS(xlinkns, 'target', '_parent');//so that SVG embedded as <object> does not open inside the object itself lol

        var item = document.createElementNS(svgns, 'path');
        item.setAttribute('fill', 'none');
        item.setAttribute('stroke', '#111');
        item.setAttribute('stroke-width', '1');
        item.setAttribute('class', 'sector');
        item.setAttribute('d', 'M' + centerCoordinates.x + ',' + centerCoordinates.y + ' l' + radius + ',0 A' + radius + ',' + radius + ' 0 0,0 ' + pizzaCoordinates.x + ',' + pizzaCoordinates.y + ' z');

        anchor.appendChild(item);
        itemsContainer.appendChild(document.createTextNode("\t\t"));
        itemsContainer.appendChild(anchor);
        itemsContainer.appendChild(document.createTextNode("\n"));
    }




}

function drawCutSectors(centerCoordinates, radius, small_radius) {
    for (var i = 0; i < nbOfSlices; i++) {
        var anchor = document.createElementNS(svgns, 'a');
        anchor.setAttribute('class', 'item');
        anchor.setAttribute('id', 'item-' + (i + 1));
        anchor.setAttribute('role', 'link');
        anchor.setAttribute('tabindex', '0');
        anchor.setAttributeNS(xlinkns, 'xlink:href', ' ');
        anchor.setAttributeNS(xlinkns, 'xlink:title', ' ');

        var item = document.createElementNS(svgns, 'path');
        item.setAttribute('fill', 'none');
        item.setAttribute('stroke', '#111');
        item.setAttribute('d', 'M' + (centerCoordinates.x + small_radius) + ',' + centerCoordinates.y + ' l' + (radius - small_radius) + ',0 A' + radius + ',' + radius + ' 0 0,0 ' + pizzaCoordinates.x + ',' + pizzaCoordinates.y + ' l' + (-(pizzaCoordinates.x - pieCoordinates.x)) + ',' + (-pizzaCoordinates.y + pieCoordinates.y) + ' A' + small_radius + ',' + small_radius + ' 0 0,1 ' + (centerCoordinates.x + small_radius) + ',' + centerCoordinates.y);
        item.setAttribute('class', 'sector');

        anchor.appendChild(item);
        itemsContainer.appendChild(document.createTextNode("\t\t"));
        itemsContainer.appendChild(anchor);
        itemsContainer.appendChild(document.createTextNode("\n"));
    }
}

function clearCanvas() {
    var items = svg.querySelectorAll('.item');
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var parent = item.parentNode;
        parent.removeChild(item);
    }
    var icons = svg.querySelectorAll('.icon');
    for (var i = 0; i < icons.length; i++) {
        var icon = icons[i];
        var parent = icon.parentNode;
        parent.removeChild(icon);
    }
    //to remove the \n characters otherwise they will accumulate and cause big blocks of white space whenever this function in invoked
    itemsContainer.textContent = "";
    symbolsContainer.textContent = "";
}

function triggerControlHandler() {
    circle.setAttribute('r', this.value);
    generateFile();
}



function gapControlHandler() {
    gap = this.value;
    init();
}

function smallRadiusControlHandler() {
    menuSmallRadius = parseInt(this.value);
    init();
}

function iconPosControlHandler() {
    iconPos = this.value;
    init();
}

function iconSizeControlHandler() {
    iconWidth = this.value;
    iconHeight = this.value;
    init();
}

function enableGapControl() {
    gapControl.disabled = false;
}

function disableGapControl() {
    gapControl.disabled = true;
}

function enableRadiusControl() {
    smallRadiusControl.disabled = false;
}

function disableRadiusControl() {
    smallRadiusControl.disabled = true;
}

function addIcons() {
    var anchors = document.querySelectorAll('.item');
    var chord = document.createElementNS(svgns, 'path');
    chord.setAttribute('d', 'M' + pizzaCoordinates.x + ',' + pizzaCoordinates.y + ' L' + menuRadius * 2 + ',' + menuRadius);
    var chordLength = chord.getTotalLength();

    for (var i = 0; i < anchors.length; i++) {

        var item = anchors[i];

        item.onclick = function (e) {
            e.preventDefault();
        }

        var chord = document.createElementNS(svgns, 'path');
        chord.setAttribute('d', 'M' + pizzaCoordinates.x + ',' + pizzaCoordinates.y + ' L' + menuRadius * 2 + ',' + menuRadius);
        chord.setAttribute('stroke', '#ddd');
        // item.appendChild(chord);

        var ptOnChord = {};

        if (angle > 90) {
            ptOnChord.x = pizzaCoordinates.x + (menuRadius * 2 - pizzaCoordinates.x) / 2 + 50;
            ptOnChord.y = pizzaCoordinates.y + (menuRadius - pizzaCoordinates.y) / 2 - 50;
        } else {
            ptOnChord.x = pizzaCoordinates.x + (menuRadius * 2 - pizzaCoordinates.x) / 2;
            ptOnChord.y = pizzaCoordinates.y + (menuRadius - pizzaCoordinates.y) / 2;
        }

        var test = document.createElementNS(svgns, 'circle');
        test.setAttribute('cx', ptOnChord.x);
        test.setAttribute('cy', ptOnChord.y);
        test.setAttribute('r', '5');
        // item.appendChild(test);

        var chordPerpendicular = document.createElementNS(svgns, 'path');
        chordPerpendicular.setAttribute('d', 'M' + menuCenter.x + ',' + menuCenter.y + ' L' + ptOnChord.x + ',' + ptOnChord.y);
        chordPerpendicular.setAttribute('stroke', 'orange');
        // item.appendChild(chordPerpendicular);

        var golden = chordPerpendicular.getPointAtLength(iconPos); //point two-thirds the way along the line

        var test2 = document.createElementNS(svgns, 'circle');
        test2.setAttribute('cx', golden.x);
        test2.setAttribute('cy', golden.y);
        test2.setAttribute('r', '5');
        // item.appendChild(test2);


        var use = document.createElementNS(svgns, 'use');

        use.setAttributeNS(xlinkns, 'xlink:href', '#icon-' + (i + 1));
        use.setAttribute('width', iconWidth);
        use.setAttribute('height', iconHeight);
        use.setAttribute('x', golden.x - use.getAttribute('width') / 2);
        use.setAttribute('y', golden.y - use.getAttribute('height') / 2);
        use.setAttribute('transform', 'rotate(' + (90 - angle + angle / 2) + ' ' + (golden.x) + ' ' + (golden.y) + ')');
        item.appendChild(use);

        var symbol = document.createElementNS(svgns, 'symbol');
        symbol.setAttribute('class', 'icon icon-');
        symbol.setAttribute('id', 'icon-' + (i + 1));
        symbol.setAttribute('viewBox', '0 0 ' + iconWidth + ' ' + iconHeight);

        var rect = document.createElementNS(svgns, 'rect');
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', '#111');
        rect.setAttribute('stroke-width', '1');
        rect.setAttribute('width', '100%');
        rect.setAttribute('height', '100%');

        var num = document.createElementNS(svgns, 'text');
        num.setAttribute('fill', '#222');
        num.setAttribute('x', '50%');
        num.setAttribute('y', '50%');
        num.setAttribute('dy', '.3em');
        num.setAttribute('text-anchor', 'middle');
        num.setAttribute('font-size', '1.2em');
        num.textContent = i + 1;

        var note = document.createComment("Replace the contents of this symbol with the content of your icon");
        symbol.appendChild(note);
        symbol.appendChild(rect);
        symbol.appendChild(num);
        symbolsContainer.appendChild(document.createTextNode("\t"));
        symbolsContainer.appendChild(symbol);
        symbolsContainer.appendChild(document.createTextNode("\n\n"));
    }
}

function init() {

    clearCanvas();

    iconPosControl.setAttribute('max', 0.85 * menuRadius);
    iconPosControl.setAttribute('value', 0.68 * menuRadius);

    if (gaps) {
        enableGapControl();
        gapControl.setAttribute('max', angle);
        gapControl.setAttribute('min', nbOfSlices - 1);
    } else if (!gaps) {
        disableGapControl();
    }

    getAngle(nbOfSlices);

    getPizzaCoordinates(angle, menuRadius, menuCenter);

    if (menuStyle == "pizza") {
        drawPizzaSectors(menuCenter, menuRadius);
        disableRadiusControl();
    } else if (menuStyle == "pie") {
        getCutCoordinates(angle, menuSmallRadius, menuCenter);
        drawCutSectors(menuCenter, menuRadius, menuSmallRadius);
        enableRadiusControl();
    }

    rotateItems(menuCenter);
    addIcons();

    generateCode();
    generateFile();
}

init();

function makeSpinnable(centerCoordinates) {
    //so that the menu does not reset its items whenever an item is added or anything changes
    //rotating the entire SVG ensures that the elements inside it will still be drawn relative to IT no matter what its transformation is.
    CSSPlugin.useSVGTransformAttr = true;
    TweenLite.set(svg, {
        rotation: 0,
        transformOrigin: "50% 50%"
    });
    Draggable.create(svg, {
        type: "rotation",
        throwProps: true,
        dragClickables: true,
        onThrowComplete: function () {
            generateCode();
            generateFile();
        }
    });
}
makeSpinnable();



