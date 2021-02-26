import { Box, Grid, IconButton, OtherProps } from "@chakra-ui/react";
import { Children, useEffect, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface CarouselProps {
  children: JSX.Element | Array<JSX.Element>;
  length: number;
}

const Carousel: React.FC<CarouselProps> = ({ children, length }) => {
  const gridRef = useRef(null);
  const scroll = (distance) => {
    gridRef.current.scrollLeft += distance;
  };
  return (
    <Box mb="8em" position="relative">
      {length !== 1 && (
        <>
          <IconButton
            zIndex="3"
            display={["flex", , , "none"]}
            colorScheme="orange"
            border="2px"
            borderRadius="50%"
            position="absolute"
            top="40%"
            left="10px"
            aria-label="left button"
            icon={<MdChevronLeft />}
            onClick={() => scroll(-200)}
          />
          <IconButton
            zIndex="3"
            display={["flex", , , "none"]}
            colorScheme="orange"
            border="2px"
            borderRadius="50%"
            position="absolute"
            top="40%"
            right="10px"
            aria-label="right button"
            icon={<MdChevronRight />}
            onClick={() => scroll(200)}
          />
        </>
      )}
      <Grid
        ref={gridRef}
        className="container"
        gap="1em"
        gridAutoFlow="column"
        gridAutoColumns="230px"
        overflowX="auto"
        justifyContent={length === 1 ? "center" : "unset"}
        style={{
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {length !== 1 && <Box style={{ scrollSnapAlign: "unset" }}></Box>}
        {Children.map(children, (child) => (
          <Box style={{ scrollSnapAlign: "center" }}>{child}</Box>
        ))}
        {length !== 1 && <Box style={{ scrollSnapAlign: "unset" }}></Box>}
      </Grid>
    </Box>
  );
};

export default Carousel;
