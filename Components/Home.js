import React, { useState } from "react";

import Header from "./Header";
import ListItems from "./ListItems";
import InputModal from './InputModal';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ todos, setTodos }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [todoInputValue, setTodoInputValue] = useState();
    const [todoToBeEdited, setTodoToBeEdited] = useState(null);


    const handleClearTodos = () => {
        try {
            AsyncStorage.setItem("storedTodos", JSON.stringify([]))
            setTodos([]);
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddTodo = (todo) => {
        const newTodos = [...todos, todo];

        try {
            AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
            setTodos(newTodos);
            setModalVisible(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleTriggerEdit = (item) => {
        setTodoToBeEdited(item);
        setModalVisible(true);
        setTodoInputValue(item.title)
    }

    const handleEditTodo = (editedTodo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);

        try {
            AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
            setTodos(newTodos);
            setModalVisible(false);
            setTodoToBeEdited(null);
        } catch (error) {
            console.log(error);
        }


    }

    return (
        <>
            <Header handleClearTodos={handleClearTodos} />
            <ListItems
                todos={todos}
                setTodos={setTodos}
                handleTriggerEdit={handleTriggerEdit}
            />
            <InputModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoInputValue={todoInputValue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
                todos={todos}

            />
        </>
    );
}

export default Home;