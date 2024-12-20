import SpinnerRing from '@src/assets/svgs/spinner-ring.svg';

type LoaderProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  size?: number;
};

const Loader = (props: LoaderProps) => {
  const { size = 28, ...restProps } = props;

  return <img src={SpinnerRing} width={size} height={size} {...restProps} />;
};

export default Loader;
