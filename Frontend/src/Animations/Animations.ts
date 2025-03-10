import gsap from "gsap";

export const handleMessageAnimation = (element: Element, isSender: boolean) => { 
    if (!element) return;

    gsap.fromTo(
        element,
        { x: isSender ? "200px" : "-200px", opacity: 0 }, 
        { x: "0px", opacity: 1, duration: 1, ease: "power4.out" } 
      );
};

export const handleHeaderAnimation = (element: Element) => {
  if (!element) return; 

  gsap.from(element, {
    y: "-200px", 
    duration: 1, 
    ease: "power3.out",
  })
};