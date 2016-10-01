/*jslint browser: true */

var aero;

function Utilities() {
    "use strict";

    function getEventTarget(e) {
        var targ;
        targ = e.target || e.srcElement;
        if (targ.nodeType === 3) { // defeat Safari bug
            targ = targ.parentNode;
        }
        return targ;
    }
    this.getEventTarget = getEventTarget;

    function touchclick(el, func, bubble) {
        bubble = !!bubble;
        if ("ontouchstart" in window || "onmsgesturechange" in window) {
            el.addEventListener("touchstart", func, bubble);
        } else {
            el.addEventListener("click", func, bubble);
        }
    }
    this.touchclick = touchclick;

    function buildNav(navItems) {
        var navMatte, navNav, navH2, navP, navA;

        navMatte = document.createElement("div");
        navMatte.id = "matte";
        document.body.appendChild(navMatte);

        navNav = document.createElement("nav");
        navH2 = document.createElement("h2");
        navH2.textContent = "Lularizer";
        navNav.appendChild(navH2);

        navItems.forEach(function (item) {
            navP = document.createElement("p");
            navA = document.createElement("a");
            navA.textContent = item.name;
            navA.href = item.href;
            navP.appendChild(navA);
            navNav.appendChild(navP);
        });

        document.body.appendChild(navNav);

        touchclick(document.getElementById("matte"), function () {
            document.querySelector("nav").style.width = "0";
            document.getElementById("matte").style.display = "none";
        });

        touchclick(document.querySelector("header button:first-child"), function () {
            document.querySelector("nav").style.width = "240px";
            document.getElementById("matte").style.display = "block";
        });
    }
    this.buildNav = buildNav;

    function scriptifyLinks() {
        var allLinks = document.querySelector("a");
        [].forEach.call(allLinks, function (el) {
            touchclick(el, function (e) {
                var targ;
                e.preventDefault();
                targ = getEventTarget(e);
                window.location = targ.href;
            });
        });
    }
    this.scriptifyLinks = scriptifyLinks;
}

(function init() {
    "use strict";

    aero = new Utilities();

    /*function onDeviceReady() {
        // After this event, it is safe to call any Cordova plugin
    }*/

    aero.buildNav([
        {"name": "Home", "href": "index.html"},
        {"name": "Add From Camera", "href": "camera.html"},
        //{"name": "Add From Camera", "href": "edit.html"},
        {"name": "Add From Inventory", "href": "collection.html"},
        {"name": "Manage Inventory", "href": "inventory.html"}
    ]);

    aero.scriptifyLinks();

    // document.addEventListener("deviceready", onDeviceReady);

    // Make links use JavaScript to keep iOS web apps from breaking out of the app window
}());
