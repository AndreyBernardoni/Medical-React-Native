import React from 'react';

import { UIBlock, UICol, UIRow } from '../Block';
import { UIBool } from '../Bool';
import { UIIcon } from '../Icon';
import { UIExpandableProps } from './types';

/**
 * UIExpandable
 *
 * first child is the header and the rest is the content.
 * header is toggleable, automatically.
 * content is hidden by default. it will be shown when header is pressed.
 */
export const UIExpandable = ({
  iconType = 'arrow',
  children,
  padding,
  hPadding,
  ...rest
}: UIExpandableProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const expandIcon = React.useMemo(
    () => (iconType === 'arrow' ? 'chevron-down' : 'plus'),
    [iconType],
  );

  const collapseIcon = React.useMemo(
    () => (iconType === 'arrow' ? 'chevron-up' : 'minus'),
    [iconType],
  );

  const renderHeader = React.useMemo(
    () => React.Children.toArray(children)[0],
    [children],
  );

  const renderContent = React.useMemo(
    () => React.Children.toArray(children).slice(1),
    [children],
  );

  const toggle = React.useCallback(() => setIsExpanded(prev => !prev), []);

  return (
    <UICol gap="s" {...rest}>
      <UIRow
        isBetween
        gap="s"
        padding={padding}
        hPadding={hPadding || padding}
        onPress={toggle}>
        <UIRow isFlex>{renderHeader}</UIRow>

        <UIIcon name={isExpanded ? collapseIcon : expandIcon} size={16} />
      </UIRow>

      <UIBool condition={isExpanded}>
        <UICol
          gap="s"
          hPadding={hPadding || padding}
          bPadding={padding}
          border={1}>
          {renderContent}
        </UICol>
      </UIBool>
    </UICol>
  );
};
