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
    OO.Pulse.AdPlayer.Events.PAUSE_AD_PLAYER_HIDDEN,
    OO.Pulse.AdPlayer.Events.AD_CLICKED
];
var AD_BREAK_MODE = undefined;
var onPlayerEvent = function(event, eventData) {
    switch (event) {
        case OO.Pulse.AdPlayer.Events.AD_BREAK_STARTED:
            var AD_BREAK_MODE = undefined;
            this.setControls([ 'loadingSpinner']);
            currentAdBreak = eventData.adBreak
            getAgregatedAdTime(currentAdBreak);
            this._controls.adCounter.setAdBreak(eventData.adBreak);
            this._controls.videoStartCountdown.setAdType(eventData.adBreak.getBreakPosition());
            this._controls.videoStartCountdown.setMode(AD_BREAK_MODE);
            this._controls.progressBar.setMode(AD_BREAK_MODE);
            this._adPlayer.setVolume(getPlayerVolume());
            this._controls.muteButton.setMuteState(getPlayerMuteState());
            break;
        case OO.Pulse.AdPlayer.Events.AD_BREAK_FINISHED:
            this.setControls();
            this._controls.videoStartCountdown.clearText();
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_STARTED:
            if(currentAdBreak) {
                var agregatedAdTime = getAgregatedAdTime(currentAdBreak);
                if(typeof agregatedAdTime === 'number' && (agregatedAdTime === agregatedAdTime)) {
                    AD_BREAK_MODE = ENUM.AD_BREAK_MODE.AGGREGATED_MODE;
                    this._controls.videoStartCountdown.setAggregatedTime(agregatedAdTime);
                    this._controls.progressBar.setAggregatedTime(agregatedAdTime);
                } else {
                    AD_BREAK_MODE = ENUM.AD_BREAK_MODE.INDIVIDUAL_NODE;
                }
                this._controls.videoStartCountdown.setMode(AD_BREAK_MODE);
                this._controls.progressBar.setMode(AD_BREAK_MODE);
                currentAdBreak = false;
            }
            var extensionNode = getExtensionNode(eventData.ad);
            var videoAdTitile = getVideoAdTitle(extensionNode) || 'Visit Advertiser';
            var clickThroughLink = eventData.ad.getClickthroughURL();
            var currentAdDuration = getCreativeDuration(eventData.ad.getCoreAd());
            var linearAdStartedControls = [
                'muteButton', 'adCounter', 'progressBar', 'progressBarOverlay', 'videoStartCountdown', 'hoverOverlay', 'pauseButton', 'clickThroughLink', 'controlContainer', 'fullScreenButton'
            ];

            this._isPlayingVPAID = false;
            var selectedMediaFile = eventData.ad.getMediaFiles()[0];
            if(selectedMediaFile.apiFramework && selectedMediaFile.apiFramework === 'VPAID') {
                this._isPlayingVPAID = true;
            }
            OO.Pulse.Utils.log('Skin: Selected media file is a ' + (this._isPlayingVPAID ? 'VPAID ad' : 'video ad'));


            this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
            setTimeout(function() {
                this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, this._isFullscreen);
            }.bind(this), 100);

            if(!this._isPlayingVPAID) {            
                this._controls.skipCountdown.setAd(eventData.ad);
                if(eventData.ad.isSkippable() && eventData.ad.getSkipOffset() === 0) {
                    linearAdStartedControls.push('skipButton');
                }
            }

            this._controls.clickThroughLink.setTitle(videoAdTitile, clickThroughLink);
            this._controls.adCounter.update();
            this._controls.videoStartCountdown.setCurrentAdDuration(currentAdDuration);
            this._controls.progressBar.setCurrentAdDuration(currentAdDuration);
            this.setControls(linearAdStartedControls);
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_FINISHED:
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_SKIPPED:
            this.setControls([ 'loadingSpinner', 'videoStartCountdown', 'progressBar']);
            this._controls.skipCountdown.setAd(null);
            this._controls.videoStartCountdown.reduceAggregatedTime();
            this._controls.progressBar.addAggregatedTime();
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_PROGRESS:
            this._controls.progressBar.setProgress(eventData.duration, eventData.position);
            this._controls.videoStartCountdown.updateTime(eventData.position);
            if(!this._isPlayingVPAID) {
                this._controls.skipCountdown.update(eventData.position);
            }
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_PAUSED:
            if(!this._isPlayingVPAID) {            
                this.setControls([ 'muteButton', 'adCounter', 'progressBar', 'progressBarOverlay', 'playButton', 'hoverOverlay', 'videoStartCountdown', 'clickThroughLink', 'controlContainer', 'fullScreenButton' ]);
            } else {
                this.setControls([ 'muteButton', 'adCounter', 'progressBar', 'progressBarOverlay', 'hoverOverlay', 'videoStartCountdown', 'playButton', 'clickThroughLink', 'controlContainer', 'fullScreenButton' ]);
            }
            break;
        case OO.Pulse.AdPlayer.Events.LINEAR_AD_PLAYING:
            this.setControls([ 'muteButton', 'adCounter', 'progressBar', 'progressBarOverlay', 'hoverOverlay', 'pauseButton', 'videoStartCountdown', 'clickThroughLink', 'controlContainer', 'fullScreenButton' ]);
            break;
        case OO.Pulse.AdPlayer.Events.SHOW_SKIP_BUTTON:
            if(this._isPlayingVPAID) {
                this.setControls([ 'muteButton', 'adCounter', 'progressBar', 'progressBarOverlay', 'hoverOverlay', 'videoStartCountdown', 'pauseButton', 'clickThroughLink', 'controlContainer', 'fullScreenButton' ]);
            } else {
                this.setControls([ 'muteButton', 'adCounter', 'progressBar', 'progressBarOverlay', 'skipButton', 'hoverOverlay', 'videoStartCountdown', 'pauseButton', 'clickThroughLink', 'controlContainer', 'fullScreenButton' ]);
            }
            break;
        case OO.Pulse.AdPlayer.Events.AD_VOLUME_CHANGED:
            this._controls.muteButton.onVolumeChanged(eventData.volume);
            break;
        case OO.Pulse.AdPlayer.Events.AD_AUTOPLAY_BLOCKED:
            this.setControls([ 'playButton' ]);
            OO.Pulse.Utils.log('Skin: Hiding the loading screen as blocked autoplay was detected');
            break;
        case OO.Pulse.AdPlayer.Events.PAUSE_AD_SHOWN:
            this.setControls([ 'pauseAdCloseButton' ]);
            break;
        case OO.Pulse.AdPlayer.Events.OVERLAY_AD_SHOWN:
            this.setControls([ 'overlayCloseButton' ]);
            break;
        case OO.Pulse.AdPlayer.Events.PAUSE_AD_PLAYER_HIDDEN:
            this.setControls();
            break;
        case OO.Pulse.AdPlayer.Events.AD_CLICKED:
            this._adPlayer.pause();
            break;
        default:
            break;
    }

}.bind(this);

