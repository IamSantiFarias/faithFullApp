// components/CustomModal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View
} from 'react-native';
import { Colors } from '../constants/theme';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseIcon?: boolean;
}

export default function CustomModal({ 
  visible, 
  onClose, 
  title, 
  children, 
  showCloseIcon = true 
}: CustomModalProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Fondo oscuro para resaltar el modal */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Evitamos que el toque dentro del modal lo cierre */}
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, { backgroundColor: themeColors.background }]}>
              
              {/* Header opcional con Título y Botón de cierre */}
              {(title || showCloseIcon) && (
                <View style={styles.header}>
                  <Text style={[styles.title, { color: themeColors.text }]}>
                    {title ? title : ''}
                  </Text>
                  
                  {showCloseIcon && (
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                      <Ionicons name="close" size={24} color={themeColors.icon} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Contenido inyectado dinámicamente */}
              <View style={styles.content}>
                {children}
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 16, // Bordes redondeados modernos
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    marginTop: 4,
  },
});