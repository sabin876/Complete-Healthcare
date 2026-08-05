/* Fail-Proof Delegated Tab Switcher for Django Jazzmin Admin */
(function() {
    function initTabSystem() {
        const $ = window.jQuery || window.$;
        if (!$) {
            setTimeout(initTabSystem, 50);
            return;
        }

        function activateTab(link) {
            if (!link) return;
            const $link = $(link);

            // 1. Try native Bootstrap 4 tab show method
            if (typeof $link.tab === 'function') {
                try {
                    $link.tab('show');
                } catch (e) {
                    console.log('Bootstrap tab error:', e);
                }
            }

            // 2. Direct DOM manipulation fallback for 100% reliability
            let href = $link.attr('href') || $link.attr('data-target') || '';
            let targetSelector = href;

            if (!targetSelector || targetSelector === '#') {
                const linkId = $link.attr('id') || '';
                if (linkId.endsWith('-tab')) {
                    targetSelector = '#' + linkId.slice(0, -4);
                }
            }

            if (targetSelector && targetSelector.startsWith('#') && targetSelector.length > 1) {
                let $targetPane = $(targetSelector);

                // If not found, try adding or removing '-tab' suffix
                if (!$targetPane.length) {
                    if (targetSelector.endsWith('-tab')) {
                        $targetPane = $(targetSelector.slice(0, -4));
                    } else {
                        $targetPane = $(targetSelector + '-tab');
                    }
                }

                if ($targetPane.length) {
                    // Highlight active tab header
                    const $nav = $link.closest('.nav, .nav-tabs, .nav-pills');
                    if ($nav.length) {
                        $nav.find('.nav-link').removeClass('active').attr('aria-selected', 'false');
                    }
                    $link.addClass('active').attr('aria-selected', 'true');

                    // Show target tab pane & hide siblings
                    const $tabContent = $targetPane.closest('.tab-content');
                    if ($tabContent.length) {
                        $tabContent.find('.tab-pane').each(function() {
                            $(this).removeClass('active show').css('display', 'none');
                        });
                    }

                    $targetPane.addClass('active show').css({
                        'display': 'block',
                        'opacity': '1',
                        'visibility': 'visible',
                        'height': 'auto'
                    });
                }
            }
        }

        // Delegate click events globally on document
        $(document).off('click.customAdminTabs').on('click.customAdminTabs', '.nav-tabs .nav-link, [data-toggle="tab"], [data-toggle="pill"], .nav-pills .nav-link', function(e) {
            e.preventDefault();
            activateTab(this);
        });

        // Auto-activate tab based on URL hash if present
        if (window.location.hash) {
            const hash = window.location.hash;
            let $link = $(`a[href="${hash}"], a[data-target="${hash}"], ${hash}`);
            if (!$link.length && hash.endsWith('-tab')) {
                const cleanHash = hash.slice(0, -4);
                $link = $(`a[href="${cleanHash}"], a[data-target="${cleanHash}"]`);
            }
            if ($link.length) {
                activateTab($link[0]);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabSystem);
    } else {
        initTabSystem();
    }
})();
