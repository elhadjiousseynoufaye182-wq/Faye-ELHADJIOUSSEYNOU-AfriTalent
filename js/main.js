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
const compteurs = document.querySelectorAll('#compteurjava h3');
const zoneCompteurs = document.getElementById('compteurjava');
const animerCompteur = (compteur)=> {
    const cible = parseInt(compteur.getAttribute ('nombre'),10);
    const duree = 2000;
    let debut = null;
    const etape = (horodatage) => {
        if (!debut) debut = horodatage;
        const progression = horodatage - debut;
        const valeur=  Math.min(Math.floor((progression / duree) * cible), cible);
            compteur.textContent = `+${valeur}`;
        if (progression < duree){
            window.requestAnimationFrame(etape);
        } else{
            compteur.textContent= `+${cible}`;
        }
    };
     window.requestAnimationFrame(etape);
    };
     if(zoneCompteurs && compteurs.length >0 ){
        const observateur = new IntersectionObserver((entrees, obs) => {
            entrees.forEach(entree => {
                if (entree.isIntersecting){
                    compteurs.forEach(compteur => animerCompteur(compteur));
                    obs.unobserve(entree.target);
                }
     });
}, { threshold: 0.2 }); 

        observateur.observe(zoneCompteurs);
};
const boutonsFiltre = document.querySelectorAll(".btn-filtre");
const cartesFreelances = document.querySelectorAll(".freelance-card");
if (boutonsFiltre.length > 0 && cartesFreelances.length > 0) {
    boutonsFiltre.forEach(bouton => {
        bouton.addEventListener("click",function (){
            const categorieSelectionnee = bouton.getAttribute("data-filtre");
            boutonsFiltre.forEach(b => {
                b.classList.remove("btn-primary");
                b.classList.add ("btn-outline-primary");
            });
            bouton.classList.remove("btn-outline-primary");
            bouton.classList.add ("btn-primary");
            cartesFreelances.forEach(carte => {
            const categoriecarte= carte.getAttribute("data-filtre");
             if (categorieSelectionnee === "tous" || categoriecarte === categorieSelectionnee) {
                    carte.style.display = "block";
                } else {
                    carte.style.display = "none";
                }
        });
    });
});
}
const contactForm = document.getElementById("contact-form");
if (contactForm){
    contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); 
            let formulaireValide = true;
            const nom = document.getElementById("nom");
            const prenom = document.getElementById("prenom");
            const email = document.getElementById("email");
            const message = document.getElementById("message");
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            function validerChamps(champ, condition, messageErreur) {
                const conteneurErreur = document.getElementById(`erreur-${champ.id}`);
                if (condition) {
                    champ.classList.remove("is-invalid");
                    champ.classList.add("is-valid");
                    if (conteneurErreur) conteneurErreur.textContent = "";
                } else {
                    champ.classList.remove("is-valid");
                     champ.classList.add("is-invalid");
                    if (conteneurErreur) conteneurErreur.textContent = messageErreur;
                    formulaireValide = false;
                }
            }

            validerChamps(nom ,nom.value.trim() !== "", "Le nom est obligatoire.");
            validerChamps(prenom ,prenom.value.trim() !== "", "Le prenom est obligatoire.");
            validerChamps(email ,emailRegex.test(email.value.trim()), "Veuillez entrer un email valide.");
            validerChamps(message ,message.value.trim().length >= 20, "Le message doit contenir au moins 20 caractères.");
            if (formulaireValide){
                const zoneSucces = document.getElementById("message-succes");
                if (zoneSucces){
                    zoneSucces.innerHTML =`
                    <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                            <strong>Succès !</strong> Votre message a bien été envoyé à l'équipe AfriTalent.
                            <button type="button" class="btn-close" data-bs-dismissBox="alert" aria-label="Close"></button>
                        </div>`;
                }
                         contactForm.reset();
                        [nom,prenom,email,message].forEach(c => {
                        if (c)  c.classList.remove("is-valid");
            });
                }
                       
                });

            

}
