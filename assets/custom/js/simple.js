(function ($) {
    'use strict';

    $(window).load(function () {

        /* Preloader */
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });

        /* Background loading full-size images */
        $('.gallery-item').each(function() {
            var src = $(this).attr('href');
            var img = document.createElement('img');

            img.src = src;
            $('#image-cache').append(img);
        });
    });

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
        pageScripts();

    });


    /* Set of page scripts */
    function pageScripts() {

        /* Home page blocks */
        (function() {
            if ($('#homesection').length) {
                var resizeHomeBlocks = function() {
                    var rows = $('#homesection').find('>.row');
                    $.each(rows, function(key, row) {
                        var maxHeight = 0;
                        var columns = $(row).find('>div');
                        $.each(columns, function(key, column) {
                            $(column).css("height", "");
                            if ($(columns[0]).css("float") == 'left') {
                                if ($(column).height() > maxHeight) {
                                    maxHeight = $(column).height();
                                }
                            }
                        });
                        $.each(columns, function(key, column) {
                            if ($(columns[0]).css("float") == 'left') {
                                $(column).height(maxHeight);
                            }
                        });
                    })
                };

                resizeHomeBlocks();
                $(window).resize(resizeHomeBlocks);
            }
        })();

        /* Animated Counter */
        // $('.count-container span').counterUp({
        //     delay: 10, // the delay time in ms
        //     time: 3000 // the speed time in ms
        // });


        /* Magnific Popup */
        $('.gallery-item').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });


        /* Circle Progress */
        (function () {
            function animateElements() {
                $('.progressbar').each(function () {
                    var elementPos = $(this).offset().top;
                    var topOfWindow = $(window).scrollTop();
                    var percent = $(this).find('.circle').attr('data-percent');
                    var percentage = parseInt(percent, 10) / parseInt(100, 10);
                    var animate = $(this).data('animate');
                    if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                        $(this).data('animate', true);
                        $(this).find('.circle').circleProgress({
                            startAngle: -Math.PI / 2,
                            value: percent / 100,
                            thickness: 3,
                            fill: {
                                color: '#ffffff'
                            }
                        }).on('circle-animation-progress', function (event, progress, stepValue) {
                            $(this).find('div').text((stepValue * 100).toFixed(1) + "%");
                        }).stop();
                    }
                });
            }

            // Show animated elements
            animateElements();
            $(window).scroll(animateElements);
        })();

    }



})(jQuery);