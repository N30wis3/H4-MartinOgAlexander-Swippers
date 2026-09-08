import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function SignUpScreen() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    router.replace('/');
  }

  const inputStyle = [styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }];

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <ThemedText type="title" style={styles.title}>
              Create account
            </ThemedText>

            <View style={styles.field}>
              <ThemedText type="small" themeColor="textSecondary">
                Full name
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="Jane Doe"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="words"
                autoComplete="name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.field}>
              <ThemedText type="small" themeColor="textSecondary">
                Email
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="jane@example.com"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.field}>
              <ThemedText type="small" themeColor="textSecondary">
                Password
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="At least 8 characters"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry
                autoComplete="password-new"
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.field}>
              <ThemedText type="small" themeColor="textSecondary">
                Confirm password
              </ThemedText>
              <TextInput
                style={inputStyle}
                placeholder="Re-enter your password"
                placeholderTextColor={theme.textSecondary}
                secureTextEntry
                autoComplete="password-new"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={handleSubmit}>
              <ThemedText style={styles.buttonText}>Create account</ThemedText>
            </Pressable>

            <Pressable style={styles.loginLink} onPress={() => router.push('/login')}>
              <ThemedText type="small" themeColor="textSecondary">
                Already have an account? <ThemedText type="linkPrimary">Log in</ThemedText>
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  form: {
    width: '100%',
    maxWidth: 360,
    gap: Spacing.three,
  },
  title: {
    marginBottom: Spacing.two,
  },
  field: {
    gap: Spacing.one,
  },
  input: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 16,
  },
  error: {
    color: '#FF3B30',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: Spacing.two,
  },
});
