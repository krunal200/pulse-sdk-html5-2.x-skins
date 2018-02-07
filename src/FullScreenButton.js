var FullScreenButton = function (div, adPlayer) {
	this._activeClasses = 'pulse-fullscreen pulse-fullscreen-active';
	this._inactiveClasses = 'pulse-fullscreen .pulse-fullscreen-inactive';
	this._parent = div;
    this._adPlayer = adPlayer;
    this._fullscreen = document.createElement("div");
    this._fullscreen.className = "pulse-fullscreen";
    this.hide();

    this._parent.appendChild(this._fullscreen);

    this._onClick = function() {
    	if(adPlayer._isFullScreen) {
    		exitFullscreenImpl();
    	} else {
    		requestFullScreenImpl();
    	}
    }.bind(this);
};

FullScreenButton.prototype = {
    show: function() {
    	this._fullscreen.style.display = "inline-block";
        this._fullscreen.addEventListener("click", this._onClick);
        if(this._adPlayer._isFullScreen) {
    		this.setActive();
    	} else {
    		this.setInactive();
    	}
    },
    hide: function() {
    	this._fullscreen.style.display = "none";
        this._fullscreen.className = "pulse-control-container__child pulse-fullscreen";
        this._fullscreen.removeEventListener("click", this._onClick);
    },
    setActive: function () {
    	this._fullscreen.className = "pulse-control-container__child pulse-fullscreen pulse-fullscreen-active";
    },
    setInactive: function() {
    	this._fullscreen.className = "pulse-control-container__child pulse-fullscreen pulse-fullscreen-inactive";
    },
};