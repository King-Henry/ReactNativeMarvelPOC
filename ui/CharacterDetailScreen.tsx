import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useCharacterDetailHookContainer } from "./CharacterDetailHookContainer";
import { imageStyles, loaderStyles } from "../styles";
import { InfoRow } from "./InfoRow";
import { CharacterDetailProps } from "../App";


export function CharacterDetailScreen(props: CharacterDetailProps): React.JSX.Element {
    return (
      <View>
        <CharacterDetail navigation={props.navigation} route={props.route}/>
      </View>
    )
  }

function CharacterDetail(props: CharacterDetailProps): React.JSX.Element {
    const id = props.route.params.characterId
    console.log("RENDERING CHARACTER DETAIL - " + id)
    const { loading, error, uiModel } = useCharacterDetailHookContainer(id)

    if(loading) {
        return (
            <View style={loaderStyles.centeredLoader}>
              <ActivityIndicator size="large"/>
            </View> 
          )
    }

    console.log(`UI Model Full image: ${uiModel!.fullImage}`)
    return (
        <View>
            <Image
                source={uiModel!.fullImage}
                style={imageStyles.fullImage}
                onError={(event) => console.log("ERROR LOADING - " + id + " - " + uiModel!.fullImage + " - " + event.error)} />
            <InfoRow title="Name" value={uiModel!.name}></InfoRow>
            <InfoRow title="ID" value={uiModel!.id.toString()}></InfoRow>
        </View>
    )
}

