import React, { Component } from "react";
import "./ImageSlider.scss";
import { Carousel } from "react-responsive-carousel";
import { Grid } from "@material-ui/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface IProps {
  images: Array<string>;
}

class ImageSlider extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid container item xs={12}>
        <Carousel showStatus={false} showThumbs={false} centerMode={true}>
          {this.props.images.map((image: string) => {
            const totalSrc = process.env.REACT_APP_API_URL + image;
            return (
              <div>
                <img src={totalSrc} style={{ maxHeight: 650 }} />
              </div>
            );
          })}
        </Carousel>
      </Grid>
    );
  }
}

export default ImageSlider;
