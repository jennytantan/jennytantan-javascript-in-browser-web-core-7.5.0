document.addEventListener('DOMContentLoaded', function() {
    const expanderButton = document.getElementById('expanderButton');
    const selectorWrapper = document.querySelector('.selector-wrapper');
    const brandSelectors = document.querySelectorAll('.brand-selector');
    const buttonText = expanderButton.querySelector('.expander-button-text');
    const buttonImage = expanderButton.querySelector('.expander-button__image img');

    function getVisibleSelectorsCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 992) {
            return 8; // Desktop and large tablet
        } else if (screenWidth >= 768) {
            return 6; // Tablet
        } else {
            return 0; // Mobile (all hidden, swiper is shown instead)
        }
    }

    function toggleVisibility(show) {
        const maxVisible = getVisibleSelectorsCount();
        const visibleCount = show ? brandSelectors.length : maxVisible;
        
        brandSelectors.forEach((selector, index) => {
            if (index < visibleCount) {
                selector.classList.remove('hidden');
                selector.classList.add('visible');
            } else {
                selector.classList.remove('visible');
                selector.classList.add('hidden');
            }
        });

        buttonText.textContent = show ? 'Hide' : 'Show All';
        buttonImage.src = show ? './images/expand_hide.svg' : './images/expand_show_all.svg';
        expanderButton.setAttribute('expanded', show.toString());

        expanderButton.style.display = (maxVisible >= brandSelectors.length) ? 'none' : 'flex';
    }

    function initializeLayout() {
        toggleVisibility(false);
    }

    initializeLayout();
    window.addEventListener('resize', initializeLayout);

    expanderButton.addEventListener('click', function() {
        const isExpanded = expanderButton.getAttribute('expanded') === 'true';
        toggleVisibility(!isExpanded);
    });
});