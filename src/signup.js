import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './css';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
const navi = useNavigation();
const goToLogin = () =>{
    const loginnavi = navi.navigate('Login');
}

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (password === cpassword) {
        const response = await fetch(
          `https://wincolors.in/API/resigtion.php?username=${username}&password=${password}&role=1`
        );
        const data = await response.json();
  
        if (data.message=='User data inserted successfully.') {
          setErrorMessage('');
          setSuccessMessage('Success! Account created');
          navi.navigate('Login');
        } else {
          setSuccessMessage('');
          setErrorMessage(data.message);
        }
      } else {
        setSuccessMessage('');
        setErrorMessage('Password and Confirm Password do not match.');
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
         <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={cpassword}
          onChangeText={(text) => setcPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Text style={styles.dontacc} onPress={goToLogin} >Already account.</Text>
      </View>
      {successMessage && <Text style={[styles.message, styles.successMessage]}>{successMessage}</Text>}
      {errorMessage && <Text style={[styles.message, styles.errorMessage]}>{errorMessage}</Text>}
    </View>
  );
};

export default Signup;
