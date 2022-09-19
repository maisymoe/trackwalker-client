const log = (content: string, color: string, type: "log" | "warn" | "error") => {
    console[type]("%cTrackwalker%c", `color: ${color}; font-weight: 600;`, "", content);
};

export default {
    // TODO: Better colours?
    log: (content: string) => log(content, "#4E878C", "log"),
    warn: (content: string) => log(content, "#FFE347", "warn"),
    error: (content: string) => log(content, "#66101F", "error"),
};