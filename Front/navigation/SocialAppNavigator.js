import React from 'react';
import Colors from '../constants/Colors';
import { Platform, View, Image, Text } from 'react-native';



import { createStackNavigator } from '@react-navigation/stack';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AllPostsScreen, { screenOptions as allPostsScreenOptions } from '../screens/post/AllPostsScreen';
import EditPostScreen, { screenOptions as editPostScreenOptions } from '../screens/post/EditPostScreen';
import CommentsScreen, { screenOptions as commentsScreenOptions } from '../screens/post/CommentsScreen';
import AddPostScreen, { screenOptions as addPostScreenOptions } from '../screens/post/AddPostScreen';
import UserProfileScreen, { screenOptions as userProfileScreenOptions } from '../screens/user/UserProfileScreen';
import FindPeopleScreen from '../screens/user/FindPeopleScreen';
import UserStatsScreen, { screenOptions as userStatsScreenOptions } from '../screens/user/UserStatsScreen';
import UserPostsScreen, { screenOptions as userPostsScreenOptions } from '../screens/user/UserPostsScreen';
import EditProfileScreen, { screenOptions as editProfileScreenOptions } from '../screens/user/EditProfileScreen';

import ChatListScreen, { screenOptions as chatListScreenOptions } from '../screens/chat/ChatListScreen';
import ChatScreen, { screenOptions as chatScreenOptions } from '../screens/chat/ChatScreen';

import AuthScreen from '../screens/auth/AuthScreen';
import ForgotPasswordScreen, { screenOptions as forgotPasswordScreenOptions } from '../screens/auth/ForgotPasswordScreen';

import Agendaa from '../screens/event/Agenda'
import AddEvent from '../screens/event/AddEvent';
import EditEvent from '../screens/event/EditEvent';
import AllEvents from '../screens/event/AllEvents';
import Event from '../screens/event/Event';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? '#000' : '#000',


    },

    headerTintColor: Platform.OS === 'android' ? 'grey' : 'grey'
};







const PostStackNavigator = createStackNavigator();

const PostNavigator = () => {
    return (
        <PostStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <PostStackNavigator.Screen
                name="AllPosts"
                component={AllPostsScreen}
                options={allPostsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <PostStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}
            />
            <PostStackNavigator.Screen
                name="EditPost"
                component={EditPostScreen}
                options={editPostScreenOptions}
            />
            <PostStackNavigator.Screen
                name="ChatList"
                component={ChatListScreen}
                options={chatListScreenOptions}
            />
            <PostStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={chatScreenOptions}
            />
        </PostStackNavigator.Navigator>
    );
};



const FindPeopleStackNavigator = createStackNavigator();

const FindPeopleNavigator = () => {
    return (
        <FindPeopleStackNavigator.Navigator
            screenOptions={defaultNavOptions}

        >
            <FindPeopleStackNavigator.Screen
                name="Find"
                component={FindPeopleScreen}
                options={{ headerShown: false }}
            />
            <FindPeopleStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <FindPeopleStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <FindPeopleStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <FindPeopleStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}
            />

        </FindPeopleStackNavigator.Navigator>
    );
};


const CreatePostStackNavigator = createStackNavigator();

const CreatePostNavigator = () => {
    return (
        <CreatePostStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <CreatePostStackNavigator.Screen
                name="CreatePost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />
        </CreatePostStackNavigator.Navigator>
    );
};


const ChatStackNavigator = createStackNavigator();

const ChatNavigator = () => {
    return (
        <ChatStackNavigator.Navigator
            screenOptions={defaultNavOptions}

        >
            <ChatStackNavigator.Screen
                name="ChatList"
                component={ChatListScreen}
                //  options={chatListScreenOptions}
                options={{ headerShown: false }}
            />
            <ChatStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={chatScreenOptions}
            />
        </ChatStackNavigator.Navigator>
    );
};



const UserStackNavigator = createStackNavigator();

const UserNavigator = () => {
    return (
        <UserStackNavigator.Navigator
            screenOptions={defaultNavOptions}

        >
            <UserStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <UserStackNavigator.Screen
                name="UserStats"
                component={UserStatsScreen}
                options={userStatsScreenOptions}
            />
            <UserStackNavigator.Screen
                name="UserPosts"
                component={UserPostsScreen}
                options={userPostsScreenOptions}
            />
            <UserStackNavigator.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={editProfileScreenOptions}
            />
            <UserStackNavigator.Screen
                name="CreatePost"
                component={AddPostScreen}
                options={addPostScreenOptions}
            />
            <UserStackNavigator.Screen
                name="agenda"
                component={AgendaNavigator}

            />
            <UserStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
                options={chatScreenOptions}

            />
        </UserStackNavigator.Navigator>
    );
};




