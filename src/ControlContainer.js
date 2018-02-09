var ControlContainer = function(div, adPlayer) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._controlContainer = document.createElement("div");
    this._controlContainer.className = "pulse-control-container";
    this.hide();

    this._parent.appendChild(this._controlContainer);
};

ControlContainer.prototype = {
    show: function() {
    	this._controlContainer.className = "pulse-control-container pulse-visible";
    },
    hide: function() {
    	this._controlContainer.className = "pulse-control-container";
    },
    appendChild: function (childElement) {
    	this._controlContainer.appendChild(childElement);
    }
};