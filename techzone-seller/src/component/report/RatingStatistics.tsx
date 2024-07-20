import { ConfigProvider, Progress, Rate } from "antd";
import React, { useMemo } from "react";
import { FaStar } from "react-icons/fa";

interface RatingItem {
    stars: number,
    count: number,
}

interface RatingStatisticsProps {
    ratings: RatingItem[];
}

export default function RatingStatistics(props: RatingStatisticsProps) {
    const avgScore = useMemo(() => {
        let totalScores = 0, totalRatings = 0;
        props.ratings.forEach((rating: any) => {
            totalScores += rating.stars * rating.count;
            totalRatings += rating.count;
        })
        const finalScore = totalScores / totalRatings;
        return Number(finalScore.toFixed(2));
    }, [props.ratings]);

    const totalReviews = useMemo(() => {
        let totalRatings = 0;
        props.ratings.forEach((rating: any) => {
            totalRatings += rating.count;
        })
        return totalRatings;
    }, [props.ratings]);

    const renderProgressRating = () => {
        const reverseRatings = props.ratings.reverse();
        return (
            reverseRatings.map((item: any, index: number) => {
                const reviewCount = reverseRatings[index].count;
                const avgRatingScore = Number((reviewCount * 100 / totalReviews).toFixed(1));
                return (
                    <div key={index} className="flex flex-col">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row items-center gap-1">
                                <div className="font-semibold">{item.stars}</div>
                                <div className="text-yellow-500"><FaStar /></div>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <div className="font-semibold">{avgRatingScore}%</div>
                                <div className="text-gray-500">({reviewCount} đánh giá)</div>
                            </div>
                        </div>
                        <ConfigProvider theme={{ components: { Progress: { defaultColor: `#fadb14` } } }}>
                            <Progress percent={avgRatingScore} showInfo={false} />
                        </ConfigProvider>
                    </div>
                )
            })
        )
    }



    return (
        <React.Fragment>
            <div className="lg:grid lg:grid-cols-3 flex flex-col gap-5">
                <div className="lg:col-start-1 lg:col-span-1 lg:row-span-5 flex flex-col gap-2 items-center justify-items-center">
                    <div className="text-gray-400 text-lg"><span className="font-semibold text-xl">{avgScore !== 0 ? avgScore.toString() : '--'}</span> / 5</div>
                    <div>({totalReviews} đánh giá)</div>
                    <Rate allowHalf value={avgScore} disabled />
                </div>
                <div className="lg:col-start-2 lg:col-span-2 lg:row-span-5 grid grid-rows-5 gap-2">
                    {
                        renderProgressRating()
                    }
                </div>
            </div>
        </React.Fragment>
    )
}