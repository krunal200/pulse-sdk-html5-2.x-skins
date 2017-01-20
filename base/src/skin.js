var SKIN_EVENTS = [
    OO.Pulse.AdPlayer.Events.LINEAR_AD_PAUSED,
    OO.Pulse.AdPlayer.Events.LINEAR_AD_PLAYING,
    OO.Pulse.AdPlayer.Events.AD_BREAK_STARTED,
    OO.Pulse.AdPlayer.Events.AD_BREAK_FINISHED,
    OO.Pulse.AdPlayer.Events.LINEAR_AD_STARTED,
    OO.Pulse.AdPlayer.Events.LINEAR_AD_FINISHED,
    OO.Pulse.AdPlayer.Events.SHOW_SKIP_BUTTON,
    OO.Pulse.AdPlayer.Events.LINEAR_AD_SKIPPED,
    OO.Pulse.AdPlayer.Events.LINEAR_AD_PROGRESS,
    OO.Pulse.AdPlayer.Events.AD_VOLUME_CHANGED,
    OO.Pulse.AdPlayer.Events.AD_AUTOPLAY_BLOCKED,
    OO.Pulse.AdPlayer.Events.PAUSE_AD_SHOWN,
    OO.Pulse.AdPlayer.Events.OVERLAY_AD_SHOWN,
    OO.Pulse.AdPlayer.Events.PAUSE_AD_PLAYER_HIDDEN
];

var onPlayerEvent = function(event, eventData) {

    switch (event) {
        case OO.Pulse.AdPlayer.Events.AD_BREAK_STARTED:
            this._adCounter.setAdBreak(eventData.adBreak);
            this._loadingSpinner.show();
            break;
        case OO.Pulse.AdPlayer.Events.AD_BREAK_FINISHED:
            this._adCounter.hide();
            this._loadingSpinner.hide();
            this._playButton.hide();
            this._pauseAdCloseButton.hide();
            this._progressBar.hide();
            this._muteButton.hide();
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_STARTED:
            this._isPlayingVPAID = false;
            var selectedMediaFile = eventData.ad.getMediaFiles()[0];
            if(selectedMediaFile.apiFramework && selectedMediaFile.apiFramework === 'VPAID') {
                this._isPlayingVPAID = true;
            }
            OO.Pulse.Utils.log('Skin: Selected media file is a ' + (this._isPlayingVPAID ? 'VPAID ad' : 'video ad'));

            this._muteButton.show();
            this._pauseAdCloseButton.hide();
            
            this._adCounter.show();
            this._adCounter.update();

            this._loadingSpinner.hide();
            this._progressBar.show();
            this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
            setTimeout(function() {
                this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
            }.bind(this), 100);

            if(!this._isPlayingVPAID) {            
                this._skipCountdown.setAd(eventData.ad);
                if(eventData.ad.isSkippable() && eventData.ad.getSkipOffset() === 0) {
                    this._skipButton.show();
                }
            }
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_FINISHED:
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_SKIPPED:
            this._loadingSpinner.show();
            if(!this._isPlayingVPAID) {            
                this._skipButton.hide();
                this._skipCountdown.hide();
            }
            this._progressBar.hide();
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_PROGRESS:
            this._progressBar.setProgress(eventData.position / eventData.duration);
            if(!this._isPlayingVPAID) {
                this._skipCountdown.update(eventData.position);
            }
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_PAUSED:
            if(!this._isPlayingVPAID) {            
                this._playButton.show();
            }
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_PLAYING:
            this._playButton.hide();
            break;
        case OO.Pulse.AdPlayer.Events.SHOW_SKIP_BUTTON:
            this._skipButton.show();
            break;
        case OO.Pulse.AdPlayer.Events.AD_VOLUME_CHANGED:
            this._muteButton.onVolumeChanged(eventData.volume);
            break;
        case OO.Pulse.AdPlayer.Events.AD_AUTOPLAY_BLOCKED:
            OO.Pulse.Utils.log('Skin: Hiding the loading screen as blocked autoplay was detected');
            this._loadingSpinner.hide();
            this._playButton.show();
            break;
        case OO.Pulse.AdPlayer.Events.PAUSE_AD_SHOWN:
            this._muteButton.hide();
            this._progressBar.hide();
            this._pauseAdCloseButton.show();
            break;
        case OO.Pulse.AdPlayer.Events.OVERLAY_AD_SHOWN:
            this._overlayCloseButton.show();
            this._pauseAdCloseButton.hide();
            this._muteButton.hide();
            this._progressBar.hide();
            break;
        case OO.Pulse.AdPlayer.Events.PAUSE_AD_PLAYER_HIDDEN:
            this._pauseAdCloseButton.hide();
            this._muteButton.hide();
            this._progressBar.hide();
            break;
        default:
            break;
    }

}.bind(this);

var addPlayerEventListeners = function(adPlayer) {
    for (var i in SKIN_EVENTS) {
        adPlayer.addEventListener(SKIN_EVENTS[i], onPlayerEvent);
    }
};

var addFullScreenListeners = function() {
    document.addEventListener("webkitfullscreenchange", function() {
        this._isFullscreen = document.webkitIsFullScreen;
        this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
    }.bind(this));

    document.addEventListener("mozfullscreenchange", function() {
        this._isFullscreen = document.mozFullScreen;
        this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
    }.bind(this));

    document.addEventListener("fullscreenchange", function() {
        this._isFullscreen = document.fullscreen;
        this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
    }.bind(this));

    document.addEventListener("msfullscreenchange", function() {
        this._isFullscreen = document.msFullscreenElement;
        this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
    }.bind(this));
}.bind(this);


function addSkinCSSToDOM(){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '@CSS';
    document.getElementsByTagName('head')[0].appendChild(style);
}

var hideAll = function(){
    this._adCounter.hide();
    this._loadingSpinner.hide();
    this._muteButton.hide();
    this._playButton.hide();
    this._overlayCloseButton.hide();
    this._progressBar.hide();
    this._skipButton.hide();
    this._skipCountdown.hide();
    this._pauseAdCloseButton.hide();
}.bind(this);

addSkinCSSToDOM();
var skinDiv = adPlayer.getSkinElement();
var overlayDiv = adPlayer.getOverlayDiv();
skinDiv.className = 'pulse-adplayer-skin';


this._isPlayingVPAID = false;
this._isFullscreen = false;
this._adPlayer = adPlayer;
this._playButton = new PlayButton(skinDiv, adPlayer, this);
this._loadingSpinner = new LoadingSpinner(skinDiv, adPlayer);
this._skipButton = new SkipButton(skinDiv, adPlayer);
this._progressBar = new ProgressBar(skinDiv, adPlayer);
this._skipCountdown = new SkipCountdown(skinDiv, adPlayer);
this._adCounter = new AdCounter(skinDiv, adPlayer);
this._muteButton = new MuteButton(skinDiv, adPlayer, false);
this._overlayCloseButton = new CloseButton(overlayDiv, adPlayer, function () {
    this._adPlayer.overlayAdClosed();
    this._overlayCloseButton.hide();
}.bind(this));

this._pauseAdCloseButton = new CloseButton(skinDiv, adPlayer, (function() {
    this._pauseAdCloseButton.hide();
    this._adPlayer.pauseAdClosed();
}).bind(this));
hideAll();

addPlayerEventListeners(adPlayer);
addFullScreenListeners();
