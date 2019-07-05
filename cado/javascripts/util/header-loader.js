export default function loadHeader(template) {
    const header = document.querySelector('header');
    const dom = new DOMParser();
    const doc = dom.parseFromString(template, "text/html");
    header.appendChild(doc.querySelector('div'));
}