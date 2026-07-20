// GA4 wrapper. The measurement ID comes from REACT_APP_GA_MEASUREMENT_ID
// (set in Vercel project env vars); without it, or outside production
// builds, every call is a no-op so local dev never pollutes the data.

const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const enabled = Boolean(GA_ID) && process.env.NODE_ENV === "production";

export const initAnalytics = () => {
    if (!enabled || window.gtag) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    // send_page_view off: the router fires page_view per route instead,
    // so SPA navigation isn't undercounted.
    window.gtag("config", GA_ID, { send_page_view: false });
};

export const trackPageView = (path) => {
    if (!enabled) return;
    window.gtag("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
    });
};

export const trackEvent = (name, params = {}) => {
    if (!enabled) return;
    window.gtag("event", name, params);
};
