class App{

    constructor(){
      this.database = new Database();
    }

    run(){
      let menuIcon = document.querySelector("header nav .toggle-menu a")

      menuIcon.addEventListener("click", this.toggleHamburgerMenu);

      let page = new PageOverview(this);
      page.show();
    }

    toggleHamburgerMenu(){
      let menu = document.querySelector("header nav .menu-right");

      if (menu.classList.contains("small-screen-hidden")){
          menu.classList.remove("small-screen-hidden");
      } else {
        menu.classList.add("small-screen-hidden");
      }
    }
}
