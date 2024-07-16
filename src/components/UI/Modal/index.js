import React from 'react';
import { Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIButton } from '../Button';
import { UIIcon } from '../Icon';

import { SPACING } from '../../../constants/spacing';
import { UIScroll } from '../Scroll';
import { UISafeBottom } from '../SafeBottom';

export const UIModal = ({
  title,
  confirmText,
  cancelText,
  isKeyboard,
  isVisible,
  children,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const { colors } = useTheme();

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <UIBlock
        isFlex
        isSafeTop
        isKeyboard={isKeyboard}
        color="rgba(0,0,0,0.5)"
        vAlign="flex-end"
        tPadding={'l'}>
        <UIBlock isFlex onPress={onClose} />

        <UIBlock
          shadowOpacity={0.2}
          shadow={[0, -SPACING.small]}
          shadowBlur={SPACING.medium}
          color={colors.background.primary}
          radius={[SPACING.large, SPACING.large, 0, 0]}
          padding="l">
          <UIScroll>
            <UIBlock gap={'l'}>
              <UIBlock gap={'l'}>
                <UIBlock isRow hAlign="space-between" vAlign="center">
                  <UIText
                    size="l"
                    weight="semibold"
                    color={colors.text.primary}>
                    {title}
                  </UIText>

                  <UIBlock onPress={onClose}>
                    <UIIcon name="x" />
                  </UIBlock>
                </UIBlock>

                {children}
              </UIBlock>

              <UIBlock gap={'s'}>
                <UIButton
                  text={confirmText || 'Confirmar'}
                  onPress={onConfirm}
                />

                {onCancel && (
                  <UIButton
                    text={cancelText || 'Cancelar'}
                    color={colors.text.primary}
                    onPress={onCancel || onClose}
                    isBlank
                  />
                )}
              </UIBlock>

              {!isKeyboard && <UISafeBottom />}
            </UIBlock>
          </UIScroll>
        </UIBlock>
      </UIBlock>
    </Modal>
  );
};
