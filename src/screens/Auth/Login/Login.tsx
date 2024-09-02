import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';

import Logo from '@mobile/assets/Logo.svg';
import DefaultButton from '@mobile/components/DefaultButton';
import DoubleInput from '@mobile/components/DoubleInput';
import styles from './Login.style';
import { translator } from '@mobile/services/translate';
import navigationService from '@mobile/services/navigation';
import { LoginProps } from './types';
import { useAppDispatch } from '@mobile/redux/store';
import { authenticate } from '@mobile/redux/Auth';
import { useReduxState } from '@mobile/hooks/useReduxState';
import variables from '@mobile/config/variables';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialValues: LoginProps = {
  password: '',
  email: '',
};

const Login = () => {
  const dispatch = useAppDispatch();
  const { loginError, loginSuccess, user } = useReduxState().AuthState();
  const { loginLoading } = useReduxState().LoadingState();

  const [hidePass, setHidePass] = useState<boolean>(true);
  const [form, setForm] = useState<LoginProps>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const disabled = !form.email.trim() || !form.password.trim();

  const authenticateUser = () => {
    dispatch(authenticate(form));
    setSubmitted(true);
  };

  useEffect(() => {
    if (loginError && !loginSuccess && !loginLoading && submitted) {
      setError('ERRORS.LOGIN.AUTHENTICATE');
    }

    if (!loginError && loginSuccess && !loginLoading && submitted) {
      navigationService.reset('Content');
    }
  }, [loginError, loginSuccess, loginLoading, submitted]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <View style={styles.logoContainer}>
            <Logo width={150} height={150} />
          </View>

          <DoubleInput
            securePassword={hidePass}
            setSecurePassword={setHidePass}
            setValues={setForm}
            values={form}
          />

          <View style={styles.errorContainer}>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>

          <View style={styles.buttonContainer}>
            <DefaultButton
              buttonText={translator('SCREENS.LOGIN.BUTTONS.LOGIN')}
              onPress={authenticateUser}
              backgroundColor={
                disabled ? variables.lighterPurple : variables.primaryColor
              }
              disabled={disabled}
            />
            <View style={styles.containerWithMarginTop}>
              <DefaultButton
                buttonText={translator('SCREENS.LOGIN.BUTTONS.REGISTER')}
                onPress={() => navigationService.navigate('Register')}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
