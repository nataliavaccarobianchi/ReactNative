import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase/config';
import React, { Component } from 'react';




class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user == null){
            this.setState({loggedIn: false})
            }
            else{
                this.setState({loggedIn: true})
            }
            
                
            

        })
    }

    logout() {
        this.props.navigation.navigate("Login")
        auth.signOut()
        this.setState({ loggedIn: false })
    }
    

    render() {
        return (
            <View>
                <Text>Bienvenido, {this.state.loggedIn ? auth.currentUser.email : "Guest"}</Text>
                <TouchableOpacity
                    onPress={() => this.logout()}>
                    <Text style={styles.boton}>Desloguear</Text>
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
        backgroundColor: "orange",
        paddingBottom: "2vh",
        paddingTop: "2vh",
        width: "50vw",
        textAlign: "center",
        borderRadius: 10

    }
});

export default Profile;