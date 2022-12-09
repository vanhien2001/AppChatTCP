import React, { FC, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import {
  Center,
  Box,
  Stack,
  Input,
  Button,
  FormControl,
  VStack,
  HStack,
  Alert,
  IconButton,
  CloseIcon,
  Text,
  Divider,
  WarningOutlineIcon,
  Pressable,
} from 'native-base';
import { Controller, Control, FieldErrorsImpl } from 'react-hook-form';
import { LoginFormSubmit } from '..';
import { GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../../../Routes/AuthRoutes';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ILoginLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<LoginFormSubmit>>;
  control: Control<LoginFormSubmit, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}

const LoginLayout: FC<ILoginLayout> = props => {
  const { error, errors, control, handleSubmit, isLoading } = props;
  const authNavigate = useNavigation<AuthScreenNavigationProp>();
  const [show, setShow] = useState(false);

  return (
    <SafeAreaView>
      <View style={tw`bg-white`}>
        <Center style={tw`h-full`}>
          <Box w="100%" style={tw`px-10`}>
            <Box>
              <Text style={tw`text-center text-5xl font-bold`}>Login</Text>
            </Box>
            <Box>
              <Stack mx="4">
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
                <Box style={tw`mb-5`}>
                  <FormControl
                    isDisabled={isLoading}
                    isInvalid={errors.username ? true : false}>
                    <FormControl.Label>Username</FormControl.Label>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          size="l"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize={'none'}
                        />
                      )}
                    />
                    {errors.username && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                        style={tw`text-red-500`}>
                        {errors.username.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Box>

                <Box style={tw`mb-7`}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <FormControl
                          isDisabled={isLoading}
                          isInvalid={errors.password ? true : false}>
                          <FormControl.Label>Password</FormControl.Label>
                          <Input
                            size="l"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
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
                      </>
                    )}
                  />
                </Box>
                <Box>
                  <Button isLoading={isLoading} onPress={handleSubmit}>
                    Submit
                  </Button>
                </Box>
                <Box style={tw`mt-7`}>
                  <Divider />
                </Box>
                <Box style={tw`mt-7`}>
                  <Button
                    isDisabled={isLoading}
                    colorScheme="success"
                    onPress={() => authNavigate.navigate('Register')}>
                    Create an Account
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default LoginLayout;
