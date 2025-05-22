import { useParams } from 'react-router';

const ProductDetailPage = () => {
    const params = useParams();

    return <h2>MOCK - Product detail, number {params.id}</h2>
}

export default ProductDetailPage;