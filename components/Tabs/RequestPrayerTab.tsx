import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AppButton from '../Button/AppButton';

const RequestPrayerTab = () => {
  const [prayerText, setPrayerText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleTextChange = (text: string) => {
    const words = text.trim().split(/\s+/);
    if (words.length <= 30) {
      setPrayerText(text);
    } else {
      Alert.alert('Word Limit Exceeded', 'Please keep your request under 30 words.');
    }
  };

  const handleSubmit = () => {
    if (!prayerText.trim()) {
      Alert.alert('Empty Request', 'Please write your prayer request before submitting.');
      return;
    }
    Alert.alert(
      'Prayer Submitted',
      `Your prayer has been shared ${isAnonymous ? 'anonymously' : 'with your name'}.`
    );
    setPrayerText('');
    setIsAnonymous(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>🙏 Submit a Prayer Request</Text>
          <Text style={styles.subtitle}>
            “Ask and it will be given to you; seek and you will find.” — <Text style={styles.verse}>Matthew 7:7</Text>
          </Text>
        </View>

        <View style={styles.card}>
          {/* Input */}
          <TextInput
            style={styles.input}
            placeholder="Write your prayer request (max 30 words)..."
            placeholderTextColor="#9ca3af"
            multiline
            value={prayerText}
            onChangeText={handleTextChange}
          />

          {/* Word count */}
          <Text style={styles.wordCount}>
            {prayerText.trim().split(/\s+/).filter(Boolean).length}/30 words
          </Text>

          {/* Toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Post anonymously</Text>
            <Switch
              value={isAnonymous}
              onValueChange={setIsAnonymous}
              thumbColor={isAnonymous ? '#7C3AED' : '#f3f4f6'}
              trackColor={{ true: '#d8b4fe', false: '#d1d5db' }}
            />
          </View>

          {/* Conditional note (only when anonymous = true) */}
          {isAnonymous && (
            <View style={styles.noteContainer}>
              <Text style={styles.note}>
                It’s best if you anonymously — but we respect your privacy and will keep it
                confidential. 🙏
              </Text>
            </View>
          )}

          {/* Button */}
          <AppButton title="Submit Request" onPress={handleSubmit} />
        </View>

        {/* Bottom encouragement */}
        <Text style={styles.footerText}>
          Your faith moves mountains. 🌿 We’ll lift your request in prayer together.
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RequestPrayerTab;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  headerSection: {
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
    paddingBottom:5
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  verse: {
    color: '#7C3AED',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    textAlignVertical: 'top',
    minHeight: 110,
    color: '#111827',
  },
  wordCount: {
    alignSelf: 'flex-end',
    marginTop: 6,
    fontSize: 12,
    color: '#9ca3af',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  toggleLabel: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
  },
  noteContainer: {
    backgroundColor: '#f3e8ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED',
  },
  note: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 19,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#6b7280',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
