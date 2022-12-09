import {
  Alert,
  Box,
  Button,
  Center,
  CloseIcon,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  View,
  IconButton,
  VStack,
  Divider,
  WarningOutlineIcon,
  Pressable,
  KeyboardAvoidingView,
} from 'native-base';
import React, { FC, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, Control, FieldErrorsImpl } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';
import tw from 'twrnc';
import { RegisterFormSubmit } from '..';
import { AuthScreenNavigationProp } from '../../../../Routes/AuthRoutes';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IRegisterLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<RegisterFormSubmit>>;
  control: Control<RegisterFormSubmit, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
}

const RegisterLayout: FC<IRegisterLayout> = props => {
  const { error, errors, control, handleSubmit } = props;
  const [show, setShow] = useState(false);
  const authNavigate = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <View style={tw`text-black bg-white`}>
          <Center style={tw`h-full`}>
            <Box w="100%" style={tw`px-10`}>
              <Stack>
                <Box>
                  <Text style={tw`text-center text-5xl font-bold`}>
                    Register
                  </Text>
                </Box>
                <Box style={tw`mb-5`}>
                  {error && (
                    <Alert maxW="400" status="error">
                      <VStack space={1} flexShrink={1} w="100%">
                        <HStack
                          flexShrink={1}
                          space={2}
                          alignItems="center"
                          justifyContent="space-between">
                          <HStack flexShrink={1} space={2} alignItems="center">
                            <Alert.Icon />
                            <Text style={tw`text-base`}>Error!</Text>
                          </HStack>
                          <IconButton
                            variant="unstyled"
                            _focus={{
                              borderWidth: 0,
                            }}
                            icon={<CloseIcon size="3" />}
                            _icon={{
                              color: 'coolGray.600',
                            }}
                          />
                        </HStack>
                        <Box
                          pl="6"
                          _dark={{
                            _text: {
                              color: 'coolGray.600',
                            },
                          }}>
                          {error}
                        </Box>
                      </VStack>
                    </Alert>
                  )}
                </Box>

                <Box>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl
                        isInvalid={errors.name ? true : false}
                        style={tw`mb-5`}>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input
                          size="l"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize={'none'}
                        />
                        {errors.name && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}
                            style={tw`text-red-500`}>
                            {errors.name.message}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="username"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl
                        style={tw`mb-5`}
                        isInvalid={errors.username ? true : false}>
                        <FormControl.Label>Username</FormControl.Label>
                        <Input
                          size="l"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize={'none'}
                        />
                        {errors.username && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}
                            style={tw`text-red-500`}>
                            {errors.username.message}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl
                        style={tw`mb-5`}
                        isInvalid={errors.password ? true : false}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                          size="l"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize={'none'}
                          type={show ? 'text' : 'password'}
                          InputRightElement={
                            <Pressable onPress={() => setShow(!show)}>
                              <Icon
                                name={show ? 'visibility' : 'visibility-off'}
                                size={20}
                                style={tw`mr-2 text-gray-400`}
                                color="muted.400"
                              />
                            </Pressable>
                          }
                        />
                        {errors.password && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}
                            style={tw`text-red-500`}>
                            {errors.password.message}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl
                        style={tw`mb-5`}
                        isInvalid={errors.phoneNumber ? true : false}>
                        <FormControl.Label>Phone Number</FormControl.Label>
                        <Input
                          size="l"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize={'none'}
                        />
                        {errors.phoneNumber && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}
                            style={tw`text-red-500`}>
                            {errors.phoneNumber.message}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <FormControl
                        style={tw`mb-5`}
                        isInvalid={errors.email ? true : false}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                          size="l"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize={'none'}
                        />
                        {errors.email && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}
                            style={tw`text-red-500`}>
                            {errors.email.message}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                    )}
                  />

                  <Box>
                    <Button onPress={handleSubmit}>Submit</Button>
                  </Box>
                  <Box style={tw`mt-7`}>
                    <Divider />
                  </Box>
                  <Box style={tw`mt-7`}>
                    <Button
                      colorScheme="success"
                      onPress={() => authNavigate.navigate('Login')}>
                      Already have an account
                    </Button>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Center>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterLayout;
