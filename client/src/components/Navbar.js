import React from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { NavLink, withRouter } from "react-router-dom";
import { getToken, clearCart, clearToken } from "../utils/index";

class Navbar extends React.Component {

    handleSignout = () => {
        clearToken();
        clearCart();
        this.props.history.push("/");
    }

    render() {
        return getToken() !== null ?
            <AuthNav handleSignout={this.handleSignout} /> : <UnAuthNav />;
    }
};

const AuthNav = ({ handleSignout }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="around"
            height={70}
            color="midnight"
            padding={1}
            shape="roundedBottom"
        >
            {/* checkout link */}
            <NavLink activeClassName="active" to="/checkout">
                <Text size="xl" color="white">Checkout</Text>
            </NavLink>

            {/* Title and Logo */}
            <NavLink activeClassName="active" to="/">
                <Box display="flex" alignItems="center">
                    <Box margin={2} height={50} width={50}>
                        <Image
                            alt="BrewMeister Logo"
                            naturalHeight={1}
                            naturalWidth={1}
                            src="./icons/logo.png"
                        />
                    </Box>
                    <Heading size="xs" color="orange">
                        BrewMeister
                    </Heading>
                </Box>
            </NavLink>

            {/* signout button */}
            <Button
                onClick={handleSignout}
                color="transparent"
                text="Sign Out"
                inline
                size="md"
            />
        </Box>
    )

}

const UnAuthNav = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="around"
            height={70}
            color="midnight"
            padding={1}
            shape="roundedBottom"
        >
            {/* sign in link */}
            <NavLink activeClassName="active" to="/signin">
                <Text size="xl" color="white">Sign in</Text>
            </NavLink>

            {/* Title and Logo0 */}
            <NavLink activeClassName="active" to="/">
                <Box display="flex" alignItems="center">
                    <Box margin={2} height={50} width={50}>
                        <Image
                            alt="BrewMeister Logo"
                            naturalHeight={1}
                            naturalWidth={1}
                            src="./icons/logo.png"
                        />
                    </Box>
                    <Heading size="xs" color="orange">
                        BrewMeister
                    </Heading>
                </Box>
            </NavLink>

            {/* sign up link */}
            <NavLink activeClassName="active" to="/signup">
                <Text size="xl" color="white">Sign up</Text>
            </NavLink>
        </Box>
    )
}

export default withRouter(Navbar);