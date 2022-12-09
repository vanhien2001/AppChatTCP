import React, { FC } from 'react';
import { Box, Button, FormControl, Input, Text, View } from 'native-base';
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';
import tw from 'twrnc';
import { AddChatPrivateForm } from '..';

interface IAddChatPrivateLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<AddChatPrivateForm>>;
  control: Control<AddChatPrivateForm, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}

const AddChatPrivateLayout: FC<IAddChatPrivateLayout> = props => {
  const { error, errors, control, handleSubmit, isLoading } = props;
  return (
    <View style={tw`m-10`}>
      <Box style={tw`mb-5`}>
        <FormControl
          isDisabled={isLoading}
          isInvalid={errors.email?.message !== '' ? true : false}>
          <FormControl.Label>Email / phone</FormControl.Label>
          <Controller
            name="email"
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
          {errors.email && (
            <Text style={tw`text-red-500`}>{errors.email.message}</Text>
          )}
        </FormControl>
      </Box>
      <Box>
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Create private chat
        </Button>
      </Box>
    </View>
  );
};

export default AddChatPrivateLayout;
