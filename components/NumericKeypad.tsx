import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Delete, Calculator as CalculatorIcon } from 'lucide-react-native';

interface NumericKeypadProps {
  onNumberPress: (num: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onCalculatorPress?: () => void;
}

export default function NumericKeypad({ onNumberPress, onBackspace, onClear, onCalculatorPress }: NumericKeypadProps) {
  const buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['C', '0', '.'],
  ];

  const renderButton = (value: string) => {
    const isSpecial = value === 'C';
    const isDot = value === '.';

    return (
      <TouchableOpacity
        key={value}
        style={styles.button}
        onPress={() => {
          if (value === 'C') {
            onClear();
          } else {
            onNumberPress(value);
          }
        }}
        activeOpacity={0.7}
      >
        <BlurView
          intensity={isSpecial ? 100 : 60}
          tint="dark"
          style={styles.buttonBlur}
        >
          <LinearGradient
            colors={
              isSpecial
                ? ['rgba(248, 113, 113, 0.4)', 'rgba(239, 68, 68, 0.4)']
                : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={[styles.buttonText, isSpecial && styles.specialText]}>
              {value}
            </Text>
            {isSpecial && (
              <View style={styles.glowEffect} />
            )}
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.keypadGrid}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(renderButton)}
          </View>
        ))}
      </View>
      <View style={styles.bottomRow}>
        {onCalculatorPress && (
          <TouchableOpacity
            style={styles.calculatorButton}
            onPress={onCalculatorPress}
            activeOpacity={0.7}
          >
            <BlurView intensity={90} tint="dark" style={styles.calculatorBlur}>
              <LinearGradient
                colors={['rgba(125, 211, 252, 0.3)', 'rgba(96, 165, 250, 0.3)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.calculatorGradient}
              >
                <CalculatorIcon size={20} color="#ffffff" strokeWidth={2.5} />
              </LinearGradient>
            </BlurView>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.backspaceButton}
          onPress={onBackspace}
          activeOpacity={0.7}
        >
          <BlurView intensity={80} tint="dark" style={styles.backspaceBlur}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.backspaceGradient}
            >
              <Delete size={22} color="#7dd3fc" strokeWidth={2.5} />
            </LinearGradient>
          </BlurView>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: 'rgba(26, 26, 46, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(125, 211, 252, 0.3)',
    shadowColor: '#7dd3fc',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  keypadGrid: {
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    marginHorizontal: 3,
    height: 42,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  buttonBlur: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: 0.5,
  },
  specialText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },
  glowEffect: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 12,
    shadowColor: '#f87171',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 6,
  },
  calculatorButton: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.4)',
  },
  calculatorBlur: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
  },
  calculatorGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(125, 211, 252, 0.1)',
  },
  backspaceButton: {
    flex: 1,
    height: 38,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.4)',
  },
  backspaceBlur: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
  },
  backspaceGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});
