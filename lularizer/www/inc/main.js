/*jslint browser: true */
/*globals Aerophane */

var aero;

(function init() {
    "use strict";

    aero = new Aerophane([
        {"name": "Home", "href": "../home/home.html"},
        //{"name": "Add from Camera", "js": },
        {"name": "Manage Inventory", "href": "../inventory/inventory.html"},
        {"name": "Util", "href": "../util/util.html"}
    ]);

}());
