class Header extends HTMLElement{
    connectedCallback() {
        this.innerHTML = `    
        <header class="navbar navbar-expand-lg navbar-dark bg-dark pe-4 ps-4">
        <div class="container-fluid">
            <a class="navbar-brand" href="/html/index.html">Главная</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul id="header-panel" class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="/html/Dormitories.html">Общежития</a>
                    </li>
                </ul>
                <button class="btn btn-success" id="InputButton">Войти</button>
            </div>
        </div>
    </header>
        `;
      }
}

class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `    
      <footer class="bg-dark text-center text-lg-start mt-2">
      <div class="container p-2">
          <div class="row">
              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-light">Общежития для студентов</h5>
                  <p class="text-light">На данном сайте вы можете оставить заявку на заселение, если вам необходимо общежитие на момент обучения</p>
              </div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Ссылки</h5>
                  <ul class="list-unstyled mb-0">
                      <li><a href="#" class="text-light">Главная</a></li>
                      <li><a href="/html/contacts.html" class="text-light">Услуги</a></li>
                      <li><a href="/html/races.html" class="text-light">Общежития</a></li>
                      <li><a href="/html/contacts.html" class="text-light">Контакты</a></li>
                  </ul>
              </div>
              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Контакты</h5>
                  <ul class="list-unstyled">
                      <li><a href="#" class="text-ligth">+375 (44) 571-23-45</a></li>
                      <li><a href="#" class="text-ligth">г. Минск</a></li>
                      <li><a href="#" class="text-light">antonnestratenko@gmail.com</a></li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="text-center p-3 text-light" style="background-color: rgba(0, 0, 0, 0.2);">
          © 2024 Заселение студентов
      </div>
  </footer>
      `;
    }
}

class Login extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `    
      <div class="modalBackground"> 
      <div class="modalActive"> 
          <div class="modalClose"> 
              <img src="/images/closeImage.jpg" /> 
          </div> 
          <div class="modalWindow">
          <div class="container mt-4 w-100">
          <div class="card" style="width: 18rem;">            
              <div class="card-header ">Вход в систему</div>    
              <div class="card-body">
                  <form id="login-form">
                      <div class="mb-3">
                          <label for="login" class="form-label">Логин</label>
                          <input type="text" class="form-control" id="login" name="login">                        
                      </div>
                      
                      <div class="mb-3">
                          <label for="password" class="form-label">Пароль</label>
                          <input type="password" class="form-control" id="password" name="password">
                      </div>
                      <button type="submit" class="btn btn-primary">Войти</button>
                  </form>
              </div>
          </div>
          <div id="add-info">
          <h5 class="mt-4" >Нет аккаунта?</h5>
          <a href="/html/registration.html" class="btn btn-primary">Зарегистрироваться</a> 
          <h4 id="login-result"></h4>
          </div>
        </div>
         
      </div> 
  </div>
      `;
    }
}


customElements.define('main-footer', Footer);
customElements.define('login-page',Login);
customElements.define('main-header',Header)
