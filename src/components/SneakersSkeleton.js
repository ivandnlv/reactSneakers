import ContentLoader from 'react-content-loader';

const SneakersSkeleton = () => {
    return (
        <div className='sneakers__list-item'>
            <ContentLoader 
                speed={2}
                width={150}
                height={187}
                viewBox="0 0 150 187"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
                <rect x="101" y="56" rx="0" ry="0" width="0" height="5" /> 
                <rect x="0" y="105" rx="3" ry="3" width="150" height="15" /> 
                <rect x="0" y="134" rx="3" ry="3" width="93" height="15" /> 
                <rect x="0" y="163" rx="8" ry="8" width="80" height="24" /> 
                <rect x="118" y="155" rx="8" ry="8" width="32" height="32" />
            </ContentLoader>
        </div>
    );
};

export default SneakersSkeleton;