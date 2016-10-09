/*jslint browser: true */
/*globals aero */

var dataJSON;

function listLLR(data) {
    console.log('listLLR');
    var style, article = document.querySelector('article'), section, title, img;

    for (style in data) {
        if (data.hasOwnProperty(style)) {
            section = document.createElement('section');
            title = document.createElement('h3');
            title.textContent = style;
            section.appendChild(title);

            data[style].forEach(function (pic) {
                img = document.createElement('img');
                img.src = pic.file;
                section.appendChild(img);
            });

            article.appendChild(section);
        }
    }
}

function getJsonData(callback) {
    dataJSON.file(function(file) {
        console.log('getting file');
        var reader = new FileReader();

        reader.onloadend = function(e) {
            console.log(this.result);
            callback(JSON.parse(this.result));
            //document.getElementById('imageFile').src = jsonData.lucy[0].file;
        };

        reader.readAsText(file);
    });
}

function getDataFile() {
    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
        console.log("got main dir");
        dir.getFile("data.json", {create: true}, function (file) {
            console.log('got data file');
            dataJSON = file;
            getJsonData(listLLR);
        });
    });
}

aero.setPageDeviceReady(getDataFile);