this.setControls = function(enabledControls) {
    // Hide everything
    for(var control in this._controls) {
        this._controls[control].hide();
    }

    // Show selected controls
    if(enabledControls) {    
        for(var i = 0; i < enabledControls.length; ++i) {
            var control = enabledControls[i];

            if(this._controls[control] && components[control]) {
                this._controls[control].show();
            }
        }
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
        this.fullScreenChangeHandler(this._isFullscreen);
    }.bind(this));

    document.addEventListener("mozfullscreenchange", function() {
        this._isFullscreen = document.mozFullScreen;
        this.fullScreenChangeHandler(this._isFullscreen);
    }.bind(this));

    document.addEventListener("fullscreenchange", function() {
        this._isFullscreen = document.fullscreen;
        this.fullScreenChangeHandler(this._isFullscreen);
    }.bind(this));

    document.addEventListener("msfullscreenchange", function() {
        this._isFullscreen = document.msFullscreenElement;
        this.fullScreenChangeHandler(this._isFullscreen);
    }.bind(this));
}.bind(this);


function addSkinCSSToDOM(){
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '@CSS';
    document.getElementsByTagName('head')[0].appendChild(style);
}

addSkinCSSToDOM();
var skinDiv = adPlayer.getSkinElement();
var overlayDiv = adPlayer.getOverlayDiv();
var container = adPlayer.getContainer();
[].slice.call(container.children)
    .some(function(child) {
        if(child.id.indexOf('pulseAdPlayerVideo') === 0) {
            child.style.cursor = 'pointer';
            return true;
        }
    })
skinDiv.className = 'pulse-adplayer-skin';

this._isPlayingVPAID = false;
this._isFullscreen = false;
this._adPlayer = adPlayer;

this.fullScreenChangeHandler = function (isFullScreen) {
    this._adPlayer.resize(OO.Pulse.AdPlayer.Settings.SCALING.AUTO, OO.Pulse.AdPlayer.Settings.SCALING.AUTO, isFullScreen);
    if(isFullScreen) {
        this._controls.fullScreenButton.setActive();
        try {
            if(isMobileOrTablet()) {
                window.screen.orientation.lock('landscape')
            }
        } catch (e) {}
    } else {
        this._controls.fullScreenButton.setInactive();
        try {
            if(isMobileOrTablet()) {
                window.screen.orientation.unlock();
            }
        } catch (e) {}
    }
}.bind(this);

var controlContainer = new ControlContainer(skinDiv, adPlayer);

this._controls = {
    playButton:                             new PlayButton(skinDiv, adPlayer, this),
    loadingSpinner:                         new LoadingSpinner(skinDiv, adPlayer),
    skipButton:                             new SkipButton(skinDiv, adPlayer),
    progressBar:                            new ProgressBar(skinDiv, adPlayer),
    skipCountdown:                          new SkipCountdown(skinDiv, adPlayer),
    adCounter:                              new AdCounter(skinDiv, adPlayer),
    muteButton:                             new MuteButton(controlContainer, adPlayer, false),
    overlayCloseButton:                     new CloseButton(overlayDiv, adPlayer, (function() {
                                                                                        this._adPlayer.overlayAdClosed();
                                                                                        this._controls.overlayCloseButton.hide();
                                                                                  }).bind(this)),

    pauseAdCloseButton:                     new CloseButton(skinDiv, adPlayer, (function() {
                                                                                    this._controls.pauseAdCloseButton.hide();
                                                                                    this._adPlayer.pauseAdClosed();
                                                                                }).bind(this)),
    hoverOverlay:                           new HoverOverlay(skinDiv, adPlayer),
    pauseButton:                            new PauseButton(skinDiv, adPlayer), 
    videoStartCountdown:                    new VideoStartCountdown(skinDiv, adPlayer),
    clickThroughLink:                       new ClickThroughLink(skinDiv, adPlayer),
    controlContainer:                       controlContainer,
    fullScreenButton:                       new FullScreenButton(controlContainer, adPlayer),
    progressBarOverlay:                     new ProgressBarOverlay(skinDiv, adPlayer),
};

addPlayerEventListeners(adPlayer);
addFullScreenListeners();
