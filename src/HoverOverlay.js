var HoverOverlay = function (div, adPlayer) {
	this._parent = div;
	this._adPlayer = adPlayer;
	this._overlay = document.createElement('div');
	this._overlay.className = 'pulse-hover-overlay';
	this._parent.appendChild(this._overlay);
}

HoverOverlay.prototype = {
	show: function() {
        this._overlay.className = 'pulse-hover-overlay pulse-visible';
    },
    hide: function() {
        this._overlay.className = 'pulse-hover-overlay';
    },
}