import { RiStarFill } from "react-icons/ri"

export const Rating = ({rating, reviews} : {rating: number, reviews:number}) => {

    return (
        <div className="flex items-center gap-4">
            <p className="text-2xl">{parseFloat(rating.toFixed(1))}</p>
            <span className="inline-flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => <RiStarFill className={`${rating >= index ? "fill-yellow-400" : "fill-gray-200"} text-xl`} key={index} />)}
            </span>
            <a className="text-indigo-800 text-sm hover:underline">See all {reviews} reviews </a>
        </div>
    )
}