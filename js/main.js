document.addEventListener("DOMContentLoaded", function () {
    const tToggleBtn = document.getElementById("theme-toggle");
    const tToggleIcon= document.getElementById("icon-toggle");
    const currentTheme=localStorage.getItem("theme") || "light";
    if (currentTheme== "dark" && tToggleBtn) {
        document.body.classList.add("dark-mode");
        tToggleIcon.classList.replace("bi-moon-stars","bi-sun");

    }
    if(tToggleBtn){
        tToggleBtn.addEventListener("click",function () {
            document.body.classList.toggle("dark-mode");
            let theme= "light";
            if(document.body.classList.contains("dark-mode")){
                theme = "dark";
               tToggleIcon.classList.replace("bi-moon-stars" ,"bi-sun");

            } else{
                tToggleIcon.classList.replace( "bi-sun" , "bi-moon-stars");
            }
            localStorage.setItem("theme",theme);

        }
    );
    }
    const navbar = document.querySelector(".navbar");
    if (navbar){
    window.addEventListener("scroll", function(){
          if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
    } else{
        navbar.classList.remove("navbar-scrolled");
    }

    });
}
const backBtn= document.getElementById("back");
if (backBtn){
    window.addEventListener("scroll",function () {
        if (window.scrollY > 400) {
            backBtn.classList.add("show");
        }else{
             backBtn.classList.remove("show");
        }
    }
);
backBtn.addEventListener("click",function (){
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});
}
});
