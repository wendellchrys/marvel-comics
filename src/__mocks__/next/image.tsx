import React from 'react';
import { ImgHTMLAttributes } from 'react';

const Image = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { src = '', alt = '', ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
};

export default Image;
