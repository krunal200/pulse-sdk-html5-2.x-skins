var LoadingSpinner = function(div, adPlayer) {
    this._parent = div;
    this._adPlayer =adPlayer;
    this._backgroundDiv = document.createElement("div");
    this._backgroundDiv.className = "pulse-loading-background";
    this._loadingSpinner = document.createElement("div");
    this._loadingSpinner.className = "pulse-loading-spinner";

    this._backgroundDiv.appendChild(this._loadingSpinner);
    this._parent.appendChild(this._backgroundDiv);
};

LoadingSpinner.prototype = {
    show: function () {
        this._backgroundDiv.style.display = "block";
        this._loadingSpinner.style.display = "block";
        this._loadingSpinner.style.zIndex = "10000";
        this._backgroundDiv.style.zIndex = "10000";
        this._backgroundDiv.style.pointerEvents = "all";
    },
    hide: function () {
        this._backgroundDiv.style.display = "none";
        this._loadingSpinner.style.display = "none";
        this._loadingSpinner.style.zIndex = "-1";
        this._backgroundDiv.style.zIndex = "-1";
        this._backgroundDiv.style.pointerEvents = "none";
    }
};