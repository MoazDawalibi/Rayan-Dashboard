import React from "react";
import { useTranslation } from "utility/language";
import CommentIcon from '@mui/icons-material/Comment';
import Comments from "../comments/Comments";
import ReviewsIcon from '@mui/icons-material/Reviews';
import Reviews from "../reviews/Reviews";
const useProductTabs = (
  commentQuery,
  reviewsQuery,
  commentMuation,
  reviewsMutation,

) => {
  const t = useTranslation();


  return React.useMemo(() => {
    const tabs = [

      {
        title: (
          <>
            <CommentIcon size={20} /> {t("comments")}
          </>
        ),
        content: <Comments
          commentQuery={commentQuery}
          commentMuation={commentMuation}
     

        />,
      },
      {
        title: (
          <>
            <ReviewsIcon size={20} /> {t("reviews")}
          </>
        ),
        content: <Reviews
        reviewsMutation={reviewsMutation}
          reviewsQuery={reviewsQuery}

        />,
      },
    ];

    return tabs;
  }, [t, reviewsMutation,
     reviewsQuery,
      commentMuation,
       commentQuery,

      ]);
};

export default useProductTabs;
