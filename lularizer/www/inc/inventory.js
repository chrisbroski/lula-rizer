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

function listDir() {
    //var path = 'file://lularizer/perfect_t_.png';
    var path = cordova.file.dataDirectory;

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
                            if (entry.name.slice(entry.name.lastIndexOf('.')) === '.jpg') {
                                listItem = document.createElement('img');
                                //blob = new Blob([entry.data], {type: 'img/png'});
                                listItem.src = 'data:image/jpeg;base64,' + window.btoa(entry.data);
                                document.querySelector('section').appendChild(listItem);
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
document.addEventListener("deviceready", listDir);
