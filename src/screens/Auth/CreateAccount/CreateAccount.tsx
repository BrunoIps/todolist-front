import React, { useEffect, useState } from 'react';
import { validateEmail, validatePassword } from '@mobile/utils/validator';
import Header from '@mobile/components/Header';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './CreateAccount.style';
import { SafeAreaView } from 'react-native-safe-area-context';

import User from '@mobile/assets/User.svg';
import EyesOpen from '@mobile/assets/Eye-Open.svg';
import EyesClose from '@mobile/assets/Eye-Close.svg';
import Password from '@mobile/assets/Locker.svg';
import Input from '@mobile/components/Input';
import Pencil from '@mobile/assets/Pencil.svg';
import variables from '@mobile/config/variables';
import { translator } from '@mobile/services/translate';
import DefaultButton from '@mobile/components/DefaultButton';
import {
  CreateAccountProps,
  IDoubleInput,
  ToggleVisibilityIconProps,
  ValidationType,
} from './types';
import { useAppDispatch } from '@mobile/redux/store';
import { RegisterAccountAction } from '@mobile/redux/Auth/action';
import { useReduxState } from '@mobile/hooks/useReduxState';
import navigationService from '@mobile/services/navigation';
import { useNextInputFocus } from '@mobile/hooks/useNextInputFocus';

const initialValues: CreateAccountProps = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
};

const securePasswordInitialValue: IDoubleInput = {
  password: true,
  confirmPassword: true,
};

