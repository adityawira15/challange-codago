import React, { Component } from 'react'
import { ScrollView, Image } from 'react-native'

export default class ImageCard extends Component {
    render() {
        const image = this.props.image.map((val, i)=>{
            console.log(val)
            return(
                <Image source={{uri: `${val}`}} key={i} style={{ height: 160, width: 310, marginHorizontal: 5 }} />
            )
        })
        return (
            <ScrollView horizontal={true}>
                {image}
            </ScrollView>
        )
    }
}