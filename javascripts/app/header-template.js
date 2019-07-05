
export default () => `
<div class="project-header-content">

            <div class="project-header-menu-1 grid-item">
                <a href="#" class="h-home link">
                    <li class="fa fa-home"></li>
                </a>
                <a href="#" class="h-project link">
                    <li class="fa fa-project-diagram"></li> Projets
                </a>
            </div>

            <div class="middle-content">
                <a href="/views/app-pages/app-home.html" class="go-to-app-home-link"><img src="/images/cado-shortcut.png" alt="cado"/></a>
            </div>

            <div class="project-header-menu-2 grid-item">
                <a href="#" class="link">
                    <li class="fa fa-plus"></li>
                </a>
                <a href="#" class="link">
                    <li class="fa fa-info-circle"></li>
                </a>
                <span id="username" class="dd-r-button">
                    M
                </span>
            </div>

            <div class="dd-container">
                <!-- Important! put dd-parent-id_of_source at first of class list -->
                <!-- Dropdown of profil -->
                <div class="dd-parent-username dd-r dd" id="profil-dd">
                    <div class="dd-group">
                        <h1 id="complet-username">username</h1>
                        <span class="close-dd">&times;</span>
                    </div>

                    <a href="#" class="dd-link" id="logout-button">Se déconnecter</a>
                </div>
            </div>
            
        </div>
`;

