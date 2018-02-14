var ClickThroughLink = function (div, adPlayer) {
	this._domain = '';
    this._parent = div;
    this._adPlayer = adPlayer;
    this._clickThroughLink = document.createElement("a");
    this._clickThroughLink.target = '_blank';
    this._clickThroughLink.style.pointerEvents = "all";

    var icon = document.createElement('span');
    icon.className = 'pulse-click-through-link__icon';
    var link = document.createElement('span');
    link.className = 'pulse-click-through-link__link';

    this._clickThroughLink.className = "pulse-click-through-link";
    this._clickThroughLink.appendChild(icon);
    this._clickThroughLink.appendChild(link);
    this.hide();
    div.appendChild(this._clickThroughLink);
};

ClickThroughLink.prototype = {
    show: function() {
    	if(this._domain) {
    		this._clickThroughLink.className = "pulse-click-through-link pulse-visible";
    	}
    },
    hide: function() {
        this._clickThroughLink.className = "pulse-click-through-link";
    },
    setTitle: function(title, clickThroughLink) {
    	this._domain = title;
    	this._clickThroughLink.querySelector('.pulse-click-through-link__link').innerHTML = this._domain;
        this._clickThroughLink.href = clickThroughLink;
    },
};