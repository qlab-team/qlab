import React, { useMemo } from "react";
// three
import * as THREE from "three";
// react three fiber
import { useLoader, useUpdate } from "react-three-fiber";
import Aquino from "../assets/fonts/Aquino.blob";

export default function({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1,
  color = "#ffffff",
  ...props
}) {
  const font = useLoader(THREE.FontLoader, Aquino);
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 30,
      weight: "regular",
      curveSegments: 60,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1
    }),
    [font]
  );

  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x =
        hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
      self.position.y =
        vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
    },
    [children]
  );

  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshPhongMaterial attach="material" />
      </mesh>
    </group>
  );
}
