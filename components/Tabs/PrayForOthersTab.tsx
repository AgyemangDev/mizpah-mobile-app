import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AppButton from '../Button/AppButton';
import PrayerCard, {PrayerRequest} from '../Card/PrayerCard';

interface PrayForOthersTabProps {
  prayers?: PrayerRequest[];
  onPray?: (prayerId: string) => void;
}

const PrayForOthersTab: React.FC<PrayForOthersTabProps> = ({ prayers = [], onPray }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {prayers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No one has submitted their prayers so far.{"\n"}
            Have an issue or a request?{"\n"}
            Request for a prayer now 🙏
          </Text>

          <View style={styles.fullWidthButton}>
            <AppButton
              title="Request a Prayer"
              onPress={() =>
                router.push({
                  pathname: '/(standalone)/Prayers',
                  params: { id: 'request' },
                })
              }
            />
          </View>
        </View>
      ) : (
        <FlatList
          data={prayers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PrayerCard prayer={item} 
        //   onPray={onPray} 
          />}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default PrayForOthersTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 8,
  
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 20,
  },
  fullWidthButton: {
    width: '100%',
    marginTop: 10,
  },
});
