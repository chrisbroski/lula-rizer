/*jslint browser: true, devel: true */
/*global camera */
(function init() {
    "use strict";

    function cameraPicture(pic) {
        //console.log(pic);
        localStorage.setItem('photo', pic);
        window.location = 'edit.html';
    }

    function cameraFail(err) {
        console.log(err);
    }

    function onDeviceReady() {
        navigator.camera.getPicture(cameraPicture, cameraFail, {correctOrientation: true});
    }

    document.addEventListener("deviceready", onDeviceReady);
}());
