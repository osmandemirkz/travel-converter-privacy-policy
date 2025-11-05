import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, cancelAnimation } from 'react-native-reanimated';

interface CurrencyCardProps {
  flag: string;
  code: string;
  name?: string;
  value: string;
  isActive: boolean;
  isEditMode?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
  index: number;
}

export default function CurrencyCard({
  flag,
  code,
  name,
  value,
  isActive,
  isEditMode = false,
  onPress,
  onLongPress,
  onRemove,
  showRemove = true,
  index,
}: CurrencyCardProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (isEditMode) {
      rotation.value = withRepeat(
        withSequence(
          withTiming(-2, { duration: 80 }),
          withTiming(2, { duration: 80 }),
          withTiming(0, { duration: 80 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(rotation);
      rotation.value = withTiming(0, { duration: 150 });
    }
  }, [isEditMode]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 30)}
      style={[styles.container, animatedStyle]}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        onLongPress={onLongPress}
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
                ? ['rgba(0, 217, 255, 0.3)', 'rgba(0, 153, 204, 0.3)']
                : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.topRow}>
              <Text style={styles.flag}>{flag}</Text>
              <View style={styles.nameContainer}>
                <Text style={[styles.code, isActive && styles.codeActive]}>
                  {code}
                </Text>
                {name && (
                  <Text style={styles.name} numberOfLines={1}>
                    {name}
                  </Text>
                )}
              </View>
            </View>
            <Text style={[styles.value, isActive && styles.valueActive]}>
              {parseFloat(value).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            {isActive && (
              <View style={styles.activeIndicator} />
            )}
            {isEditMode && onRemove && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={onRemove}
                activeOpacity={0.7}
              >
                <View style={styles.removeIcon}>
                  <Text style={styles.removeText}>×</Text>
                </View>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '31.5%',
    marginBottom: 8,
  },
  touchable: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.3)',
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  gradient: {
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 85,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    position: 'relative',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
  },
  flag: {
    fontSize: 24,
    marginRight: 6,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 9,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: 0.2,
    marginTop: 1,
  },
  code: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
  },
  codeActive: {
    color: '#00d9ff',
    textShadowColor: 'rgba(0, 217, 255, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 0.2,
  },
  valueActive: {
    color: '#ffffff',
    fontWeight: '700',
    textShadowColor: 'rgba(0, 217, 255, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  activeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00d9ff',
    shadowColor: '#00d9ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  removeIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 18,
  },
});
