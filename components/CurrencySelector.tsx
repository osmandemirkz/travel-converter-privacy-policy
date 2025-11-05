import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { X, Search } from 'lucide-react-native';
import { Currency } from '@/types/currency';

interface CurrencySelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  currencies: Currency[];
  selectedCodes: string[];
}

export default function CurrencySelector({
  visible,
  onClose,
  onSelect,
  currencies,
  selectedCodes,
}: CurrencySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCurrencyItem = ({ item }: { item: Currency }) => {
    const isSelected = selectedCodes.includes(item.code);

    return (
      <TouchableOpacity
        onPress={() => {
          if (!isSelected) {
            onSelect(item);
            onClose();
          }
        }}
        disabled={isSelected}
        activeOpacity={0.7}
      >
        <BlurView
          intensity={isSelected ? 40 : 60}
          tint="dark"
          style={[styles.currencyItem, isSelected && styles.currencyItemDisabled]}
        >
          <LinearGradient
            colors={
              isSelected
                ? ['rgba(100, 100, 100, 0.2)', 'rgba(80, 80, 80, 0.2)']
                : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.currencyItemGradient}
          >
            <Text style={styles.currencyFlag}>{item.flag}</Text>
            <View style={styles.currencyInfo}>
              <Text style={[styles.currencyCode, isSelected && styles.disabledText]}>
                {item.code}
              </Text>
              <Text style={[styles.currencyName, isSelected && styles.disabledText]}>
                {item.name}
              </Text>
            </View>
            {isSelected && (
              <Text style={styles.selectedBadge}>ACTIVE</Text>
            )}
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <BlurView intensity={100} tint="dark" style={styles.modalContent}>
          <LinearGradient
            colors={['rgba(26, 26, 46, 0.95)', 'rgba(22, 33, 62, 0.95)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.modalGradient}
          >
            <View style={styles.header}>
              <Text style={styles.title}>SELECT CURRENCY</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={28} color="#7dd3fc" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <BlurView intensity={80} tint="dark" style={styles.searchContainer}>
              <Search size={20} color="#7dd3fc" strokeWidth={2} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search currencies..."
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </BlurView>

            <FlatList
              data={filteredCurrencies}
              renderItem={renderCurrencyItem}
              keyExtractor={(item) => item.code}
              style={styles.list}
              showsVerticalScrollIndicator={false}
            />
          </LinearGradient>
        </BlurView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '85%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderTopWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderTopColor: 'rgba(125, 211, 252, 0.5)',
  },
  modalGradient: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textShadowColor: 'rgba(125, 211, 252, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 2,
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#ffffff',
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  currencyItem: {
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  currencyItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  currencyItemDisabled: {
    opacity: 0.5,
  },
  currencyFlag: {
    fontSize: 36,
    marginRight: 16,
  },
  currencyInfo: {
    flex: 1,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  currencyName: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
  selectedBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7dd3fc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(125, 211, 252, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(125, 211, 252, 0.5)',
    overflow: 'hidden',
  },
});
