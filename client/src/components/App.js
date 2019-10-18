import React, { Component } from 'react';
// prettier-ignore
import { Container, Box, Heading, Card, Image, Text, SearchField, Icon } from "gestalt";
import Strapi from "strapi-sdk-javascript/build/main";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import './App.css';

const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);

class App extends Component {
  state = {
    brands: [],
    searchTerm: "",
    loadingBrands: true
  }

  async componentDidMount() {
    try {
      const response = await strapi.request("POST", "/graphql", {
        data: {
          query: `query {
            brands{
              _id
              name
              description
              image{
                url
              }
            }
          }`
        }
      });
      // console.log(response);
      this.setState({
        brands: response.data.brands,
        loadingBrands: false
      })
    } catch (err) {
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  handleChange = ({ value }) => {
    this.setState({ searchTerm: value });
  }

  filterBrands = ({ searchTerm, brands }) => {
    return brands.filter(brand => {
      return brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    });
  };

  render() {
    const { searchTerm, loadingBrands } = this.state;

    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          marginTop={4}
        >

          {/* Brand Search Field */}
          <SearchField
            id="searchField"
            accessibilityLabel="Brands Search Field"
            onChange={this.handleChange}
            value={searchTerm}
            placeholder="Search Brands"
          />
          <Box margin={3}>
            <Icon
              icon="filter"
              color={searchTerm ? 'orange' : 'gray'}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>

        {/* Brands Section */}
        <Box
          display="flex"
          justifyContent="center"
          marginBottom={2}
        >

          {/* Brands Header */}
          <Heading color="midnight" size="md">
            Brew Brands
          </Heading>
        </Box>

        {/* Brands */}
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#99b6fc"
            }
          }}
          shape="rounded"
          wrap
          display="flex" justifyContent="around">
          {this.filterBrands(this.state).map(brand => (
            <Box
              paddingY={4}
              margin={2}
              width={200}
              key={brand.id}
            >
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brand.image.url}`}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl"> {brand.name}</Text>
                  <Text> {brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand._id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        <Loader show={loadingBrands} />
        {/* <Spinner show={loadingBrands} accessibilityLabel="Loading Spinner" /> */}
      </Container >
    );
  }
}

export default App;
