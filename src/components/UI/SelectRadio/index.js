import React, { useState, useCallback } from 'react';

import { UIBlock } from '../Block';
import { UIRadio } from '../Radio';
import { UIModal } from '../Modal';
import { UIInput } from '../Input';

import { _themes } from '../../../constants/themes';

export const UISelectRadio = ({
  isOpen,
  selected,
  options,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [selectedUpdated, setSelectedUpdated] = useState(selected);

  const onSelect = useCallback(value => {
    setSelectedUpdated(value);
  }, []);

  const onConfirmSelection = useCallback(() => {
    onConfirm(selectedUpdated);
  }, [onConfirm, selectedUpdated]);

  return (
    <UIModal
      title={'Selecione'}
      isVisible={isOpen}
      onConfirm={onConfirmSelection}
      onCancel={onCancel ? onCancel : onClose}
      onClose={onClose}>
      <UIBlock>
        {options?.map((option, index) => (
          <UIRadio
            key={index}
            label={option.label || option.value || option}
            value={option.value || option}
            isActive={selectedUpdated === option.value}
            onPress={onSelect}
          />
        ))}
      </UIBlock>
    </UIModal>
  );
};
