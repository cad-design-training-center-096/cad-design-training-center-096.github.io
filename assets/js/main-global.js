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

    // 3. Inject Anti-Inspect / Disable Devtool Script Dynamically
    if (!document.getElementById('disable-devtool-script')) {
        const devtoolScript = document.createElement('script');
        devtoolScript.id = 'disable-devtool-script';
        devtoolScript.setAttribute('disable-select', 'true');
        devtoolScript.src = 'https://cdn.jsdelivr.net/npm/disable-devtool';
        document.body.appendChild(devtoolScript);
    }
});