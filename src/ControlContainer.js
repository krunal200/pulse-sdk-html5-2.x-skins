var ControlContainer = function(div, adPlayer, rightAligned) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._controlContainer = document.createElement("div");
    this._positionClass = rightAligned ? "pulse-control-container-right" : "pulse-control-container-left";
    this._controlContainer.className = "pulse-control-container";
    this.hide();

    this._parent.appendChild(this._controlContainer);
};

ControlContainer.prototype = {
    show: function() {
    	this._controlContainer.className = "pulse-control-container pulse-visible " + this._positionClass;
    },
    hide: function() {
    	this._controlContainer.className = "pulse-control-container " + this._positionClass;
    },
    appendChild: function (childElement) {
    	this._controlContainer.appendChild(childElement);
    }
};