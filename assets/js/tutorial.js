document.addEventListener('DOMContentLoaded', function () {
     // Elementos do DOM
     const welcomeOverlay = document.getElementById('welcome-overlay');
     const tutorialOverlay = document.getElementById('tutorial-overlay');
     const startTutorialBtn = document.getElementById('start-tutorial');
     const openWelcomeBtn = document.getElementById('open-welcome');
     const closeWelcomeBtn = document.getElementById('close-welcome');
     const skipWelcomeBtn = document.getElementById('skip-welcome');
     const closeTutorialBtn = document.getElementById('close-tutorial');
     const skipBtn = document.getElementById('skip-btn');
     const nextBtn = document.getElementById('next-btn');
     const prevBtn = document.getElementById('prev-btn');
     const slides = document.querySelectorAll('.slide');
     const dots = document.querySelectorAll('.dot');
     const abrirUmaVezDiv = document.getElementById('abrirUmaVez'); //mostrar somente uma vez
     const tutorialVisto = localStorage.getItem('tutorialShown');
     let currentSlide = 0;
     const totalSlides = slides.length;
     // salva o tutorial como visto no local storage
     function salvarTutorialComoVisto() {
          localStorage.setItem('tutorialShown', 'true');
          console.log('tutorialShown definido como true'); // avisa no console que foi ativado a funcao
     }
     function openWelcome() {
          welcomeOverlay.classList.add('active');
          setTimeout(() => {
               document.querySelector('.welcome-card').style.opacity = '1';
               document.querySelector('.welcome-card').style.transform = 'translateY(0) scale(1)';
          }, 100);
     }
     function closeWelcome() {
          document.querySelector('.welcome-card').style.opacity = '0';
          document.querySelector('.welcome-card').style.transform = 'translateY(30px) scale(0.95)';
          setTimeout(() => {
               welcomeOverlay.classList.remove('active');
          }, 500);
     }
     function startTutorial() {
          if (welcomeOverlay.classList.contains('active')) {
               closeWelcome();
               setTimeout(() => {
                    showTutorial();
               }, 600);
          } else {
               showTutorial();
          }
     }
     function showTutorial() {
          updateSlide(0);
          tutorialOverlay.classList.add('active');
          setTimeout(() => {
               document.querySelector('.tutorial-carousel').style.opacity = '1';
               document.querySelector('.tutorial-carousel').style.transform = 'translateY(0) scale(1)';
          }, 100);
     }
     function closeTutorial() {
          document.querySelector('.tutorial-carousel').style.opacity = '0';
          document.querySelector('.tutorial-carousel').style.transform = 'translateY(30px) scale(0.95)';
          setTimeout(() => {
               tutorialOverlay.classList.remove('active');
               updateSlide(0);
          }, 500);
          salvarTutorialComoVisto();
          if (abrirUmaVezDiv) abrirUmaVezDiv.style.display = 'none';
     }
     function adjustSlideHeight() {
          slides.forEach(slide => {
               const img = slide.querySelector('img');
               if (img) {
                    img.onload = function () {
                         const slideContent = slide.querySelector('.slide-content');
                         const totalHeight = img.offsetHeight + (slideContent ? slideContent.offsetHeight : 0) + 80;
                         const slidesContainer = document.querySelector('.carousel-slides');
                         if (slidesContainer && slide.classList.contains('active')) {
                              slidesContainer.style.height = totalHeight + 'px';
                         }
                    };
                    if (img.complete && slide.classList.contains('active')) {
                         const slideContent = slide.querySelector('.slide-content');
                         const totalHeight = img.offsetHeight + (slideContent ? slideContent.offsetHeight : 0) + 80;
                         const slidesContainer = document.querySelector('.carousel-slides');
                         if (slidesContainer) {
                              slidesContainer.style.height = totalHeight + 'px';
                         }
                    }
               }
          });
     }
     function updateSlide(newIndex) {
          if (newIndex < 0 || newIndex >= totalSlides) return;
          slides[currentSlide].classList.remove('active');
          dots[currentSlide].classList.remove('active');
          for (let i = 0; i < totalSlides; i++) {
               if (i < newIndex) {
                    slides[i].classList.add('prev');
                    slides[i].classList.remove('active');
               } else if (i === newIndex) {
                    slides[i].classList.add('active');
                    slides[i].classList.remove('prev');
               } else {
                    slides[i].classList.remove('prev', 'active');
               }
          }
          currentSlide = newIndex;
          dots[currentSlide].classList.add('active');
          prevBtn.disabled = currentSlide === 0;
          nextBtn.textContent = currentSlide === totalSlides - 1 ? 'Concluir' : 'Próximo';
          adjustSlideHeight();
     }
     if (tutorialVisto === 'true') {
          if (abrirUmaVezDiv) {
               abrirUmaVezDiv.style.display = 'none';
          }
     } else {
          openWelcome();
     }
     startTutorialBtn.addEventListener('click', startTutorial);
     closeWelcomeBtn.addEventListener('click', closeWelcome);
     skipWelcomeBtn.addEventListener('click', function () {
          closeWelcome();
          salvarTutorialComoVisto();
          if (abrirUmaVezDiv) abrirUmaVezDiv.style.display = 'none';
     });
     welcomeOverlay.addEventListener('click', function (e) {
          if (e.target === welcomeOverlay) {
               closeWelcome();
          }
     });
     closeTutorialBtn.addEventListener('click', closeTutorial);
     skipBtn.addEventListener('click', closeTutorial);
     tutorialOverlay.addEventListener('click', function (e) {
          if (e.target === tutorialOverlay) {
               closeTutorial();
          }
     });
     nextBtn.addEventListener('click', function () {
          if (currentSlide === totalSlides - 1) {
               closeTutorial();
          } else {
               updateSlide(currentSlide + 1);
          }
     });
     prevBtn.addEventListener('click', function () {
          updateSlide(currentSlide - 1);
     });
     dots.forEach((dot, index) => {
          dot.addEventListener('click', function () {
               updateSlide(index);
          });
     });
     document.addEventListener('keydown', function (e) {
          if (!tutorialOverlay.classList.contains('active')) return;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
               if (currentSlide < totalSlides - 1) {
                    updateSlide(currentSlide + 1);
               } else {
                    closeTutorial();
               }
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
               if (currentSlide > 0) {
                    updateSlide(currentSlide - 1);
               }
          } else if (e.key === 'Escape') {
               closeTutorial();
          }
     });
     window.addEventListener('resize', adjustSlideHeight);
     adjustSlideHeight();
});
