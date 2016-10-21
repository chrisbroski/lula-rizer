/*jslint browser: true, sloppy: true, devel: true */
/*global aero, cordova, Blob */

var styleData = {
    "joy": {"price": 60, "sizes": ["xs", "s", "m", "l", "xl"]},
    "tween": {"price": 23},
    "tall_&_curvy": {"price": 25},
    "kids_s/m": {"price": 23},
    "sloan": {"price": 28, "sizes": ["2", "4", "6", "8", "10", "12", "14"]},
    "sarah": {"price": 70, "sizes": ["xs", "s", "m", "l", "xl"]},
    "randy": {"price": 35, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "perfect_t": {"price": 36, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "patrick": {"price": 40, "sizes": ["m", "l", "xl", "2xl", "3xl"]},
    "one_size": {"price": 25},
    "nicole": {"price": 48, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "monroe": {"price": 48, "sizes": ["s", "l"]},
    "maxi": {"price": 42, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "madison": {"price": 48, "sizes": ["xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "kids_l/xl": {"price": 23},
    "lucy": {"price": 52, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl"]},
    "lola": {"price": 48, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl"]},
    "lindsay": {"price": 48, "sizes": ["s", "m", "l"]},
    "kids_azure": {"price": 25, "sizes": ["2", "4", "6", "8", "10", "12", "14"]},
    "julia": {"price": 45, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "jordan": {"price": 65, "sizes": ["xs", "s", "m", "l", "xl", "2xl"]},
    "jill": {"price": 55, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl"]},
    "jade": {"price": 55, "sizes": ["xs", "s", "m", "l", "xl", "2xl"]},
    "irma": {"price": 35, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "gracie": {"price": 28, "sizes": ["2", "4", "6", "8", "10", "12", "14"]},
    "classic_t": {"price": 35, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "cassie": {"price": 35, "sizes": ["xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "azure": {"price": 35, "sizes": ["xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "ana": {"price": 60, "sizes": ["xs", "s", "m", "l", "xl", "2xl", "3xl"]},
    "amelia": {"price": 65, "sizes": ["xxs", "xs", "s", "m", "l", "xl", "2xl"]},
    "carly": {"price": 55, "sizes": ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"]}
}, dataJSON;

var colors = {
    'colorYellow': '#fed141',
    'colorOrange': '#ff9d68',
    'colorPink': '#f97599',
    'colorFuchsia': '#dd7fd3',
    'colorPurple': '#9595d2',
    'colorBlue': '#8bb8e8',
    'colorGreen': '#64ccc9',
    'colorGray': '#888b8d'
}, color = '#fed141';

function formatStyle(styleType) {
    return styleType.replace(/_/g, " ");
}

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function buildSizeUI() {
    var selSizes = document.getElementById('selectSize'),
        selectedStyle = document.getElementById('selectStyle').value,
        option,
        size = localStorage.size;

    selSizes.innerHTML = '';
    if (selectedStyle && styleData[selectedStyle].sizes) {
        styleData[selectedStyle].sizes.forEach(function (availableSize) {
            option = document.createElement('option');
            option.value = availableSize;
            option.textContent = availableSize.toUpperCase();
            selSizes.appendChild(option);
        });
        if (size && styleData[selectedStyle].sizes.indexOf(size) > -1) {
            selSizes.value = size;
        } else {
            selSizes.selectedIndex = Math.floor(selSizes.options.length / 2);
        }
        selSizes.disabled = false;
    } else {
        selSizes.disabled = true;
    }
}

function buildStyleUI() {
    var selStyle = document.getElementById('selectStyle'),
        iStyle = localStorage.style || 0,
        option,
        style;

    for (style in styleData) {
        if (styleData.hasOwnProperty(style)) {
            option = document.createElement('option');
            option.value = style;
            option.textContent = formatStyle(style);
            selStyle.appendChild(option);
        }
    }
    selStyle.selectedIndex = iStyle;

    buildSizeUI();
}

function logo(ctx) {
    // LuLaRoe Logo
    ctx.beginPath();
    ctx.lineWidth = 4.8;
    ctx.strokeStyle = '#fed141';
    ctx.rect(307, 258, 135, 135);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#ff9d68';
    ctx.rect(318, 269, 113, 113);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#f97599';
    ctx.rect(329, 280, 91, 91);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#dd7fd3';
    ctx.rect(340, 291, 69, 69);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#9595d2';
    ctx.rect(351, 302, 47, 47);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#8bb8e8';
    ctx.rect(362, 313, 25, 25);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#64ccc9';
    ctx.rect(372.5, 323.5, 4, 4);
    ctx.stroke();
}

function emboss(img, style, lulalroeColor, size, watermark) {
    var canvas = document.getElementById('preview'),
        ctx = canvas.getContext('2d');

    ctx.lineWidth = 1;
    ctx.strokeStyle = lulalroeColor;
    ctx.fillStyle = lulalroeColor;
    ctx.textAlign = 'center';
    ctx.font = '20px maven';

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 300, 400);

    // add watermark
    ctx.fillStyle = 'black';
    ctx.fillText(watermark, 151, 391);
    ctx.strokeStyle = lulalroeColor;
    ctx.fillStyle = lulalroeColor;
    ctx.fillText(watermark, 150, 390);

    ctx.fillRect(300, 0, 150, 65);
    ctx.font = '44px steelfish';

    if (size) {
        ctx.fillText(size.toUpperCase(), 375, 130);
        ctx.fillText('$' + styleData[style].price, 375, 200);
    } else {
        ctx.fillText('$' + styleData[style].price, 375, 130);
    }

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.font = '40px steelfish';
    ctx.fillText(formatStyle(style).toUpperCase(), 375, 49);

    logo(ctx);
}

function lularize() {
    var color = localStorage.color,
        lulalroeColor = colors[color],
        style = document.getElementById('selectStyle').options[localStorage.style].value,
        size = document.getElementById('selectSize').value,
        img = new Image();

    img.addEventListener("load", function () {
        emboss(this, style, lulalroeColor, size, document.getElementById('watermark').value);
    }, false);
    //img.src = localStorage.getItem('photo');//'album/' + Q$('file'); // Set source path somehow
    console.log(localStorage.getItem('photo'));
    img.src = localStorage.getItem('photo');
    //file:///storage/emulated/0/Android/data/com.chaosscape.lularizer/cache/1475509023259.jpg
}

function setFileJSON(objJSON) {
    console.log("setFileJSON");
    dataJSON.createWriter(function (fileWriter) {
        console.log("createWriter");
        //fileWriter.seek(fileWriter.length);

        //var blob = new Blob(JSON.stringify(objJSON), {type: 'text/plain'});
        fileWriter.write(JSON.stringify(objJSON));
        console.log("wrote to data");
    });
}

function getJsonData(callback) {
    dataJSON.file(function (file) {
        console.log('getting file');
        var reader = new FileReader();

        reader.onloadend = function (e) {
            var data = this.result;
            console.log(data);
            if (!data) {
                data = "{}";
            }
            callback(JSON.parse(data));
            //document.getElementById('imageFile').src = jsonData.lucy[0].file;
        };

        reader.readAsText(file);
    });
}

function addJsonData(style, filePath) {
    console.log(style, filePath);
    getJsonData(function (data) {
        console.log("gjd callback");
        if (!data[style]) {
            data[style] = [];
        }
        data[style].push({"file": filePath});
        console.log(data);
        setFileJSON(data);
    });
}

function saveImage() {
    /* After save, go back to camera or album */

    var bitmapData = document.getElementById('preview').toDataURL("image/png"),
        style = document.getElementById('selectStyle').value,
        params = {data: bitmapData, prefix: 'lularizer_', format: 'PNG', mediaScanner: true};

    window.imageSaver.saveBase64Image(
        params,
        function (filePath) {
            addJsonData(style, filePath);
            //var data = {};
            //data[style] = [{"file": filePath}];
            // Save data to JSON file
            /*invString = localStorage.getItem('inventory');
            if (!invString) {
                invObj = {};
            } else {
                invObj = JSON.parse(invString);
            }

            if (!invObj[style]) {
                invObj[style] = [];
            }
            invObj[style].push(filePath);
            localStorage.setItem('inventory', JSON.stringify(invObj));*/
            //setFileJSON(data);
            //console.log('File saved on ' + filePath);
            //saveData(style, filePath);
            //addJsonData(style, filePath)

            // get json
            // get file
        },
        function (msg) {
            console.error(msg);
        }
    );

    //history.back();
}

function isColorButton(el) {
    var colorIds = ['colorYellow', 'colorOrange', 'colorPink', 'colorFuchsia', 'colorPurple', 'colorBlue', 'colorGreen', 'colorGray'];
    if (colorIds.indexOf(el.id) > -1) {
        return true;
    }
    return false;
}

function changeStyle() {
    var iStyle = document.getElementById('selectStyle').selectedIndex;
    localStorage.style = iStyle;
    buildSizeUI();
    lularize();
}

function changeSize() {
    var size = document.getElementById('selectSize').value;
    localStorage.size = size;
    lularize();
}

function changeColor(e) {
    var targ = aero.getEventTarget(e);
    if (isColorButton(targ)) {
        document.getElementById('colorYellow').className = '';
        document.getElementById('colorOrange').className = '';
        document.getElementById('colorPink').className = '';
        document.getElementById('colorFuchsia').className = '';
        document.getElementById('colorPurple').className = '';
        document.getElementById('colorBlue').className = '';
        document.getElementById('colorGreen').className = '';

        targ.className = 'selectedColor';
        localStorage.color = targ.id;
        lularize();
    }
}

function init() {
    if (localStorage.color && colors[localStorage.color]) {
        color = localStorage.color;
    } else {
        color = 'colorYellow';
        localStorage.color = color;
    }
    document.getElementById(color).className = 'selectedColor';

    if (!localStorage.style) {
        localStorage.style = 0;
    }
    buildStyleUI();
}

function load() {
    init();
    document.getElementById('selectStyle').onchange = changeStyle;
    document.getElementById('selectSize').onchange = changeSize;
    aero.touchclick(document.getElementById('colors'), changeColor);
    document.getElementById('watermark').onchange = lularize;

    aero.setPageDeviceReady(function () {
        lularize();
        console.log('lularized');

        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
            console.log("got main dir", dir);
            dir.getFile("data.json", {create: true}, function (file) {
                console.log("got the file", file);
                dataJSON = file;
                console.log("App started");
            });
        });
    });
    //window.setTimeout(lularize, 50);
}

window.onload = load;
