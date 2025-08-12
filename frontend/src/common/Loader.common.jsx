import { motion } from 'framer-motion';

export default function Loader({ size = 140, color = '#111827', speed = 1, className = '' }) {
  const dotDistance = 16;
  const dotRadius = Math.max(2, size * 0.03);
  const strokeWidth = Math.max(2, size * 0.04);

  const duration = Math.max(0.4, 0.9 * speed);

  const dotVariants = (delay) => ({
    animate: {
      y: [0, -8, 0, 6, 0],
      transition: {
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        delay
      }
    }
  });

  const braceVariants = {
    animate: {
      rotate: [0, -2, 0, 2, 0],
      transition: { duration: duration * 3, ease: 'easeInOut', repeat: Infinity }
    }
  };

  return (
    <div
      role="img"
      aria-label="Loading — curly braces with moving dots"
      className={`flex items-center justify-center ${className}`}
      style={{ width: `${size}px`, height: `${(size * 40) / 120}px` }}  // scale height based on viewBox ratio
    >

      <svg viewBox="0 0 120 40" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        {/* left brace */}
        <motion.g variants={braceVariants} animate="animate" style={{ originX: '10%', originY: '50%' }}>
          <path d="M14 4 C6 8,6 20,14 22" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 22 C6 26,6 36,14 36" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* right brace */}
        <motion.g variants={braceVariants} animate="animate" style={{ originX: '90%', originY: '50%' }}>
          <path d="M106 4 C114 8,114 20,106 22" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M106 22 C114 26,114 36,106 36" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* moving dots group */}
        <g transform="translate(48,20)">
          <motion.circle cx={-dotDistance} cy={0} r={dotRadius} fill={color} variants={dotVariants(0)} animate="animate" />
          <motion.circle cx={0} cy={0} r={dotRadius} fill={color} variants={dotVariants(0.15)} animate="animate" />
          <motion.circle cx={dotDistance} cy={0} r={dotRadius} fill={color} variants={dotVariants(0.3)} animate="animate" />
        </g>

        {/* underline */}
        <line x1="20" y1="38" x2="100" y2="38" stroke={color} strokeWidth={0.8} opacity={0.08} strokeLinecap="round" />
      </svg>
    </div>
  );
}
