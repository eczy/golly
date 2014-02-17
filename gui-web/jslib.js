// The following JavaScript routines can be called from C++ code (eg. webcalls.cpp).
// Makefile merges these routines into golly.js via the --js-library option.

mergeInto(LibraryManager.library, {

// -----------------------------------------------------------------------------

jsAlert: function(msg) {
    alert(Pointer_stringify(msg));
},

// -----------------------------------------------------------------------------

jsConfirm: function(query) {
    return confirm(Pointer_stringify(query));
},

// -----------------------------------------------------------------------------

jsSetStatusBarColor: function(color) {
    document.getElementById('statusbar').style.backgroundColor = Pointer_stringify(color);
},

// -----------------------------------------------------------------------------

jsSetMode: function(index) {
    document.getElementById('mode').selectedIndex = index;
},

// -----------------------------------------------------------------------------

jsSetState: function(state, numstates) {
    var list = document.getElementById('state');
    // may need to update number of options in list
    while (list.length < numstates) {
        // append another option
        var option = document.createElement('option');
        option.text = list.length.toString();
        list.add(option);
    };
    while (list.length > numstates) {
        // remove last option
        list.remove(list.length - 1);
    }
    list.selectedIndex = state;
},

// -----------------------------------------------------------------------------

jsSetRule: function(oldrule) {
    var newrule = prompt('Type in a new rule:', Pointer_stringify(oldrule));
    if (newrule == null) {
        return allocate(intArrayFromString('\0'), 'i8', ALLOC_STACK);
    } else {
        return allocate(intArrayFromString(newrule), 'i8', ALLOC_STACK);
    }
},

// -----------------------------------------------------------------------------

jsShowMenu: function(id, x, y) {
    var menu = document.getElementById(Pointer_stringify(id));
    var mrect = menu.getBoundingClientRect();
    // x,y coords are relative to canvas, so convert to window coords
    var crect = Module['canvas'].getBoundingClientRect();
    // note that scriolling is disabled so window.scrollX and window.scrollY are 0
    x += crect.left + 1;
    y += crect.top + 1;
    // if menu would be outside right/bottom window edge then move it
    if (x + mrect.width > window.innerWidth) x -= mrect.width + 2;
    if (y + mrect.height > window.innerHeight) y -= y + mrect.height - window.innerHeight;
    menu.style.top = y.toString() + 'px';
    menu.style.left = x.toString() + 'px';
    menu.style.visibility = 'visible';
},

// -----------------------------------------------------------------------------

jsSetClipboard: function(text) {
    document.getElementById('cliptext').value = Pointer_stringify(text);
},

// -----------------------------------------------------------------------------

jsGetClipboard: function() {
    var text = document.getElementById('cliptext').value;
    if (text == null) {
        return allocate(intArrayFromString('\0'), 'i8', ALLOC_STACK);
    } else {
        return allocate(intArrayFromString(text), 'i8', ALLOC_STACK);
    }
},

// -----------------------------------------------------------------------------

jsTextAreaIsActive: function() {
    if (document.activeElement.tagName == 'TEXTAREA') {
        return 1;
    } else {
        return 0;
    }
},

// -----------------------------------------------------------------------------

jsElementIsVisible: function(id) {
    if (document.getElementById(Pointer_stringify(id)).style.visibility == 'visible') {
        return 1;
    } else {
        return 0;
    }
},

// -----------------------------------------------------------------------------

jsEnableButton: function(id, enable) {
    var button = document.getElementById(Pointer_stringify(id));
    if (enable) {
        button.disabled = false;
        button.style.color = '#000';
    } else {
        button.disabled = true;
        button.style.color = '#888';
    }
},

// -----------------------------------------------------------------------------

jsEnableImgButton: function(id, enable) {
    var button = document.getElementById(Pointer_stringify(id));
    var img = document.getElementById('img' + Pointer_stringify(id));
    if (enable) {
        button.disabled = false;
        img.style.opacity = 1.0;
        // following is needed on IE???!!!
        // img.style.filter = 'alpha(opacity:100)';
    } else {
        button.disabled = true;
        img.style.opacity = 0.25;
        // following is needed on IE???!!!
        // img.style.filter = 'alpha(opacity:25)';
    }
},

// -----------------------------------------------------------------------------

jsTickMenuItem: function(id, tick) {
    var menuitem = document.getElementById(Pointer_stringify(id));
    if (tick) {
        menuitem.style.backgroundImage = 'url(images/item_tick.png)';
    } else {
        menuitem.style.backgroundImage = 'url(images/item_blank.png)';
    }
},

// -----------------------------------------------------------------------------

jsSetInnerHTML: function(id, text) {
    document.getElementById(Pointer_stringify(id)).innerHTML = Pointer_stringify(text);
},

// -----------------------------------------------------------------------------

jsMoveToAnchor: function(anchor) {
    window.location.hash = Pointer_stringify(anchor);
},


// -----------------------------------------------------------------------------

});
