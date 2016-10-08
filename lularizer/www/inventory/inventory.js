/*jslint browser: true */
/*globals aero */

function getInv() {
    "use strict";

    function fileSystemSuccess(fileSystem) {
        //var download_link = encodeURI(URL);
        //ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

        var directoryEntry = fileSystem.root; // to get root path of directory
        directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
        var rootdir = fileSystem.root;
        var fp = rootdir.fullPath; // Returns Fulpath of local directory

        fp = fp + "/lularize/" + File_Name; // fullpath and name of the file which we want to give
        // download function call
        //filetransfer(download_link, fp);
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
        alert(evt.target.error.code);
    }

    //step to request a file system
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
}

function displayImage(blob) {

    // Displays image if result is a valid DOM string for an image.
    var elem = document.getElementById('imageFile');
    // Note: Use window.URL.revokeObjectURL when finished with image.
    elem.src = window.URL.createObjectURL(blob);
}

function readBinaryFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {

            console.log("Successful file write: " + this.result);
            //displayFileData(fileEntry.fullPath + ": " + this.result);

            var blob = new Blob([new Uint8Array(this.result)], { type: "image/png" });
            //displayImage(blob);
            //document.getElementById('imageFile').src = URL.createObjectURL(blob);
            var img = document.createElement('img');
            img.src = URL.createObjectURL(blob);
            document.getElementById('test').appendChild(img);
            //blob:file%3A///8bd9eec2-7a13-44a5-8fc5-fee0afe2e47e
        };

        reader.readAsArrayBuffer(file);

    }, function (err) {console.log(err);});
}

function listDir() {
    //var path = 'file://lularizer/perfect_t_.png';
    var path = cordova.file.dataDirectory,
        testSection;

    window.resolveLocalFileSystemURL(path,
        function (fileSystem) {
            var reader = fileSystem.createReader();
            reader.readEntries(
                function (entries) {
                    console.log(entries);
                    entries.forEach(function (entry) {
                        var listItem, blob;
                        if (entry.isFile) {
                            console.log(entry);
                            if (entry.name.slice(entry.name.lastIndexOf('.')) === '.png') {
                                readBinaryFile(entry);
                                listItem = document.createElement('img');

                                //console.log(new Blob([entry.data], {type: 'img/jpg'}));
                                //blob = new Blob([new Uint8Array(this.result)], { type: "image/jpg" });
                                console.log(entry.toURL());
                                //listItem.src = entry.toURL();//'data:image/jpeg;base64,' + window.btoa(entry.data);
                                listItem.src = entry.toURL();
                                document.querySelector('#lib').appendChild(listItem);
                            }
                        }
                    });
                },
                function (err) {
                    console.log(err);
                }
            );
        }, function (err) {
            console.log(err);
        }
    );
}

function listLLR() {
    var invString = localStorage.getItem('inventory'), invObj, style;
    console.log(invString);

    if (!invString) {
        invObj = {};
    } else {
        invObj = JSON.parse(invString);
    }

    for (style in invObj) {
        if (invObj.hasOwnProperty(style)) {
            console.log(style);
            invObj[style].forEach(function (filePath) {
                var listItem;
                console.log(filePath);
                listItem = document.createElement('img');
                listItem.src = filePath;
                document.querySelector('#lib').appendChild(listItem);
            });
        }
    }
}

function readFromFile(fileName, cb) {
    var pathToFile = cordova.file.dataDirectory + fileName;
    window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
        fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function (e) {
                cb(JSON.parse(this.result));
            };

            reader.readAsText(file);
        }, errorHandler);
    }, errorHandler);

    function errorHandler(er) {
        console.log(er);
    }
}

function getFileTest() {
    readFromFile('example.json', function (data) {
        //fileData = data;
        console.log(data);
    });
}
//example: list of www/audio/ folder in cordova/ionic app.
//listDir(cordova.file.applicationDirectory + "www/audio/");
aero.setPageDeviceReady(listLLR);
