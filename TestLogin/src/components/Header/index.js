import React, {useRef, useContext} from 'react';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from "react-router-native";
import Menu from 'react-native-material-menu';
import DrawerMenu from './DrawerMenu';
import Context from '../../services/context';

export default () => {
    const menu = useRef();
    const {title, user, setUser} = useContext(Context);
	  const hideMenu = () => menu.current.hide();
    const showMenu = () => menu.current.show();
    return (
        <Header testID = "header"
            leftComponent={() =>
            <Link testID ="tap-to-home" to ="/">
              <Icon
                name="home"
                size ={20}
                color="#fff"/>
            </Link>}
            centerComponent={{ text: title, style: { color: '#fff' } }}
            rightComponent={() => 
          <Menu ref={menu} button={<Icon name= "bars" size = {20} color = "#fff" onPress={showMenu} />}>
            <DrawerMenu setUser ={setUser} user = {user} hideMenu = {hideMenu} />
          </Menu>}>
        </Header>
    );
}