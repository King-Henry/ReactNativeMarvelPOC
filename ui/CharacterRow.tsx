import React, { PropsWithChildren } from "react";
import { rowStyles } from "../styles";
import { CharacterListUiItem } from "./CharacterListUiItem";
import { View, Text, Image, Platform, TouchableNativeFeedback, TouchableHighlight } from "react-native/types";

type ContainerProps = PropsWithChildren<{
    id: number,
    style: any,
    clickAction: (id: number) => {}
}>

export function CharacterRow(uiModel: CharacterListUiItem, clickListener: (id: number) => {}) {
    return (
        <ContainerElement style={rowStyles.rowContainer} clickAction={clickListener} id={uiModel.id}>
            <Image source={{uri: 'uiModel.thumbnailUrl'}} style={rowStyles.rowCircularImage} />
            <View>
                <Text style={rowStyles.rowHeading}>{uiModel.name}</Text>
                <Text style={rowStyles.rowSubHeading}>{uiModel.id}</Text>
            </View>
        </ContainerElement>
    )
}

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