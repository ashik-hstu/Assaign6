const categoryElement = document.querySelector("#category");
const cardContainerElement = document.querySelector("#cards");

let videoData = [];

const singleCard = (card) => {
  return `<div class="flex flex-col justify-center items-start">
      <!-- pic-1 -->
      <div class="aspect-video overflow-hidden w-full">
        <img src="${
          card.thumbnail
        }" class="w-full aspect-video  object-cover" alt="" />
      </div>
      <!-- pic-1 Description -->
      <div class="flex items-start gap-x-3 mt-5">
        <div>
         <img src="${
           card.authors[0].profile_picture
         }" class="w-[40px] rounded-full object-cover h-[40px]" alt="${
    card.authors[0].profile_name
  }" />
        </div>
        <div class="">
          <div class="text-[#171717] text-base font-bold w-64">
            ${card.title}
          </div>
          <div class="flex gap-2">
            <!-- name -1-->
            <div>${card.authors[0].profile_name}</div>
            <!-- varification-1 -->
            <div>
   ${
     card.authors[0].verified &&
     `
   <svg
   width="20"
   height="20"
   viewBox="0 0 20 20"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
 >
   <g id="fi_10629607" clip-path="url(#clip0_11_34)">
     <g id="Group">
       <path
         id="Vector"
         d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z"
         fill="#2568EF"
       />
       <path
         id="Vector_2"
         d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z"
         fill="#FFFCEE"
       />
     </g>
   </g>
   <defs>
     <clipPath id="clip0_11_34">
       <rect width="20" height="20" fill="white" />
     </clipPath>
   </defs>
 </svg>`
   }
            </div>
          </div>
          <!-- Views -->
          <div>${card.others.views} views</div>
        </div>
      </div>
    </div>`;
};
const singleCategory = (id, name, active) => {
  return `<div>
      <button
        class="category-button ${
          active ? "button-active" : "button-inactive"
        } text-base font-medium py-2 px-5 rounded"
        data-id=${id}
      >
        ${name}
      </button>
    </div>`;
};

const getCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();

  if (data?.data) {
    let categoryList = "";
    data.data.map((item, index) => {
      categoryList += singleCategory(
        item.category_id,
        item.category,
        index === 0
      );
    });
    categoryElement.innerHTML = categoryList;
  }
  const categoryButtonElements = document.querySelectorAll(".category-button");

  categoryButtonElements.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const category_id = e.target.dataset.id;
      document.querySelectorAll(".category-button").forEach((buttonElement) => {
        buttonElement.classList.remove("button-active");
        buttonElement.classList.add("button-inactive");
      });
      e.target.classList.remove("button-inactive");
      e.target.classList.add("button-active");
      const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${category_id}`
      );
      const data = await response.json();

      videoData = data.data;

      if (data?.data?.length === 0) {
        document.querySelector("#cards").innerHTML = `      <div
            class="col-span-4 row-span-2 flex items-center justify-center flex-col mt-16 lg:mt-32 mb-20 lg:mb-80"
          >
            <div>
              <img src="Icon.png" alt="" />
            </div>
            <div class="text-[#171717] text-[2rem] mt-8 font-bold text-center">
              Oops!! Sorry, There is no <br />
              content here
            </div>
          </div>`;
      } else if (data?.data) {
        let cardList = "";
        data.data.map((item) => {
          cardList += singleCard(item);
        });
        cardContainerElement.innerHTML = cardList;
      }
    });
  });
};

const getCards = async (id = "1000") => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const data = await response.json();

  videoData = data.data;

  if (data?.data) {
    let cardList = "";
    data.data.map((item) => {
      cardList += singleCard(item);
    });
    cardContainerElement.innerHTML = cardList;
  }
};

const sortByViews = async () => {
  const sortedList = videoData.sort((a, b) => {
    const firstViews = Number(
      a.others.views
        .split("")
        .slice(0, a.others.views.length - 1)
        .join("")
    );
    const secondViews = Number(
      b.others.views
        .split("")
        .slice(0, a.others.views.length - 1)
        .join("")
    );
    if (firstViews > secondViews) {
      return -1;
    } else if (firstViews < secondViews) {
      return 1;
    }
    console.log({ firstViews, secondViews });
  });

  let cardList = "";
  sortedList.map((item) => {
    cardList += singleCard(item);
  });
  cardContainerElement.innerHTML = cardList;

  console.log(sortedList);
};

document.querySelector("#sort-by-view").addEventListener("click", sortByViews);

getCategories();
getCards();
