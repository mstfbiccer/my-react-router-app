interface BannerProps {
  title: string;
  image: string;
  url: string;
}
const Banner = ({ title, image, url }: BannerProps) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <img src={image} alt={title} style={{ width: "100%" }} />
    </a>
  );
};

export default Banner;