import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer.
 * No external libraries — pure vanilla JS.
 * @param {Object} options - threshold, rootMargin, triggerOnce
 * @returns {[ref, isVisible]}
 */
export const useScrollAnimation = (options = {}) => {
    const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) observer.unobserve(element);
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
};

/**
 * Animated counter hook — counts from 0 to target value when triggered.
 * Pure JS, no library.
 * @param {number|string} end - Target value (e.g. 100, "4.8")
 * @param {boolean} shouldStart - Whether to start animating
 * @param {number} duration - Animation duration in ms
 * @returns {string} current display value
 */
export const useAnimatedCounter = (end, shouldStart, duration = 2000) => {
    const [value, setValue] = useState('0');
    const hasAnimated = useRef(false);

    const animate = useCallback(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const endStr = String(end);
        const suffix = endStr.replace(/[0-9.]/g, ''); // Extract +, km, etc.
        const numericEnd = parseFloat(endStr);
        const isFloat = endStr.includes('.');
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericEnd * eased;

            if (isFloat) {
                setValue(current.toFixed(1) + suffix);
            } else {
                setValue(Math.floor(current) + suffix);
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [end, duration]);

    useEffect(() => {
        if (shouldStart) animate();
    }, [shouldStart, animate]);

    return value;
};
