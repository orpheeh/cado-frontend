export default function getHeaderTemplate() {
    return `
    <div class="h-content">
    <h1 class="logo">
        <a href="/index.html"><img src="/images/cado-logo.png" alt="CADO" class="logo"></a>
    </h1> 
        
    <nav class="nav-bar">
        <a href="#" id="humberger" class="little-media-only nav-bar-item"><li class="fa fa-bars"></li></a>
        <a href="/views/home-pages/register.html" id="register" class="nav-bar-item">Inscription</a>
        <a href="/views/home-pages/login.html" id="login" class="nav-bar-item">Connexion</a>
    </nav>
    </div>
`;
}
