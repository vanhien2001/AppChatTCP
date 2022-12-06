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
} from 'native-base';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, Control, FieldErrorsImpl } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';
import tw from 'twrnc';
import { RegisterFormSubmit } from '..';
import { AuthScreenNavigationProp } from '../../../../Routes/AuthRoutes';
import { useNavigation } from '@react-navigation/native';

interface IRegisterLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<RegisterFormSubmit>>;
  control: Control<RegisterFormSubmit, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
}

const RegisterLayout: FC<IRegisterLayout> = props => {
  const { error, errors, control, handleSubmit } = props;
  const authNavigate = useNavigation<AuthScreenNavigationProp>();

  return (
    <SafeAreaView>
      <View style={tw`text-black`}>
        <Center style={tw`h-full`}>
          <Box w="100%" style={tw`px-10`}>
            <Stack>
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
                <FormControl style={tw`mb-7`}>
                  <FormControl.Label>Name</FormControl.Label>
                  <Controller
                    name="name"
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
                  {errors.name && (
                    <FormControl.ErrorMessage style={tw`text-red-500`}>
                      {errors.name.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl style={tw`mb-7`}>
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
                    <FormControl.ErrorMessage style={tw`text-red-500`}>
                      {errors.username.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl style={tw`mb-7`}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Controller
                    name="password"
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
                  {errors.password && (
                    <FormControl.ErrorMessage style={tw`text-red-500`}>
                      {errors.password.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl style={tw`mb-7`}>
                  <FormControl.Label>Email</FormControl.Label>
                  <Controller
                    name="email"
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
                  {errors.email && (
                    <FormControl.ErrorMessage style={tw`text-red-500`}>
                      {errors.email.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <Box>
                  <Button onPress={handleSubmit}>Submit</Button>
                </Box>

                <Box style={tw`mt-7`}>
                  <Button onPress={() => authNavigate.navigate('Login')}>
                    Create an Account
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default RegisterLayout;
