import { firestore } from '../config/firebaseConfig';
import { IProductCatlog } from '../models/Models';

export const generateProductDocument = async (product: IProductCatlog) => {


    console.log('## generateProductDocument')
    const productRef = firestore.doc(`ProductCatlog/${product.productId}`);
    try {
        const snapshot = await productRef.get();

        if (!snapshot.exists) {
            const { productId, productName, productDescription, productCategory, price } = product;
            try {
                await productRef.set({
                    productId,
                    productName,
                    productDescription,
                    productCategory,
                    price
                });
            } catch (error) {
                console.error("Error creating user document", error);
            }
        }
    }
    catch (error) {
        console.error("Error reading user document", error);
    }
    return getProductDocument(product.productId);
};

const getProductDocument = async (productId: string) => {
    if (!productId) return null;
    try {
        const userDocument = await firestore.doc(`ProductCatlog/${productId}`).get();

        return {
            productId,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching product", error);
    }
};