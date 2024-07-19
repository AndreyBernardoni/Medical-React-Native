import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useCallback, useState } from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIBool } from '../Bool';
import { UIIcon } from '../Icon';

import { SPACING } from '../../../constants/spacing';

export const UITextInput = ({
  value,
  setValue,
  hasIcon,
  hasSecureEntry,
  capitalize,
}) => {
  const { colors } = useTheme();

  const inputRef = useRef(null);

  const [text, setText] = useState(value);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isEmpty = useMemo(
    () => (String(text).length < 1 ? true : false),
    [text],
  );

  const onChange = useCallback(
    textUpdated => {
      setText(textUpdated);
      setValue(textUpdated);
    },
    [setValue],
  );

  const styles = StyleSheet.create({
    container: {
      height: 48,
      borderRadius: 48,
      fontSize: 16,
      lineHeight: 18,
      fontFamily: 'arial',
      fontWeight: '400',
      paddingHorizontal: SPACING.large,
      backgroundColor: colors.background.secondary,
      color: colors.text.primary,
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <UIBlock>
      <TextInput
        ref={inputRef}
        style={styles.container}
        value={text}
        onChangeText={onChange}
        underlineColorAndroid="transparent"
        blurOnSubmit={false}
        autoFocus={true}
        autoCorrect={false}
        autoComplete="off"
        autoCapitalize={capitalize === true ? 'words' : 'none'}
        returnKeyType="search"
        secureTextEntry={hasSecureEntry ? !showPassword : false}
      />
      {hasIcon && (
        <UIBlock
          isAbsolute
          isCenter
          height={48}
          position="right"
          rPadding={'l'}>
          <UIBool condition={isEmpty}>
            <UIIcon name="search" size={18} color={colors.text.quaternary} />
          </UIBool>

          <UIBool condition={!isEmpty}>
            <UIIcon
              font="fa6"
              name="delete-left"
              size={16}
              color={colors.text.secondary}
              onPress={() => onChange('')}
            />
          </UIBool>
        </UIBlock>
      )}

      {hasSecureEntry && (
        <UIBlock
          isAbsolute
          isCenter
          height={48}
          position="right"
          rPadding={'l'}>
          <UIBool condition={showPassword}>
            <UIIcon
              name="eye"
              size={18}
              color={colors.text.quaternary}
              onPress={toggleShowPassword}
            />
          </UIBool>

          <UIBool condition={!showPassword}>
            <UIIcon
              name="eye-off"
              size={16}
              color={colors.text.secondary}
              onPress={toggleShowPassword}
            />
          </UIBool>
        </UIBlock>
      )}
    </UIBlock>
  );
};
