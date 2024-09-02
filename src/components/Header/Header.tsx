import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './Header.style';
import ArrowLeft from '@mobile/assets/Arrow-Left.svg';
import navigationService from '@mobile/services/navigation';
import variables from '@mobile/config/variables';

interface HeaderProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  leftOnPress?: () => void;
  rightOnPress?: () => void;
  screenName?: string;
  back?: boolean;
}

const Header = ({
  leftIcon,
  rightIcon,
  leftOnPress,
  rightOnPress,
  screenName,
  back,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {leftIcon && !back && (
        <TouchableOpacity activeOpacity={0.7} onPress={leftOnPress}>
          {leftIcon}
        </TouchableOpacity>
      )}
      {back && (
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          activeOpacity={0.7}
          onPress={() => navigationService.goBack()}>
          <ArrowLeft width={50} height={50} color={variables.black} />
        </TouchableOpacity>
      )}
      <View style={styles.middleContainer}>
        {screenName && <Text style={styles.title}>{screenName}</Text>}
      </View>
      {rightIcon && (
        <TouchableOpacity activeOpacity={0.7} onPress={rightOnPress}>
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
