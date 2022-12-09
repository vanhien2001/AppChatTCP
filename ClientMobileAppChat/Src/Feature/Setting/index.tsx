import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'native-base';
import React from 'react';
import { logOut } from '../../Context/slices/authSlice';
import { useAppDispatch } from '../../Hook/redux';
import { AuthScreenNavigationProp } from '../../Routes/AuthRoutes';
import { GestureResponderEvent } from 'react-native';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreenNavigationProp } from '../../Routes/HomeNavigator';

const Setting = () => {
  const dispatch = useAppDispatch();
  const authNavigation = useNavigation<AuthScreenNavigationProp>();
  const homeNavigation = useNavigation<HomeScreenNavigationProp>();

  const handleLogout = async (e: GestureResponderEvent) => {
    await dispatch(logOut());
    authNavigation.navigate('Login');
  };

  return (
    <View style={tw`bg-white h-full`}>
      <TouchableOpacity onPress={() => homeNavigation.navigate('UpdateUser')}>
        <View style={tw`h-16 flex-row items-center px-6`}>
          <Icon name="person" size={25} style={tw`text-gray-500`} />
          <Text style={tw`text-lg font-medium pl-4`}>Profile</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => homeNavigation.navigate('AddChatPrivate')}>
        <View style={tw`h-16 flex-row items-center px-6`}>
          <Icon name="person-add" size={25} style={tw`text-gray-500`} />
          <Text style={tw`text-lg font-medium pl-4`}>Add chat private</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => homeNavigation.navigate('AddChatGroup')}>
        <View style={tw`h-16 flex-row items-center px-6`}>
          <Icon name="group-add" size={25} style={tw`text-gray-500`} />
          <Text style={tw`text-lg font-medium pl-4`}>Add chat group</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <View style={tw`h-16 flex-row items-center px-6`}>
          <Icon name="logout" size={25} style={tw`text-gray-500`} />
          <Text style={tw`text-lg font-medium pl-4`}>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;
