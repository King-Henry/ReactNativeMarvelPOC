import React, { memo, PropsWithChildren } from "react";
import { rowStyles } from "../styles";
import { CharacterListUiItem } from "./CharacterListUiItem";
import { View, Text, Image, Platform, TouchableNativeFeedback, TouchableHighlight } from "react-native";
import FastImage from 'react-native-fast-image'

type ContainerProps = PropsWithChildren<{
    id: number,
    clickAction: (id: number) => void
}>

export type  CharacterRowProps = PropsWithChildren<{
    uiModel: CharacterListUiItem,
    clickListener: (id: number) => void
}>

function CharacterRow(props: CharacterRowProps): React.JSX.Element {
    if(props.uiModel.id == 1009189) {
        console.log("TIMMEH RENDERING ROW")
    }
    return (
        <ContainerElement clickAction={props.clickListener} id={props.uiModel.id}>
             <View style={rowStyles.rowContainer}>
                 <FastImage source={{uri: props.uiModel.thumbnailUrl}} style={rowStyles.rowCircularImage} />
                 <View>
                    <Text style={rowStyles.rowHeading}>{props.uiModel.name}</Text>
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