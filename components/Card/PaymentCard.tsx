import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Clipboard } from 'react-native';

export type PaymentMethod = {
  id: string;
  name: string;
  details: string;
  image: any; // require() or uri
  color: string;
};

const paymentMethods: PaymentMethod[] = [
  { id: '1', name: 'PayPal', details: '@RAhenkora', image: require('../../assets/images/Paypal.png'), color: '#0070BA' },
  { id: '2', name: 'Cash App', details: '15135482205', image: require('../../assets/images/Cashapp.png'), color: '#00D54B' },
  { id: '3', name: 'Zelle', details: '+15135482205', image: require('../../assets/images/Zelle.png'), color: '#6D1ED4' },
  { id: '4', name: 'MTN MoMo', details: '+233 59 899 0472', image: require('../../assets/images/MTN.png'), color: '#FFCC00' },
];

const PaymentCard = () => {
  const handlePress = (method: PaymentMethod) => {
    Clipboard.setString(method.details);
    Alert.alert(
      'Details Copied!',
      `${method.name} details copied to clipboard.\n\nProceed with payment on your phone.\n\nThank you for your generosity! 🙏`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.grid}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.card, { borderColor: method.color }]}
          onPress={() => handlePress(method)}
          activeOpacity={0.7}
        >
          <Image
            source={method.image}
            style={[
              styles.image,
              method.name === 'Cash App' || method.name === 'MTN MoMo'
                ? { width: 100, height: 70, marginBottom: 0 } // bigger image only
                : {}
            ]}
            resizeMode="contain"
          />
          <Text style={styles.name}>{method.name}</Text>
          <Text style={styles.details}>{method.details}</Text>
          <Text style={styles.tapHint}>Tap to copy</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  tapHint: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});
