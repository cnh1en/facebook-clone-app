import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Divider from './Divider';

const Title = ({ name }) => {
  return (
    <SafeAreaView
      style={{
        padding: 10,
        position: 'absolute',
        width: '100%',
        height: 100,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
      >
        <AntDesignIcon name="arrowleft" size={25} />
        <Text
          style={{
            marginHorizontal: 12,
            fontSize: 20,
            fontWeight: '500',
          }}
        >
          {name}
        </Text>
      </View>

      <Divider
        height={1}
        styles={{ marginVertical: 10, marginHorizontal: -10 }}
      />
    </SafeAreaView>
  );
};

export default Title;
