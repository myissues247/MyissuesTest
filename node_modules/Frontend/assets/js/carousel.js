var customJs = { 
    initCarousel: function () {
        $('.carousel').carousel();
    },

    showDropdown: function () {
        $('.collapse').addClass('show');
    },

    showCategoryDropdown: function () {
        var element = $('.dropdown-menu-category');
        element.toggleClass('show');
        element.css('transform','none !important');
    },

    hideCategoryDropdown: function () {
        var element = $('.dropdown-menu-category');
        element.toggleClass('show');
        element.css('transform','none !important');
    }
}
