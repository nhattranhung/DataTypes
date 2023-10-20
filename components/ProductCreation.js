import React, { useState } from 'react';
import 'react-native-get-random-values';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import {
    Alert,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Switch,
    TextInput,
    TouchableOpacity,
} from 'react-native';

//Initializing the SDK
Parse.setAsyncStorage(AsyncStorage);
//Back4App Application ID + JavaScript KEY
Parse.initialize('i77Wb8Q3wNaHn6FXWG7phrBHMI0FKDI2zAGdnO8E', 'Khh3vehvys98XRfwPoMsxIIHoYtVaCsJSohG1XOA');
//Back4App Parse API address
Parse.serverURL = 'https://parseapi.back4app.com/';

export const ProductCreation = () => {
    // useState variables
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productAvailable, setProductAvailable] = useState(false);
    const [productExpirationDate, setProductExpirationDate] = useState('');
    const [productCategories, setProductCategories] = useState('');

    var productNameValue = "";
    var productQuantityValue = "";
    var productPriceValue = "";
    var productAvailableValue = "";
    var productExpirationDateValue = "";
    var productCategoriesValue = "";

    const toggleProductAvailable = () => setProductAvailable(!productAvailable);

    const createProduct = async function () {
        try {
            // format input to save data
            productNameValue = productName;
            productQuantityValue = Number(productQuantity);
            productPriceValue = Number(productPrice);
            productAvailableValue = productAvailable;
            productExpirationDateValue = new Date(productExpirationDate);
            productCategoriesValue = productCategories.split(',');
        } catch (error) {
            // catch error
            Alert.alert('Error!', error.message);
            return false;
        }

        // Creates a new Product parse object instance
        let Product = new Parse.Object('Product');

        // Set data to parse object
        Product.set('name', productNameValue);
        Product.set('quantity', productQuantityValue);
        Product.set('price', productPriceValue);
        Product.set('available', productAvailableValue);
        Product.set('expirationDate', productExpirationDateValue);
        Product.set('categories', productCategoriesValue);
        Product.set('completeData', {
            name: productNameValue,
            quantity: productQuantityValue,
            price: productPriceValue,
            available: productAvailableValue,
            expirationDate: productExpirationDateValue,
            categories: productCategoriesValue,
        });

        // save the data object
        try {
            let savedProduct = await Product.save();
            // Success
            Alert.alert('Success!', JSON.stringify(savedProduct));
            return true;
        } catch (error) {
            // Error
            Alert.alert('Error!', error.message);
            return false;
        };
    };

return (
    <SafeAreaProvider>
        <StatusBar backgroundColor="#208AEC" />
        <SafeAreaView style={Styles.container}>
            <View style={Styles.header}>
                <Image
                    style={Styles.header_logo}
                    source={{ uri: 'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png', }}
                />
                <Text style={Styles.header_text_bold}>
                    {'Data Types on Back4App'}
                </Text>
                <Text style={Styles.header_text}>{'Product Creation'}</Text>
            </View>
            <View style={Styles.wrapper}>
                <View style={Styles.switch_container}>
                    <Text style={{
                        color: '#00cc00',
                        fontWeight: 'bold',
                    }}>Available?</Text>
                    <Switch
                        value={productAvailable}
                        onValueChange={toggleProductAvailable}
                    />
                </View>
                <TextInput
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                    placeholder="Name"
                    mode="outlined"
                    style={Styles.form_input}
                />
                <TextInput
                    value={productQuantity}
                    onChangeText={(text) => setProductQuantity(text)}
                    placeholder="Quantity"
                    mode="outlined"
                    keyboardType={'number-pad'}
                    style={Styles.form_input}
                />
                <TextInput
                    value={productPrice}
                    onChangeText={(text) => setProductPrice(text)}
                    placeholder="Price"
                    mode="outlined"
                    keyboardType={'numeric'}
                    style={Styles.form_input}
                />
                <TextInput
                    value={productExpirationDate}
                    onChangeText={(text) => setProductExpirationDate(text)}
                    placeholder="Expiration Date (mm/dd/yyyy)"
                    mode="outlined"
                    keyboardType={'numbers-and-punctuation'}
                    style={Styles.form_input}
                />
                <TextInput
                    value={productCategories}
                    onChangeText={(text) => setProductCategories(text)}
                    placeholder="Categories (separated by commas)"
                    mode="outlined"
                    style={Styles.form_input}
                />
                <TouchableOpacity
                    onPress={() => createProduct()}
                    mode="contained"
                    icon="plus"
                    style={Styles.submit_button}>
                    <Text style={Styles.text_button}>Create Product</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </SafeAreaProvider>
);
};

// Component styles
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    wrapper: {
        width: '90%',
        alignSelf: 'center',
    },
    header: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#208AEC',
    },
    header_logo: {
        width: 170,
        height: 40,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    header_text_bold: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    header_text: {
        marginTop: 3,
        color: '#fff',
        fontSize: 14,
    },
    form_input: {
        height: 44,
        marginBottom: 16,
        backgroundColor: '#0099cc',
        fontSize: 14,
    },
    switch_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    },
    submit_button: {
        width: '30%',
        maxHeight: 60,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#66ff33',
    },
    text_button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
});