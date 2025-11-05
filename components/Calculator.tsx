import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { X } from 'lucide-react-native';

interface CalculatorProps {
  visible: boolean;
  onClose: () => void;
  onResult: (result: number) => void;
  currentValue: string;
  currencyCode: string;
}

export default function Calculator({
  visible,
  onClose,
  onResult,
  currentValue,
  currencyCode,
}: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string>('');
  const [operation, setOperation] = useState<string>('');

  React.useEffect(() => {
    if (visible) {
      setDisplay(currentValue || '0');
      setPreviousValue('');
      setOperation('');
    }
  }, [visible, currentValue]);

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['C', '0', '.', '+'],
  ];

  const handlePress = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
      setPreviousValue('');
      setOperation('');
      return;
    }

    if (['+', '-', '×', '÷'].includes(value)) {
      if (previousValue && operation) {
        calculate();
      }
      setPreviousValue(display);
      setOperation(value);
      setDisplay('0');
      return;
    }

    if (value === '.') {
      if (display.includes('.')) return;
      setDisplay(display + '.');
      return;
    }

    if (display === '0') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const calculate = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPreviousValue('');
    setOperation('');
  };

  const handleOK = () => {
    let finalResult = parseFloat(display);

    if (previousValue && operation) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(display);

      switch (operation) {
        case '+':
          finalResult = prev + current;
          break;
        case '-':
          finalResult = prev - current;
          break;
        case '×':
          finalResult = prev * current;
          break;
        case '÷':
          finalResult = prev / current;
          break;
      }
    }

    onResult(finalResult);
    onClose();
  };

  const renderButton = (value: string) => {
    const isOperation = ['+', '-', '×', '÷'].includes(value);
    const isSpecial = value === 'C';

    return (
      <TouchableOpacity
        key={value}
        style={styles.button}
        onPress={() => handlePress(value)}
        activeOpacity={0.7}
      >
        <BlurView
          intensity={isOperation ? 80 : isSpecial ? 100 : 60}
          tint="dark"
          style={styles.buttonBlur}
        >
          <LinearGradient
            colors={
              isSpecial
                ? ['rgba(248, 113, 113, 0.4)', 'rgba(239, 68, 68, 0.4)']
                : isOperation
                ? ['rgba(125, 211, 252, 0.3)', 'rgba(96, 165, 250, 0.3)']
                : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text
              style={[
                styles.buttonText,
                (isOperation || isSpecial) && styles.highlightText,
              ]}
            >
              {value}
            </Text>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView intensity={90} tint="dark" style={styles.modalOverlay}>
        <View style={styles.calculatorContainer}>
          <BlurView intensity={100} tint="dark" style={styles.calculator}>
            <LinearGradient
              colors={['rgba(26, 26, 46, 0.98)', 'rgba(45, 53, 97, 0.98)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.calculatorGradient}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Calculator</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X size={24} color="#7dd3fc" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              <View style={styles.displayContainer}>
                <Text style={styles.currencyLabel}>{currencyCode}</Text>
                <Text style={styles.display} numberOfLines={1}>
                  {display}
                </Text>
                {previousValue && operation && (
                  <Text style={styles.operationDisplay}>
                    {previousValue} {operation}
                  </Text>
                )}
              </View>

              <View style={styles.buttonsContainer}>
                {buttons.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {row.map(renderButton)}
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.okButton}
                onPress={handleOK}
                activeOpacity={0.8}
              >
                <BlurView intensity={100} tint="light" style={styles.okButtonBlur}>
                  <LinearGradient
                    colors={['rgba(34, 197, 94, 0.4)', 'rgba(22, 163, 74, 0.4)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.okButtonGradient}
                  >
                    <Text style={styles.okButtonText}>OK</Text>
                  </LinearGradient>
                </BlurView>
              </TouchableOpacity>
            </LinearGradient>
          </BlurView>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calculatorContainer: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.3)',
  },
  calculator: {
    overflow: 'hidden',
    borderRadius: 24,
  },
  calculatorGradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1,
  },
  closeButton: {
    padding: 4,
  },
  displayContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.2)',
  },
  currencyLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    marginBottom: 4,
  },
  display: {
    fontSize: 36,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'right',
  },
  operationDisplay: {
    fontSize: 14,
    color: 'rgba(125, 211, 252, 0.8)',
    textAlign: 'right',
    marginTop: 4,
  },
  buttonsContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    height: 60,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  buttonBlur: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 14,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  highlightText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
  },
  okButton: {
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  okButtonBlur: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 16,
  },
  okButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  okButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,
  },
});
