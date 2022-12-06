import React, { FC } from 'react';
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
} from 'native-base';
import { Controller, Control, FieldErrorsImpl } from 'react-hook-form';
import { LoginFormSubmit } from '..';
import { GestureResponderEvent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../../../Routes/AuthRoutes';

interface ILoginLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<LoginFormSubmit>>;
  control: Control<LoginFormSubmit, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
}

const LoginLayout: FC<ILoginLayout> = props => {
  const { error, errors, control, handleSubmit } = props;
  const authNavigate = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView>
      <View>
        <Center style={tw`h-full`}>
          <Box w="100%" style={tw`px-10`}>
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
                    isInvalid={errors.username?.message !== '' ? true : false}>
                    <FormControl.Label>Username</FormControl.Label>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          autoCapitalize={'none'}
                        />
                      )}
                    />
                    {errors.username && (
                      <Text style={tw`text-red-500`}>
                        {errors.username.message}
                      </Text>
                    )}
                  </FormControl>
                </Box>
                <Box style={tw`mb-7`}>
                  <FormControl isInvalid>
                    <FormControl.Label>Password</FormControl.Label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          autoCapitalize={'none'}
                        />
                      )}
                    />
                    {errors.password && (
                      <FormControl.ErrorMessage style={tw`text-red-500`}>
                        {errors.password.message}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <Button onPress={handleSubmit}>Submit</Button>
                </Box>

                <Box style={tw`mt-7`}>
                  <Button onPress={() => authNavigate.navigate('Register')}>
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
