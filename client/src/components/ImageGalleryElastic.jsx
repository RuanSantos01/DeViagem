import Carousel from 'react-elastic-carousel';

const ImageGalleryElastic = (props) => {
    const { images } = props;

    return (
        <Carousel style={{ height: '40vh', backgroundColor: '#E6ECF5' }}>
            {images.map((item, index) => <div key={index}>
                <img
                    src={`http://localhost:3001/assets/${item}`}
                    alt={`http://localhost:3001/assets/${item}`}
                />
            </div>)}
        </Carousel>

    )
}

export default ImageGalleryElastic