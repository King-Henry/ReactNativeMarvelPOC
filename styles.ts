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
        height: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
      },
      rowCircularImage: {
        width: 48,
        height: 48,
        borderRadius: 25
      },
      rowHeading: {
        fontSize: 18,
        fontWeight: '600',
        marginStart: 16
      },
      rowSubHeading: {
        fontSize: 12,
        marginStart: 16
      }
  });

  export const listStyle = StyleSheet.create({
    listContainer: {
      flex: 1
    }
  })

  export const loaderStyles = StyleSheet.create({
    centeredLoader: {
      flex: 1,
      justifyContent: 'center',
    }
  })