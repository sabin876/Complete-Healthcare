/* Non-Interfering Delegated Tab Switcher for Django Jazzmin Admin */
(function() {
    function initTabSystem() {
        const $ = window.jQuery || window.$;
        if (!$) {
            setTimeout(initTabSystem, 50);
            return;
        }

        // Delegate click events strictly on changeform fieldset tab links
        $(document).off('click.customAdminTabs').on('click.customAdminTabs', '.card-header .nav-tabs .nav-link, .change-form .nav-tabs .nav-link, form .nav-tabs .nav-link', function(e) {
            const href = $(this).attr('href') || $(this).attr('data-target') || '';
            
            // Allow real navigation links (starting with / or http) to navigate normally
            if (href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://')) {
                return true;
            }

            e.preventDefault();

            // Try Bootstrap tab show if available
            if (typeof $(this).tab === 'function') {
                try {
                    $(this).tab('show');
                } catch (err) {}
            }

            // Direct DOM pane activation
            const $nav = $(this).closest('.nav-tabs');
            const $tabContent = $nav.next('.tab-content').length ? $nav.next('.tab-content') : $nav.parent().find('.tab-content');

            if ($nav.length && $tabContent.length) {
                const index = $nav.find('.nav-link').index(this);
                $nav.find('.nav-link').removeClass('active').attr('aria-selected', 'false');
                $(this).addClass('active').attr('aria-selected', 'true');

                const $panes = $tabContent.find('.tab-pane');
                $panes.removeClass('active show').css('display', 'none');

                let targetId = href.replace('#', '').trim();
                if (targetId.endsWith('-tab')) targetId = targetId.slice(0, -4);

                let $target = targetId ? $tabContent.find('#' + targetId) : $();
                if (!$target.length && index >= 0 && index < $panes.length) {
                    $target = $panes.eq(index);
                }

                if ($target.length) {
                    $target.addClass('active show').css({
                        'display': 'block',
                        'opacity': '1',
                        'visibility': 'visible',
                        'height': 'auto'
                    });
                }
            }
            return false;
        });

        // Hash change navigation
        function handleHash() {
            if (!window.location.hash) return;
            const hash = window.location.hash.replace('#', '').trim();
            const cleanHash = hash.endsWith('-tab') ? hash.slice(0, -4) : hash;

            $('.card-header .nav-tabs .nav-link, .change-form .nav-tabs .nav-link, form .nav-tabs .nav-link').each(function() {
                const href = ($(this).attr('href') || '').replace('#', '').trim();
                const id = ($(this).attr('id') || '').trim();
                if (href === cleanHash || href === hash || id === hash || id === cleanHash + '-tab') {
                    $(this).trigger('click');
                }
            });
        }

        $(window).on('hashchange', handleHash);
        if (window.location.hash) {
            setTimeout(handleHash, 300);
            setTimeout(handleHash, 750);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabSystem);
    } else {
        initTabSystem();
    }
})();
