import { COLORS } from '@/constants/theme'
import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Text, View } from 'tamagui'

interface ChatInputProps {
  value: string
  onChangeText: (text: string) => void
  onSend: () => void
}

export default function ChatInput({ value, onChangeText, onSend }: ChatInputProps) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>

        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachIcon}>+</Text>
        </TouchableOpacity>

        {/* Input */}
        <TextInput
          placeholder="Message..."
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          multiline
          maxLength={1000}
        />

        {/* Send Button */}
        <TouchableOpacity
          onPress={onSend}
          disabled={!value.trim()}
          style={[
            styles.sendButton,
            value.trim() ? styles.sendButtonActive : styles.sendButtonDisabled,
          ]}
        >
          <Text style={styles.sendIcon}>↑</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 24,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachIcon: {
    fontSize: 22,
    color: COLORS.textSecondary,
    fontWeight: '300',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.border,
  },
  sendIcon: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
})
