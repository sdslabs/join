jQuery(document).ready(function($){
	
	var slide = 0;

    var routes = {
        "/schedule/": "schedule",
        "/procedure/": "procedure",
        "/challenges/": "challenges",
        "/whysds/": "whysds",
        "/": "root"
  	};

  	var pageUrls = {
  		0 : "/",
  		1 : "/schedule/",
  		2 : "/procedure/",
  		3 : "/challenges/",
  		4 : "/whysds/"
  	};

  	var navLeftButton = $('#nav-left-button');
  	var navRightButton = $('#nav-right-button');

  	var navbar = $('.navbar');
  	var pageNavbar = $('.page-nav');
	var homeLinkContainer = $('.recruit-nav');	
	var pageContainer = $('.page-container');

	var pages = pageContainer.children('.page');
	var links = pageNavbar.find('.navbar-item-link');
	var homePageLinks = homeLinkContainer.find('.recruit-nav-list-item-link');

    function matchURL(url) {
        for (var index in routes)
        {
            var re = new RegExp(index);
            if(url.match(re))
            {
            	if(url != document.location.href) {
                    window.history.pushState(null, null, url);
                }
            	for(var key in pageUrls) {
				    if(pageUrls[key] === index) {
			    		console.log("prevSlide : "+ slide);
			    		console.log("nextSlide : "+ key);
			    		updateSlide(parseInt(slide), parseInt(key));
				    }
				}
                break;
            }
        }
    }

	links.on('click', function(event) {
		event.preventDefault();
		var nextId = parseInt($(this)[0].attributes.data_target.value);
		matchURL(pageUrls[nextId]);
	});

	homePageLinks.on('click', function(event) {
		event.preventDefault();
		var nextId = parseInt($(this)[0].attributes.data_target.value);
		matchURL(pageUrls[nextId]);
	});

	window.onpopstate = function(event) {
        matchURL(document.location.href);
    }

	function updateSlide(prevSlideIndex, nextSlideIndex) {

		if(prevSlideIndex < nextSlideIndex) {
			$(pages[prevSlideIndex]).addClass('leave-left');
			$(pages[nextSlideIndex]).addClass('enter-right');
			$(pages[prevSlideIndex]).removeClass('selected');
			$(pages[nextSlideIndex]).addClass('selected');
		}
		else if(prevSlideIndex > nextSlideIndex) {
			$(pages[prevSlideIndex]).addClass('leave-right');
			$(pages[nextSlideIndex]).addClass('enter-left');
			$(pages[prevSlideIndex]).removeClass('selected');
			$(pages[nextSlideIndex]).addClass('selected');	
		}

		setTimeout(function() {
			removeClasses(prevSlideIndex);
			removeClasses(nextSlideIndex); 
		}, 500);
			
		if(nextSlideIndex != 0) {
			$(pageNavbar).removeClass('hidden');
		}
		else {
			$(pageNavbar).addClass('hidden');
		}

		if (nextSlideIndex > 0) {
			var child = $(navbar).children()[nextSlideIndex];
			$(child).addClass('active');
		}

		if (prevSlideIndex > 0) {
			var child = $(navbar).children()[prevSlideIndex];
			$(child).removeClass('active');
		}

		slide = nextSlideIndex;

		if (slide === 0) {
			navLeftButton.hide();
		}
		else if (slide === Object.keys(pageUrls).length-1) {
			navRightButton.hide();
		}
		else {
			navLeftButton.show();
			navRightButton.show();
		}
	}

	function removeClasses(index) {
		$(pages[index]).removeClass('leave-left');
		$(pages[index]).removeClass('leave-right');
		$(pages[index]).removeClass('enter-right');
		$(pages[index]).removeClass('enter-left');
	}

	var sideNavClick = {
		left: function() {
			matchURL(pageUrls[slide-1]);	
		},
		right: function() {
			matchURL(pageUrls[slide+1]);
		}
	}

	navLeftButton.on('click', sideNavClick.left);
	navRightButton.on('click', sideNavClick.right);

});