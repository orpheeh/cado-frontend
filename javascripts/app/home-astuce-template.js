
const ASTUCE_TEMPLATE = `
    <div class="cado-astuce">
        <img src="" alt="" class="illustration"/>
        <h1 class="header-title"></h1>
        <h2 class="more-details"></h2>
    </div>
`;

function parseTemplate() {
    const dom = new DOMParser();
    return dom.parseFromString(ASTUCE_TEMPLATE, 'text/html')
    .querySelector('.cado-astuce');
}

export default (illustration, header, details) => {
    const doc = parseTemplate();
    doc.querySelector('.illustration').src = illustration;
    doc.querySelector('.header-title').innerHTML = header;
    doc.querySelector('.more-details').innerHTML = details;

    return doc;
}