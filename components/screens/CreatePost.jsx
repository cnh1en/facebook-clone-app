import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { createPost, uploadFile } from '../../apis/auth.api';
import { pickImage, uploadAsyncFile } from '../../utils/pickImage';
import Avatar from '../layouts/Avatar';
import Spinner from './Spinner';


const CreatePost = () => {
  const navigation = useNavigation();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [content, setContent] = useState('');

  const [images, setImages] = useState(null);

  const [loading, setLoading] = useState(false);

  const handlePickImage = () => {
    pickImage()
      .then(result => {
        console.log({ result });
        if (!result.cancelled) {
          setImages([result]);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (loading) {
    return <Spinner />;
  }
  
  const handleSubmit = async () => {
    setLoading(true)
    const file = await uploadAsyncFile(images[0].uri)
    console.log(file,123)
    // const rs = await createPost({
    //   content: content,
    //   media_url: [],
    //   modified_level: 'public'
    // })
    // console.log("rs",rs)
    setLoading(false)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="POST" onPress={handleSubmit} disabled={!content} />,
    });
  }, [content, navigation]);

  return (
    <SafeAreaView
      style={{
        padding: 10,
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar size={70} source={currentUser.avatar_url}/>
            <View
              style={{
                marginLeft: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginBottom: 4,
                }}
              >
                {currentUser.firstname + ' ' + currentUser.lastname}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#e5e7ec',
                    borderRadius: 5,
                    padding: 4,
                  }}
                >
                  <AntDesignIcon name="earth" size={12} color="gray" />
                  <Text
                    style={{
                      fontWeight: '500',
                      color: 'gray',
                      marginHorizontal: 5,
                    }}
                  >
                    Public
                  </Text>
                  <AntDesignIcon name="down" size={12} color="gray" />
                </View>
                <TouchableOpacity
                  onPress={handlePickImage}
                  style={{ marginLeft: 12 }}
                >
                  <AntDesignIcon name="picture" color="#4CAF50" size={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={{ color: '#0778E9' }}>{content.length} / 150</Text>
        </View>

        <View>
          <View>
            <TextInput
              placeholder="What's on your mind?"
              style={{ fontSize: 20, marginTop: 15 }}
              onChangeText={text => setContent(text)}
              multiline
              maxLength={150}
              autoFocus
            />
          </View>
          <View style={{ marginTop: 20 }}>
            {images &&
              images.map(image => (
                <View key={image.uri}>
                  <Image
                    source={{ uri: image.uri }}
                    style={{
                      flex: 1,
                      aspectRatio: image.width / image.height,
                      borderRadius: 10,
                    }}
                  />

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 30,
                      height: 30,
                      borderRadius: 1000,
                      backgroundColor: '#eeee',
                    }}
                    onPress={() => setImages([])}
                  >
                    <AntDesignIcon name="close" size={25} color="gray" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePost;
