import React from "react";

import { HeaderView, HeaderButton, HeaderTitle, colors } from "../assets/appStyles";

import { Entypo } from '@expo/vector-icons';

const Header = ({ handleClearTodos }) => {
    return (
        <HeaderView>
            <HeaderTitle>Taken</HeaderTitle>
            <HeaderButton onPress={handleClearTodos}>
                <Entypo name="trash" size={25} color={colors.tertiary} />
            </HeaderButton>
        </HeaderView>

    );
}

export default Header;