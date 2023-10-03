var slideIndex = 1;
showSlides(slideIndex);

document.querySelector(".next").addEventListener('mousedown', (e) => {
	plusSlides(1);
});

document.querySelector(".prev").addEventListener('mousedown', (e) => {
	plusSlides(-1);
});

// Next/previous controls
function plusSlides(n) {
	showSlides(slideIndex += n);
}

function showSlides(n) {
	var i;
	var slides = document.querySelectorAll(".gallerySlide");

	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}

	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	slides[slideIndex - 1].style.display = "block";
} 