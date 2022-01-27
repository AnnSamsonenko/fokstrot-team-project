export class ViewHeader {
  DOC_BODY = document.body;

  renderHeader() {
    const markup = `<header class='header-page'>
        <div class='container-md container-header'>
          <div class='logo'>
          <a href='./index.html' class='logo-link'>
           Fok<span class='logo-accent'>S</span>trot
          </a>
          </div>
          
             <div class="header-cart">
               <a class="header-cart-link" id='btnCart' href='#'>Кошик</a>
             </div>
        </div>
      </header>`;
    this.DOC_BODY.insertAdjacentHTML('afterbegin', markup);
  }
}

// <img class="logo" width='64' height='64' src="./images/logo3.png"/>
//   <ul class='header-nav'>
//     <li class='<header-nav-item'>
//       <a href='./index.html' class='header-nav-link'>
//         Головна
//       </a>
//     </li>
//     <li class='header-nav-item'>
//       <a href='#' class='header-nav-link'>
//         Продукти
//       </a>
//     </li>
//     <li class='header-nav-item'>
//       <a href='#' class='header-nav-link'>
//         Компанiя
//       </a>
//     </li>
//     <li class='header-nav-item'>
//       <a href='#' class='header-nav-link'></a>
//     </li>
//   </ul>;
