export const customLog = (content: string, color: string, type: "log" | "warn" | "error") => console[type]("%cTrackwalker%c", `color: ${color}; font-weight: 600;`, "", content);

export const log = (content: string) => customLog(content, "#4E878C", "log");
export const warn = (content: string) => customLog(content, "#FFE347", "warn");
export const error = (content: string) => customLog(content, "#66101F", "error");