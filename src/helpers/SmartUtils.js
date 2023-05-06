class SmartUtils {
    constructor() { }

    _try(func, fallbackValue) {
        try {
            var value = func();
            return (value === null || value === undefined) ? fallbackValue : value;
        } catch (e) {
            return fallbackValue;
        }
    }

    _tryKey(func, key, fallbackValue) {
        try {
            var value = func();
            return (value === null || value === undefined || key === null || key === undefined) ? fallbackValue : key in value ? value[key] : fallbackValue;
        } catch (e) {
            return fallbackValue;
        }
    }

    _capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

    _formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    _checkOS = async (n) => {
        if (n.userAgentData) {
            const hints = ["architecture", "model", "platform", "platformVersion", "uaFullVersion"];
            const data = await n.userAgentData.getHighEntropyValues(hints)
            // console.log(data)
            return data
        } else {
            const isSafari = n.vendor && n.vendor.indexOf('Apple') > -1 &&
                n.userAgent &&
                n.userAgent.indexOf('CriOS') == -1 &&
                n.userAgent.indexOf('FxiOS') == -1;
            if (isSafari) {
                return {
                    platform: 'macOS'
                }
            }

            console.log(n.userAgent);
            return "n.userAgentData is not supported!";
        }
    }

    _platformKeys = (platform) => {
        const isMac = platform === "macOS"
        const CTRL_COMMAND = isMac ? "⌘" : "Ctrl+"
        return {
            ctrl: {
                name: CTRL_COMMAND,
                plus: isMac ? '' : '+'
            }
        }
    }

    /**
    * Produces a CSS string with edge. Use it to create padding, margin, border etc
    *
    * @param   inset  Must be a number. Considered as px
    * @param   key  Example: trbl, tbl, bl, l (where t: top-left, r: top-right, b: bottom-left, l: bottom-right)
    * @returns string.
    */
    static edgeInsets = (inset, key = "") => {
        return new SmartUtils()._createPadding(inset, key)
    }

    _createPadding = (padding, key = "") => {
        const keys = ['t', 'r', 'b', 'l']
        const keysReq = key.split('')

        if (keysReq.length === 0) {
            return [`${padding}px`, `${padding}px`, `${padding}px`, `${padding}px`].join(' ');
        }

        let paddings = [`${0}px`, `${0}px`, `${0}px`, `${0}px`];
        // console.log(keysReq)
        for (let i = 0; i < keysReq.length; i++) {
            const index = keys.indexOf(keysReq[i]);
            paddings[index] = `${padding}px`
        }

        return paddings.join(' ')
    }

    static checkInRange(lower, upper, value) {
        return lower <= value && upper > value
    }

    static scoreText(score = 0, captitalize = false, debug = false) {
        const scores = [[0, 15], [15, 30], [30, 55], [55, 75], [75, 100]]
        const scoresMap = { 0: "worse", 1: "bad", 2: 'fair', 3: 'good', 4: 'excellent' }

        const selectedScore = scores.filter((eachScores) => (eachScores[0] <= score && eachScores[1] >= score))[0]
        if (debug) { console.log(selectedScore, score) }
        return captitalize ? new SmartUtils()._capitalize(scoresMap[scores.indexOf(selectedScore)]) : scoresMap[scores.indexOf(selectedScore)]
    }
}

export default SmartUtils;