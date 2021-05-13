export default (secs) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: true,
    };
    const t = new Date(0); // Epoch
    t.setMilliseconds(secs);
    return t.toLocaleString("en-UK", options);
};
