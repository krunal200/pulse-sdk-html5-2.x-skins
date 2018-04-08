var SKIN_STRINGS = {
    SKIP_AD: getConfigValue(config, 'SKIP_AD', 'Skip ad'),

    SKIP_COUNTDOWN_SINGULAR: getConfigValue(config, 'SKIP_COUNTDOWN_SINGULAR', 'You can skip this ad in [countdown] second'),
    SKIP_COUNTDOWN_DUAL: getConfigValue(config, 'SKIP_COUNTDOWN_DUAL', 'You can skip this ad in [countdown] seconds'),
    SKIP_COUNTDOWN_PLURAL: getConfigValue(config, 'SKIP_COUNTDOWN_PLURAL', 'You can skip this ad in [countdown] seconds'),

    AD_COUNTER: getConfigValue(config, 'AD_COUNTER', 'Ad [position] of [total]'),

    VIDEO_START_COUNTDOWN_PREROLL: getConfigValue(config, 'VIDEO_START_COUNTDOWN_PREROLL', 'Video starts [countdown]'),
    VIDEO_START_COUNTDOWN_MIDROLL: getConfigValue(config, 'VIDEO_START_COUNTDOWN_MIDROLL', 'Video resumes [countdown]'),
};

var ENUM = {
	AD_BREAK_MODE: {
		AGGREGATED_MODE: 0,
		INDIVIDUAL_NODE: 1
	}
}