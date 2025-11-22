import {
    Canvas,
    Skia,
    useCanvasRef,
    // useDrawCallback
} from "@shopify/react-native-skia";
import React, { useRef } from "react";
import { Button, View } from "react-native";

export default function PadAssinatura() {
  const pathRef = useRef(Skia.Path.Make());
  const canvasRef = useCanvasRef();

  // Captura o movimento do toque
  // const onDraw = useDrawCallback((canvas, info) => {
  //   const { x, y, type } = info.touches[0];

  //   if (type === "start") {
  //     pathRef.current.moveTo(x, y);
  //   } else if (type === "active") {
  //     pathRef.current.lineTo(x, y);
  //   }

  //   // Redesenha a linha
  //   canvas.clear(Skia.Color("white"));
  //   canvas.drawPath(pathRef.current, { color: "black", style: "stroke", strokeWidth: 3 });
  // }, []);

  const limpar = () => {
    pathRef.current = Skia.Path.Make();
    canvasRef.current?.redraw();
  };

  const salvar = () => {
    const image = canvasRef.current?.makeImageSnapshot();
    const base64 = image?.encodeToBase64();
    console.log("Assinatura Base64:", base64?.slice(0, 100) + "...");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Canvas ref={canvasRef} style={{ flex: 1 }} 
      // onDraw={onDraw}
       />
      <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 16 }}>
        <Button title="Limpar" onPress={limpar} />
        <Button title="Salvar" onPress={salvar} />
      </View>
    </View>
  );
}
