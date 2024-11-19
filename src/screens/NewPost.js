import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';




class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post : ""
        };
    }

    Post(post){
        db.collection('posts').add({
            email: auth.currentUser.email,
            post: post,
            likedBy: "",
            createdAt: Date.now()
        })
        
        
         .then( response => {
            
             this.props.navigation.navigate("Home");
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
                <Text style={styles.register}>New Post:</Text>
            
                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Mensaje'
                    onChangeText={text => this.setState({ post: text })}
                    value={this.state.post} />
                <TouchableOpacity  onPress={() => this.Post(this.state.post)}>
                    <Text style={styles.boton}> Post </Text>
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

export default NewPost

