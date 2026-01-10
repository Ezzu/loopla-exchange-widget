import type { ComponentProps } from 'react';
import type { IconType } from 'react-icons';
import { Icon } from 'components';

type WithIconProps = Omit<ComponentProps<typeof Icon>, 'icon'>;

const withIcon = (IconComponent: IconType) => {
  return function WrappedIcon(props: WithIconProps) {
    return <Icon icon={IconComponent} {...props} />;
  };
};

export default withIcon;
