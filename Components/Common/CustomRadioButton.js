import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

const CustomRadioButton = (props) => {

  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Apple',
      value: 'apple',
    },
    {
      id: '2',
      label: 'Samsung',
      value: 'samsung',
    },
    {
      id: '3',
      label: 'Nokia',
      value: 'nokia',
    },
    {
      id: '4',
      label: 'Redmi',
      value: 'redmi',
    },
  ];
  const [radioButtons, setRadioButtons] = useState('apple'); //pass in our data to this state. This will store the current user's choice
  const setValue = (value) => {
    var newArray = value.filter((item) => item.selected === true); //get the items that are selected
    setRadioButtons(newArray[0].value); //set the selected value in this Hook
  };


  console.log('CButton', radioButtons);


  return (
    <View>

      <RadioGroup
        radioButtons={radioButtonsData}
        onPress={(value) => setValue(value)}
      />
      {/* <Text>{radioButtons}</Text>  */}
    </View>
  );
};

export default CustomRadioButton;
