document.addEventListener("DOMContentLoaded", function () {

    // 1. Load Header & Initialize Mobile Desktop-Mode Fix
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(html => {
                headerPlaceholder.innerHTML = html;
                
                // Re-initialize Bootstrap offcanvas functionality
                var offcanvasElementList = [].slice.call(document.querySelectorAll('.offcanvas'));
                offcanvasElementList.map(function (offcanvasEl) {
                    return new bootstrap.Offcanvas(offcanvasEl);
                });

                // Fix for Mobile Browser "Desktop Site" Mode
                function checkDesktopMode() {
                    if (window.innerWidth >= 992 || document.documentElement.clientWidth >= 992) {
                        const toggler = document.getElementById('mobile-toggler');
                        const navMenu = document.getElementById('desktop-nav-menu');

                        if (toggler) toggler.style.display = 'none'; 
                        if (navMenu) {
                            navMenu.classList.remove('flex-column');
                            navMenu.style.display = 'flex';
                        }
                    }
                }
                checkDesktopMode();
                window.addEventListener('resize', checkDesktopMode);
            })
            .catch(err => console.warn('Failed to load header:', err));
    }

    // 2. Load Footer & Set Current Year
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(res => res.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                const yearSpan = document.getElementById('current-year');
                if (yearSpan) {
                    yearSpan.textContent = new Date().getFullYear();
                }
            })
            .catch(err => console.error('Failed to load footer:', err));
    }

    // 3. Inject Anti-Inspect / Disable Devtool Script Dynamically with Full Configuration
    if (!document.getElementById('disable-devtool-script')) {
        const devtoolScript = document.createElement('script');
        devtoolScript.id = 'disable-devtool-script';
        // Pass parameters to disable selection, debugging, and shortcuts
        devtoolScript.src = 'https://cdn.jsdelivr.net/npm/disable-devtool@latest/disable-devtool.min.js';
        devtoolScript.setAttribute('disable-select', 'true');
        devtoolScript.setAttribute('disable-copy', 'true');
        devtoolScript.setAttribute('url', 'about:blank'); // Redirect action when devtools open
        document.body.appendChild(devtoolScript);
    }

    // 4. Native Fallbacks to Ensure Complete Protection against Inspect / Copy / Right-Click
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Disables Right-Click menu
    });

    document.addEventListener('keydown', function (e) {
        // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (View Source), Ctrl+S (Save)
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
            (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's'))
        ) {
            e.preventDefault();
            return false;
        }
    });
});