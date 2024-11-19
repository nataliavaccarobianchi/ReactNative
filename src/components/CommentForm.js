import { View, Text, StyleSheet, Image, TextInput,TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    onSubmit(){
        console.log(this.state.comment)
    };

    render() {
    return (
        <View style={styles.container}>
            <Text style={styles.comments}>Comments</Text>
            <TextInput style={styles.field}
                keyboardType='default'
                placeholder='comments'
                onChangeText={text => this.setState({ comment: text })}
                value={this.state.comment} />
            <Text style={styles.text}>{this.state.comment}</Text>
            <TouchableOpacity onPress={() => this.onSubmit}>
                <Text style={styles.boton}> Comentar </Text>
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
    botonHome: {
        backgroundColor: "orange",
        paddingBottom: "2vh",
        paddingTop: "2vh",
        width: "50vw",
        textAlign: "center",
        borderRadius: 10

    }, 
    field: {
        width: "50vw",
        padding: "1vh",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
    text: {
        fontSize: 20,
        marginBottom: "5%",
        alignSelf: "flex-start"
    },
    comments: {
        fontSize: 20,
        marginBottom: "5%",
        marginTop: "10%"

    }
});

export default CommentForm;