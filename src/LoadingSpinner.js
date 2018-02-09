var LoadingSpinner = function(div, adPlayer) {
    this._parent = div;
    this._adPlayer = adPlayer;
    this._backgroundDiv = document.createElement("div");
    this._backgroundDiv.className = 'vjs-hotstar-spinner';
    this._backgroundDiv.innerHTML = '' +
          '<div>' +
            '<div class="vjs-hotstar-spinner-container">' +
              '<div class="vjs-hotstar-spinner-rotator">' +
                '<div class="vjs-hotstar-spinner-left">' +
                  '<div class="vjs-hotstar-spinner-circle"></div>' +
                '</div>' +
                '<div class="vjs-hotstar-spinner-right">' +
                  '<div class="vjs-hotstar-spinner-circle"></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
    this.hide();

    this._parent.appendChild(this._backgroundDiv);
};

LoadingSpinner.prototype = {
    show: function () {
        this._backgroundDiv.style.display = "block";
        this._backgroundDiv.style.zIndex = "10000";
        this._backgroundDiv.style.pointerEvents = "all";
    },
    hide: function () {
        this._backgroundDiv.style.display = "none";
        this._backgroundDiv.style.zIndex = "-1";
        this._backgroundDiv.style.pointerEvents = "none";
    }
};