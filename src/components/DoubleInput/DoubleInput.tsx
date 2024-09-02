import React from 'react';

import User from '@mobile/assets/User.svg';
import EyesOpen from '@mobile/assets/Eye-Open.svg';
import EyesClose from '@mobile/assets/Eye-Close.svg';
import Password from '@mobile/assets/Locker.svg';
import Input from '@mobile/components/Input';
import { TouchableOpacity, View } from 'react-native';
import styles from './DoubleInput.styles';
import variables from '@mobile/config/variables';
import { translator } from '@mobile/services/translate';

interface Login {
  email: string;
  password: string;
}

interface IDoubleInput {
  values: Login;
  setValues: (value: Login) => void;
  securePassword: boolean;
  setSecurePassword: (secure: boolean) => void;
}

const DoubleInput = ({
  securePassword,
  setSecurePassword,
  setValues,
  values,
}: IDoubleInput) => {
  const iconColor = variables.black;

  return (
    <View>
      <View style={styles.column}>
        <Input
          autoCapitalize="none"
          StartIcon={<User width={30} height={30} color={iconColor} />}
          placeholder={translator('SCREENS.LOGIN.INPUTS.EMAIL')}
          value={values?.email}
          onChangeText={(email: string) => setValues({ ...values, email })}
        />
      </View>
      <View style={styles.column}>
        <Input
          autoCapitalize="none"
          value={values?.password}
          secureTextEntry={securePassword}
          onChangeText={(password: string) =>
            setValues({ ...values, password })
          }
          StartIcon={<Password width={30} height={30} color={iconColor} />}
          EndIcon={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSecurePassword(!securePassword)}>
              {!securePassword ? (
                <EyesOpen width={30} height={30} color={iconColor} />
              ) : (
                <EyesClose width={30} height={30} color={iconColor} />
              )}
            </TouchableOpacity>
          }
          placeholder={translator('SCREENS.LOGIN.INPUTS.PASSWORD')}
        />
      </View>
    </View>
  );
};

export default DoubleInput;
