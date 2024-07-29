import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
  });

  export const rowStyles = StyleSheet.create({
      rowContainer: {
        height: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row'
      },
      rowCircularImage: {
        width: 50,
        height: 50,
        borderRadius: 25
      },
      rowHeading: {
        fontSize: 22,
        fontWeight: 400
      },
      rowSubHeading: {
        fontSize: 12
      }
  })