import React from 'react';

import { UIButtonItem } from '../ButtonItem';
import { UIText } from '../Text';
import { UIBlock } from '../Block';
import { UISkeleton } from '../../Skeleton';

export const UIButtonItems = ({ title, items, loading = false, ...props }) => {
  return (
    <UIBlock gap={'xs'} {...props}>
      <UISkeleton loading={loading} height={18} width={80} borderRadius={6}>
        {title && (
          <UIText size="s" semibold tertiary>
            {title}
          </UIText>
        )}
      </UISkeleton>

      <UIBlock gap={'xs'}>
        <UISkeleton loading={loading} height={82} borderRadius={6}>
          {items?.map(({ label, value, color, onPress }, index) => (
            <UIButtonItem
              key={index}
              label={label}
              value={value}
              color={color}
              onPress={onPress}
            />
          ))}
        </UISkeleton>
      </UIBlock>
    </UIBlock>
  );
};
