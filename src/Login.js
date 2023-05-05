import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();

    React.useEffect(() => {
      checkUserId(); // Check AsyncStorage for user ID on component mount
    }, []);
  
    const checkUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('id');
        if (userId != null && userId != '') {
          navigation.navigate('todo');
        }
      } catch (error) {
        console.error('Error checking user ID:', error);
      }
    };


const goToSignup = () => {
  navigation.navigate('Signup');
};
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://wincolors.in/API/login.php?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.message=='Login successful.') {
        setErrorMessage('');
      
        await AsyncStorage.setItem('id', data.user.id);
        const value = await AsyncStorage.getItem('id');
        setSuccessMessage('Success! You are logged in.');
        if (value != null && value != '') {
          navigation.replace('todo')
        }
        
        ;
      } else {
        setSuccessMessage(''); 
        setErrorMessage(data.message);
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.dontacc} onPress={goToSignup}>Don't Have an Account?</Text>
      </View>
      {successMessage && <Text style={[styles.message, styles.successMessage]}>{successMessage}</Text>}
      {errorMessage && <Text style={[styles.message, styles.errorMessage]}>{errorMessage}</Text>}
    </View>
  );
};
export default Login;