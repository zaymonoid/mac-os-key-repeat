import { useRef, useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function AnimatedNumber({ value }) {
  const ref = useRef(null);
  // Render the starting value so server-rendered HTML contains the number.
  const [initialValue] = useState(value);
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, { stiffness: 400, damping: 30 });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(
    () =>
      springValue.onChange((latest) => {
        if (ref.current) {
          ref.current.textContent = latest.toFixed(0);
        }
      }),
    [springValue],
  );

  return <span ref={ref}>{initialValue}</span>;
}
