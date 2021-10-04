import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {motion, useAnimation} from "framer-motion";


const FadeTop = ({className, delay = 0.2, duration = 0.4, children}) => {
   const controls = useAnimation();
   const [ref, inView] = useInView({
      threshold: 0.25
   });

   useEffect(() => {
      if (inView) {
         controls.start("visible");
      }
   }, [controls, inView]);

   return (
       <motion.div
           className={className}
           ref={ref}
           animate={controls}
           initial="hidden"
           transition={{duration, delay}}
           variants={{
              hidden: {y: 20, opacity: 0},
              visible: {
                 y: 0,
                 opacity: 1
              }
           }}
       >
          {children}
       </motion.div>
   );
}

export default FadeTop