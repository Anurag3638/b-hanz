import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { name, slug, img } = category;

  return (
    <Link to={`/category/${slug}`} className="block group">
      <div className="relative overflow-hidden rounded-lg shadow-md bg-white">
        <img
          src={img}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-bold">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
