import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform, ScrollView, SafeAreaView, TouchableOpacityBase,

} from "react-native";


import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {  Content } from 'native-base'
import { Octicons } from '@expo/vector-icons';


import Colors from '../../constants/Colors';

import * as usersActions from '../../store/actions/users';
import * as postsActions from '../../store/actions/posts';
 
import { useDispatch, useSelector } from "react-redux";
import ENV from '../../env';
import MenuItem from "../../components/UI/MenuItem";
import ContactMenu from "../../components/UI/ContactMenu";
import { showMessage } from "react-native-flash-message";
import VerifiedUser from "../../constants/VerifiedUser";




const UserProfileScreen = (props) => {

    const { route } = props;
    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];
    const navigation = useNavigation();
    let userId;

    if (route.params && route.params.userId) {
        userId = route.params.userId;
    } else {
        userId = useSelector(state => state.auth.user._id);
    }

    const users = useSelector(state => state.users.allUsers);
    const posts = useSelector(state => state.posts.allPosts);
    const currUser = users.filter(u => u._id === userId)[0];
    const currUserPosts = posts.filter(p => p.postedBy._id === userId);

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');

    const [eventSelected, setEventSelected] = useState('uk');

    const dispatch = useDispatch();


    const loadUsers = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(usersActions.fetchUsers());
            await dispatch(postsActions.fetchPosts());
        } catch (err) {
            console.log(err);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading]);

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    const checkFollow = (userId) => {
        const isFollowed = loggedInUser.following.filter(f => f._id === userId).length !== 0;
        return isFollowed;
    }

    const followUserHandler = async () => {
        let user = { ...currUser };
        delete user.created;
        delete user.followers;
        delete user.following;
        // setIsFollowLoading(true);

        if (checkFollow(user._id)) {
            showMessage({
                // message: `Your have unfollowed ${user.name}.`,
                message: `Contact retiré.`,
                type: "warning",
                duration: 3000,
                icon: { icon: "warning", position: 'left' }
            });
            await dispatch(usersActions.unfollowUser(user))
        } else {
            showMessage({
                message: `Contact ajouté.`,
                type: "success",
                duration: 3000,
                icon: { icon: "success", position: 'left' }
            });
            await dispatch(usersActions.followUser(user))
        }
        // setIsFollowLoading(false);
    }

    const renderSectionOne = () => {
           if (currUserPosts.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderTopColor: '#D3C545' }} >
                    <Text style={{ fontSize: 20, marginTop: 25, color: "#D3C545" }} >No Posts</Text>
                    { currUser._id === loggedInUserId && (
                        <Button
                            style={{ backgroundColor: Colors.gold, padding: 10, borderRadius: 25, marginTop: 15 }}
                            onPress={() => props.navigation.navigate('CreatePost')}
                        >
                            <Text style={{ color: '#000', fontWeight: 'bold' }} >Create Post</Text>
                        </Button>
                    )}

                </View>
            )
        }

        
        return currUserPosts.map((post, index) => {
            return (


                <View style={styles.mediaImageContainer} key={index}>
                    <Image
                        style={styles.image} resizeMode="cover"

                        source={
                            post.updated ? (
                                { uri: `http://10.0.2.2:5000/post/photo/${post._id}?${new Date(post.updated)}` }
                            ) : (
                                { uri: `http://10.0.2.2:5000/post/photo/${post._id}` }
                            )
                        }
                    />
                </View>





            )
        })
    }  

    const renderSection = () => {
        return (


            <View style={{ marginTop: 32 }}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                    {renderSectionOne()}

                </ScrollView>



            </View>




        )
    }


    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.gold} />
            </View>
        );
    }


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }



    var toParent = {
        followUserHandler: followUserHandler,
        checkFollow: checkFollow,
        currenUser: currUser._id,
        isFollowLoading: isFollowLoading,
    }




    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Content
                    refreshControl={
                        <RefreshControl refreshing={isRefreshing} onRefresh={loadUsers} />
                    }
                >
                    <View >
                        {/** User Photo Stats**/}


                        <Text style={{ color: 'white', fontSize: 10 }}>mon fghghfg</Text>
                        <View >
                            {/**User photo  **/}

                            <View style={{ alignSelf: "center" }}>
                                <View
                                    style={styles.profileImage}>
                                    <Image
                                        source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${currUser._id}?${new Date(currUser.updated)}` }}
                                        onError={onImageErrorHandler}
                                        style={styles.image}
                                    />


                                </View>


                                {/**black box with shadow  **/}
                                <View >
                                    <LinearGradient
                                        // Button Linear Gradient
                                        colors={['black', 'transparent']}
                                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                        style={{ height: 200, width: 350, opacity: 1.0, marginTop: -190 }}
                                    >
                                    </LinearGradient>
                                </View>


                                <View >
                                    <LinearGradient
                                        // Button Linear Gradient
                                        colors={['black', 'transparent']}
                                        start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
                                        style={{ height: 200, width: 350, opacity: 0.2, marginTop: -190 }}
                                    >
                                    </LinearGradient>
                                </View>





                          



                            </View>


                            {/**User infos here  **/}




                            <View style={styles.infoContainer}>
                                <View  >
                                    <Text style={[styles.text, { fontSize: 30 }]}>
                                        {currUser.username + " "}
                                        {
                                            VerifiedUser.verifiedUsersId.includes(currUser._id) && <Octicons name="verified" size={20} color={Colors.gold} />
                                        }
                                    </Text>

                                </View>



                                <View style={{ marginTop: -25 }}>

                                    {userId === loggedInUserId ? (  //my profile

                                        <View style={{ flexDirection: 'row' }}>


                                            <TouchableOpacity
                                                onPress={() => props.navigation.navigate('agenda')}
                                                style={{ alignItems: 'center', margin: 10 }}>
                                                <Image
                                                    style={styles.icons}
                                                    source={require('../../assets/icons/agenda.png')}
                                                ></Image>
                                                <Text style={{ color: 'white', fontSize: 10 }}>Consulter</Text>
                                                <Text style={{ color: 'white', fontSize: 10 }}>mon Agenda</Text>
                                            </TouchableOpacity>



                                            <TouchableOpacity

                                                style={{ alignItems: 'center', margin: 10 }}>
                                                <Image
                                                    style={styles.icons}
                                                    source={require('../../assets/icons/soirees.png')}
                                                ></Image>
                                                <Text style={{ color: 'white', fontSize: 10 }}>Consulter</Text>
                                                <Text style={{ color: 'white', fontSize: 10 }}>mes soirees</Text>
                                            </TouchableOpacity>



                                            <TouchableOpacity
                                                onPress={() => props.navigation.navigate('CreatePost')}
                                                style={{ alignItems: 'center', margin: 10 }}>
                                                <Image
                                                    style={styles.icons}
                                                    source={require('../../assets/icons/plus.png')}
                                                ></Image>
                                                <Text style={{ color: 'white', fontSize: 10 }}>Ajouter</Text>
                                                <Text style={{ color: 'white', fontSize: 10 }}>Publication</Text>
                                            </TouchableOpacity>


                                            <TouchableOpacity
                                                onPress={() => props.navigation.navigate('EditProfile')}
                                                style={{ alignItems: 'center', margin: 10 }}>
                                                <Image
                                                    style={styles.icons}
                                                    source={require('../../assets/icons/edit.png')}
                                                ></Image>
                                                <Text style={{ color: 'white', fontSize: 10 }}>Modifier</Text>
                                                <Text style={{ color: 'white', fontSize: 10 }}>Profile</Text>
                                            </TouchableOpacity>


                                        </View>

                                    ) : ( //user o5er

                                        <View>
                                            <View style={{ marginBottom: 20, alignItems: 'center' }} >
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('Chat', { user: userId })}

                                                    style={{ flexDirection: 'row', marginTop: 15 }}>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>ENVOYER  </Text>
                                                    <Image
                                                        style={styles.pencil}
                                                        source={require('../../assets/pencil.png')}
                                                    ></Image>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>  MESSAGE</Text>
                                                </TouchableOpacity>

                                            </View>


                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                                    <ContactMenu dataa={toParent} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                                    <Image
                                                        style={styles.icons}
                                                        source={require('../../assets/icons/di.png')}
                                                    ></Image>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>Offrir</Text>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>Gemme</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity

                                                    style={{ alignItems: 'center', margin: 10 }}>
                                                    <Image
                                                        //   style={activatedContact ? styles.icons : styles.activatedicons}
                                                        style={styles.icons}
                                                        source={
                                                            require('../../assets/icons/cle.png')}

                                                    ></Image>

                                                    <Text style={{ color: 'white', fontSize: 10 }}>Ouvrir Accés</Text>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>Album</Text>

                                                </TouchableOpacity>

                                                <TouchableOpacity

                                                    style={{ alignItems: 'center', margin: 10 }}>
                                                    <Image
                                                        style={styles.icons}
                                                        source={require('../../assets/icons/soirees.png')}
                                                    ></Image>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>Inviter</Text>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>ce Membre</Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ alignItems: 'center', margin: 10 }}>
                                                    <Image
                                                        style={styles.icons}
                                                        source={require('../../assets/icons/jumelage.png')}
                                                    ></Image>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>Demande de</Text>
                                                    <Text style={{ color: 'white', fontSize: 10 }}>Jumelage</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}

                                </View>


                            </View>





                            <Text style={{ color: 'white', fontSize: 10 }}>mon Agenda</Text>


                        
                        </View>


                    </View>




 



                </Content>

            </ScrollView>
        </SafeAreaView>

    );
}





export const screenOptions = (navData) => {

    const routeParams = navData.route.params ? navData.route.params : {};
    if (!routeParams.name) {
        return {
            headerTitle: routeParams.name ? routeParams.name : "Profile",
            headerRight: () => (
                <MenuItem />
            )
        }
    } else {
        return {
            headerTitle: routeParams.name ? routeParams.name : "Profile",
        }
    }


}




const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    diamond: {
        width: 70,
        height: 70,
        borderRadius: 100 / 2,

    },



    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    text: {
        paddingBottom: 20,
        color: "#fff"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,


    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 350,
        height: 360,

        overflow: 'hidden'


    },


    pencil: {
        marginTop: -8,
        width: 20,
        height: 20,
        transform: [{ rotate: '-45deg' }],
        tintColor: 'white',

    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#efb734",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        position: 'absolute',
        marginTop: 160
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: 200,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "white",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    icons: {
        height: 25,
        width: 25,
        margin: 5
    },

    activatedicons: {
        height: 25,
        width: 25,
        margin: 5,
        tintColor: Colors.orange
    },
    diasbledEffect: {
        display: 'none'
    },
    centre: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    menuButtons: {
        fontSize: 10,
        color: 'grey',
        alignContent: 'center'

    },
});

export default UserProfileScreen;

