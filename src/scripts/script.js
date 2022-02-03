jQuery(document).ready(function($){
	
	var slide = 0;

    var routes = {
        "/schedule": "schedule",
        "/procedure": "procedure",
        "/challenges": "challenges",
        "/competitions": "competitions",
        "/whysds": "whysds",
        "/results": "results",
        "/": "root"
  	};

  	var pageUrls = {
  		0 : "/",
  		1 : "/schedule",
  		2 : "/procedure",
  		3 : "/challenges",
  		4: "/competitions",
  		5: "/whysds",
  		6 : "/results"
  	};

  	var timelines = {
  		0 : "1638709200", // Intro Talk  (5th Dec'21, 18:30)
  		1 : "1742440338", // Competitions (14th Jan'20, 00:00)
  		2 : "1742440338", // Recruitment Test (17th Jan'20, 00:00)
  		3 : "1742440338", // Interviews  (20th Jan'20, 23:59:59)
   	};

  	var navLeftButton = $('#nav-left-button');
  	var navRightButton = $('#nav-right-button');

	var container = $('.container');
  	var navbar = $('.navbar');
  	var pageNavbar = $('.page-nav');
	var homeLinkContainer = $('.recruit-nav');	
	var pageContainer = $('.page-container');
	var scheduleTimelineItem = $('.schedule-timeline-item');
	var timelineListItem = $('.timeline-list-item');

	var pages = pageContainer.children('.page');
	var links = pageNavbar.find('.navbar-item-link');
	var homePageLinks = homeLinkContainer.find('.recruit-nav-list-item-link');

	var fancyboxOn = false;

	const cb = document.querySelector('#nav-toggle');

    function matchURL(url) {

		if(cb.checked) {
			cb.checked = false;
		}

        for (var index in routes)
        {
			console.log("hell " + index + " " + url);
            if(url == index)
            {
				console.log("url " + url);
            	if(url != document.location.pathname) {
                    window.history.pushState(null, null, url);
                }
            	for(var key in pageUrls) {
					console.log("testing " + key);
				    if(pageUrls[key] === index) {
						console.log("slide " + slide + " key " + key + " pageUrls " + pageUrls[key] + " index " + index);
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
			$(navbar).removeClass('hidden');
			$(container).addClass('container-padding');
		}
		else {
			$(pageNavbar).addClass('hidden');
			$(navbar).addClass('hidden');
			$(container).removeClass('container-padding');
		}

		if (nextSlideIndex > 0) {
			var child = $(navbar).children()[nextSlideIndex - 1];
			$(child).addClass('active');
		}

		if (prevSlideIndex > 0) {
			var child = $(navbar).children()[prevSlideIndex - 1];
			$(child).removeClass('active');
		}

		slide = nextSlideIndex;

		if (slide === 0) {
			navLeftButton.hide();
			navRightButton.show();
		}
		else if (slide === Object.keys(pageUrls).length-1) {
			navRightButton.hide();
			navLeftButton.show();
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

	$('body').keydown(function (e) {
		if (fancyboxOn) return;

		var keyCode = e.keyCode || e.which,
		  arrow = {left: 37, up: 38, right: 39, down: 40 };

		switch (keyCode) {
			case arrow.left:
			case arrow.up:
				navLeftButton.click();
			break;
			case arrow.right:
			case arrow.down:
				navRightButton.click();
			break;
		}
	});

	matchURL(document.location.pathname);

	$('.fancybox').fancybox({
		beforeLoad: function() {
			fancyboxOn = true;
		},
		afterClose: function() {
			fancyboxOn = false;
		}
	});

	// Automated Schedule
	Object.values(timelines).find(function (ts) {
	  if (parseInt(ts) <= parseInt(Date.now()/1000)) {
	  	currTimeline = Object.keys(timelines)[Object.values(timelines).indexOf(ts)];
		console.log(parseInt(Date.now()/1000));
		for ( var i=0; i<+currTimeline+1; i++) {
	  		scheduleTimelineItem.eq(i).addClass('fade');
	  		scheduleTimelineItem.eq(i).find('li').wrap('<strike>');
	  	}
	  }
	});

	document.getElementById("nav-schedule").onclick = function() {matchURL(pageUrls[1])};
	document.getElementById("nav-procedure").onclick = function() {matchURL(pageUrls[2])};
	document.getElementById("nav-challenges").onclick = function() {matchURL(pageUrls[3])};
	document.getElementById("nav-competitions").onclick = function() {matchURL(pageUrls[4])};
	document.getElementById("nav-whysds").onclick = function() {matchURL(pageUrls[5])};
	document.getElementById("nav-result").onclick = function() {matchURL(pageUrls[6])};

});
