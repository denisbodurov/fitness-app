import { Pressable, StyleSheet, Touchable, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import { PostProps } from '@/types/components/Post'
import { Link } from 'expo-router'

export default function Post ({imageURL, type, postDate, title, theme} : PostProps) {
  return (
    <Link asChild href={`/(tabs)/feed/${4}`}>
        <TouchableOpacity
          style={{
            ...styles.container,
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.onSurface,
          }}
          activeOpacity={0.8}
        >
          <View
            style={{
              ...styles.imageContainer,
              borderColor: theme.colors.onSurface,
            }}
          ></View>
          <View style={styles.feedInfoContainer}>
            <View
              style={{
                ...styles.feedBadge,
                backgroundColor: theme.colors.primary,
              }}
            >
              <Text
                variant="titleSmall"
                style={{ ...styles.feedBadgeText, color: theme.colors.onPrimary }}
              >
                {type}
              </Text>
            </View>
            <Text
              variant="titleSmall"
              style={{ ...styles.feedDate, color: theme.colors.outline }}
            >
              {postDate.toString()}
            </Text>
          </View>
          <View style={styles.feedTitleContainer}>
            <Text
              variant="titleMedium"
              style={{ ...styles.title, color: theme.colors.onBackground }}
            >
              {title}
            </Text>
          </View>
        </TouchableOpacity>
    </Link>
  );
}
  
const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxHeight: 350,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-around",
        borderRadius: 25,
        padding: 10,
        elevation: 3,
    },
    imageContainer: {
        width: "100%",
        height: "60%",
        borderWidth: 1,
        borderRadius: 25,
    },
    feedInfoContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        overflow: "hidden",
    },
    feedTitleContainer: {
      paddingVertical: 5,
      paddingHorizontal: 10,
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