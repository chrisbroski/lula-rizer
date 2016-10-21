/*jslint browser: true */
/*globals aero, cordova */

(function init() {
    "use strict";

    var dataJSON;

    function clearData() {
        dataJSON.createWriter(function (fileWriter) {
            fileWriter.write("{}");
            console.log("Cleared data");
        });
    }

    function getJsonData() {
        dataJSON.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                document.querySelector('pre').textContent = JSON.stringify(JSON.parse(this.result), null, "    ");
            };

            reader.readAsText(file);
        });
    }

    function onDeviceReady() {
        var clearDataButton = document.getElementById('clearData');

        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
            dir.getFile("data.json", {create: true}, function (file) {
                dataJSON = file;
                getJsonData();
            });
        });

        clearDataButton.disabled = false;
        clearDataButton.onclick = clearData;
    }

    aero.setPageDeviceReady(onDeviceReady);
}());
