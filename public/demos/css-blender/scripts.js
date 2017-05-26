var preview = document.getElementById('preview'),
    thumbnails = [],
    thumbs = document.querySelectorAll('.thumbnail'),
    textIcon = document.getElementById('text-icon'),
    mode,
    text = document.getElementById('text'),
    textOptions = document.getElementById('textOptions'),
    textContainer = document.getElementById('textContainer'),
    mixMode = document.getElementById('mixMode');

for (var i = 0; i < thumbs.length; i++) {
    var self = thumbs[i];
    self.addEventListener("click", updatePreview, false);
};

function updatePreview() {
    mode = this.getAttribute('data-mode');
    preview.style.backgroundBlendMode = mode;
};

function previewFile() {
    var input = document.querySelector('input[type=file]'),
        file = input.files[0], //sames as here
        reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert("Select an image..");
    }
    reader.onloadend = function () {
        preview.style.backgroundImage = "url(" + reader.result + ")";
        for (var i = 0; i < thumbs.length; i++) {
            thumbs[i].style.backgroundImage = "url(" + reader.result + ")";
        }
    };
};

(function () {
    document.execCommand("enableObjectResizing", false, false); //prevent firefox from making absolutely-positioned contenteditable text resizeable

    textIcon.addEventListener('click', toggleText, false);
    textIcon.addEventListener('click', toggleTextOptions, false);
    textIcon.addEventListener('click', toggleActiveState, false);
    textIsVisible = false,
        textIconActive = false,
        textOptionsVisible = false;

    function toggleText() {
        if (textIsVisible == false) {
            textContainer.style.display = "block";
            textIsVisible = true;
        } else {
            textIsVisible = false;
            textContainer.style.display = "none";
        }

    };

    function toggleActiveState() {
        if (textIconActive == false) {
            textIcon.classList.add('active');
            textIconActive = true;
        } else {
            textIconActive = false;
            textIcon.classList.remove('active');
        }
    };

    function toggleTextOptions() {
        if (textOptionsVisible == false) {
            textOptions.style.visibility = "visible";
            textOptionsVisible = true;
        } else {
            textOptionsVisible = false;
            textOptions.style.visibility = "hidden";
        }
    };

    // make text options draggable
    var draggie = new Draggabilly(textOptions, {
        containment: '.preview',
        handle: '.handle'
    });

    mixMode.addEventListener('change', mixText, false);

    function mixText() {
        var mode = this.value;
        console.log(this.value);
        text.style.mixBlendMode = mode;
    };
})();
(function () {
    var preview = $('.preview'),
        thumbs = $('.thumbnail'),
        text = $('h1'),
        drop = $('.drop-icon'),
        textDrop = $('.text-drop-icon'),
        brush = $('.paint-brush-icon');


    $('#bgColor').colpick({
        layout: 'hex',
        submit: 0,
        color: '6b1cba',
        onChange: function (hsb, hex, rgb, el, bySetColor) {
            preview.css('background-color', '#' + hex);
            thumbs.css('background-color', '#' + hex);
            drop.css('fill', '#' + hex);
        }
    });
    $('#textColor').colpick({
        layout: 'hex',
        submit: 0,
        color: 'fa9a00',
        onChange: function (hsb, hex, rgb, el, bySetColor) {
            text.css('color', '#' + hex);
            textDrop.css('fill', '#' + hex);
        }
    });
    $('#textBgColor').colpick({
        layout: 'hex',
        submit: 0,
        color: '1cba7d',
        onChange: function (hsb, hex, rgb, el, bySetColor) {
            text.css('background-color', '#' + hex);
            brush.css('fill', '#' + hex);
        }
    });
})();
