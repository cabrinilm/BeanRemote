import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './screens/styles/UserHomeScreen'; 

const FilterModal = ({ visible, onClose, onFilterSelect }) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{t('filterOptions')}</Text>
          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => onFilterSelect('radius')}
          >
            <Text>{t('distanceNearMe')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterOption}
            onPress={() => onFilterSelect('visible')} 
          >
            <Text>{t('allVisible')}</Text> 
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;