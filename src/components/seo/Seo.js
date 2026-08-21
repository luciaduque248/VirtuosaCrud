import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const upsertMeta = (name, content, attribute = "name") => {
    let node = document.head.querySelector(`meta[${attribute}="${name}"]`);
    if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attribute, name);
        document.head.appendChild(node);
    }
    node.setAttribute("content", content);
};

function Seo({ title, description, image, type = "website", structuredData }) {
    const location = useLocation();

    useEffect(() => {
        const pageTitle = title ? `${title} | Virtuosa` : "Virtuosa | Moda y belleza en Colombia";
        const canonical = `${window.location.origin}${location.pathname}`;
        const socialImage = image ? new URL(image, window.location.origin).href : `${window.location.origin}/VirtuosaCrud/logo512.png`;

        document.title = pageTitle;
        upsertMeta("description", description);
        upsertMeta("og:title", pageTitle, "property");
        upsertMeta("og:description", description, "property");
        upsertMeta("og:type", type, "property");
        upsertMeta("og:url", canonical, "property");
        upsertMeta("og:image", socialImage, "property");
        upsertMeta("twitter:card", "summary_large_image");

        let canonicalNode = document.head.querySelector('link[rel="canonical"]');
        if (!canonicalNode) {
            canonicalNode = document.createElement("link");
            canonicalNode.setAttribute("rel", "canonical");
            document.head.appendChild(canonicalNode);
        }
        canonicalNode.setAttribute("href", canonical);

        const scriptId = "virtuosa-structured-data";
        document.getElementById(scriptId)?.remove();
        if (structuredData) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.type = "application/ld+json";
            script.textContent = JSON.stringify(structuredData);
            document.head.appendChild(script);
        }

        return () => document.getElementById(scriptId)?.remove();
    }, [description, image, location.pathname, structuredData, title, type]);

    return null;
}

export default Seo;
