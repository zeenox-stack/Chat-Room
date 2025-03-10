import { useRef } from "react"; 
import { useGSAP } from "@gsap/react";
import { handleHeaderAnimation, handleMessageAnimation } from "../Animations/Animations";

export const useMessageAnimation = (isSender: boolean) => {
  const eRef = useRef<Element | null>(null); 

  useGSAP(() => {
    if (eRef.current) handleMessageAnimation(eRef.current, isSender);
  }, [eRef.current]); 

  return (el: Element | null) => {
    if (!el || eRef.current) return;
    eRef.current = el;
  }

};

export const useHeaderAnimation = () => {
  const eRef = useRef<Element | null>(null); 

  useGSAP(() => {
    if (eRef.current) handleHeaderAnimation(eRef.current); 
  }); 

  return (el: Element | null) => {
    if (!el) return; 
    eRef.current = el;
  }
};