/* High-Reliability Jazzmin Admin Tab Switcher Helper */
document.addEventListener('DOMContentLoaded', function() {
    function setupAdminTabs() {
        const tabLinks = document.querySelectorAll('.nav-tabs .nav-link, [data-toggle="tab"], [data-toggle="pill"]');
        
        tabLinks.forEach(function(link) {
            if (link.dataset.tabsInitialized) return;
            link.dataset.tabsInitialized = 'true';

            link.style.cursor = 'pointer';
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = link.getAttribute('href') || link.getAttribute('data-target');
                if (!href || href === '#') return;
                
                const targetId = href.replace('#', '');
                const targetPane = document.getElementById(targetId);
                if (!targetPane) return;
                
                // Remove active state from sibling tab headers
                const navTabs = link.closest('.nav-tabs, .nav-pills, .nav');
                if (navTabs) {
                    navTabs.querySelectorAll('.nav-link').forEach(function(l) {
                        l.classList.remove('active');
                        l.setAttribute('aria-selected', 'false');
                    });
                }
                
                // Add active state to clicked tab header
                link.classList.add('active');
                link.setAttribute('aria-selected', 'true');
                
                // Hide all sibling tab panes
                const tabContent = targetPane.closest('.tab-content');
                if (tabContent) {
                    tabContent.querySelectorAll('.tab-pane').forEach(function(pane) {
                        pane.classList.remove('active', 'show');
                        pane.style.display = 'none';
                    });
                }
                
                // Show target tab pane
                targetPane.classList.add('active', 'show');
                targetPane.style.display = 'block';
            });
        });
    }

    setupAdminTabs();
    setTimeout(setupAdminTabs, 200);
    setTimeout(setupAdminTabs, 600);
    setTimeout(setupAdminTabs, 1200);
});
