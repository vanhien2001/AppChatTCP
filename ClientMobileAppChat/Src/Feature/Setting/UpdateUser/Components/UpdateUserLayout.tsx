import React, { FC } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  View,
  WarningOutlineIcon,
} from 'native-base';
import { Control, Controller, FieldErrorsImpl } from 'react-hook-form';
import { GestureResponderEvent } from 'react-native';
import tw from 'twrnc';
import { UpdateUserForm } from '..';

interface IUpdateUserLayout {
  error: string;
  errors: Partial<FieldErrorsImpl<UpdateUserForm>>;
  control: Control<UpdateUserForm, any>;
  handleSubmit: (event: GestureResponderEvent) => void;
  isLoading: boolean;
}
const UpdateUserLayout: FC<IUpdateUserLayout> = props => {
  const { error, errors, control, handleSubmit, isLoading } = props;
  return (
    <View style={tw`m-10`}>
      <Box style={tw`mb-5`}>
        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={errors.username ? true : false}
              style={tw`mb-5`}>
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
          name="phoneNumber"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={errors.phoneNumber ? true : false}
              style={tw`mb-5`}>
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
              isInvalid={errors.email ? true : false}
              style={tw`mb-5`}>
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
      </Box>
      <Box>
        <Button isLoading={isLoading} onPress={handleSubmit}>
          Save
        </Button>
      </Box>
    </View>
  );
};

export default UpdateUserLayout;
