import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { memo } from 'react';

const ComWorkContainer = styled.div`
  display: flex;
  flex-direction: initial;
  margin: 1rem 0 1rem 1rem;
`;

const ComWorkTitle = styled.div`
  display: block;
`;
const Title = styled.label`
  font-size: 1.25rem;
`;
const Id = styled.label`
  margin-left: 0.75rem;
  font-size: 1.125rem;
  color: #888888;
`;

const ComWorkTitleArea = ({ id, title }) => (
  <ComWorkContainer>
    <ComWorkTitle>
      <Title>{title}</Title>
      <Id>ID: {id.toUpperCase()}</Id>
    </ComWorkTitle>
  </ComWorkContainer>
);

ComWorkTitleArea.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(ComWorkTitleArea);
