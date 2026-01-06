import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Theme } from '../styles/themes/themes';
import { BackButton } from '../components/Backbutton';

const levels = [
  { id: 1, title: 'Conjunto 1', icon: 'star', active: true },
  { id: 2, title: 'Conjunto 2', icon: 'book', active: true },
  { id: 3, title: 'Conjunto 3', icon: 'zap', active: true },
  { id: 4, title: 'Conjunto 4', icon: 'award', active: false },
  { id: 5, title: 'Conjunto 5', icon: 'target', active: false },
  { id: 6, title: 'Conjunto 6', icon: 'flag', active: false },
  { id: 7, title: 'Conjunto 7', icon: 'lock', active: false },
];

const curveOffsets = [120, -350, 120, -350, 120, -350, 120];

export default function ConjuntoScreen() {
  return (
    <View style={styles.container}>
      <BackButton showTitle titleText="Níveis" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {levels.map((level, index) => (
          <View
            key={level.id}
            style={[
              styles.levelWrapper,
              { marginLeft: curveOffsets[index] + 120 },
            ]}
          >
            <View style={styles.levelBase} />
            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.level,
                !level.active && styles.locked,
              ]}
            >
              <Feather
                name={level.active ? level.icon : 'lock'}
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingVertical: 0,
  },
  levelWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  levelBase: {
    position: 'absolute',
    top: 0,
    width: 78,
    height: 78,
    borderRadius: 45,
    backgroundColor: Theme.colors.border,
    zIndex: -1,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  level: {
    width: 70,
    height: 70,
    borderRadius: 41,
    backgroundColor: Theme.colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  locked: {
    backgroundColor: '#BDBDBD',
  },
  levelText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
