import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Stack,
  View,
} from 'native-base';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, Control } from 'react-hook-form';
import tw from 'twrnc';
import { FormSubmit } from '..';
import { GestureResponderEvent } from 'react-native';

interface IEnterAddressEndpointLayout {
  control: Control<FormSubmit, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
}

const EnterAddressEndpointLayout: FC<IEnterAddressEndpointLayout> = props => {
  const { control, handleSubmit } = props;

  return (
    <SafeAreaView>
      <View style={tw`text-black`}>
        <Center style={tw`h-full`}>
          <Box w="100%" style={tw`px-10`}>
            <Stack>
              <Box>
                <FormControl style={tw`mb-7`}>
                  <FormControl.Label>IP Address</FormControl.Label>
                  <Controller
                    name="address"
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
                </FormControl>

                <FormControl style={tw`mb-7`}>
                  <FormControl.Label>Port</FormControl.Label>
                  <Controller
                    name="port"
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
                </FormControl>

                <Box>
                  <Button onPress={handleSubmit}>Submit</Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Center>
      </View>
    </SafeAreaView>
  );
};

export default EnterAddressEndpointLayout;
