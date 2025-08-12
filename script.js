document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = () => {
        const navLinks = document.getElementById('navLinks');
        const openMenu = document.getElementById('openMenu');
        const closeMenu = document.getElementById('closeMenu');
        
        openMenu.addEventListener('click', () => {
            navLinks.classList.add('active');
        });
        
        closeMenu.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
        
        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.nav-links ul li a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    };
    
    // Portfolio Filter
    const portfolioFilter = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    };
    
    // Testimonials Slider
    const testimonialSlider = () => {
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        let currentIndex = 0;
        const totalItems = testimonialItems.length;
        
        // Function to show testimonial by index
        const showTestimonial = (index) => {
            // Hide all items
            testimonialItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show current item and activate current dot
            testimonialItems[index].classList.add('active');
            dots[index].classList.add('active');
        };
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
            showTestimonial(currentIndex);
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        });
        
        // Dot click
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                showTestimonial(currentIndex);
            });
        });
        
        // Auto slide
        setInterval(() => {
            currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        }, 6000);
    };
    
    // Contact Form Validation
    const contactForm = () => {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const subject = document.getElementById('subject').value.trim();
                const message = document.getElementById('message').value.trim();
                
                // Basic validation
                if (name === '' || email === '' || subject === '' || message === '') {
                    alert('Please fill out all fields');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // Form submission would go here
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            });
        }
    };
    
    // Scroll to top button
    const scrollToTop = () => {
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // Smooth scrolling for navigation links
    const smoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only prevent default if the href is not just "#"
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    };
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-image, .about-text, .testimonial-item, .contact-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        elements.forEach(element => {
            observer.observe(element);
            // Add initial class
            element.classList.add('scroll-animation');
        });
    };
    
    // Initialize functions
    menuToggle();
    portfolioFilter();
    testimonialSlider();
    contactForm();
    scrollToTop();
    smoothScroll();
    
    // Only run animate on scroll if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }
    
    // Add animation class to hero section on load
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('animate-in');
        document.querySelector('.hero-image').classList.add('animate-in');
    }, 300);
    
    console.log('Website initialized successfully!');
});