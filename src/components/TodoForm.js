import React from 'react';
import {  View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import Input from './Input';
import { addTodo, updateTodo, setTodoText } from '../actions';

class TodoForm extends React.Component {
    onChangeText(text) {
        this.props.dispatchSetTodoText(text);
    }

    onPress() {
        const { todo } = this.props;
        if(todo.id)
            return this.props.dispatchUpdateTodo(todo);
        this.props.dispatchAddTodo(todo.text);
    }

    render() {
        const { text, id } = this.props.todo;
        return (
        <View  style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Input 
                    onChangeText={text => this.onChangeText(text)}
                    value={text}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => this.onPress()}
                    title={id ? "Save" : "Add"}    
                />
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 4
    },
    buttonContainer: {
        paddingTop: 5,
        flex: 1
    }
});


const mapStateToProps = state => {
    return {
        todo: state.editingTodo
    }
}

export default connect(
    mapStateToProps,
    {
        dispatchAddTodo: addTodo,
        dispatchSetTodoText: setTodoText,
        dispatchUpdateTodo: updateTodo
    }
)(TodoForm);