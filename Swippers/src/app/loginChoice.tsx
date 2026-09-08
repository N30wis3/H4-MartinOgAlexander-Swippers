import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export default function LoginChoiceScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Swippers!
      </ThemedText>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push('/login')}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.buttonSecondary, pressed && styles.buttonPressed]}
        onPress={() => router.push('/signup')}>
        <ThemedText style={styles.buttonText}>Register an Account</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
  },
  title: {
    marginBottom: Spacing.four,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.two,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#3A3A3C',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
