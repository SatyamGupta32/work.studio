const loading = () => {
    var timeLine = gsap.timeline();

    // Fade out nav SVG paths
    timeLine.to('#nav svg path', {
        opacity: 0,
        duration: 0.01
    });

    // Fade out nav links
    timeLine.to('#nav ul', {
        opacity: 0,
        duration: 0.01
    });

    // Animate yellow1 element out
    timeLine.to('#yellow1', {
        top: '-100%',
        duration: 0.7,
        ease: 'expo.out',
        delay: 0.5
    });

    // Change SVG paths to white
    timeLine.to('#nav svg path', {
        fill: 'white',
        opacity: 1,
        duration: 0.01
    }, '-=0.1'); // Overlap with previous animation

    // Change nav links to white
    timeLine.to('#nav ul', {
        color: 'white',
        opacity: 1,
        duration: 0.01
    }, '-=0.2'); // Overlap with previous animation

    // Animate yellow2 element in
    timeLine.from('#yellow2', {
        top: '100%',
        duration: 0.6,
        ease: 'expo.out',
        delay: 0.6
    }, 'headingColor');

    // Change SVG paths back to black
    timeLine.from('#nav svg path', {
        fill: 'black',
        duration: 0.01
    }, '-=0.7'); // Overlap with previous animation

    // Change nav links back to black
    timeLine.from('#nav ul', {
        color: 'black',
        duration: 0.01
    }, '-=0.7'); // Overlap with previous animation

    // Animate loader heading color
    timeLine.to('#loader h1', {
        color: 'black',
        duration: 0.7,
        delay: 0.6
    }, 'headingColor');

    // Fade out and hide loader
    timeLine.to('#loader', {
        opacity: 0,
        duration: 0.5 // Adjust duration if needed
    });

    timeLine.to('#loader', {
        display: 'none',
        duration: 0 // Instant change
    });
};

loading();


document.addEventListener('DOMContentLoaded', () => {
    const svgPath = document.querySelector('#nav svg path');
    const navLinks = document.querySelectorAll('#nav ul'); // Use querySelectorAll
    const page2 = document.querySelector('.page2');
    const cross = document.querySelector('.add path');
    const page3 = document.querySelector('.page3');


    // Page 2 interaction
    page2.addEventListener('mouseenter', () => {
        gsap.to(svgPath, { fill: 'white', duration: 0.5 });
        gsap.to(cross, { fill: 'white', duration: 0.5 },'=-0.5');
        gsap.to(navLinks, { color: 'white', duration: 0.5, stagger: 0.1 },'=-1'); // Apply stagger if needed
    });

    // Page 3 interaction
    page3.addEventListener('mouseenter', () => {
        gsap.to(svgPath, { fill: 'black', duration: 0.5 });
        gsap.to(cross, { fill: 'black', duration: 0.5 },'=-0.5');
        gsap.to(navLinks, { color: 'black', duration: 0.5, stagger: 0.1 },'=-1'); // Apply stagger if needed
    });

    // Optionally reset colors when leaving the page (if needed)
    page2.addEventListener('mouseleave', () => {
        gsap.to(svgPath, { fill: 'black', duration: 0.5 });
        gsap.to(cross, { fill: 'black', duration: 0.5 },'=-0.5');
        gsap.to(navLinks, { color: 'black', duration: 0.5, stagger: 0.1 },'=-1'); // Apply stagger if needed
    });

    page3.addEventListener('mouseleave', () => {
        gsap.to(svgPath, { fill: 'black', duration: 0.5 });
        gsap.to(cross, { fill: 'black', duration: 0.5 },'=-0.5');
        gsap.to(navLinks, { color: 'black', duration: 0.5, stagger: 0.1 },'=-1'); // Apply stagger if needed
    });
});

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
var elems = document.querySelectorAll('.elem');
var page2 = document.querySelector('.page2');
var headings = document.querySelectorAll('.heading');
var currentIndex = 0;
var intervalId;

function changeImageHeadingMoving() {
    if (elems.length > 0) {
        var bgimg = elems[currentIndex].getAttribute('data-img');
        page2.style.background = `url(${bgimg})`;
        currentIndex = (currentIndex + 1) % elems.length;
    }
}

// Mouse enter event on .page2 to start changing images
page2.addEventListener('mouseenter', () => {
    if (elems.length > 0) {
        var bgimg = elems[currentIndex].getAttribute('data-img');
        page2.style.background = `url(${bgimg})`;
        page2.style.backgroundPositionX = 'center';
        currentIndex = (currentIndex + 1) % elems.length;
    }
    intervalId = setInterval(changeImageHeadingMoving, 1000);
});

// Mouse leave event on .page2 to reset background to black
page2.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    page2.style.background = `#000`;
});

headings.forEach((heading) => {
    heading.addEventListener('mouseenter', (event) => {
        clearInterval(intervalId); // Stop the continuous image change
        // Find the closest .elem to the heading that triggered the event
        var elem = event.target.closest('.elem');

        if (elem) {
            var bgimg = elem.getAttribute('data-img');
            page2.style.background = `url(${bgimg})`;
        }
    });
});

headings.forEach((heading) => {
    heading.addEventListener('mouseleave', () => {
        intervalId = setInterval(changeImageHeadingMoving, 1000); // Resume the continuous image change
    });
});


const backTop = document.querySelector('.arrowTop').addEventListener('click', () => {
    scroll.scrollTo(0);
})

var add = document.querySelector('.add');

add.addEventListener('click', () => {
    var menu = document.querySelectorAll('.menu');
    menu.forEach((e) => {
        if (e.style.transform === 'translateX(0%)' && e.style.opacity === '1') {
            e.style.transform = 'translateX(70%)';
            e.style.opacity = '0';
            e.style.transition = 'transform 0.5s ease, opacity 0.8s ease 0.1s';
        } else {
            e.style.transform = 'translateX(0%)';
            e.style.opacity = '1';
            e.style.transition = 'transform 0.5s ease, opacity 0.8s ease 0.1s';
        }
    });
    // Handle rotation
    if (add.style.transform === 'rotateZ(45deg)') {
        add.style.transform = 'rotateZ(0deg)';
    } else {
        add.style.transform = 'rotateZ(45deg)';
    }
});
