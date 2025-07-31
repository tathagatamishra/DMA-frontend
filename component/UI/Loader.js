import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <div className="z-[1000] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex flex-col justify-center items-center bg-[#ffffff00] backdrop-blur-sm">
      <Image
        property={true}
        src={"/DMA.gif"}
        alt="loader"
        width={120}
        height={120}
        style={{
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}
