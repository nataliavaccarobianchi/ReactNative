import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            registered: false,
            error: ' '
        };
    }


    

    register(email, pass, user){
        db.collection('users').add({
            email: email,
            username: user,
            createdAt: Date.now()
        })
        auth.createUserWithEmailAndPassword(email, pass)
        
         .then( response => {
             this.setState({registered: true});
             this.setState({loggedIn: true});
             this.props.navigation.navigate("HomeMenu");
          })     
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('Error registering user:', errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
      }
     
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.register}>Register</Text>
                <TextInput style={styles.field}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='username'
                    onChangeText={text => this.setState({ username: text })}
                    value={this.state.username} />
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'                    
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}/>
                <TouchableOpacity  onPress={() => this.register(this.state.email,this.state.password,this.state.username)}>
                    <Text style={styles.boton}> Register </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={styles.boton}>Ya tengo cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("HomeMenu")}>
                    <Text style={styles.boton}>Iniciar como invitado</Text>
                </TouchableOpacity> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    boton: {
        backgroundColor: "lightblue",
        paddingBottom: "2vh",
        paddingTop: "2vh",
        width: "50vw",
        textAlign: "center",
        borderRadius: 10,
        marginBottom: "5%"

    },
    field: {
        width: "50vw",
        marginBottom: "5%",
        padding: "1vh",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
    register: {
        fontSize: 20,
        marginBottom: "5%",
        marginTop: "5%"

    }
});

export default Register

