
const TEMPLATE = `
    <div class="modal">
        <div class="modal-form-2">
            <span class="close-modal">&times;</span>
            <div class="modal-main-content">
                <input type="text" name="title" id="project-title" placeholder="Ajouter un titre au projet" />
            </div>
            <a href="#" id="create-new-project-button" class="inactive validate-button">Créer un projet</a>
        </div>
    </div>
`;

export default () => {
    const dom = new DOMParser();
    return dom.parseFromString(TEMPLATE, 'text/html')
    .querySelector('.modal');
}