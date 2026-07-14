/**
 * Helper function to handle smooth scrolling to target elements.
 * Integrates with Lenis if available, otherwise falls back to native scrollIntoView.
 * 
 * @param {string} selector - CSS selector of the target element.
 * @param {number} offset - Pixel offset to adjust scroll target (useful for fixed headers).
 */
export const scrollToSection = (selector, offset = -64) => {
  try {
    const target = document.querySelector(selector);
    if (!target) return;

    if (window.lenis) {
      window.lenis.scrollTo(target, { offset });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (error) {
    console.error('Failed to scroll to section:', error);
  }
};
