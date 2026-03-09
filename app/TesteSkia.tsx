import { CorClara, CorEscura } from "@/assets/cores";
import React, { useRef } from "react";
import { Button, Image, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignaturePad from "react-native-signature-canvas";

export default function TesteSkia() {
  const ref = useRef<any>(null);
  const [sig, setSig] = React.useState<string | null>(null);

  const handleOK = (signature: string) => {
    setSig(signature); // signature será "data:image/png;base64,...."
  };

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, borderWidth: 1, borderColor: "#000" }}>
        <SignaturePad
          ref={ref}
          onOK={handleOK}
          webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
          backgroundColor="red"
          penColor={Cor.secundaria}
        />
      </View>
      {sig && (
        <Image style={{ width: "100%", height: 400 }} source={{ uri: sig }} />
      )}
      <Button title="Salvar" onPress={() => ref.current?.readSignature()} />
    </SafeAreaView>
  );
}
