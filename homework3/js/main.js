$(function() {



    $('.slideshow').each(function() {

        var $container = $(this),
            $slideGroup = $container.find('.slideshow-slides'),
            $slides = $slideGroup.find('.slide'),
            $nav = $container.find('.slideshow-nav'),
            $indicator = $container.find('.slideshow-indicator'),
            slideCount = $slides.length,
            currentIndex = 0,
            startIndex = 1,
            interval = 3000, //自動切換的時間
            indicatorHTML = '', //indicator的內容
            duration = 500, //切換效果的時間
            easing = 'easeInOutExpo', //JQuery animation的動畫函數
            timer;
			

        //加入indicator的小圓點
        //有幾張圖就要加幾個點
        $slides.each(function(i) {
            //把四張圖片排成一排,用相對位置
            $(this).css({
                left: 100 * i + '%'
            });
            indicatorHTML += '<a href="#">' + (i + 1) + '</a>';

        });
        $indicator.html(indicatorHTML);

        //指定index切換到index張
        function goToSlide(index) {
            //所有元素透過動畫向左移動 Left用負號一個距離
            $slideGroup.animate({
                left: -100 * index + '%'
            }, duration, easing);
            currentIndex = index;
            updateNav();
        }

        function updateNav() {

            var $navPrev = $nav.find('.prev'),
                $navNext = $nav.find('.next');
            if (currentIndex === 0) {
                $navPrev.addClass('disabled');
            } else {
                $navPrev.removeClass('disabled');
            }
            if (currentIndex === slideCount - 1) {
                $navNext.addClass('disabled');
            } else {
                $navNext.removeClass('disabled');
            }
            $indicator.find('a').removeClass('active').eq(currentIndex).addClass('active');
        }

        $('.broadcast').on('click', 'a', function(event) {
            event.preventDefault();
            if ($(this).hasClass('start')) {
                startIndex = 1;
                timerControl();
            } else {
                startIndex = 0;
                timerControl();
            };
        });

        function timerControl() {
            if (startIndex === 1) {
                startTimer();
            } else {
                stopTimer();
            }
        }


        function startTimer() {
            timer = setInterval(function() {
                var nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }, interval);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        /**
        $container.on({
            mouseenter: stopTimer,
            mouseleave: startTimer
        });
		**/
        $nav.on('click', 'a', function(event) {
            event.preventDefault();
            if ($(this).hasClass('prev')) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            };
        });

        $indicator.on('click', 'a', function(event) {
            event.preventDefault();
            if (!$(this).hasClass('active')) {
                goToSlide($(this).index());
            };
        });

        goToSlide(currentIndex);
        // startTimer;
        timerControl();
    });
});
