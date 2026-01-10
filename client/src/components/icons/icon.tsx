import type { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  size?: number;
}

const Icon = ({ size = 32, icon: IconComponent }: IconProps) => <IconComponent size={size} />;

export default Icon;
