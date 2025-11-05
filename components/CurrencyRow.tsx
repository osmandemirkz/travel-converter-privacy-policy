import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { X, GripVertical } from 'lucide-react-native';

interface CurrencyRowProps {
  flag: string;
  code: string;
  value: string;
  isActive: boolean;
  onPress: () => void;
  onRemove: () => void;
  index: number;
  showRemove?: boolean;
  onLongPress?: () => void;
  isDragging?: boolean;
}

export default function CurrencyRow({
  flag,
  code,
  value,
  isActive,
  onPress,
  onRemove,
  index,
  showRemove = true,
  onLongPress,
  isDragging = false,
}: CurrencyRowProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50)}
      exiting={FadeOutUp}
      style={[styles.container, isDragging && styles.dragging]}
    >
      <TouchableOpacity
        style={styles.dragHandle}
        onLongPress={onLongPress}
        activeOpacity={0.7}
      >
        <GripVertical size={16} color="rgba(255, 255, 255, 0.5)" strokeWidth={2} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <BlurView
          intensity={isActive ? 100 : 60}
          tint="dark"
          style={styles.blurContainer}
        >
          <LinearGradient
            colors={
              isActive
                ? ['rgba(125, 211, 252, 0.3)', 'rgba(96, 165, 250, 0.3)']
                : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <View style={styles.leftSection}>
                <Text style={styles.flag}>{flag}</Text>
                <Text style={[styles.code, isActive && styles.codeActive]}>
                  {code}
                </Text>
              </View>

              <View style={styles.middleSection}>
                <Text style={[styles.value, isActive && styles.valueActive]}>
                  {value || '0'}
                </Text>
              </View>
            </View>

            {isActive && (
              <View style={styles.activeGlow} />
            )}
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>

      {showRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <BlurView intensity={80} tint="light" style={styles.removeBlur}>
            <LinearGradient
              colors={['rgba(248, 113, 113, 0.4)', 'rgba(239, 68, 68, 0.4)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.removeGradient}
            >
              <X size={14} color="#ffffff" strokeWidth={3} />
            </LinearGradient>
          </BlurView>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragging: {
    opacity: 0.7,
    elevation: 8,
    shadowColor: '#7dd3fc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  dragHandle: {
    width: 24,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  touchable: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  gradient: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  code: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
  },
  codeActive: {
    color: '#ffffff',
    textShadowColor: 'rgba(125, 211, 252, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  middleSection: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'right',
    letterSpacing: 0.3,
  },
  valueActive: {
    color: '#ffffff',
    textShadowColor: 'rgba(125, 211, 252, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    fontWeight: '700',
  },
  activeGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    shadowColor: '#7dd3fc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.5)',
  },
  removeBlur: {
    overflow: 'hidden',
    borderRadius: 16,
  },
  removeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 113, 113, 0.2)',
  },
});
