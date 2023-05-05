import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGallery = (props) => {
    const { images } = props;

    return (

        <ReactImageGallery
            items={images}
            thumbnailPosition='left'
            showIndex={true}
            showThumbnails={false}
            slideOnThumbnailOver={true}
            thumbnailHeight={150}
            showPlayButton={false}
            showBullets={true}
            showFullscreenButton={false}
            showNav={true}
            renderItem={(item) => (
                <div className="image-gallery-custom">
                    <img src={`http://localhost:3001/assets/${item}`} alt={`http://localhost:3001/assets/${item}`} />
                    {item.description && (
                        <div className="image-gallery-description">{item.description}</div>
                    )}
                </div>
            )}
        />

    )
}

export default ImageGallery