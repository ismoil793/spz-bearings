import React, {FC, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {motion, useAnimation} from "framer-motion";


const Fade = ({className, delay = 0.2, duration = 0.3, scale = 1, children}) => {
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
              visible: {opacity: 1, scale: 1},
              hidden: {opacity: 0, scale}
           }}
       >
          {children}
       </motion.div>
   );
}

export default Fade