import type { IconProps } from 'types';

const Icon = ({ size = 32, icon: IconComponent }: IconProps) => <IconComponent size={size} />;

export default Icon;
