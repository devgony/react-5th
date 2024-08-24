import { SlideInRight } from "@/components/framer/slide-in-right";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   setIsVisible(true);
  // }, []);
  return (
    // <div className={${isVisible ? "show" : ""}`}>
    <SlideInRight>
      <div>
        <h2>Change Password</h2>
      </div>
    </SlideInRight>
  );
}
