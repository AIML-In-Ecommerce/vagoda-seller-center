"use client";
import { CommentInputType } from "@/apis/ReviewAPI";
import { AuthContext } from "@/context/AuthContext";
import { _ReviewType } from "@/model/ReviewType";
import { ReviewService } from "@/services/Review";
import {
  Button,
  ConfigProvider,
  Drawer,
  Image,
  Input,
  message,
  Rate,
  Tooltip,
} from "antd";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

interface ReviewInfoDrawerProps {
  review: string;
  onClose: () => void;
  open: boolean;
  reloadReview: () => void;
}

const sampleResponse = [
  "Cảm ơn bạn đã mua hàng tại shop. Shop luôn đặt uy tín lên hàng đầu để mang lại trải nghiệm tốt nhất đến khách hàng ạ",
  "Mong quý khách sẽ sớm quay lại ủng hộ shop trong thời gian tới nhé !",
  "Cám ơn anh/chị đã tin dùng sản phẩm của shop, rất mong shop sẽ được tiếp tục đồng hành cùng mình trong thời gian sắp tới nhé",
  "Shop thành thật xin lỗi vì sự thiếu sót và mang lại trải nghiệm không tốt cho quý khách. Shop sẽ cải thiện chất lượng dịch vụ tốt hơn ạ",
];

export default function ReviewInfoDrawer(props: ReviewInfoDrawerProps) {
  const authContext = useContext(AuthContext);

  const [content, setContent] = useState<string>("");
  const [review, setReview] = useState<_ReviewType | null>(null);

  const handleCreateComment = async () => {
    if (!authContext.shopInfo) {
      return;
    }
    const input: CommentInputType = {
      review: review?._id ?? "",
      shop: authContext.shopInfo._id,
      content,
    };
    const response = await ReviewService.createComment(input);

    if (response.status === 200) {
      setContent("");
      loadReview();
      props.reloadReview();
    } else {
      message.error(response.message);
    }
  };

  const loadReview = async () => {
    const response = await ReviewService.getReviewById(props.review);
    setReview(response);
  };

  useEffect(() => {
    loadReview();
  }, [props.review]);

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={props.onClose}
      open={props.open}
      className="bg-slate-50"
    >
      <div className="p-4 w-full">
        <p className="text-xl font-semibold uppercase mb-4">
          Chi tiết đánh giá
        </p>
      </div>
      <div className="flex space-x-2 ">
        <Image
          height={40}
          width={40}
          src={
            review?.user.avatar
              ? review.user.avatar
              : "https://cdn-icons-png.flaticon.com/128/1653/1653671.png"
          }
          className="rounded-full"
        />

        <div className="col-span-2 bg-slate-100 rounded-xl p-4 space-y-2">
          <div className="flex space-x-2 items-center">
            <p className="font-semibold text-md">
              {review ? review.user.fullName : ""}
            </p>
            <Rate
              disabled
              value={review ? review.rating : 0}
              className="mb-1 medium-rating"
            />
          </div>

          <p>{review && review.content}</p>
          <div className="grid grid-cols-4 gap-1">
            {" "}
            {review &&
              review.asset.map((image, index) => (
                <Image
                  key={index}
                  height={60}
                  width={60}
                  src={image}
                  className="rounded-lg"
                />
              ))}
          </div>
          <p className="text-slate-400 text-xs">
            {moment(review && review.createdAt).format("DD/MM/YYYY HH:mm:ss")}
          </p>
        </div>
      </div>
      <div className="ml-14 mt-4 mb-28">
        {review &&
          review.conversation.map((comment, index) =>
            comment.comment.user ? (
              <div key={comment._id} className="flex space-x-2 mb-4">
                <Image
                  height={40}
                  width={40}
                  src={
                    comment.comment.user
                      ? comment.comment.user.avatar
                      : "https://cdn-icons-png.flaticon.com/128/1653/1653671.png"
                  }
                  className="rounded-full"
                />

                <div className="col-span-2 bg-slate-100 rounded-xl p-4 space-y-2">
                  <p className="font-semibold text-md">
                    {comment.comment.user.fullName}
                  </p>

                  <p>{comment.comment.content}</p>

                  <p className="text-slate-400 text-xs">
                    {moment(comment.comment.createdAt).format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
            )
          )}
      </div>
      <div className="w-full absolute bottom-0 left-0 p-2 items-center fixed z-50 border-top shadow-xl bg-white">
        <div className="grid grid-cols-2 gap-2 mb-2">
          {sampleResponse.map((response: string, index) => (
            <Tooltip
              key={index}
              color="#2db7f5"
              placement="topLeft"
              title={response}
            >
              <Button
                type="default"
                className="text-xs truncate rounded-xl px-1 w-full"
                onClick={() => setContent(response)}
              >
                <p className="truncate">{response}</p>
              </Button>
            </Tooltip>
          ))}
        </div>

        <div className="flex-grow ">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  inputFontSizeLG: 12,
                },
              },
            }}
          >
            <Input
              size="large"
              height={300}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập phản hồi trả lời khách hàng..."
              suffix={
                <RiSendPlaneFill
                  color={`${content.length > 0 ? "#1582e6" : "#000000"}`}
                />
              }
              onPressEnter={handleCreateComment}
            />
          </ConfigProvider>
        </div>
      </div>
    </Drawer>
  );
}
