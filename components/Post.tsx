import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import { PostProps } from '@/types/components/Post'

export default function Post ({imageURL, type, postDate, title, theme} : PostProps) {
  return (
    <View style={{...styles.container, backgroundColor: theme.colors.surface}}>
      <View style={styles.imageContainer}>

      </View>
      <View style={styles.feedInfoContainer}>
        <View style={{...styles.feedBadge, backgroundColor: theme.colors.primary}}>
          <Text variant="titleSmall" style={{...styles.feedBadgeText, color: theme.colors.onPrimary}} >{type}</Text>
        </View>
        <Text variant="titleSmall" style={{...styles.feedDate, color: theme.colors.outline}}>{postDate.toString()}</Text>
      </View>
      <View style={styles.feedInfoContainer}>
        <Text variant="titleSmall" style={{...styles.title, color: theme.colors.onBackground}} >{title}</Text>
      </View>
    </View>
  )
}
  
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 300,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        borderWidth: 1
    },
    feedInfoContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        padding: 20,
        overflow: "hidden",
    },
    feedBadge: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        opacity: 0.7,
    },
    feedBadgeText: {
        fontFamily: "ProtestStrike",
    },
    feedDate: {
        fontFamily: "ProtestStrike",
    },
    title: {
        fontFamily: "ProtestStrike",
    }
})