import React from "react";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
`;

export const SizeIcon = () => (
  <IconWrapper>
    <IconImage src={`${process.env.PUBLIC_URL}/icons/size.png`} alt="size" />
  </IconWrapper>
);

export const TemperatureIcon = () => (
  <IconWrapper>
    <IconImage
      src={`${process.env.PUBLIC_URL}/icons/temperature.png`}
      alt="temperature"
    />
  </IconWrapper>
);

export const IceIcon = () => (
  <IconWrapper>
    <IconImage src={`${process.env.PUBLIC_URL}/icons/ice.png`} alt="ice" />
  </IconWrapper>
);

export const SweetnessIcon = () => (
  <IconWrapper>
    <IconImage
      src={`${process.env.PUBLIC_URL}/icons/sugar.png`}
      alt="sweetness"
    />
  </IconWrapper>
);

export const BlendingIcon = () => (
  <IconWrapper>
    <IconImage src={`${process.env.PUBLIC_URL}/icons/tea.png`} alt="blending" />
  </IconWrapper>
);

export const PearlIcon = () => (
  <IconWrapper>
    <IconImage src={`${process.env.PUBLIC_URL}/icons/pearl.png`} alt="pearl" />
  </IconWrapper>
);

export const CheeseIcon = () => (
  <IconWrapper>
    <IconImage
      src={`${process.env.PUBLIC_URL}/icons/cheese.png`}
      alt="cheese"
    />
  </IconWrapper>
);

export const SparklingIcon = () => (
  <IconWrapper>
    <IconImage
      src={`${process.env.PUBLIC_URL}/icons/sparkling.png`}
      alt="sparkling"
    />
  </IconWrapper>
);

export const TeaIcon = () => (
  <IconWrapper>
    <IconImage src={`${process.env.PUBLIC_URL}/icons/tea.png`} alt="tea" />
  </IconWrapper>
);
