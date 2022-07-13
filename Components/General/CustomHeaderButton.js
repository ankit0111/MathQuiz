import React from 'react'

import {HeaderButton} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/Ionicons'

const CustomHeaderButton = (props) => {
    return <HeaderButton {...props} IconComponent={Icon} color="red" iconSize={23} />
}

export default CustomHeaderButton

