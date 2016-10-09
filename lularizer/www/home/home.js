/*jslint browser: true */
/*globals aero */

/*function cameraInit() {
    "use strict";
    //console.log('init');

    function cameraPicture(pic) {
        //console.log(pic);
        //localStorage.setItem('photo', pic);
        //window.location = 'edit.html';
        console.log('took pic');
    }

    function cameraFail(err) {
        console.log(err);
    }

    function onDeviceReady() {
        navigator.camera.getPicture(cameraPicture, cameraFail, {
            correctOrientation: true,
            //saveToPhotoAlbum: true
            DestinationType: 0
        });
    }

    aero.setPageDeviceReady(onDeviceReady);
    //window.onload = onDeviceReady;
}

cameraInit();*/
(function init() {
    "use strict";

    function cameraPicture(pic) {
        //console.log(pic);
        localStorage.setItem('photo', pic);
        window.location = '../edit/edit.html';
        //console.log('took pic');
    }

    function cameraFail(err) {
        window.console.log(err);
    }

    function onDeviceReady() {
        var takePhotoButton = document.getElementById('takePhoto');
        takePhotoButton.disabled = false;
        takePhotoButton.onclick = function () {
            navigator.camera.getPicture(cameraPicture, cameraFail, {
                correctOrientation: true,
                //saveToPhotoAlbum: true
                DestinationType: 0
            });
        };
    }

    aero.setPageDeviceReady(onDeviceReady);
}());
