import React from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: IProps) {
  const { children } = props;
  return (
    <View style={s.wrapper}>
      <Image
        source={require('app/assets/images/wallpaper.jpeg')}
        style={s.wallpaper}
        resizeMode="cover"
        blurRadius={5}
      />
      <View style={s.children}>{children}</View>
    </View>
  );
}

const screenSize = Dimensions.get('screen');
const s = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  wallpaper: {
    position: 'absolute',
    top: 0,
    height: screenSize.height,
    width: screenSize.width,
  },
  children: {},
});