const CreateAccount = () => {
  const { setInputRef, focusNextInput } = useNextInputFocus();
  const dispatch = useAppDispatch();
  const { createAccount, createAccountError } = useReduxState().AuthState();
  const { createAccountLoading } = useReduxState().LoadingState();

  const [form, setForm] = useState<CreateAccountProps>(initialValues);
  const [securePassword, setSecurePassword] = useState<IDoubleInput>(
    securePasswordInitialValue,
  );
  const [errors, setErrors] = useState<string[] | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const iconColor = variables.black;
  const buttonColor = disabled
    ? variables.lighterPurple
    : variables.primaryColor;

  const toggleStateProperty = <T extends object>(
    state: T,
    setState: (newState: T) => void,
    propertyName: keyof T,
  ) => {
    setState({
      ...state,
      [propertyName]: !state[propertyName],
    });
  };

  const AddErrors = (message: string) => {
    if (errors && errors.length > 0) {
      return setErrors([...errors, message]);
    }
    setErrors([message]);
  };

  const alreadyHasThisError = (message: string) => {
    return errors?.find(error => error === message);
  };

  const validateUserCredentials = (type: ValidationType) => {
    let canAddError;
    if (type === ValidationType.EMAIL) {
      if (!validateEmail(form.email)) {
        canAddError = alreadyHasThisError(
          translator('ERRORS.CREATE_ACCOUNT.EMAIL'),
        );

        if (!canAddError) {
          AddErrors(translator('ERRORS.CREATE_ACCOUNT.EMAIL'));
        }
      }
    }

    if (type === ValidationType.PASSWORD) {
      if (!validatePassword(form.password)) {
        canAddError = alreadyHasThisError(
          translator('ERRORS.CREATE_ACCOUNT.PASSWORD'),
        );

        if (!canAddError) {
          AddErrors(translator('ERRORS.CREATE_ACCOUNT.PASSWORD'));
        }
      }
    }
    if (type === ValidationType.CONFIRM_PASSWORD) {
      if (form.password !== form.confirmPassword) {
        canAddError = alreadyHasThisError(
          translator('ERRORS.CREATE_ACCOUNT.REPEAT_PASSWORD'),
        );

        if (!canAddError) {
          AddErrors(translator('ERRORS.CREATE_ACCOUNT.REPEAT_PASSWORD'));
        }
      }
    }

    setErrors(null);
  };

  const nextInput = (index: number, type?: ValidationType) => {
    focusNextInput(index);
    if (type) {
      validateUserCredentials(type);
    }
  };

  const submitForm = () => {
    if (!errors) {
      setSubmitted(true);
      dispatch(RegisterAccountAction(form));
    }
  };

  const ToggleVisibilityIcon: React.FC<ToggleVisibilityIconProps> = ({
    isVisible,
    onToggle,
    iconColor,
  }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onToggle}>
        {isVisible ? (
          <EyesClose width={30} height={30} color={iconColor} />
        ) : (
          <EyesOpen width={30} height={30} color={iconColor} />
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      setDisabled(true);
    }
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setDisabled(true);
    }

    if (
      !errors &&
      form.name &&
      form.email &&
      form.password &&
      form.confirmPassword
    ) {
      setDisabled(false);
    }
  }, [form, errors]);

  useEffect(() => {
    if (
      submitted &&
      createAccountLoading &&
      createAccount &&
      createAccountError === null
    ) {
      return navigationService.navigate('Login');
    }

    if (createAccountError) {
      const canAddError = alreadyHasThisError(
        translator('ERRORS.GENERIC.GENERIC'),
      );

      if (!canAddError) {
        AddErrors('ERRORS.GENERIC.GENERIC');
      }
    }
  }, [submitted, createAccountLoading, createAccount, createAccountError]);

  return (
    <SafeAreaView>
      <Header back screenName="Cadastrar" />
      <View style={styles.container}>
        <View style={styles.column}>
          <Input
            StartIcon={<Pencil width={30} height={30} color={iconColor} />}
            placeholder={translator('SCREENS.LOGIN.REGISTER.NAME')}
            value={form?.name}
            onChangeText={(name: string) => setForm({ ...form, name })}
            autoCapitalize="none"
            ref={setInputRef(0)}
            onSubmitEditing={() => nextInput(0)}
          />
        </View>
        <View style={styles.column}>
          <Input
            StartIcon={<User width={30} height={30} color={iconColor} />}
            placeholder={translator('SCREENS.LOGIN.INPUTS.EMAIL')}
            value={form?.email}
            onChangeText={(email: string) => setForm({ ...form, email })}
            onSubmitEditing={() => nextInput(1, ValidationType.EMAIL)}
            autoCapitalize="none"
            ref={setInputRef(1)}
          />
        </View>
        <View style={styles.column}>
          <Input
            autoCapitalize="none"
            value={form?.password}
            secureTextEntry={securePassword.password}
            onChangeText={(password: string) => setForm({ ...form, password })}
            StartIcon={<Password width={30} height={30} color={iconColor} />}
            EndIcon={
              <ToggleVisibilityIcon
                isVisible={securePassword.password}
                onToggle={() =>
                  toggleStateProperty(
                    securePassword,
                    setSecurePassword,
                    'password',
                  )
                }
                iconColor={iconColor}
              />
            }
            placeholder={translator('SCREENS.LOGIN.INPUTS.PASSWORD')}
            onSubmitEditing={() => nextInput(1, ValidationType.PASSWORD)}
            ref={setInputRef(2)}
          />
        </View>

        <View style={styles.column}>
          <Input
            autoCapitalize="none"
            onSubmitEditing={() =>
              nextInput(2, ValidationType.CONFIRM_PASSWORD)
            }
            value={form?.confirmPassword}
            secureTextEntry={securePassword.confirmPassword}
            onChangeText={(confirmPassword: string) =>
              setForm({ ...form, confirmPassword })
            }
            StartIcon={<Password width={30} height={30} color={iconColor} />}
            EndIcon={
              <ToggleVisibilityIcon
                isVisible={securePassword.password}
                onToggle={() =>
                  toggleStateProperty(
                    securePassword,
                    setSecurePassword,
                    'confirmPassword',
                  )
                }
                iconColor={iconColor}
              />
            }
            placeholder={translator('SCREENS.LOGIN.INPUTS.REPEAT_PASSWORD')}
            ref={setInputRef(3)}
          />
        </View>
        {errors &&
          errors.length > 0 &&
          errors.map(error => <Text style={styles.errorText}>* {error}</Text>)}
      </View>
      <View style={styles.buttonContainer}>
        <DefaultButton
          buttonText={translator('SCREENS.LOGIN.BUTTONS.REGISTER')}
          onPress={submitForm}
          backgroundColor={buttonColor}
          disabled={disabled}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;
