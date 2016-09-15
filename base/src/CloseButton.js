var CloseButton = function(div, adPlayer, onclick) {
    this._parent = div;
    this._adPlayer = adPlayer;

    // container
    this._container = document.createElement('div');
    this._container.className = 'pulse-skin-button-container-top';

    // aspect ratio-maintaining dummy
    this._dummy = document.createElement('div');
    this._dummy.className = 'pulse-skin-button-ar';

    // actual button
    this._onclick = onclick;
    this._button = document.createElement('div');
    this._button.className = 'pulse-skin-button pulse-close-button';
    this.hide();
  
    this._container.appendChild(this._dummy);
    this._container.appendChild(this._button);
    div.appendChild(this._container);
};

CloseButton.prototype = {
    show: function() {
        this._button.style.display = 'block';
        this._button.addEventListener('click', this._onclick);
    },

    hide: function() {
        this._button.style.display = 'none';
        this._button.removeEventListener('click', this._onclick);
    }
};