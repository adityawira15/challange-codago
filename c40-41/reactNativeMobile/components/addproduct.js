import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { View, Text, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

export default class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            rate: '',
            image: [],
            avatarSource: null,
            description: '',
            price: '',
            brand: '',
            detail: '',
            imageuri: '',
        }
        this.title = this.title.bind(this);
        this.rate = this.rate.bind(this);
        this.takeImage = this.takeImage.bind(this);
        this.description = this.description.bind(this);
        this.price = this.price.bind(this);
        this.brand = this.brand.bind(this);
        this.detail = this.detail.bind(this);
        this.onAdd = this.onAdd.bind(this);

    }

    title(text) {
        this.setState({ title: text })
    }

    rate(text) {
        this.setState({ rate: text })
    }

    takeImage() {
        const options = {
            title: 'Choose Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                this.setState({
                    image: [...this.state.image, response]
                });
            }
        });
    }

    description(text) {
        this.setState({ description: text })
    }

    price(text) {
        this.setState({ price: text })
    }

    brand(text) {
        this.setState({ brand: text })
    }

    detail(text) {
        this.setState({ detail: text })
    }

    onAdd() {
            const data = new FormData();
            data.append('id', Date.now())
            data.append('title', this.state.title)
            data.append('rate', this.state.rate)
            this.state.image.forEach((photo) => {
                data.append('photo', {
                    uri: photo.uri,
                    type: 'image/jpeg', // or photo.type
                    name: photo.fileName
                });
            })
            data.append('description', this.state.description)
            data.append('price', this.state.price)
            data.append('brand', this.state.brand)
            data.append('detail', this.state.detail)

            fetch('http://192.168.1.3:3000/api/ecommerce', {
                method: 'post',
                body: data
            })
                .then((responsejson) => responsejson.json())
                .then(responsebackend => {
                    Actions.home()
                    console.log(responsebackend)
                }).catch(err => {
                    console.log(err)
                })
    }

    render() {
        const { image } = this.state
        const images = image.map((val, i) => {
            return <Image source={{ uri: val.uri }} style={{ width: 200, height: 200, marginHorizontal: 5 }} key={i} />

        })
        return (
            <Container>
                <Content>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={{ backgroundColor: '#a0a0a0' }}>
                            <Text style={{ color: 'white', textAlign: 'center', padding: 35, fontSize: 30 }}>Forms</Text>
                        </View>
                        <Form>
                            <Item floatingLabel>
                                <Label>Title</Label>
                                <Input onChangeText={(text) => this.title(text)} autoCapitalize="words" />
                            </Item>
                            <Item floatingLabel>
                                <Label>Rate</Label>
                                <Input onChangeText={(text) => this.rate(text)} keyboardType="numeric" />
                            </Item>
                            <View style={{ marginHorizontal: 15, marginTop: 15 }}>
                                <Label>Image</Label>
                                <ScrollView horizontal={true} style={{ marginVertical: 15 }}>
                                    {images}
                                </ScrollView>
                                <Button light onPress={this.takeImage} style={{ marginHorizontal: 10, padding: 10 }}><Text>Chosee Image</Text></Button>
                            </View>
                            <Item floatingLabel>
                                <Label>Description</Label>
                                <Input onChangeText={(text) => this.description(text)} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Price</Label>
                                <Input onChangeText={(text) => this.price(text)} keyboardType="numeric" />
                            </Item>
                            <Item floatingLabel>
                                <Label>Brand</Label>
                                <Input onChangeText={(text) => this.brand(text)} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Detail</Label>
                                <Input onChangeText={(text) => this.detail(text)} />
                            </Item>
                            <Button light onPress={this.onAdd} style={{ padding: 10, justifyContent: 'center', marginHorizontal: 10, marginVertical: 20, width: 95 + '%' }}><Text style={{ textAlign: 'center' }}>Submit</Text></Button>
                        </Form>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}