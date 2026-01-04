/**
 * Framer Motion Animation Variants
 * Reusable animation configurations for premium landing page
 */

import { Variants, TargetAndTransition } from "framer-motion"

// Fade in from bottom with slight scale
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
        },
    },
}

// Fade in from bottom (no scale)
export const fadeInUpSimple: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

// Slide in from left
export const slideInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

// Slide in from right
export const slideInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

// Scale up with fade
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

// Stagger container for child animations
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
}

// Stagger container with faster timing
export const staggerContainerFast: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
}

// Floating animation for cards
export const floatingCard: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    hover: {
        y: -8,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
}

// Hero text animation with delay
export const heroText: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
}

// ... existing variants ...

// Button hover animation
export const buttonHover: TargetAndTransition = {
    scale: 1.05,
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
    },
}

// Button tap animation
export const buttonTap: TargetAndTransition = {
    scale: 0.95,
}

// Gradient background motion
export const gradientMotion: Variants = {
    animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: {
            duration: 15,
            ease: "linear",
            repeat: Infinity,
        },
    },
}

// Scroll reveal animation (for use with viewport)
export const scrollReveal: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

// Scroll reveal with scale
export const scrollRevealScale: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

// Default viewport configuration for scroll animations
export const defaultViewport = {
    once: true,
    margin: "0px 0px -100px 0px", // Trigger slightly before element is in view
    amount: 0.3, // Trigger when 30% of element is visible
}
