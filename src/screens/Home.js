import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import CommentForm from '../components/CommentForm';
import { auth, db } from '../firebase/config';
import { FlatList } from 'react-native-web';
import Post from "../components/Post"
import firebase from 'firebase';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            posts: []
        };
    }
    componentDidMount() {
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    console.log(doc)
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                        loading: false
                    })
                })

            })
    }



    render() {
        if (!this.state.loading) {
            console.log(this.state.posts)
            return (
                <View style={styles.container}>
                    <FlatList style={styles.flatList}
                        data={this.state.posts}
                        keyExtractor={ item => item.id.toString() }
                        renderItem={({ item }) => 
                        
                        <Post email = {item.data.email} post = {item.data.post} createdAt = {item.data.createdAt} id = {item.id} likedBy = {item.data.likedBy}/>
                    }
                    />

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "30px",
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
    error: {
        color: "red"
    },
    field: {
        width: "50vw",
        marginBottom: "5%",
        padding: "1vh",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1
    },
    login: {
        fontSize: 20,
        marginBottom: "5%",
        marginTop: "5%"

    },
    line:{
        marginBottom: "10px",
    },
    mail:{
        marginBottom: "20px",
    },
    title:{
        fontSize: "50px",
        fontWeight: "bold",
        marginBottom: "5%"
    },
    flatList: {
        width: "50vw",
        overflow: "hidden",
        marginBottom: "10px",
        marginTop: "10px",
        

    }
    
    
    
});

export default Home

