import { render, fireEvent, screen } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    screen.getByRole('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = screen.getByRole(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    screen.queryByRole('img', { name: "testing image 1"})
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: "testing image 2"})
  ).toBeInTheDocument();
});


it("should show the left arrow on the second card and hide on the first card", () => {
  const photos = [
    { src: "image1.jpg", caption: "Image 1" },
    { src: "image2.jpg", caption: "Image 2" },
    { src: "image3.jpg", caption: "Image 3" },
  ];

  // const  {getByTestId, getByText}   = render(<Carousel photos={photos} title="Test Carousel" />);
  // const rightArrow = getByTestId("right-arrow");
  render(<Carousel photos={photos} title="Test Carousel" />);


  // The left arrow should be hidden on the first card
  // expect(leftArrow).not.toBeVisible();
  expect(screen.queryByRole('button', { name: "Previous" })).not.toBeVisible();
  
  // The right arrow should be visible on the first card
  // expect(rightArrow).toBeVisible();
  const rightArrow = screen.getByRole('button', { name: "Next" });
  expect(rightArrow).toBeVisible();

  // Clicking the right arrow to move to the next card
  fireEvent.click(rightArrow);

  // The left arrow should be visible on the second card
  // const leftArrow = getByTestId("left-arrow");
  const leftArrow = screen.getByRole('button', { name: "Previous" });
  expect(leftArrow).toBeVisible();


  // The right arrow should be visible on the second card
  expect(rightArrow).toBeVisible();

  // Clicking the right arrow again to move to the last card
  fireEvent.click(rightArrow);

  // The left arrow should be visible on the last card
  expect(leftArrow).toBeVisible();

  // The right arrow should be hidden on the last card
   expect(screen.queryByRole('button', { name: "Next" })).not.toBeVisible();
  fireEvent.click(leftArrow);
  expect(leftArrow).toBeVisible();

});
