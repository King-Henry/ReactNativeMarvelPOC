import React, { memo, PropsWithChildren } from "react";
import { rowStyles } from "../styles";
import { CharacterListUiItem } from "./CharacterListUiItem";
import { View, Text, Platform, TouchableNativeFeedback, TouchableHighlight } from "react-native";
import { Image, ImageErrorEventData } from "expo-image";

type ContainerProps = PropsWithChildren<{
    id: number,
    clickAction: (id: number) => void
}>

export type  CharacterRowProps = PropsWithChildren<{
    uiModel: CharacterListUiItem,
    clickListener: (id: number) => void
}>

function CharacterRow(props: CharacterRowProps): React.JSX.Element {
    if(props.uiModel.id == 344) {
        console.log("CHARACTERROW - RENDERING")
        console.log(JSON.stringify(props.uiModel))
    }
    return (
        <ContainerElement clickAction={props.clickListener} id={props.uiModel.id}>
             <View style={rowStyles.rowContainer}>
                 <Image 
                    source={{uri: props.uiModel.thumbnailUrl}} 
                    recyclingKey={props.uiModel.id.toString()}
                    cachePolicy={'disk'}
                    style={rowStyles.rowCircularImage} 
                    onError={(event: ImageErrorEventData)=> console.log("ERROR LOADING - " + props.uiModel.id + " - " + props.uiModel.thumbnailUrl + " - " + event.error)} />
                 <View style={{flex:1}}>
                    <Text style={rowStyles.rowHeading} numberOfLines={1} ellipsizeMode={"tail"}>{props.uiModel.name}</Text>
                    <Text style={rowStyles.rowSubHeading}>{props.uiModel.id}</Text>
                 </View>
            </View> 
        </ContainerElement>
    )
}

export default memo(CharacterRow)

function ContainerElement({children, id, clickAction}: ContainerProps) {
    if(Platform.OS == 'android') {
        return (
            <TouchableNativeFeedback onPress={() => clickAction(id)}>
                {children}
            </TouchableNativeFeedback>
        )
    } else { 
        return (
            <TouchableHighlight onPress={() => clickAction(id)}>
                {children}
            </TouchableHighlight>
        )
    }
}