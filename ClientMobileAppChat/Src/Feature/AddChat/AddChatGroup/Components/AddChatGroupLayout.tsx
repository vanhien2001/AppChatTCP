import { Box, Button, FormControl, Input, Text, View } from 'native-base';
import React, { FC } from 'react';
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';
import tw from 'twrnc';
import { AddChatGroupForm } from '..';

interface IAddChatGroupLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<AddChatGroupForm>>;
  control: Control<AddChatGroupForm, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}

const AddChatGroupLayout: FC<IAddChatGroupLayout> = props => {
  const { error, errors, control, handleSubmit, isLoading } = props;
  return (
    <View style={tw`m-10`}>
      <Box style={tw`mb-5`}>
        <FormControl
          isDisabled={isLoading}
          isInvalid={errors.nameConversation?.message !== '' ? true : false}>
          <FormControl.Label>Group Name</FormControl.Label>
          <Controller
            name="nameConversation"
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
          {errors.nameConversation && (
            <Text style={tw`text-red-500`}>
              {errors.nameConversation.message}
            </Text>
          )}
        </FormControl>
      </Box>
      <Box>
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Create Group
        </Button>
      </Box>
    </View>
  );
};

export default AddChatGroupLayout;
