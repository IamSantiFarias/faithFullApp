// app/test-modal.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import CustomModal from '../components/CustomModal';
import { Colors } from '../constants/theme';

export default function TestModalScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];

  // Estados para manejar distintos modales
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showOfferingModal, setShowOfferingModal] = useState(false);

  // Colores extraídos de tu Design System
  const brandPrimary = '#1E33A8';
  const errorColor = '#EF4444';

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      
      <Text style={[styles.screenTitle, { color: themeColors.text }]}>
        Test de Componentes: Modales
      </Text>

      {/* Botón para probar Alerta de Gasto (Historia 2) */}
      <TouchableOpacity 
        style={[styles.triggerButton, { backgroundColor: errorColor }]} 
        onPress={() => setShowErrorModal(true)}
      >
        <Text style={styles.triggerButtonText}>Test: Saldo Insuficiente</Text>
      </TouchableOpacity>

      {/* Botón para probar Algoritmo de Mayordomía (Historia 5) */}
      <TouchableOpacity 
        style={[styles.triggerButton, { backgroundColor: brandPrimary }]} 
        onPress={() => setShowOfferingModal(true)}
      >
        <Text style={styles.triggerButtonText}>Test: Sugerencia Ofrenda</Text>
      </TouchableOpacity>

      {/* ========================================== */}
      {/* MODAL 1: ALERTA DE SALDO INSUFICIENTE      */}
      {/* ========================================== */}
      <CustomModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        showCloseIcon={false} // Quitamos la X para forzar acción en el botón
      >
        <View style={styles.modalBody}>
          <Ionicons name="alert-circle" size={56} color={errorColor} style={styles.icon} />
          <Text style={[styles.modalTitle, { color: themeColors.text }]}>¡Atención!</Text>
          <Text style={[styles.modalMessage, { color: themeColors.text }]}>
            Este gasto supera tu tesoro disponible. Revisa tu balance antes de continuar.
          </Text>
          
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: errorColor }]}
            onPress={() => setShowErrorModal(false)}
          >
            <Text style={styles.buttonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>

      {/* ========================================== */}
      {/* MODAL 2: SUGERENCIA DE OFRENDA             */}
      {/* ========================================== */}
      <CustomModal
        visible={showOfferingModal}
        onClose={() => setShowOfferingModal(false)}
        title="Apartar Ofrenda"
      >
        <View style={styles.modalBody}>
          <Ionicons name="heart" size={48} color={brandPrimary} style={styles.icon} />
          <Text style={[styles.modalMessage, { color: themeColors.text }]}>
            Se han calculado $500 como ofrenda sugerida por tu nuevo ingreso. ¿Quieres agendar este egreso para el próximo sábado?
          </Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.secondaryButton, { borderColor: themeColors.icon }]}
              onPress={() => setShowOfferingModal(false)}
            >
              <Text style={[styles.secondaryButtonText, { color: themeColors.icon }]}>
                Omitir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: brandPrimary, flex: 1, marginLeft: 12 }]}
              onPress={() => {
                console.log("Ofrenda Agendada");
                setShowOfferingModal(false);
              }}
            >
              <Text style={styles.buttonText}>Agendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  triggerButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  triggerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  // Estilos internos de los modales
  modalBody: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    opacity: 0.8,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
  },
  primaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    flex: 1,
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 15,
  },
});