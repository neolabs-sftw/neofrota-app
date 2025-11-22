import { CorClara, CorEscura } from "@/assets/cores";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function SelecionarCarro({
  selecionado,
  setSelecionado,
  opcoes,
}: any) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setModalVisivel(true)}
        style={{
          backgroundColor: Cor.base2,
          height: 50,
          width: "100%",
          borderRadius: 22,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <Text allowFontScaling={false} style={{ color: Cor.texto2 }}>
          {selecionado?.nome} - {selecionado?.placa}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Cor.primaria,
            fontSize: 24,
            marginRight: 10,
            fontWeight: "bold",
            fontFamily: "IconeFill",
          }}
        >
          arrow_drop_down
        </Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <Pressable
          onPress={() => setModalVisivel(false)}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <FlatList
              data={opcoes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setSelecionado(item);
                    setModalVisivel(false);
                  }}
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.foto }}
                      style={{ height: 35, width: 70, marginRight: 10 }}
                      resizeMode="contain"
                    />
                    <Text>
                      {item.nome} - {item.placa}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {/* <Pressable
        style={{
          backgroundColor: Cor.base2,
          height: 50,
          width: "100%",
          borderRadius: 22,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setModalVisivel(true)}
      >
        <Text
          allowFontScaling={false}
          style={{ color: Cor.texto2, fontSize: 12, marginLeft: 10 }}
        >
          Selecione o Veículo
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: Cor.primaria,
            fontSize: 32,
            marginRight: 10,
            fontWeight: "bold",
            fontFamily: "IconeFill",
          }}
        >
          arrow_drop_down
        </Text>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalVisivel(false)}
        >
          <Pressable
            onPress={() => {}}
            style={{
              width: "90%",
              backgroundColor: Cor.base2,
              borderRadius: 20,
              padding: 10,
              alignItems: "center",
              shadowColor: "black",
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 5,
            }}
          >
            <View style={{ width: "100%", flexDirection: "column" }}>
              {opcoes.map((item: any) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    console.log(item.placa);
                    setModalVisivel(false);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Cor.texto2,
                      fontSize: 14,
                      paddingVertical: 15,
                    }}
                  >
                    {item.placa}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      width: "100%",
                      backgroundColor: Cor.primaria,
                    }}
                  />
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal> */}
    </>
  );
}
