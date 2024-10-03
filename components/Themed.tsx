import { Text as DefaultText, View as DefaultView } from 'react-native';
import Colors from '@/constants/Colors';

type ThemeProps = {
  customColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(colorName: keyof typeof Colors) {
  return Colors[colorName]; 
}

export function Text(props: TextProps) {
  const { style, customColor, ...otherProps } = props;
  const color = customColor || useThemeColor("black"); 

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, customColor, ...otherProps } = props;
  const backgroundColor = customColor || useThemeColor("white");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
