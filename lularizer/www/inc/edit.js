/*jslint browser: true, sloppy: true, devel: true */
/*global aero */

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
};

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
    img.src = localStorage.getItem('photo');//'album/' + Q$('file'); // Set source path somehow
}

function save() {
    /* After save, go back to camera or album */
    var bitmapData = document.getElementById('preview').toDataURL("image/jpeg", 0.85),
        //invString,
        //invObj,
        style = document.getElementById('selectStyle').value;

    //console.log(bitmapData);
    // remove leading 'data:image/png;base64,'
    console.log('saving file');
    //saveFile(style + '_' + '.png', window.atob(bitmapData.slice(22)));
    console.log(bitmapData);
    writeToFile(style + '_' + '.jpg', window.atob(bitmapData.slice(23)));

    //InputStream stream = new ByteArrayInputStream(Base64.decode(bitmapData, Base64.DEFAULT));

    /*invString = localStorage.getItem('inventory');
    if (!invString) {
        invObj = {};
    } else {
        invObj = JSON.parse(invString);
    }

    if (!invObj[style]) {
        invObj[style] = [];
    }
    invObj[style].push(bitmapData);
    localStorage.setItem('inventory', JSON.stringify(invObj));*/
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

// Save to file system
function saveFile(File_Name, fileData) {
    //step to request a file system
    console.log('save file ', File_Name);

    function fileSystemSuccess(fileSystem) {
        console.log('file system success');
        console.log(fileSystem.name);
        var directoryEntry = fileSystem.root;
        directoryEntry.getDirectory('lularizer', {create: true, exclusive: false}, onDirectorySuccess, onDirectoryFail);
        var rootdir = fileSystem.root;
        var fp = rootdir.fullPath;
        console.log(fp);

        fp = fp + "/lularizer/" + File_Name; // fullpath and name of the file which we want to give
        console.log(fp);

        fileSystem.root.getFile(fp, {create: true, exclusive: false}, gotFileEntry, fileSystemFail);
        // download function call
        //filetransfer(download_link, fp);
    }
    function gotFileEntry(fileEntry) {
        console.log("checkpoint 3");
        fileEntry.createWriter(gotFileWriter, fileSystemFail);
    }
    function gotFileWriter(writer) {
        writer.onwrite = function(evt) {
            console.log("checkpoint 4: write success!");
        };
        writer.write('test');
    }

    function onDirectorySuccess(parent) {
        // Directory created successfuly
        console.log('created directory');
    }

    function onDirectoryFail(error) {
        //Error while creating directory
        alert("Unable to create new directory: " + error.code);
    }

    function fileSystemFail(evt) {
        //Unable to access file system
        //alert(evt.target.error.code);
        console.log(evt);
    }

    window.requestFileSystem(1, 0, fileSystemSuccess, fileSystemFail);
}

function saveFile2(fileName, fileData) {
    console.log("checkpoint 1");

    function onFSSuccess(fileSystem) {
        console.log("checkpoint 2");
        console.log("Opened file system: " + fileSystem.name);
        fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, onFSError);
    }
    function gotFileEntry(fileEntry) {
        console.log("checkpoint 3");
        fileEntry.createWriter(gotFileWriter, onFSError);
    }
    function gotFileWriter(writer) {
        writer.onwrite = function(evt) {
            console.log("checkpoint 4: write success!");
        };
        writer.write(fileData);
    }
    function onFSError(err) {
        console.log(err.code);
    }

    window.requestFileSystem(1, 0, onFSSuccess, onFSError);
}

function writeToFile(fileName, data) {
    //data = JSON.stringify(data, null, '\t');
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (e) {
                    // for real-world usage, you might consider passing a success callback
                    console.log('Write of file "' + fileName + '"" completed.');
                };

                fileWriter.onerror = function (e) {
                    // you could hook this up with our global error handler, or pass in an error callback
                    console.log('Write failed: ' + e.toString());
                };

                var blob = new Blob([data], {type: 'img/png'});
                fileWriter.write(blob);
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);

    function errorHandler(e) {
        console.log(e);
    }
}

function saveToRoll() {
    cordova.plugins.imagesaver.saveImageToGallery(nativePathToJpegImage, successCallback, errorCallback);
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

    document.addEventListener("deviceready", lularize);
    //window.setTimeout(lularize, 50);
}

window.onload = load;
