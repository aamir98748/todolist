import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { styles } from './css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedid, setEditedid] = useState('');
  const [newTodoText, setNewTodoText] = useState('');
  const [newtodo, setNewtodo] = useState('');
  const [todoval, settodoval] = useState('');
  const [tval, settval] = useState('');

  useEffect(() => {
    fetchTodos();
    const interval = setInterval(fetchTodos, 500); // Fetch updates every 5 seconds
    return () => clearInterval(interval); 
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://wincolors.in/API/todoFetch.php');
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(todos)) {
        setTodos(data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  
  const handleEdit = (index, name) => {
    setEditingIndex(index);
    setEditedText(name);
  };
  

  const handleSave = async (index) => {
    try {
      const todo = todos[index];
      const response = await fetch(`https://wincolors.in/API/todoUpdate.php?name=${editedText}&id=${todo.id}`);
      const data = await response.json();
      setEditingIndex('-1');
      console.log(data.message);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };
  

  const handleDelete = async (index) => {
    try {
      const todo = todos[index];
      const response = await fetch(`https://wincolors.in/API/todoDel.php?id=${todo.id}`);
      const data = await response.json();
      console.log(data.message);
      // Remove the deleted todo from the todos array
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  

  const newtodos = async () =>{
   try {
    if(newtodo.length>0){
            const response = fetch(`https://wincolors.in/API/todoRes.php?name=${newtodo}`);
    const data = await response.json();
    settodoval(data.id);
}

    // fetchTodos();
    
   } catch (error) {
     
   }
  }

  const handleAddTodo = () => {
    if (newTodoText.trim() === '') {
      return; 
    }

    const newTodo = {
      keyyyy: newTodoText,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoText('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.addTodoContainer}>
      <TextInput
        style={styles.input}
        placeholder='Add todo'
        onChangeText={(t)=> setNewtodo(t)}
      />
      <Text style={styles.addbtn} onPress={newtodos} >add</Text>
      </View>

      {todos.map((todo, index) => (
        <View key={index} style={styles.todoItem}>
  {editingIndex === index ? (
    <TextInput
      style={styles.editInput}
      value={editedText}
      onChangeText={(text) => setEditedText(text)}
    />
  ) : (
    <Text style={styles.todoText}>
      ID: {todo.id} -  {todo.name}
    </Text>
  )}
  <View style={styles.buttonsContainer}>
    {editingIndex === index ? (
        <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(index)}>
  <Text style={styles.buttonText}>Save</Text>
</TouchableOpacity>

    ) : (
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEdit(index, todo.name)}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => handleDelete(index)}
    >
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  </View>
</View>

      ))}
      <Text>{todoval}</Text>
    </View>
  );
};

export default TodoList;