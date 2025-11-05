import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';

interface ActiveCurrencyBarProps {
  flag: string;
  code: string;
  value: string;
  name: string;
}

export default function ActiveCurrencyBar({
  flag,
  code,
  value,
  name,
}: ActiveCurrencyBarProps) {
  return (
    <Animated.View entering={FadeIn.duration(400)} style={styles.container}>
      <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
        <LinearGradient
          colors={['rgba(0, 217, 255, 0.25)', 'rgba(0, 153, 204, 0.25)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.flag}>{flag}</Text>
            <View style={styles.textContainer}>
              <View style={styles.topRow}>
                <Text style={styles.code}>{code}</Text>
                <Text style={styles.name}> • {name}</Text>
              </View>
              <Text style={styles.value}>
                {parseFloat(value).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>
          </View>
          <View style={styles.glowEffect} />
        </LinearGradient>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 4,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 217, 255, 0.4)',
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 15,
  },
  gradient: {
    padding: 12,
    paddingVertical: 10,
    backgroundColor: 'rgba(10, 14, 39, 0.6)',
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 32,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  code: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00d9ff',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 217, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 217, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  glowEffect: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
});
