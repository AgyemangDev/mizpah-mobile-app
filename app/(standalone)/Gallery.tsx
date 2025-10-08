// First, install required dependencies:
// npx expo install expo-av @expo/vector-icons

import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import MainHeader from '@/components/header/MainHeader'
import { useRouter } from 'expo-router'
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av'
import { Ionicons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')
const ITEM_SIZE = (width - 32) / 2 // 2 columns with padding

interface MediaItem {
  id: string
  type: 'image' | 'video'
  uri: string
}

const Gallery = () => {
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const flatListRef = useRef<FlatList>(null)

  // Sample data - replace with your actual media data
  const mediaItems: MediaItem[] = [
    { id: '1', type: 'image', uri: 'https://picsum.photos/400/400?random=1' },
    { id: '2', type: 'video', uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { id: '3', type: 'image', uri: 'https://picsum.photos/400/400?random=2' },
    { id: '4', type: 'image', uri: 'https://picsum.photos/400/400?random=3' },
    { id: '5', type: 'video', uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { id: '6', type: 'image', uri: 'https://picsum.photos/400/400?random=4' },
    { id: '7', type: 'image', uri: 'https://picsum.photos/400/400?random=5' },
    { id: '8', type: 'image', uri: 'https://picsum.photos/400/400?random=6' },
    { id: '9', type: 'video', uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
  ]

  const openMedia = (index: number) => {
    setSelectedIndex(index)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setSelectedIndex(viewableItems[0].index)
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current

  const renderGridItem = ({ item, index }: { item: MediaItem; index: number }) => (
    <TouchableOpacity 
      style={styles.gridItem} 
      onPress={() => openMedia(index)}
      activeOpacity={0.8}
    >
      {item.type === 'image' ? (
        <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      ) : (
        <View style={styles.videoThumbnail}>
          <Video
            source={{ uri: item.uri }}
            style={styles.thumbnail}
            resizeMode={ResizeMode.COVER}
            shouldPlay={false}
          />
          <View style={styles.playIconContainer}>
            <Ionicons name="play-circle" size={40} color="white" />
          </View>
        </View>
      )}
    </TouchableOpacity>
  )

  const renderFullscreenItem = ({ item, index }: { item: MediaItem; index: number }) => (
    <View style={styles.fullscreenSlide}>
      {item.type === 'image' ? (
        <Image
          source={{ uri: item.uri }}
          style={styles.fullscreenImage}
          resizeMode="contain"
        />
      ) : (
        <Video
          source={{ uri: item.uri }}
          style={styles.fullscreenVideo}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={index === selectedIndex}
          useNativeControls
          isLooping
        />
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      <MainHeader title='Gallery' onNavigateBack={() => router.back()} />
      
      <FlatList
        data={mediaItems}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={closeModal}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>
              {selectedIndex + 1} / {mediaItems.length}
            </Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={mediaItems}
            renderItem={renderFullscreenItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={selectedIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />
        </View>
      </Modal>
    </View>
  )
}

export default Gallery

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 8,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  counterContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 10,
  },
  counterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  fullscreenSlide: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: width,
    height: height,
  },
  fullscreenVideo: {
    width: width,
    height: height * 0.7,
  },
})