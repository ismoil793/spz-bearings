import React, {FC, useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {motion, useAnimation} from "framer-motion";


const FadeLeftWhenVisible = ({className, delay=0.2,children}) => {
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
           transition={{duration: 0.35, delay}}
           variants={{
              visible: {opacity: 1, x: 0},
              hidden: {opacity: 0, x: -100}
           }}
       >
          {children}
       </motion.div>
   );
}

export default FadeLeftWhenVisible