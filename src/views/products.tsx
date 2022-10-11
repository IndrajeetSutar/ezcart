import { Component } from 'react';
import firebase from 'firebase';
import { getCurrentUser } from '../config/firebaseConfig';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import QRCode from 'react-qr-code';
import { IProductCatlog } from '../models/Models';
import { v4 as uuid4 } from 'uuid';
import { TextField } from '@material-ui/core';
import { generateProductDocument } from '../utils/utils';

export const firestore = firebase.firestore();

export interface ILoginProps {

}
export interface ILoginState {
    user: firebase.User | null,
    qrCode: string;
    productId: string;
    productName: string;
    productDescription: string;
    productCategory: string;
    price: string;
    isGenerated: boolean;
    qrScanneredData: string;
}

class Products extends Component<ILoginProps, ILoginState> {

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            user: null,
            qrCode: 'ezcart',
            productId: '',
            productName: '',
            productDescription: '',
            productCategory: '',
            price: '',
            isGenerated: false,
            qrScanneredData: ''
        }
    }

    generateQrCode = () => {
        var product: IProductCatlog = {
            productId: uuid4(),
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productCategory: this.state.productCategory,
            price: this.state.price
        };

        console.log("## Product " + product.productName)

        var value = generateProductDocument(product);
        console.log("## Product " + value)
        this.setState({ isGenerated: true });
        this.setState({ qrCode: product.productId + product.productName });
    }



    render() {

        var user = getCurrentUser();


        return (

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <CssBaseline />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="productName"
                    label="Product Name"
                    name="productName"
                    autoComplete="productName"
                    autoFocus
                    value={this.state.productName}
                    onChange={(e) => this.setState({ productName: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="productDescription"
                    label="Product Description"
                    name="productDescription"
                    autoComplete="productDescription"
                    value={this.state.productDescription}
                    onChange={(e) => this.setState({ productDescription: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="productCategory"
                    label="Product Category"
                    name="productCategory"
                    autoComplete="productCategory"
                    value={this.state.productCategory}
                    onChange={(e) => this.setState({ productCategory: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    autoComplete="price"
                    value={this.state.price}
                    onChange={(e) => this.setState({ price: e.target.value })}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.generateQrCode}
                >
                    Add
                </Button>
                <CssBaseline />
                <CssBaseline />
                <br />
                <br />
                <br />
                {this.state.isGenerated ?

                    <div><QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={this.state.qrCode}
                        viewBox={`0 0 256 256`}
                    />
                    </div>
                    :
                    <></>
                }
                
                <br />
                <br />
                <br />


            </Container>
        )
    }
}
export default Products;