const Header = createMaterialTopTabNavigator();

export const HeaderNavigator = () => {


    return (


        <Header.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBarOptions={{
                activeTintColor: Colors.gold_brown,
                showIcon: true,

                showLabel: false,
                indicatorStyle: {
                    borderBottomColor: '#d4a53d',
                    borderBottomWidth: 2,
                },

                style: {
                    backgroundColor: '#111',
                    height: 70,

                }
            }}

        >



            <Header.Screen
                name="Home"
                component={PostNavigator}
                options={({ route }) => ({


                    tabBarIcon: (props) => (



                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}

                            source={require('../assets/icons/settings.png')}
                        ></Image>



                    )
                })}
            />


            <Header.Screen
                name="Chats"
                component={ChatNavigator}
                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}
                            source={require('../assets/icons/chat.png')}
                        ></Image>
                    )
                }}
            />


            {/*           <Header.Screen

                name="AddPost"
                component={CreatePostNavigator}

                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 25, height: 25, justifyContent: 'center' }}
                            source={require('../assets/icons/diamand.png')}
                        ></Image>

                    )
                }}
            />

*/}

            <Header.Screen

                name="agenda"
                component={AgendaNavigator}

                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}
                            source={require('../assets/icons/soirees.png')}
                        ></Image>

                    )
                }}
            />


            <Header.Screen
                name="user"
                component={UserNavigator}
                options={{

                    tabBarIcon: (props) => (
                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}
                            source={require('../assets/icons/user2.png')}
                        ></Image>

                    )
                }}
            />
 

            <Header.Screen
                name="create"
                component={CreatePostNavigator}
                options={{

                    tabBarIcon: (props) => (

                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}
                            source={require('../assets/icons/notif.png')}
                        ></Image>


                    )
                }}
            />

            <Header.Screen
                name="FindPeople"
                component={FindPeopleNavigator}
                options={{

                    tabBarIcon: (props) => (

                        <Image style={{ width: 30, height: 30, justifyContent: 'center' }}
                            source={require('../assets/icons/search.png')}
                        ></Image>


                    )
                }}
            />

        </Header.Navigator>


    );
};


const NotifComponent = () => {
    return (
        <View >
            <Text style={{ fontSize: 30 }}> notifications list </Text>
        </View>
    );
};




const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={forgotPasswordScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};


// stack for the events fwest lagendaa
const EventsStackNavigator = createStackNavigator();

export const AgendaNavigator = () => {
    return (

        <EventsStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}

        >
            <EventsStackNavigator.Screen
                name="Events"

                component={AllEvents}
                options={{ headerShown: false }}
            />
            <EventsStackNavigator.Screen
                name="Event"
                component={Event}
                options={{ headerShown: false }}
            />
           
            <EventsStackNavigator.Screen
                name="Agenda"
                component={Agendaa}
                options={{ headerShown: false }}
            />
            <EventsStackNavigator.Screen
                name="AddEvent"

                component={AddEvent}
                options={{ headerShown: false }}
            />
            <EventsStackNavigator.Screen
                name="EditEvent"

                component={EditEvent}
                options={{ headerShown: false }}
            />

        </EventsStackNavigator.Navigator>
    );
};



// stack for the events fwest lagendaa
const Events = createStackNavigator();

export const EventNavigator = () => {
    return (
        <Events.Navigator
            screenOptions={defaultNavOptions}
        >

            <Events.Screen
                name="Events"
                component={AllEvents}
                options={{ headerShown: false }}
            />

            <Events.Screen
                name="Event"
                component={Event}
                options={{ headerShown: false }}
            />

            <PostStackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={userProfileScreenOptions}
            />
            <PostStackNavigator.Screen
                name="Comments"
                component={CommentsScreen}
                options={commentsScreenOptions}
            />
             <PostStackNavigator.Screen
                name="EditPost"
                component={EditPostScreen}
                options={editPostScreenOptions}
            />

        </Events.Navigator>
    );
};
