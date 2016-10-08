/*jslint browser: true */
/*globals Aerophane */

var aero;

(function init() {
    "use strict";

    if (aero) {
        return;
    }

    aero = new Aerophane([
        {"name": "Home", "href": "/home/home.html"},
        //{"name": "Add from Camera", "js": },
        {"name": "Manage Inventory", "href": "/inventory/inventory.html"}
    ]);

}());
