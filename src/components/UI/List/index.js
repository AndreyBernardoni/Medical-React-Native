import React from 'react';
import { UIBlock } from '../Block';

export const UIList = ({
  items,
  renderItem,
  renderEmpty,
  renderHeader,
  renderFooter,
  gap = 'm',
}) => {
  if (!items || !items.length) {
    return renderEmpty || null;
  }

  return (
    <UIBlock gap={gap}>
      {renderHeader && renderHeader()}

      {renderItem &&
        items?.map((item, index) => (
          <UIBlock key={index}>{renderItem({ item, index })}</UIBlock>
        ))}

      {renderFooter && renderFooter()}
    </UIBlock>
  );
};
