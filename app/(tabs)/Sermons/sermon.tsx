import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MainHeader from '@/components/header/MainHeader'

const sermon = () => {
  return (
    <View>
       <MainHeader title="Sermon" />
      <Text>sermon</Text>
    </View>
  )
}

export default sermon

const styles = StyleSheet.create({})