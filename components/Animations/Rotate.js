import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {motion, useAnimation} from "framer-motion";


const Rotate = ({className, delay = 3, duration = 2, children}) => {
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
           initial={{scale: 0}}
           animate={{rotate: 360, scale: 1}}
           transition={{
              // type: "spring",
              stiffness: 260,
              damping: 20,
              delay,
              duration
           }}
       >
          {children}
       </motion.div>
   );
};

export default Rotate