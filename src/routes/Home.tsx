// src/components/Home.tsx
import React from "react";
import { motion } from "framer-motion";
import {startup} from '../settings/animations.json'
import {startup as startupTransition} from '../settings/transitions.json'
const Home: React.FC = () => {
  return (
    <motion.div animate={startup} transition={startupTransition}>
      <h1>Welcome to the Home Page!</h1>
    </motion.div>
  );
};

export default Home;
