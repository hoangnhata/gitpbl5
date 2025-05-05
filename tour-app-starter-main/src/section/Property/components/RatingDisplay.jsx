import React from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PropTypes from "prop-types";

const RatingDisplay = ({ rating, reviewCount, reviews }) => {
  // Calculate the number of filled and unfilled stars based on the rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleClick = () => {
    const reviewsDialog = document.createElement("dialog");
    reviewsDialog.style.cssText = `
      padding: 32px;
      border-radius: 16px;
      border: none;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
      color: white;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 600px;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
    `;

    const content = document.createElement("div");
    content.innerHTML = `
      <h2 style="margin-bottom: 24px; color: #fff; font-size: 28px;">Guest Reviews</h2>
      
      <div style="margin-bottom: 32px;">
        <h3 style="color: #fff; font-size: 20px; margin-bottom: 16px;">Rating Categories</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
          <div style="padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span><svg style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24"><path fill="currentColor" d="M19.36 2.72l1.42 1.42l-5.46 5.46l-1.42-1.42l5.46-5.46M17.54 10.88l-7.03 7.03l-3.75-3.75L3.41 17.6L10.16 24.4l7.03-7.03L17.54 10.88z"/></svg>Cleanliness</span>
              <span>5.0 ⭐</span>
            </div>
            <div style="height: 4px; background: #2196F3; border-radius: 2px; width: 100%;"></div>
          </div>
          <div style="padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span><svg style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"/></svg>Accuracy</span>
              <span>5.0 ⭐</span>
            </div>
            <div style="height: 4px; background: #2196F3; border-radius: 2px; width: 100%;"></div>
          </div>
          <div style="padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span><svg style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24"><path fill="currentColor" d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5l-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/></svg>Check-in</span>
              <span>5.0 ⭐</span>
            </div>
            <div style="height: 4px; background: #2196F3; border-radius: 2px; width: 100%;"></div>
          </div>
          <div style="padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span><svg style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24"><path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>Communication</span>
              <span>4.8 ⭐</span>
            </div>
            <div style="height: 4px; background: #2196F3; border-radius: 2px; width: 96%;"></div>
          </div>
          <div style="padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span><svg style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5z"/></svg>Location</span>
              <span>4.6 ⭐</span>
            </div>
            <div style="height: 4px; background: #2196F3; border-radius: 2px; width: 92%;"></div>
          </div>
          <div style="padding: 16px; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span><svg style="width: 20px; height: 20px; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24"><path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15c0-1.09 1.01-1.85 2.7-1.85c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61c0 2.31 1.91 3.46 4.7 4.13c2.5.6 3 1.48 3 2.41c0 .69-.49 1.79-2.7 1.79c-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55c0-2.84-2.43-3.81-4.7-4.4z"/></svg>Value</span>
              <span>5.0 ⭐</span>
            </div>
            <div style="height: 4px; background: #2196F3; border-radius: 2px; width: 100%;"></div>
          </div>
        </div>
      </div>

      <h3 style="color: #fff; font-size: 20px; margin-bottom: 16px;">Recent Reviews</h3>
      ${
        reviews.length > 0
          ? reviews
              .map(
                (review) => `
              <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding: 20px 0;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <img 
                    src="${
                      review.thumbnailUrl || "https://via.placeholder.com/48"
                    }" 
                    style="width: 48px; height: 48px; border-radius: 50%; margin-right: 16px; border: 2px solid rgba(255,255,255,0.1);"
                  />
                  <div>
                    <div style="font-weight: 600; color: #fff; font-size: 16px;">${
                      review.username
                    }</div>
                    <div style="color: #9e9e9e; font-size: 14px;">${
                      review.reviewDate
                    }</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  ${Array(Math.floor(review.rating)).fill("⭐").join("")}
                  <span style="margin-left: 8px; color: #fff;">${
                    review.rating
                  }</span>
                </div>
                <p style="margin: 0; color: #e0e0e0; line-height: 1.6;">${
                  review.comment
                }</p>
              </div>
            `
              )
              .join("")
          : '<p style="color: #bdbdbd; text-align: center; padding: 20px;">No reviews yet</p>'
      }
    `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.style.cssText = `
      margin-top: 24px;
      padding: 12px 24px;
      background: linear-gradient(45deg, #2196F3, #21CBF3);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s ease;
    `;
    closeButton.onmouseover = () =>
      (closeButton.style.transform = "scale(1.05)");
    closeButton.onmouseout = () => (closeButton.style.transform = "scale(1)");
    closeButton.onclick = () => reviewsDialog.close();

    reviewsDialog.appendChild(content);
    reviewsDialog.appendChild(closeButton);
    document.body.appendChild(reviewsDialog);
    reviewsDialog.showModal();
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        padding: 2,
        borderRadius: 2,
        "&:hover": {
          transform: "scale(1.03)",
          background: "rgba(255,255,255,0.05)",
        },
      }}
      onClick={handleClick}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          marginBottom: 1.5,
          background: "linear-gradient(45deg, #2196F3, #21CBF3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {rating}/5
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 1.5,
        }}
      >
        {[...Array(fullStars)].map((_, index) => (
          <StarIcon
            key={index}
            sx={{
              color: "#FFD700",
              fontSize: 28,
              filter: "drop-shadow(0 2px 4px rgba(255,215,0,0.3))",
            }}
          />
        ))}
        {hasHalfStar && (
          <StarIcon
            sx={{
              color: "#FFD700",
              fontSize: 28,
              opacity: 0.5,
            }}
          />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <StarBorderIcon key={index} sx={{ color: "#FFD700", fontSize: 28 }} />
        ))}
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: "#e0e0e0",
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: 500,
          "&:hover": {
            color: "#2196F3",
          },
        }}
      >
        {reviewCount > 0 ? `${reviewCount} Reviews` : "No Reviews Yet"}
      </Typography>
    </Box>
  );
};

RatingDisplay.propTypes = {
  rating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  reviews: PropTypes.array.isRequired,
};

export default RatingDisplay;
