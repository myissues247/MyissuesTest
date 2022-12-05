// top action slide swiper js
let swiperTopAction = new Swiper(".top-action-slide", {
    navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
    },
});

// post banner
var swiper = new Swiper(".post-details-banner", {
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: '.custom-pagination',
        type: 'fraction',
    },
});