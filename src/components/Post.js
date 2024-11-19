import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';



class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.setState({
            liked: this.props.likedBy.includes(auth.currentUser.email) ? true : false
        })
    }

    Like() {

        var likedBy = this.props.likedBy + "," + auth.currentUser.email
        this.setState({
            liked: true
        })
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likedBy: likedBy
            })

    }

    User(usuario) {
        return usuario != auth.currentUser.email;
    }

    Unlike() {

        var userliked = this.props.likedBy.split(",")
        var likedBy = userliked.filter(this.User)
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likedBy: likedBy.join(",")
            })

        this.setState({
            liked: false
        })
    }

    render() {

        var likecount = this.props.likedBy.split(",").length - 1
        return (
            <View style={styles.container}>

                <>
                    <View style={styles.user}>
                        <FontAwesome name="user-circle" size={24} color="black" />
                        <Text style={styles.mail}>    {this.props.email} </Text>
                    </View>
                    <Text style={styles.post}> {this.props.post} </Text>
                    <Text>created: {new Date(this.props.createdAt).toLocaleString()} </Text>
                    <View style={styles.like}>
                        <TouchableOpacity onPress={() => this.state.liked ? this.Unlike() : this.Like()}>
                            {this.state.liked ? <AntDesign name="heart" size={24} color="red" /> : <AntDesign name="hearto" size={24} color="black" />}
                        </TouchableOpacity>
                        {<Text style={styles.likeNumber}>{likecount}</Text>}
                    </View>

                </>



            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: "30px",
        width: "50vw",
        padding: "10px",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        marginRight: "10px",
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    mail: {
        fontWeight: 'bold'
    },
    post: {
        marginBottom: "10px",
        padding: "10px",
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "lightblue",
        marginTop: "10px",
        alignSelf: "center",
        justifyContent: "center"
    }
    ,
    like: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
    },
    likeNumber: {
        marginLeft: "5px"
    },

});

export default CommentForm;