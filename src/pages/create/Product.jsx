const Product = ({ images, name, serialNumber, warranty }) => {
    return (
        <a target="_blank" href={`/post/${serialNumber}`}
            className="flex flex-col items-center gap-1.5 p-6 cursor-pointer">
            <div className="w-36 h-36 transform hover:scale-110 transition-transform duration-150 ease-out">
                <img draggable="false" className="w-full h-full object-contain" src={images[0].url} alt={name} />
            </div>
            <h2 className="font-medium text-sm mt-2">{name.substr(0, 30)}...</h2>
            <span className="text-primary-green text-sm">{serialNumber.substr(0, 15)}...</span>
            <span className="text-gray-500 text-sm">{warranty} year warranty</span>
        </a>
    );
};

export default Product;
