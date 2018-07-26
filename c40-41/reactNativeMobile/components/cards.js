import React, { Component } from 'react';
import { ScrollView, Image, } from 'react-native';
import { Root, Container, Header, Content, Card, CardItem, Text, Body, Button, View } from 'native-base';
import ImageCard from './imagecard'
import { Actions } from 'react-native-router-flux'

export default class Cards extends Component {
    render() {
        return (
            <Container style={{ height: "auto" }}>
                <Content>
                    <Card>
                        <CardItem header>
                                <ImageCard image={this.props.image} />
                        </CardItem>
                        <CardItem style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 1
                        }}>
                            <Body>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                    Title: {this.props.title}
                                </Text>
                                <Text>
                                    Rate: {this.props.rate}
                                </Text>
                                <Text>
                                    Description: {this.props.description}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Button info style={{ left: 60 + '%' }} onPress={() => Actions.details({id: this.props.id})}>
                                <Text>
                                    {'<> Detail Item'}
                                </Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}