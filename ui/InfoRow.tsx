import React from "react"
import { View, Text } from "react-native"
import { infoRowStyles } from "../styles"

export type InfoRowProps = { 
    title: string,
    value: string
}

export function InfoRow(props: InfoRowProps): React.JSX.Element {
    return (
        <View style={infoRowStyles.rowContainer}>
            <Text style={infoRowStyles.rowHeader}>{props.title}</Text>
            <Text style={infoRowStyles.rowSubheader}>{props.value}</Text>
        </View>
    )
}