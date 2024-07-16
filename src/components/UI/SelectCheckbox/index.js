import React, { useState, useCallback } from 'react';

import { UIBlock } from '../Block';
import { UIModal } from '../Modal';

import { UICheckbox } from '../Checkbox';
import { SPACING } from '../../../constants/spacing';

export const UISelectCheckbox = ({
  isOpen,
  selection,
  options,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [selectionUpdated, setSelectionUpdated] = useState(selection);

  const onSelect = useCallback(
    value => {
      if (selectionUpdated.includes(value)) {
        setSelectionUpdated(selectionUpdated.filter(item => item !== value));
      } else {
        setSelectionUpdated([...selectionUpdated, value]);
      }
    },
    [selectionUpdated],
  );

  const onConfirmSelection = useCallback(() => {
    onClose();
    onConfirm(selectionUpdated);
  }, [onClose, onConfirm, selectionUpdated]);

  return (
    <UIModal
      title={'Selecione'}
      isVisible={isOpen}
      onConfirm={onConfirmSelection}
      onCancel={onCancel ? onCancel : onClose}
      onClose={onClose}>
      <UIBlock gap={SPACING.tiny}>
        {options?.map((option, index) => (
          <UICheckbox
            key={index}
            label={option.label || option.value || option}
            value={option.value || option}
            isActive={selectionUpdated === option.value}
            onPress={onSelect}
          />
        ))}
      </UIBlock>
    </UIModal>
  );
};
