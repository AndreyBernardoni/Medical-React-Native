import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { UIBlock } from '../Block';
import { SIZING } from '../../../constants/sizing';

type UIImageProps = {
  source: ImageSourcePropType | string;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  radius?: number;
};

export const UIImage: React.FC<UIImageProps> = ({
  source,
  resizeMode,
  radius,
  ...props
}) => {
  const image = React.useMemo<ImageSourcePropType | null>(() => {
    if (source) {
      if (typeof source === 'string') {
        return { uri: source };
      } else {
        return source;
      }
    }
    return null;
  }, [source]);

  const borderRadius = React.useMemo(() => {
    if (radius) {
      if (typeof radius === 'string') {
        return SIZING[radius];
      } else {
        return radius;
      }
    }
    return 0;
  }, [radius]);

  if (!image) {
    return null;
  }

  return (
    <UIBlock radius={radius} {...props}>
      <Image
        {...props}
        source={image}
        borderRadius={borderRadius}
        resizeMode={resizeMode}
        resizeMethod="scale"
        progressiveRenderingEnabled
      />
    </UIBlock>
  );
};

UIImage.defaultProps = {
  resizeMode: 'cover',
};
