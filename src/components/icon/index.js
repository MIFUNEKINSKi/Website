import React from 'react';

/**
 * Stroke-only icon set. No FontAwesome.
 * Usage: <Icon name="github" size={16} />
 */
const Icon = ({ name, size = 16, stroke = 1.5 }) => {
    const c = {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: stroke,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    };
    switch (name) {
        case "home":     return <svg {...c}><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>;
        case "user":     return <svg {...c}><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>;
        case "list":     return <svg {...c}><path d="M4 6h16M4 12h16M4 18h10"/></svg>;
        case "mail":     return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="0"/><path d="M3 7l9 6 9-6"/></svg>;
        case "github":   return <svg {...c}><path d="M9 19c-4 1-4-2-6-2"/><path d="M15 22v-3.5c0-1 .1-1.5-.5-2 3-.3 6-1.4 6-6.5 0-1.4-.5-2.5-1.3-3.4.1-.3.6-1.5-.1-3.1 0 0-1-.3-3.5 1.2a12 12 0 00-6.4 0C6.7 2.7 5.7 3 5.7 3c-.7 1.6-.2 2.8-.1 3.1A4.8 4.8 0 004.3 9.5C4.3 14.6 7.3 15.7 10.3 16c-.6.5-.6 1-.5 2V22"/></svg>;
        case "linkedin": return <svg {...c}><rect x="3" y="3" width="18" height="18" rx="0"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7"/></svg>;
        case "external": return <svg {...c}><path d="M7 17L17 7"/><path d="M9 7h8v8"/></svg>;
        case "arrowR":   return <svg {...c}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
        case "plus":     return <svg {...c}><path d="M12 5v14M5 12h14"/></svg>;
        case "chev":     return <svg {...c}><path d="M6 9l6 6 6-6"/></svg>;
        case "dot":      return <svg {...c}><circle cx="12" cy="12" r="3"/></svg>;
        default: return null;
    }
};

export default Icon;
