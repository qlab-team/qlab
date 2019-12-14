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
  return (
    <group ref={ref}>
      <Text hAlign="left" position={[22, 10, 0]} children="QLAB" size={3} />
    </group>
  );
}
