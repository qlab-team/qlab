import React, { useRef } from "react";
// react three fiber
import { useFrame } from "react-three-fiber";
// components
import Text from "./Text";

export default function Jumbo() {
  const ref = useRef();
  useFrame(
    ({ clock }) =>
      (ref.current.rotation.x = ref.current.rotation.y =
        Math.sin(clock.getElapsedTime()) * 0.1)
  );
  let size = 3;
  let position = [22, 10, 0];
  const mobile = window.innerWidth < 400;
  if (mobile) {
    size = 1.7;
    position = [13, 7, 0];
  }
  return (
    <group ref={ref}>
      <Text hAlign="left" position={position} children="QLAB" size={size} />
    </group>
  );
}
