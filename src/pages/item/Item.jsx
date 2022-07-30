import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, } from '../../actions/productActions';
import { Loader, PreviousBtn, NextBtn } from '../../components';
import Slider from 'react-slick';
import "./item.css";

const Item = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  const { product, loading, error } = useSelector((state) => state.productDetails);

  const productId = params.id;

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if(error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
  }, [dispatch, error, enqueueSnackbar]);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  return( 
    <>
      {loading ? <Loader /> :
      error !== undefined ? <div className="not-exists"><h1>Product doesn't exist</h1></div> :
      product[0] === undefined ? <div className="not-exists"><h1>Product doesn't exist</h1></div> :
      (
        <>
        <main className="mt-12 sm:mt-0">

        {/* <!-- product image & description container --> */}
        <div className="w-full flex flex-col sm:flex-row sm:p-2 relative text-white">

            {/* <!-- image wrapper --> */}
            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen p-3">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                    <div className="w-full h-full pb-6 border-[#a5a5a5]/[.1] relative">
                        <Slider {...settings}>
                            {product[0].images && product[0].images.map((item, i) => (
                                <img draggable="false" className="w-full h-96 object-contain" src={item.url} alt={product[0].name} key={i} />
                            ))}
                        </Slider>
                    </div>
                </div>
                {/* <!-- imgbox --> */}
            </div>
            {/* <!-- image wrapper --> */}

            {/* <!-- product desc wrapper --> */}
            <div className="flex-1 py-2 px-3">

                {/* <!-- whole product description --> */}
                <div className="flex flex-col gap-2 mb-4">

                    <h2 className="text-xl">{product[0].name}</h2>

                    {/* <!-- price desc --> */}
                    <span className="text-primary-green text-sm font-medium">Special Price</span>
                    <div className="flex items-baseline gap-2 text-3xl font-medium">
                        <span className="text-white-800">₹{product[0].price?.toLocaleString()}</span>
                        <span className="text-base text-gray-500 line-through">₹{product[0].cuttedPrice?.toLocaleString()}</span>
                    </div>
                    {/* <!-- price desc --> */}


                    {/* <!-- warranty & brand --> */}
                    <div className="flex gap-8 mt-2 items-center text-sm">
                        <img draggable="false" className="w-20 h-8 p-0.5 object-contain" src={product[0].brand?.logo.url} alt={product[0].brand && product[0].brand.name} />
                        <span>{product[0].warranty} Year Warranty </span>
                    </div>
                    {/* <!-- warranty & brand --> */}


                    {/* <!-- highlights & services details --> */}
                    <div className="flex flex-col sm:flex-row justify-between">
                        {/* <!-- highlights details --> */}
                        <div className="flex gap-16 mt-4 items-stretch text-sm">
                            <p className="text-neutral-400 font-medium">Highlights</p>

                            <ul className="list-disc flex flex-col gap-2 w-64">
                                {product[0].highlights?.map((highlight, i) => (
                                    <li key={i}>
                                        <p>{highlight}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* <!-- highlights details --> */}

                    </div>
                    {/* <!-- highlights & services details --> */}

                    {/* <!-- border box --> */}
                    <div className="w-full mt-6 rounded-sm border flex flex-col">
                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Product Description</h1>
                        <div className="p-6">
                            <p className="text-sm">{product[0].description}</p>
                        </div>
                    </div>
                    {/* <!-- border box --> */}

                    {/* <!-- specifications border box --> */}
                    <div className="w-full mt-4 pb-4 rounded-md border flex flex-col">
                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Specifications</h1>
                        <h1 className="px-6 py-3 text-lg">General</h1>

                        {/* <!-- specs list --> */}
                        {product[0].specifications?.map((spec, i) => (
                            <div className="px-6 py-2 flex items-center text-sm" key={i}>
                                <p className="text-neutral-400 w-3/12">{spec.title}</p>
                                <p className="flex-1">{spec.description}</p>
                            </div>
                        ))}
                        {/* <!-- specs list --> */}

                    </div>
                    {/* <!-- specifications border box --> */}
                </div>

            </div>
            {/* <!-- product desc wrapper --> */}

        </div>
        {/* <!-- product image & description container --> */}
        </main>
        </>
      )
      }
    </>
  )
};

export default Item;
