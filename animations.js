// Page Transition Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation when page loads
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 50);

    // Handle all internal link clicks for smooth transitions (only if not clicking a button)
    const allLinks = document.querySelectorAll('a[href]');
    
    allLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        
        // Only apply to internal links (not external URLs or anchors)
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            link.addEventListener('click', function(e) {
                // Check if click was on a button inside the link
                const clickedButton = e.target.closest('button');
                
                // If button was clicked, the button handler will manage navigation
                // So we don't need to handle it here
                if (clickedButton) {
                    return; // Let button handler take care of it
                }
                
                // Fade out animation before navigation (for direct link clicks)
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease-in-out';
                
                // Navigate after fade out
                setTimeout(function() {
                    window.location.href = href;
                }, 300);
            });
        }
    });

    // Add hover effects to navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.5s ease-in-out';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add enhanced click animation to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(function(button) {
        // Add initial transition style
        button.style.transition = 'all 0.3s ease-in-out';
        
        button.addEventListener('click', function(e) {
            // Check if button is inside a link
            const parentLink = button.closest('a');
            const href = parentLink ? parentLink.getAttribute('href') : null;
            const isInternalLink = href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:');
            
            // If inside an internal link, prevent default navigation temporarily
            if (isInternalLink) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            // Make button position relative if not already
            const buttonStyle = window.getComputedStyle(button);
            if (buttonStyle.position === 'static') {
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
            }
            
            button.appendChild(ripple);
            
            // Scale animation
            this.style.transform = 'scale(0.92)';
            this.style.boxShadow = '0 0 15px rgba(0, 168, 232, 0.5)';
            
            // If button is inside an internal link, handle navigation after animation
            if (isInternalLink && parentLink) {
                setTimeout(function() {
                    button.style.transform = 'scale(1)';
                    button.style.boxShadow = '';
                    
                    // Start page transition
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease-in-out';
                    
                    // Navigate after fade out
                    setTimeout(function() {
                        window.location.href = href;
                    }, 300);
                }, 200);
            } else {
                // Just animate the button
                setTimeout(function() {
                    button.style.transform = 'scale(1)';
                    button.style.boxShadow = '';
                }, 200);
            }
            
            // Remove ripple after animation
            setTimeout(function() {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Ensure buttons inside links get their animation
    // The button click handler above will handle the animation
    // The link handler will handle navigation after animation

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

