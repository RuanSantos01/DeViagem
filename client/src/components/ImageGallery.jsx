import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGallery = () => {
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

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
                    <img src={item.original} alt={item.originalAlt} />
                    {item.description && (
                        <div className="image-gallery-description">{item.description}</div>
                    )}
                </div>
            )}
        />

    )
}

export default ImageGallery