export const easePremium = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0 },
};

export const slideRight = {
  hidden: { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0 },
};

export const riseCard = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const defaultViewport = { once: true, amount: 0.22 as const };

export const defaultTransition = {
  duration: 0.65,
  ease: easePremium,
};
