import React,{memo} from 'react';
import { View } from 'react-native';

const CustomIcon = ({ library, name, size , color , style }) => {
  let IconComponent;

  switch (library) {
    case 'AntDesign':
      IconComponent = require('react-native-vector-icons/AntDesign').default;
      break;
    case 'Entypo':
      IconComponent = require('react-native-vector-icons/Entypo').default;
      break;
    case 'EvilIcons':
      IconComponent = require('react-native-vector-icons/EvilIcons').default;
      break;
    case 'Feather':
      IconComponent = require('react-native-vector-icons/Feather').default;
      break;
    case 'FontAwesome':
      IconComponent = require('react-native-vector-icons/FontAwesome').default;
      break;
    case 'FontAwesome5':
      IconComponent = require('react-native-vector-icons/FontAwesome5').default;
      break;
    // case 'FontAwesome5Brands':
    //   IconComponent = require('react-native-vector-icons/FontAwesome5Brands').default;
    //   break;
    case 'FontAwesome6':
      IconComponent = require('react-native-vector-icons/FontAwesome6').default;
      break;
    // case 'FontAwesome6Brands':
    //   IconComponent = require('react-native-vector-icons/FontAwesome6Brands').default;
    //   break;
    case 'Fontisto':
      IconComponent = require('react-native-vector-icons/Fontisto').default;
      break;
    case 'Foundation':
      IconComponent = require('react-native-vector-icons/Foundation').default;
      break;
    case 'Ionicons':
      IconComponent = require('react-native-vector-icons/Ionicons').default;
      break;
    case 'MaterialCommunityIcons':
      IconComponent = require('react-native-vector-icons/MaterialCommunityIcons').default;
      break;
    case 'MaterialIcons':
      IconComponent = require('react-native-vector-icons/MaterialIcons').default;
      break;
    case 'Octicons':
      IconComponent = require('react-native-vector-icons/Octicons').default;
      break;
    case 'SimpleLineIcons':
      IconComponent = require('react-native-vector-icons/SimpleLineIcons').default;
      break;
    case 'Zocial':
      IconComponent = require('react-native-vector-icons/Zocial').default;
      break;



    default:

  }

  return (
    <View style={style}>
      <IconComponent name={name} size={size} color={color} />
    </View>
  );
};

export default memo(CustomIcon);
