import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Plus, RefreshCw, Sparkles, Grid3x3, List } from 'lucide-react-native';
import CurrencyRow from '@/components/CurrencyRow';
import CurrencyCard from '@/components/CurrencyCard';
import ActiveCurrencyBar from '@/components/ActiveCurrencyBar';
import NumericKeypad from '@/components/NumericKeypad';
import CurrencySelector from '@/components/CurrencySelector';
import Calculator from '@/components/Calculator';
import { useCurrencyData, useAvailableCurrencies } from '@/hooks/useCurrencyData';
import { Currency } from '@/types/currency';
import { formatCurrencyValue } from '@/utils/formatCurrency';

interface CurrencyItem {
  currency: Currency;
  value: string;
}

export default function ConverterScreen() {
  const { rates, lastUpdated, isLoading, error, refreshRates, convert } = useCurrencyData();
  const availableCurrencies = useAvailableCurrencies();

  const [selectedCurrencies, setSelectedCurrencies] = useState<CurrencyItem[]>([
    { currency: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', is_active: false, sort_order: 0 }, value: '100' },
    { currency: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', is_active: false, sort_order: 1 }, value: '0' },
    { currency: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', is_active: false, sort_order: 2 }, value: '0' },
    { currency: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', is_active: false, sort_order: 3 }, value: '0' },
    { currency: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', is_active: false, sort_order: 4 }, value: '0' },
    { currency: { code: 'AUD', name: 'Australian Dollar', symbol: '$', flag: '🇦🇺', is_active: false, sort_order: 5 }, value: '0' },
    { currency: { code: 'CAD', name: 'Canadian Dollar', symbol: '$', flag: '🇨🇦', is_active: false, sort_order: 6 }, value: '0' },
    { currency: { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', is_active: false, sort_order: 7 }, value: '0' },
  ]);
  const [activeCurrencyIndex, setActiveCurrencyIndex] = useState(0);
  const [showSelector, setShowSelector] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [gridEditMode, setGridEditMode] = useState(false);
  const [gridDraggingIndex, setGridDraggingIndex] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isFirstInput, setIsFirstInput] = useState(true);
  const draggedItem = useRef<CurrencyItem | null>(null);
  const gridDraggedItem = useRef<CurrencyItem | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      updateAllConversions();
    }
  }, [rates]);

  const updateAllConversions = () => {
    const activeItem = selectedCurrencies[activeCurrencyIndex];
    const inputAmount = parseFloat(activeItem.value) || 0;

    const updated = selectedCurrencies.map((item, index) => {
      if (index === activeCurrencyIndex) {
        return item;
      }
      const convertedValue = convert(
        inputAmount,
        activeItem.currency.code,
        item.currency.code
      );
      return {
        ...item,
        value: formatCurrencyValue(convertedValue, item.currency.code),
      };
    });

    setSelectedCurrencies(updated);
  };

  const handleNumberPress = (num: string) => {
    setSelectedCurrencies((prev) => {
      const updated = [...prev];
      const current = updated[activeCurrencyIndex];

      if (isFirstInput) {
        if (num === '.') {
          current.value = '0.';
        } else {
          current.value = num;
        }
        setIsFirstInput(false);
      } else {
        if (num === '.' && current.value.includes('.')) {
          return prev;
        }

        if (current.value === '0' && num !== '.') {
          current.value = num;
        } else {
          current.value = current.value + num;
        }
      }

      const inputAmount = parseFloat(current.value) || 0;

      for (let i = 0; i < updated.length; i++) {
        if (i !== activeCurrencyIndex) {
          const convertedValue = convert(
            inputAmount,
            current.currency.code,
            updated[i].currency.code
          );
          updated[i].value = formatCurrencyValue(convertedValue, updated[i].currency.code);
        }
      }

      return updated;
    });
  };

  const handleBackspace = () => {
    setSelectedCurrencies((prev) => {
      const updated = [...prev];
      const current = updated[activeCurrencyIndex];

      if (current.value.length > 0) {
        current.value = current.value.slice(0, -1) || '0';
      }

      const inputAmount = parseFloat(current.value) || 0;

      for (let i = 0; i < updated.length; i++) {
        if (i !== activeCurrencyIndex) {
          const convertedValue = convert(
            inputAmount,
            current.currency.code,
            updated[i].currency.code
          );
          updated[i].value = formatCurrencyValue(convertedValue, updated[i].currency.code);
        }
      }

      return updated;
    });
  };

  const handleClear = () => {
    setSelectedCurrencies((prev) =>
      prev.map((item) => ({ ...item, value: '0' }))
    );
  };

  const handleAddCurrency = (currency: Currency) => {
    const exists = selectedCurrencies.some(
      (item) => item.currency.code === currency.code
    );

    if (!exists) {
      const activeItem = selectedCurrencies[activeCurrencyIndex];
      const inputAmount = parseFloat(activeItem.value) || 0;
      const convertedValue = convert(
        inputAmount,
        activeItem.currency.code,
        currency.code
      );

      setSelectedCurrencies((prev) => [
        ...prev,
        {
          currency,
          value: formatCurrencyValue(convertedValue, currency.code),
        },
      ]);
    }
  };

  const handleRemoveCurrency = (index: number) => {
    if (selectedCurrencies.length > 1) {
      setSelectedCurrencies((prev) => prev.filter((_, i) => i !== index));
      if (activeCurrencyIndex >= index && activeCurrencyIndex > 0) {
        setActiveCurrencyIndex((prev) => prev - 1);
      }
    }
  };

  const handleCurrencyPress = (index: number) => {
    if (gridEditMode) return;
    setActiveCurrencyIndex(index);
    setIsFirstInput(true);
    if (viewMode === 'grid' && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleCardLongPress = (index: number) => {
    if (Platform.OS !== 'web') {
      import('expo-haptics').then((Haptics) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      });
    }
    setGridEditMode(true);
    setGridDraggingIndex(index);
    gridDraggedItem.current = selectedCurrencies[index];
  };

  const handleCardRemove = (index: number) => {
    if (Platform.OS !== 'web') {
      import('expo-haptics').then((Haptics) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      });
    }
    handleRemoveCurrency(index);
  };

  const handleGridDragOver = (targetIndex: number) => {
    if (gridDraggingIndex === null || gridDraggedItem.current === null) return;
    if (gridDraggingIndex === targetIndex) return;

    const newCurrencies = [...selectedCurrencies];
    newCurrencies.splice(gridDraggingIndex, 1);
    newCurrencies.splice(targetIndex, 0, gridDraggedItem.current);

    if (activeCurrencyIndex === gridDraggingIndex) {
      setActiveCurrencyIndex(targetIndex);
    } else if (
      activeCurrencyIndex > gridDraggingIndex &&
      activeCurrencyIndex <= targetIndex
    ) {
      setActiveCurrencyIndex(activeCurrencyIndex - 1);
    } else if (
      activeCurrencyIndex < gridDraggingIndex &&
      activeCurrencyIndex >= targetIndex
    ) {
      setActiveCurrencyIndex(activeCurrencyIndex + 1);
    }

    setGridDraggingIndex(targetIndex);
    gridDraggedItem.current = newCurrencies[targetIndex];
    setSelectedCurrencies(newCurrencies);
  };

  const handleGridDragEnd = () => {
    setGridDraggingIndex(null);
    gridDraggedItem.current = null;
  };

  const handleExitEditMode = () => {
    setGridEditMode(false);
    setGridDraggingIndex(null);
    gridDraggedItem.current = null;
  };

  useEffect(() => {
    if (viewMode === 'list') {
      setGridEditMode(false);
      setGridDraggingIndex(null);
      gridDraggedItem.current = null;
    }
  }, [viewMode]);

  const handleDragStart = (index: number) => {
    draggedItem.current = selectedCurrencies[index];
    setDraggingIndex(index);
  };

  const handleDragOver = (targetIndex: number) => {
    if (draggingIndex === null || draggedItem.current === null) return;
    if (draggingIndex === targetIndex) return;

    const newCurrencies = [...selectedCurrencies];
    newCurrencies.splice(draggingIndex, 1);
    newCurrencies.splice(targetIndex, 0, draggedItem.current);

    if (activeCurrencyIndex === draggingIndex) {
      setActiveCurrencyIndex(targetIndex);
    } else if (
      activeCurrencyIndex > draggingIndex &&
      activeCurrencyIndex <= targetIndex
    ) {
      setActiveCurrencyIndex(activeCurrencyIndex - 1);
    } else if (
      activeCurrencyIndex < draggingIndex &&
      activeCurrencyIndex >= targetIndex
    ) {
      setActiveCurrencyIndex(activeCurrencyIndex + 1);
    }

    setDraggingIndex(targetIndex);
    setSelectedCurrencies(newCurrencies);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    draggedItem.current = null;
  };

  const handleRefresh = async () => {
    if (Platform.OS !== 'web') {
      const Haptics = await import('expo-haptics');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setIsRefreshing(true);
    await refreshRates();
    setIsRefreshing(false);
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Never';
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  const handleCalculatorResult = (result: number) => {
    setSelectedCurrencies((prev) => {
      const updated = [...prev];
      updated[activeCurrencyIndex].value = result.toString();

      for (let i = 0; i < updated.length; i++) {
        if (i !== activeCurrencyIndex) {
          const convertedValue = convert(
            result,
            updated[activeCurrencyIndex].currency.code,
            updated[i].currency.code
          );
          updated[i].value = formatCurrencyValue(convertedValue, updated[i].currency.code);
        }
      }

      return updated;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a1a2e', '#2d3561', '#1a1a2e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <BlurView intensity={80} tint="dark" style={styles.header}>
          <Animated.View entering={FadeIn.duration(1000)} style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Sparkles size={24} color="#7dd3fc" fill="#7dd3fc" strokeWidth={2} />
              <Text style={styles.title}>TRAVEL CONVERTER</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                style={styles.viewToggle}
                activeOpacity={0.7}
              >
                {viewMode === 'list' ? (
                  <Grid3x3 size={22} color="#7dd3fc" strokeWidth={2} />
                ) : (
                  <List size={22} color="#7dd3fc" strokeWidth={2} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRefresh}
                style={styles.refreshButton}
                disabled={isRefreshing}
              >
                <RefreshCw
                  size={24}
                  color="#7dd3fc"
                  strokeWidth={2.5}
                  style={isRefreshing ? styles.rotating : undefined}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </BlurView>

        <BlurView intensity={60} tint="dark" style={styles.statusBar}>
          <Animated.View entering={FadeInDown.delay(200)} style={styles.statusBarContent}>
            <Text style={styles.statusText}>
              Last updated: {formatLastUpdated()}
            </Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </Animated.View>
        </BlurView>

        {isLoading && Object.keys(rates).length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d9ff" />
            <Text style={styles.loadingText}>Loading exchange rates...</Text>
          </View>
        ) : (
          <>
            {viewMode === 'list' ? (
              <ScrollView
                ref={scrollViewRef}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              >
                {selectedCurrencies.map((item, index) => (
                  <View key={`${item.currency.code}-${index}`}>
                    <CurrencyRow
                      flag={item.currency.flag}
                      code={item.currency.code}
                      value={item.value}
                      isActive={index === activeCurrencyIndex}
                      onPress={() => handleCurrencyPress(index)}
                      onRemove={() => handleRemoveCurrency(index)}
                      index={index}
                      showRemove={selectedCurrencies.length > 1}
                      onLongPress={() => handleDragStart(index)}
                      isDragging={draggingIndex === index}
                    />
                    {draggingIndex !== null && index !== draggingIndex && (
                      <TouchableOpacity
                        style={styles.dropZone}
                        onPress={() => handleDragOver(index)}
                        activeOpacity={1}
                      />
                    )}
                  </View>
                ))}
                {draggingIndex !== null && (
                  <TouchableOpacity
                    style={styles.dropZoneEnd}
                    onPress={handleDragEnd}
                    activeOpacity={1}
                  >
                    <Text style={styles.dropZoneText}>Release to place here</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            ) : (
              <ScrollView
                ref={scrollViewRef}
                style={styles.list}
                contentContainerStyle={styles.gridContent}
                showsVerticalScrollIndicator={false}
              >
                <ActiveCurrencyBar
                  flag={selectedCurrencies[activeCurrencyIndex].currency.flag}
                  code={selectedCurrencies[activeCurrencyIndex].currency.code}
                  value={selectedCurrencies[activeCurrencyIndex].value}
                  name={selectedCurrencies[activeCurrencyIndex].currency.name}
                />
                <View style={styles.gridContainer}>
                  {selectedCurrencies
                    .filter((_, index) => index !== activeCurrencyIndex)
                    .map((item, filterIndex) => {
                      const originalIndex = selectedCurrencies.findIndex(
                        (c) => c.currency.code === item.currency.code
                      );
                      return (
                        <React.Fragment key={item.currency.code}>
                          <CurrencyCard
                            flag={item.currency.flag}
                            code={item.currency.code}
                            name={item.currency.name}
                            value={item.value}
                            isActive={false}
                            isEditMode={gridEditMode}
                            onPress={() => gridDraggingIndex !== null ? handleGridDragOver(originalIndex) : handleCurrencyPress(originalIndex)}
                            onLongPress={() => handleCardLongPress(originalIndex)}
                            onRemove={() => handleCardRemove(originalIndex)}
                            showRemove={selectedCurrencies.length > 1}
                            index={filterIndex}
                          />
                        </React.Fragment>
                      );
                    })}
                </View>
                {gridEditMode && (
                  <TouchableOpacity
                    style={styles.doneButton}
                    onPress={handleExitEditMode}
                    activeOpacity={0.8}
                  >
                    <BlurView intensity={80} tint="light" style={styles.doneButtonBlur}>
                      <LinearGradient
                        colors={['rgba(34, 197, 94, 0.4)', 'rgba(22, 163, 74, 0.4)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.doneButtonGradient}
                      >
                        <Text style={styles.doneButtonText}>DONE</Text>
                      </LinearGradient>
                    </BlurView>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}

            {!gridEditMode && (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowSelector(true)}
                activeOpacity={0.7}
              >
                <BlurView intensity={100} tint="light" style={styles.addButtonBlur}>
                  <LinearGradient
                    colors={['rgba(125, 211, 252, 0.3)', 'rgba(96, 165, 250, 0.3)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.addButtonGradient}
                  >
                    <Plus size={24} color="#ffffff" strokeWidth={3} />
                    <Text style={styles.addButtonText}>ADD CURRENCY</Text>
                  </LinearGradient>
                </BlurView>
              </TouchableOpacity>
            )}

            <NumericKeypad
              onNumberPress={handleNumberPress}
              onBackspace={handleBackspace}
              onClear={handleClear}
              onCalculatorPress={() => setShowCalculator(true)}
            />
          </>
        )}

        <CurrencySelector
          visible={showSelector}
          onClose={() => setShowSelector(false)}
          onSelect={handleAddCurrency}
          currencies={availableCurrencies}
          selectedCodes={selectedCurrencies.map((item) => item.currency.code)}
        />

        <Calculator
          visible={showCalculator}
          onClose={() => setShowCalculator(false)}
          onResult={handleCalculatorResult}
          currentValue={selectedCurrencies[activeCurrencyIndex].value}
          currencyCode={selectedCurrencies[activeCurrencyIndex].currency.code}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewToggle: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 10,
    textShadowColor: 'rgba(125, 211, 252, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 2,
  },
  refreshButton: {
    padding: 8,
  },
  rotating: {
    transform: [{ rotate: '360deg' }],
  },
  statusBar: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  statusBarContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  statusText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 11,
    color: '#ff006e',
    marginTop: 4,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7dd3fc',
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  gridContent: {
    paddingVertical: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  doneButton: {
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.5)',
  },
  doneButtonBlur: {
    overflow: 'hidden',
  },
  doneButtonGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
  },
  doneButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 2,
  },
  addButton: {
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  addButtonBlur: {
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'rgba(125, 211, 252, 0.15)',
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 8,
    letterSpacing: 1.5,
  },
  dropZone: {
    height: 40,
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: 'rgba(125, 211, 252, 0.1)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(125, 211, 252, 0.4)',
    borderStyle: 'dashed',
  },
  dropZoneEnd: {
    height: 60,
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: 'rgba(125, 211, 252, 0.15)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(125, 211, 252, 0.5)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZoneText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
});
