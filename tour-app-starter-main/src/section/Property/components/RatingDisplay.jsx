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
      padding: 0;
      border-radius: 12px;
      border: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      background: #ffffff;
      color: #333333;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 720px;
      max-width: 90vw;
      max-height: 90vh;
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s ease;
    `;

    // Add keyframes for dialog animation
    const style = document.createElement("style");
    style.textContent = `
      .review-card {
        transition: all 0.2s ease;
      }
      .review-card:hover {
        background-color: rgba(33, 150, 243, 0.03);
        transform: translateX(4px);
      }
      .criteria-card {
        transition: all 0.2s ease;
      }
      .criteria-card:hover {
        background-color: #f8f9fa;
        transform: translateY(-2px);
      }
      .star-rating span {
        transition: all 0.2s ease;
      }
      .star-rating span:hover {
        transform: scale(1.2);
      }
    `;
    document.head.appendChild(style);

    // Tạo state tạm cho reviews trong dialog
    let dialogReviews = [...reviews];

    // State tạm cho rating từng tiêu chí trong dialog
    let criteriaRatings = {
      cleanliness: 0,
      accuracy: 0,
      checkin: 0,
      support: 0,
      location: 0,
      value: 0,
    };

    // Tính trung bình
    function calcAvg() {
      const arr = Object.values(criteriaRatings);
      const filled = arr.filter((v) => v > 0);
      if (filled.length === 0) return 0;
      return (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1);
    }

    const renderCriteriaInputs = () => {
      const criteria = [
        { key: "cleanliness", label: "Vệ sinh", icon: "🧹" },
        { key: "accuracy", label: "Đúng mô tả", icon: "✓" },
        { key: "checkin", label: "Dễ nhận phòng", icon: "🔑" },
        { key: "support", label: "Hỗ trợ", icon: "💬" },
        { key: "location", label: "Xung quanh", icon: "📍" },
        { key: "value", label: "Đáng tiền", icon: "💰" },
      ];
      return `
        <div id="criteria-rating-block" style="margin-bottom: 24px; padding: 24px; background: #f8f9fa; border-radius: 8px;">
          <h3 style="color: #333; font-size: 20px; margin-bottom: 20px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 24px;">⭐</span> Đánh giá từng tiêu chí
          </h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            ${criteria
              .map(
                (c) => `
              <div class="criteria-card" style="padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #e9ecef;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 20px;">${c.icon}</span>
                    <span style="font-size: 15px; color: #495057;">${
                      c.label
                    }</span>
                  </div>
                  <span id="${
                    c.key
                  }-stars" class="star-rating" style="display: flex; gap: 2px;">
                    ${[1, 2, 3, 4, 5]
                      .map(
                        (i) =>
                          `<span data-crit="${c.key}" data-star="${i}" style="font-size: 20px; cursor: pointer; color: #dee2e6;">★</span>`
                      )
                      .join("")}
                  </span>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
        <div style="margin: 20px 0; text-align: center; padding: 16px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <span style="font-size: 16px; color: #495057;">Số sao tổng quát: <span id="avg-rating-popup" style="color: #2196F3; font-weight: 500; font-size: 18px;">0.0</span>/5</span>
        </div>
      `;
    };

    const renderReviews = () => {
      if (dialogReviews.length === 0) {
        return `
          <div style="text-align: center; padding: 32px 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
            <span style="font-size: 32px;">📝</span>
            <p style="color: #6c757d; font-size: 15px; margin-top: 12px;">Chưa có đánh giá nào</p>
          </div>
        `;
      }
      return dialogReviews
        .map(
          (review) => `
        <div class="review-card" style="border-bottom: 1px solid #e9ecef; padding: 20px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <img 
              src="${
                review.thumbnailUrl ||
                `https://ui-avatars.com/api/?background=2196F3&color=fff&name=${review.username}`
              }" 
              style="width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; object-fit: cover; border: 2px solid #e9ecef;"
            />
            <div>
              <div style="font-weight: 500; color: #212529; font-size: 15px;">${
                review.username
              }</div>
              <div style="color: #6c757d; font-size: 13px;">${
                review.reviewDate
              }</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; margin-bottom: 12px;">
            ${Array(Math.floor(review.rating)).fill("⭐").join("")}
            <span style="margin-left: 8px; color: #2196F3; font-weight: 500;">${
              review.rating
            }</span>
          </div>
          <p style="margin: 0; color: #495057; line-height: 1.5; font-size: 14px;">${
            review.comment
          }</p>
        </div>
      `
        )
        .join("");
    };

    const content = document.createElement("div");
    content.style.cssText = `
      padding: 24px;
      max-height: 80vh;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #dee2e6 transparent;
    `;
    content.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <span style="font-size: 28px;">⭐</span>
        <h2 style="margin: 0; color: #212529; font-size: 24px; font-weight: 500;">Đánh giá của khách</h2>
      </div>
      ${renderCriteriaInputs()}
      <form id="reviewForm" style="margin-bottom: 24px; padding: 24px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
        <h3 style="color: #212529; font-size: 18px; margin-bottom: 16px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 24px;">✍️</span> Để lại bình luận & đánh giá
        </h3>
        <textarea 
          id="reviewComment" 
          rows="4" 
          placeholder="Chia sẻ trải nghiệm của bạn..." 
          style="
            width: 100%;
            max-width: 100%;
            border-radius: 6px;
            padding: 12px;
            border: 1px solid #dee2e6;
            background: #fff;
            color: #495057;
            font-size: 14px;
            margin-bottom: 16px;
            resize: vertical;
            font-family: inherit;
            transition: all 0.2s ease;
          "
        ></textarea>
        <button 
          type="submit" 
          style="
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 10px 24px;
            font-weight: 500;
            cursor: pointer;
            font-size: 14px;
            font-family: inherit;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
          "
        >
          <span style="font-size: 18px;">📤</span>
          Gửi đánh giá
        </button>
      </form>
      <h3 style="color: #212529; font-size: 18px; margin-bottom: 16px; font-weight: 500; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 24px;">📝</span> Đánh giá gần đây
      </h3>
      <div id="recentReviews">${renderReviews()}</div>
    `;

    // Tạo chọn sao động cho từng tiêu chí
    setTimeout(() => {
      const crits = [
        "cleanliness",
        "accuracy",
        "checkin",
        "support",
        "location",
        "value",
      ];
      crits.forEach((key) => {
        const starSpans = content.querySelectorAll(
          `#${key}-stars span[data-crit]`
        );
        starSpans.forEach((span, idx) => {
          span.addEventListener("mouseenter", () => {
            for (let j = 0; j <= idx; j++) starSpans[j].style.color = "#FFD700";
            for (let j = idx + 1; j < 5; j++)
              starSpans[j].style.color = "#BDBDBD";
          });
          span.addEventListener("mouseleave", () => {
            for (let j = 0; j < criteriaRatings[key]; j++)
              starSpans[j].style.color = "#FFD700";
            for (let j = criteriaRatings[key]; j < 5; j++)
              starSpans[j].style.color = "#BDBDBD";
          });
          span.addEventListener("click", () => {
            criteriaRatings[key] = idx + 1;
            for (let j = 0; j < 5; j++)
              starSpans[j].style.color = j <= idx ? "#FFD700" : "#BDBDBD";
            // Cập nhật số sao tổng quát
            content.querySelector("#avg-rating-popup").innerText = calcAvg();
          });
        });
      });
      // Khởi tạo số sao tổng quát ban đầu
      content.querySelector("#avg-rating-popup").innerText = calcAvg();

      // Xử lý submit form
      const reviewForm = content.querySelector("#reviewForm");
      reviewForm.onsubmit = (e) => {
        e.preventDefault();
        const comment = content.querySelector("#reviewComment").value.trim();
        // Có thể kiểm tra nếu muốn: tất cả tiêu chí phải >0
        if (
          Object.values(criteriaRatings).some((v) => v === 0) ||
          comment === ""
        ) {
          alert("Vui lòng đánh giá đủ 6 tiêu chí và nhập bình luận!");
          return;
        }
        dialogReviews.push({
          username: "Bạn",
          reviewDate: new Date().toLocaleDateString(),
          rating: calcAvg(),
          comment,
          thumbnailUrl: "https://ui-avatars.com/api/?name=User",
        });
        // Reset form
        Object.keys(criteriaRatings).forEach((k) => (criteriaRatings[k] = 0));
        crits.forEach((key) => {
          const starSpans = content.querySelectorAll(
            `#${key}-stars span[data-crit]`
          );
          for (let j = 0; j < 5; j++) starSpans[j].style.color = "#BDBDBD";
        });
        content.querySelector("#avg-rating-popup").innerText = calcAvg();
        content.querySelector("#reviewComment").value = "";
        // Render lại reviews
        content.querySelector("#recentReviews").innerHTML = renderReviews();
      };
    }, 0);

    const closeButton = document.createElement("button");
    closeButton.innerHTML = '<span style="font-size: 18px;">✕</span> Đóng';
    closeButton.style.cssText = `
      margin: 20px auto;
      padding: 10px 24px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      font-family: inherit;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s ease;
    `;
    closeButton.onmouseover = () => {
      closeButton.style.background = "#1976D2";
      closeButton.style.transform = "translateY(-1px)";
    };
    closeButton.onmouseout = () => {
      closeButton.style.background = "#2196F3";
      closeButton.style.transform = "translateY(0)";
    };
    closeButton.onclick = () => {
      reviewsDialog.style.opacity = "0";
      setTimeout(() => reviewsDialog.close(), 200);
    };

    reviewsDialog.appendChild(content);
    reviewsDialog.appendChild(closeButton);
    document.body.appendChild(reviewsDialog);
    reviewsDialog.showModal();

    // Show dialog with fade in
    setTimeout(() => {
      reviewsDialog.style.opacity = "1";
    }, 0);
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
        {reviewCount > 0 ? `${reviewCount} đánh giá` : "Chưa có đánh giá"}
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
